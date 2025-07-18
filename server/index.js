import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import fetch from "node-fetch";

// ✅ Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Set API_BASE_URL with fallback
const API_BASE_URL = process.env.API_BASE_URL || "https://offplan.market/api";
console.log("🌱 API_BASE_URL =", API_BASE_URL);

// ✅ Path to deployed frontend
const frontendPath = "/var/www/frontend";

// ✅ Serve static assets properly
app.use("/", express.static(frontendPath));

// Dynamic meta for agent pages
app.get("/agent/:username", async (req, res) => {
  const username = req.params.username;
  console.log("👉 Fetching agent data for username:", username);

  try {
    const apiUrl = `${API_BASE_URL}/agent/${username}`;
    console.log("🌐 Fetching:", apiUrl);

    const response = await fetch(apiUrl);

    console.log("🌐 API Response Status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API call failed:", response.status, errorText);
      throw new Error(`API call failed with status ${response.status}`);
    }

    const agent = await response.json();
    console.log("✅ Agent Data:", agent);

    const html = await getHtmlWithMeta({
      title: `${agent.name} | Offplan Expert – Offplan.Market`,
      description: `Work with ${agent.name} to explore Dubai off-plan projects.`,
      ogImage: agent.profile_image_url || "/default-og-image.jpg",
    });

    res.send(html);
  } catch (err) {
    console.error("🚨 Error fetching agent data:", err);
    const fallbackHtml = await getHtmlWithMeta();
    res.send(fallbackHtml);
  }
});

// ✅ Catch-all fallback route
app.get(/^\/(?!api).*/, async (req, res) => {
  const html = await getHtmlWithMeta();
  res.send(html);
});

// Helper to inject meta tags
async function getHtmlWithMeta(meta = {}) {
  const defaultMeta = {
    title: "Offplan Market – Dubai Offplan Properties",
    description: "Explore Dubai's top off-plan projects and VIP property offers.",
    ogImage: "/lovable-uploads/93c61de1-b334-4926-a59a-2934c6cb5135.png",
  };

  const finalMeta = { ...defaultMeta, ...meta };

  const indexPath = path.join(frontendPath, "index.html");

  let html;
  try {
    html = await fs.readFile(indexPath, "utf-8");
  } catch (err) {
    console.error("🚨 index.html not found at:", indexPath);
    return "<h1>Error: index.html not found</h1>";
  }

  html = html
    .replace(/<title>(.*?)<\/title>/i, `<title>${finalMeta.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content=".*?">/i,
      `<meta name="description" content="${finalMeta.description}">`
    )
    .replace(
      /<meta\s+property="og:title"\s+content=".*?">/i,
      `<meta property="og:title" content="${finalMeta.title}">`
    )
    .replace(
      /<meta\s+property="og:description"\s+content=".*?">/i,
      `<meta property="og:description" content="${finalMeta.description}">`
    )
    .replace(
      /<meta\s+property="og:image"\s+content=".*?">/i,
      `<meta property="og:image" content="${finalMeta.ogImage}">`
    );

  return html;
}

app.listen(PORT, () => {
  console.log(`✅ SSR Server running at http://localhost:${PORT}`);
});
