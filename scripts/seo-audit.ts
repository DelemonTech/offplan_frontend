// scripts/seo-audit.ts - Enhanced SEO Meta Tags Audit Tool
import fs from "fs";
import path from "path";
import axios from "axios";

const hostname = "https://offplan.market";
const API_BASE_URL = "https://offplan.market/api";

interface SEOCheck {
  url: string;
  title?: string;
  description?: string;
  hasTitle: boolean;
  hasDescription: boolean;
  titleLength: number;
  descriptionLength: number;
  issues: string[];
  status: 'good' | 'warning' | 'error';
}

interface FileAudit {
  file: string;
  hasSEOHeadImport: boolean;
  hasSEOHeadUsage: boolean;
  hasHelmet: boolean;
  title?: string;
  description?: string;
  isPageComponent: boolean;
  needsSEO: boolean;
  issues: string[];
}

// Define all your routes with expected SEO data
const routeConfigs = [
  {
    path: "/",
    expectedTitle: "OffPlan Market - Dubai Real Estate Investment Platform",
    expectedDescription: "Discover exclusive off-plan properties in Dubai. Connect with expert agents and explore premium real estate investment opportunities.",
  },
  {
    path: "/blogs",
    expectedTitle: "Real Estate Blog - Market Insights & Investment Tips",
    expectedDescription: "Stay updated with the latest Dubai real estate market trends, investment tips, and property insights from industry experts.",
  }
];

// Check if SEOHead component is being used properly
const auditSEOHeadUsage = (): FileAudit[] => {
  const results: FileAudit[] = [];
  const srcDir = path.join(process.cwd(), 'src');
  
  const findSEOHeadUsage = (dir: string) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findSEOHeadUsage(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(srcDir, filePath);
        
        // Skip utility files, type definitions, hooks, etc.
        const skipPatterns = [
          'types/',
          'utils/',
          'hooks/',
          'contexts/',
          '.d.ts',
          'main.tsx',
          '/ui/',
          'toast'
        ];
        
        if (skipPatterns.some(pattern => relativePath.includes(pattern))) {
          return;
        }
        
        const hasSEOHeadImport = content.includes("import { SEOHead }") || content.includes("import SEOHead");
        const hasSEOHeadUsage = content.includes("<SEOHead");
        const hasHelmet = content.includes("react-helmet") || content.includes("<Helmet");
        
        // Check if this is a page component (likely needs SEO)
        const isPageComponent = relativePath.includes('pages/') || 
                               content.includes('export default') && 
                               (content.includes('function') || content.includes('const')) &&
                               content.includes('return');
        
        // Check for title and description props
        const titleMatch = content.match(/<SEOHead[^>]*title=["']([^"']+)["']/);
        const descriptionMatch = content.match(/<SEOHead[^>]*description=["']([^"']+)["']/);
        
        const issues: string[] = [];
        let needsSEO = false;
        
        if (isPageComponent) {
          needsSEO = true;
          if (!hasSEOHeadImport && !hasHelmet) {
            issues.push("❌ No SEOHead or Helmet import found");
          }
          if (!hasSEOHeadUsage && !hasHelmet) {
            issues.push("❌ No SEO component usage found");
          }
          if (!titleMatch) {
            issues.push("❌ No title prop found");
          }
          if (!descriptionMatch) {
            issues.push("❌ No description prop found");
          }
        }
        
        // Only include files that are relevant for SEO or have issues
        if (needsSEO || hasSEOHeadUsage || hasHelmet || issues.length > 0) {
          results.push({
            file: relativePath,
            hasSEOHeadImport,
            hasSEOHeadUsage,
            hasHelmet,
            title: titleMatch ? titleMatch[1] : undefined,
            description: descriptionMatch ? descriptionMatch[1] : undefined,
            isPageComponent,
            needsSEO,
            issues
          });
        }
      }
    });
  };
  
  try {
    findSEOHeadUsage(srcDir);
  } catch (error) {
    console.error("Error scanning files:", error);
  }
  
  return results;
};

// Validate SEO requirements
const validateSEO = (check: Partial<SEOCheck>): SEOCheck => {
  const issues: string[] = [];
  let status: 'good' | 'warning' | 'error' = 'good';
  
  // Helper function to update status with proper precedence
  const updateStatus = (newStatus: 'warning' | 'error') => {
    if (status !== 'error') {
      status = newStatus;
    }
  };
  
  // Title validation
  if (!check.hasTitle) {
    issues.push("❌ Missing title tag");
    status = 'error';
  } else if (check.titleLength! < 30) {
    issues.push("⚠️ Title too short (< 30 chars)");
    updateStatus('warning');
  } else if (check.titleLength! > 60) {
    issues.push("⚠️ Title too long (> 60 chars)");
    updateStatus('warning');
  }
  
  // Description validation
  if (!check.hasDescription) {
    issues.push("❌ Missing meta description");
    status = 'error';
  } else if (check.descriptionLength! < 120) {
    issues.push("⚠️ Description too short (< 120 chars)");
    updateStatus('warning');
  } else if (check.descriptionLength! > 160) {
    issues.push("⚠️ Description too long (> 160 chars)");
    updateStatus('warning');
  }
  
  if (issues.length === 0) {
    issues.push("✅ All SEO requirements met");
  }
  
  return {
    url: check.url!,
    title: check.title,
    description: check.description,
    hasTitle: check.hasTitle!,
    hasDescription: check.hasDescription!,
    titleLength: check.titleLength!,
    descriptionLength: check.descriptionLength!,
    issues,
    status
  };
};

// Fetch dynamic data for routes with better error handling
const fetchDynamicData = async () => {
  try {
    console.log("🔍 Testing API endpoints...");
    
    // Test different possible blog endpoints
    const blogEndpoints = [
      `${API_BASE_URL}/api/blogs/`,  // Based on Django URL patterns shown
      `${API_BASE_URL}/blogs/`,      // Original attempt
      `${hostname}/api/api/blogs/`   // Full path based on Django patterns
    ];
    
    let blogsData = [];
    let blogsEndpoint = '';
    
    for (const endpoint of blogEndpoints) {
      try {
        console.log(`   Testing: ${endpoint}`);
        const response = await axios.get(endpoint, { timeout: 5000 });
        blogsData = response.data?.results || response.data || [];
        blogsEndpoint = endpoint;
        console.log(`   ✅ Working: ${endpoint} (${blogsData.length} blogs)`);
        break;
      } catch (error) {
        console.log(`   ❌ Failed: ${endpoint}`);
      }
    }
    
    // Test agents endpoint
    let agentsData = [];
    try {
      const agentsResponse = await axios.get(`${API_BASE_URL}/agents/list`, { timeout: 5000 });
      agentsData = agentsResponse.data?.data?.results || agentsResponse.data?.results || [];
      console.log(`   ✅ Agents endpoint: ${agentsData.length} agents`);
    } catch (error) {
      console.log(`   ❌ Agents endpoint failed`);
    }
    
    // Test properties endpoint
    let propertiesData = [];
    try {
      const propertiesResponse = await axios.get(`${API_BASE_URL}/properties/`, { timeout: 5000 });
      propertiesData = propertiesResponse.data?.data?.results || propertiesResponse.data?.results || [];
      console.log(`   ✅ Properties endpoint: ${propertiesData.length} properties`);
    } catch (error) {
      console.log(`   ❌ Properties endpoint failed`);
    }
    
    return {
      blogs: blogsData,
      agents: agentsData,
      properties: propertiesData,
      workingEndpoints: {
        blogs: blogsEndpoint,
        agents: blogsEndpoint ? `${API_BASE_URL}/agents/list` : '',
        properties: blogsEndpoint ? `${API_BASE_URL}/properties/` : ''
      }
    };
  } catch (error) {
    console.error("Error in fetchDynamicData:", error.message);
    return { 
      blogs: [], 
      agents: [], 
      properties: [], 
      workingEndpoints: { blogs: '', agents: '', properties: '' }
    };
  }
};

// Generate comprehensive SEO report
const generateSEOAuditReport = async () => {
  console.log("🔍 Starting comprehensive SEO audit...\n");
  
  // 1. Check SEOHead component usage in files
  console.log("📁 Scanning files for SEOHead usage...");
  const fileAudits = auditSEOHeadUsage();
  
  console.log("\n📋 SEO Component Usage Report:");
  console.log("=".repeat(50));
  
  const pageComponents = fileAudits.filter(audit => audit.isPageComponent);
  const componentsWithSEO = pageComponents.filter(audit => audit.hasSEOHeadUsage);
  const componentsWithIssues = pageComponents.filter(audit => audit.issues.length > 0);
  
  console.log(`📄 Total page components found: ${pageComponents.length}`);
  console.log(`✅ Components with SEO: ${componentsWithSEO.length}`);
  console.log(`❌ Components with issues: ${componentsWithIssues.length}\n`);
  
  // Show detailed results for page components
  pageComponents.forEach(audit => {
    const status = audit.issues.length === 0 ? '✅' : '❌';
    console.log(`${status} ${audit.file}`);
    console.log(`   SEO Component: ${audit.hasSEOHeadUsage || audit.hasHelmet ? '✅' : '❌'}`);
    console.log(`   Title: ${audit.title ? '✅' : '❌'}`);
    console.log(`   Description: ${audit.description ? '✅' : '❌'}`);
    
    if (audit.issues.length > 0) {
      audit.issues.forEach(issue => console.log(`   ${issue}`));
    }
    
    if (audit.title) console.log(`   Title: "${audit.title}"`);
    if (audit.description) console.log(`   Desc: "${audit.description}"`);
    console.log('');
  });
  
  // 2. Check dynamic content SEO
  console.log("\n🌐 Checking dynamic content SEO...");
  const dynamicData = await fetchDynamicData();
  
  const checks: SEOCheck[] = [];
  
  // Check static routes
  const staticChecks = [
    {
      url: "/",
      title: "OffPlan Market - Premium Real Estate Properties",
      description: "Discover premium off-plan properties and connect with top real estate agents. Find your dream home with OffPlan Market",
      hasTitle: true,
      hasDescription: true,
    },
    {
      url: "/blogs", 
      title: "Latest Real Estate Insights | Blog",
      description: "Stay updated with the latest trends, tips, and insights in Dubai real estate market.",
      hasTitle: true,
      hasDescription: true,
    }
  ];
  
  // Add dynamic blog posts if available
  if (dynamicData.blogs.length > 0) {
    console.log(`   Found ${dynamicData.blogs.length} blog posts`);
    dynamicData.blogs.slice(0, 5).forEach((blog: any) => { // Limit to first 5 for audit
      if (blog.slug || blog.id) {
        const title = blog.title || blog.title_en || "Blog Post";
        const description = blog.content ? 
          blog.content.replace(/<[^>]*>/g, '').substring(0, 160) : 
          blog.excerpt || "Read this blog post";
        
        staticChecks.push({
          url: `/blog/${blog.slug || blog.id}`,
          title: title,
          description: description,
          hasTitle: !!title,
          hasDescription: !!description,
        });
      }
    });
  }
  
  // Add dynamic agent pages if available
  if (dynamicData.agents.length > 0) {
    console.log(`   Found ${dynamicData.agents.length} agents`);
    dynamicData.agents.slice(0, 3).forEach((agent: any) => { // Limit to first 3 for audit
      if (agent.username) {
        staticChecks.push({
          url: `/${agent.username}`,
          title: `${agent.name || agent.username} - Real Estate Agent Profile`,
          description: `Connect with ${agent.name || agent.username} for exclusive property deals in Dubai`,
          hasTitle: true,
          hasDescription: true,
        });
      }
    });
  }
  
  // Validate all checks
  staticChecks.forEach(check => {
    const validated = validateSEO({
      ...check,
      titleLength: check.title?.length || 0,
      descriptionLength: check.description?.length || 0,
    });
    checks.push(validated);
  });
  
  // 3. Generate summary report
  console.log("\n📊 SEO Audit Summary:");
  console.log("=".repeat(50));
  
  const goodCount = checks.filter(c => c.status === 'good').length;
  const warningCount = checks.filter(c => c.status === 'warning').length;
  const errorCount = checks.filter(c => c.status === 'error').length;
  const componentsNeedingFix = componentsWithIssues.length;
  
  console.log(`✅ Good: ${goodCount} pages`);
  console.log(`⚠️  Warning: ${warningCount} pages`);
  console.log(`❌ Error: ${errorCount} pages`);
  console.log(`📄 Total: ${checks.length} pages checked`);
  console.log(`🔧 Components needing SEO: ${componentsNeedingFix}`);
  
  // 4. Show summary of file issues
  console.log("\n📊 Summary:");
  console.log("=".repeat(30));
  console.log(`✅ Files with good SEO: ${pageComponents.length - componentsWithIssues.length}/${pageComponents.length}`);
  console.log(`⚠️ Files with issues: ${componentsWithIssues.length}/${pageComponents.length}`);
  
  // 5. Quick fixes section
  console.log("\n💡 Quick Fixes:");
  console.log("=".repeat(30));
  console.log("1. Import SEOHead: import { SEOHead } from \"@/components/SEOHead\";");
  console.log("2. Add to JSX: <SEOHead title=\"Page Title\" description=\"Page description\" />");
  console.log("3. Make titles 30-60 characters");
  console.log("4. Make descriptions 120-160 characters");
  console.log("5. Use unique, descriptive content for each page");
  
  console.log("\n🔧 Template for adding SEO:");
  console.log("=".repeat(40));
  console.log(`
// Add to imports:
import { SEOHead } from '@/components/SEOHead';

// Add at top of component return:
<SEOHead
  title="Your Page Title (30-60 chars)"
  description="Your page description that encourages clicks and includes keywords (120-160 chars)"
  image="/path/to/image.jpg" // optional
/>`);
  
  // 6. API endpoints status
  if (dynamicData.workingEndpoints.blogs) {
    console.log("\n🌐 Working API Endpoints:");
    console.log("=".repeat(30));
    console.log(`✅ Blogs: ${dynamicData.workingEndpoints.blogs}`);
    console.log(`✅ Agents: ${dynamicData.workingEndpoints.agents}`);
    console.log(`✅ Properties: ${dynamicData.workingEndpoints.properties}`);
  }
  
  // 7. Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: { 
      goodCount, 
      warningCount, 
      errorCount, 
      total: checks.length,
      componentsSummary: {
        totalPageComponents: pageComponents.length,
        componentsWithSEO: componentsWithSEO.length,
        componentsWithIssues: componentsWithIssues.length
      }
    },
    fileAudits: componentsWithIssues, // Only components with issues
    contentChecks: checks.filter(c => c.status !== 'good'), // Only pages with issues
    workingEndpoints: dynamicData.workingEndpoints,
    recommendations: [
      "Add SEOHead component to all page components",
      "Ensure titles are 30-60 characters long", 
      "Ensure descriptions are 120-160 characters long",
      "Use unique titles and descriptions for each page",
      "Include target keywords in titles",
      "Write compelling descriptions that encourage clicks",
      "Test and fix API endpoints for dynamic content"
    ]
  };
  
  const reportPath = path.join(process.cwd(), 'public', 'seo-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
};

// Run the audit
generateSEOAuditReport().catch(console.error);