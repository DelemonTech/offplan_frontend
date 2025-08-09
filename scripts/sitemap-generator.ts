// scripts/sitemap-generator.ts
import fs from "fs";
import path from "path";
import { SitemapStream } from "sitemap";
import { createGzip } from "zlib";
import axios from "axios";
import { pipeline } from "stream/promises";

const hostname = "https://offplan.market";
const API_BASE_URL = "https://offplan.market/api";
const AUTH_TOKEN = ""; // Optional

// Get the project root directory (one level up from scripts/)
const PROJECT_ROOT = path.resolve(process.cwd());
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

// Static routes with different priorities
const staticRoutes = [
  { url: "/", priority: 1.0, changefreq: "daily" },
  { url: "/blogs", priority: 0.9, changefreq: "daily" }
];

interface RouteItem {
  url: string;
  priority: number;
  changefreq: string;
  lastmod?: string;
}

interface BlogPost {
  slug: string;
  created_at?: string;
  title?: string;
  id?: number;
}

interface Agent {
  username: string;
  id?: number;
}

interface Property {
  id: number;
  agent?: Agent;
  units?: Array<{ id: number }>;
}

const fetchDynamicRoutes = async (): Promise<RouteItem[]> => {
  const routes: RouteItem[] = [];

  try {
    console.log("🔍 Fetching dynamic routes...");

    // Fetch agents data
    console.log("📋 Fetching agents...");
    const agentsRes = await axios.get(`${API_BASE_URL}/agents/list`, {
      headers: AUTH_TOKEN ? { Authorization: AUTH_TOKEN } : {},
      timeout: 10000
    });

    // Fetch properties data
    console.log("🏢 Fetching properties...");
    const propertiesRes = await axios.get(`${API_BASE_URL}/properties/`, {
      headers: AUTH_TOKEN ? { Authorization: AUTH_TOKEN } : {},
      timeout: 10000
    });

    // Fetch blogs data
    console.log("📝 Fetching blogs...");
    const blogsRes = await axios.get(`${API_BASE_URL}/blogs/`, {
      headers: AUTH_TOKEN ? { Authorization: AUTH_TOKEN } : {},
      timeout: 10000
    });

    const agents: Agent[] = agentsRes.data?.data?.results || agentsRes.data?.results || [];
    const properties: Property[] = propertiesRes.data?.data?.results || propertiesRes.data?.results || [];
    const blogs: BlogPost[] = blogsRes.data?.results || blogsRes.data?.data || blogsRes.data || [];

    console.log(`✅ Found ${agents.length} agents, ${properties.length} properties, ${blogs.length} blogs`);

    // Add agent routes
    for (const agent of agents) {
      if (agent.username) {
        routes.push({
          url: `/${agent.username}`,
          priority: 0.8,
          changefreq: "weekly"
        });
        routes.push({
          url: `/${agent.username}/property-details`,
          priority: 0.7,
          changefreq: "weekly"
        });
      }
    }

    // Add property routes
    for (const property of properties) {
      const agentUsername = property.agent?.username;
      const propertyId = property.id;
      const unitIds: number[] = property.units?.map((u: any) => u.id) || [];

      if (agentUsername) {
        unitIds.forEach((unitId) => {
          routes.push({
            url: `/${agentUsername}/property-detailed/${unitId}`,
            priority: 0.6,
            changefreq: "weekly"
          });
          routes.push({
            url: `/${agentUsername}/property-details/${propertyId}/unit-details/${unitId}`,
            priority: 0.6,
            changefreq: "weekly"
          });
        });
      }
    }

    // Add blog routes
    console.log(`📰 Processing ${blogs.length} blog posts...`);
    for (const blog of blogs) {
      if (blog && blog.slug) {
        // Convert created_at to lastmod date
        const lastmod = blog.created_at ? new Date(blog.created_at).toISOString() : undefined;
        
        routes.push({
          url: `/blog/${blog.slug}`,
          priority: 0.8, // High priority for blog content
          changefreq: "monthly", // Blogs don't change as frequently
          lastmod: lastmod
        });
        
        console.log(`✅ Added blog: /blog/${blog.slug}`);
      }
    }

  } catch (err: any) {
    console.error("❌ Error fetching dynamic data:", err.message);
    
    // Log specific errors for debugging
    if (err.response) {
      console.error("Response status:", err.response.status);
      console.error("Response data:", JSON.stringify(err.response.data, null, 2));
      console.error("Request URL:", err.config?.url);
    }
    
    // Don't fail completely, just continue with what we have
    console.log("⚠️ Continuing with available routes...");
  }

  return routes;
};

const generateSitemap = async () => {
  try {
    const dynamicRoutes = await fetchDynamicRoutes();
    const date = new Date().toISOString();

    console.log(`🗺️ Generating sitemap with ${staticRoutes.length} static and ${dynamicRoutes.length} dynamic routes`);
    console.log(`📁 Project root: ${PROJECT_ROOT}`);
    console.log(`📁 Public directory: ${PUBLIC_DIR}`);

    // Create public directory if it doesn't exist
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
      console.log("📁 Created public directory");
    }

    //
    // 1) Generate XML sitemap
    //
    const sitemapStream = new SitemapStream({ hostname });

    // Add static routes
    staticRoutes.forEach((route) => {
      sitemapStream.write({
        url: route.url,
        changefreq: route.changefreq as any,
        priority: route.priority,
        lastmod: date
      });
    });

    // Add dynamic routes
    dynamicRoutes.forEach((route) => {
      sitemapStream.write({
        url: route.url,
        changefreq: route.changefreq as any,
        priority: route.priority,
        lastmod: route.lastmod || date
      });
    });

    sitemapStream.end();

    let rawXml = "";
    for await (const chunk of sitemapStream) {
      rawXml += chunk.toString();
    }

    // Write the sitemap to public directory
    const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, rawXml);
    console.log(`✅ sitemap.xml created at: ${sitemapPath}`);

    //
    // 2) Generate compressed version
    //
    const gzipStream = new SitemapStream({ hostname });
    const gzip = createGzip();
    const gzipPath = path.join(PUBLIC_DIR, 'sitemap.xml.gz');
    const gzipFile = fs.createWriteStream(gzipPath);

    // Add static routes to gzip version
    staticRoutes.forEach((route) => {
      gzipStream.write({
        url: route.url,
        changefreq: route.changefreq as any,
        priority: route.priority,
        lastmod: date
      });
    });

    // Add dynamic routes to gzip version
    dynamicRoutes.forEach((route) => {
      gzipStream.write({
        url: route.url,
        changefreq: route.changefreq as any,
        priority: route.priority,
        lastmod: route.lastmod || date
      });
    });

    gzipStream.end();
    await pipeline(gzipStream, gzip, gzipFile);
    console.log(`✅ sitemap.xml.gz created at: ${gzipPath}`);

    // Generate summary
    const totalRoutes = staticRoutes.length + dynamicRoutes.length;
    const blogRoutes = dynamicRoutes.filter(route => route.url.startsWith('/blog/')).length;
    const agentRoutes = dynamicRoutes.filter(route => !route.url.startsWith('/blog/')).length;
    
    console.log(`📊 Sitemap Summary:`);
    console.log(`   Total routes: ${totalRoutes}`);
    console.log(`   Static routes: ${staticRoutes.length}`);
    console.log(`   Dynamic routes: ${dynamicRoutes.length}`);
    console.log(`     - Blog routes: ${blogRoutes}`);
    console.log(`     - Agent/Property routes: ${agentRoutes}`);

  } catch (error: any) {
    console.error("❌ Error generating sitemap:", error.message);
    throw error;
  }
};

// Generate robots.txt with blog-friendly rules
const generateRobotsTxt = () => {
  try {
    const robotsTxt = `User-agent: *
Allow: /
Allow: /blogs
Allow: /blog/

# Sitemap location
Sitemap: ${hostname}/sitemap.xml
Sitemap: ${hostname}/sitemap.xml.gz

# Crawl delay (optional - adjust as needed)
Crawl-delay: 1

# Block admin areas
Disallow: /admin
Disallow: /login
Disallow: /dashboard

# Allow blog content for better SEO
Allow: /blog/*
Allow: /blogs/*

# Block any temporary or test pages
Disallow: /test/
Disallow: /temp/
Disallow: /*.json
Disallow: /api/

# Allow important assets for proper rendering
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.webp
Allow: /*.svg

# Block query parameters that don't add value
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /*?source=*

# Special rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot  
Allow: /
Crawl-delay: 2
`;

    // Write robots.txt to public directory
    const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt);
    console.log(`✅ robots.txt created at: ${robotsPath}`);
  } catch (error: any) {
    console.error("❌ Error generating robots.txt:", error.message);
  }
};

const generateSEOFiles = async () => {
  try {
    console.log("🚀 Starting SEO files generation...");
    console.log(`📍 Working directory: ${process.cwd()}`);
    console.log(`📍 Script running from: scripts/sitemap-generator.ts`);
    
    await generateSitemap();
    generateRobotsTxt();
    
    console.log("🎉 All SEO files generated successfully!");
    
    // Show final file locations
    console.log("\n📋 Generated files:");
    console.log(`   📄 ${path.join(PUBLIC_DIR, 'sitemap.xml')}`);
    console.log(`   📦 ${path.join(PUBLIC_DIR, 'sitemap.xml.gz')}`);
    console.log(`   🤖 ${path.join(PUBLIC_DIR, 'robots.txt')}`);
    
  } catch (error: any) {
    console.error("❌ Error generating SEO files:", error.message);
    process.exit(1);
  }
};

// Run the generator
generateSEOFiles();