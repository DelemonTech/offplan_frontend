import fs from "fs";
import { SitemapStream } from "sitemap";
import { createGzip } from "zlib";
import axios from "axios";
import { pipeline } from "stream/promises";
import xmlFormatter from "xml-formatter"; // << ADD THIS

const hostname = "https://offplan.market";
const API_BASE_URL = "https://offplan.market/api";
const AUTH_TOKEN = ""; // Optional

const staticRoutes = ["/"];

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
      routes.push(`/${agent.username}`);
      routes.push(`/${agent.username}/property-details`);
    }

    for (const property of properties) {
      const agentUsername = property.agent?.username;
      const propertyId = property.id;
      const unitIds: number[] = property.units?.map((u: any) => u.id) || [];

      unitIds.forEach((unitId) => {
        routes.push(`/${agentUsername}/property-detailed/${unitId}`);
        routes.push(
          `/${agentUsername}/property-details/${propertyId}/unit-details/${unitId}`
        );
      });
    }
  } catch (err) {
    console.error("❌ Error fetching dynamic data:", (err as any).message);
  }

  return routes;
};

const generateSitemap = async () => {
  const allRoutes = [...staticRoutes, ...(await fetchDynamicRoutes())];
  const date = new Date().toISOString();

  //
  // 1) Generate XML into a string
  //
  const sitemapStream = new SitemapStream({ hostname });

  allRoutes.forEach((url) => {
    sitemapStream.write({ url, changefreq: "weekly", priority: 0.8, lastmod: date });
  });
  sitemapStream.end();

  let rawXml = "";
  for await (const chunk of sitemapStream) {
    rawXml += chunk.toString();
  }

  //
  // 2) Pretty-print
  //
  const formattedXml = xmlFormatter(rawXml, { indentation: "  " });
  fs.writeFileSync("./public/sitemap.xml", formattedXml);
  console.log("✅ Pretty sitemap.xml created");

  //
  // 3) Also write compressed version
  //
  const gzipStream = new SitemapStream({ hostname });
  const gzip = createGzip();
  const gzipFile = fs.createWriteStream("./public/sitemap.xml.gz");

  allRoutes.forEach((url) => {
    gzipStream.write({ url, changefreq: "weekly", priority: 0.8, lastmod: date });
  });
  gzipStream.end();
  await pipeline(gzipStream, gzip, gzipFile);
  console.log("✅ sitemap.xml.gz created");
};


generateSitemap();
