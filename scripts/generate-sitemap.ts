// scripts/generate-sitemap.ts
import fs from "fs";
import { SitemapStream } from "sitemap";
import { createGzip } from "zlib";
import axios from "axios";
import { pipeline } from "stream/promises";

const hostname = "https://offplan.market";
const API_BASE_URL = "https://offplan.market/api";
const AUTH_TOKEN = ""; // Add JWT token if needed

const staticRoutes = [
  "/",
  "/login",
  "/admin/dashboard",
  "/dashboard",
  "/agentProfile",
  "/property-details",
  "/property-detailed",
  "/unit-detail",
  "/gallery",
];

const fetchDynamicRoutes = async (): Promise<string[]> => {
  const routes: string[] = [];

  try {
    const agentsRes = await axios.get(`${API_BASE_URL}/agents/list`, {
      headers: { Authorization: AUTH_TOKEN },
    });

    const propertiesRes = await axios.get(`${API_BASE_URL}/properties/`, {
      headers: { Authorization: AUTH_TOKEN },
    });

    const agents = agentsRes.data?.data?.results || [];
    const properties = propertiesRes.data?.data?.results || [];

    for (const agent of agents) {
      const username = agent.username;
      routes.push(`/${username}`);
      routes.push(`/agentedit/${username}`);
      routes.push(`/sample/${username}`);
      routes.push(`/${username}/property-details`);
      routes.push(`/${username}/agent-detail`);
    }

    for (const property of properties) {
      const agentUsername = property.agent?.username;
      const propertyId = property.id;
      const unitIds: number[] = property.units?.map((u: any) => u.id) || [];

      unitIds.forEach(unitId => {
        routes.push(`/${agentUsername}/property-detailed/${unitId}`);
        routes.push(`/${agentUsername}/property-details/${propertyId}/unit-details/${unitId}`);
      });
    }
  } catch (err) {
    console.error("❌ Error fetching dynamic data:", (err as any).message);
  }

  return routes;
};

const generateSitemap = async () => {
  const allRoutes = [...staticRoutes, ...(await fetchDynamicRoutes())];

  // 1. Write sitemap.xml (plain)
  const sitemap = new SitemapStream({ hostname });
  const xmlFile = fs.createWriteStream("./public/sitemap.xml");
  for (const url of allRoutes) {
    sitemap.write({ url, changefreq: "weekly", priority: 0.8 });
  }
  sitemap.end();
  await pipeline(sitemap, xmlFile);
  console.log("✅ sitemap.xml created");

  // 2. Compress and write sitemap.xml.gz
  const sitemap2 = new SitemapStream({ hostname });
  const gzip = createGzip();
  const gzipFile = fs.createWriteStream("./public/sitemap.xml.gz");

  allRoutes.forEach(url => {
    sitemap2.write({ url, changefreq: "weekly", priority: 0.8 });
  });
  sitemap2.end();

  await pipeline(sitemap2, gzip, gzipFile);
  console.log("✅ sitemap.xml.gz created");
};

generateSitemap();
