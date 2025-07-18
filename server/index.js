import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import fetch from "node-fetch";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set API_BASE_URL with fallback
const API_BASE_URL = process.env.API_BASE_URL || "https://offplan.market/api";
console.log("🌱 API_BASE_URL =", API_BASE_URL);

// Serve static assets (React frontend)
const frontendPath = "/var/www/frontend";
app.use("/", express.static(frontendPath));

/**
 * Detect crawlers (WhatsApp, Facebook, Twitter, etc.)
 */
function isCrawler(userAgent = "") {
  const crawlers = [
    "facebookexternalhit",
    "WhatsApp",
    "TelegramBot",
    "Twitterbot",
    "Slackbot",
    "LinkedInBot",
    "Discordbot",
    "Googlebot",
    "bingbot",
    "embedly",
    "pinterest",
  ];
  return crawlers.some((crawler) =>
    userAgent.toLowerCase().includes(crawler.toLowerCase())
  );
}

/**
 * Route for agent pages with dynamic meta
 */
app.get("/agent/:username", async (req, res) => {
  const username = req.params.username;
  const userAgent = req.headers["user-agent"] || "";
  console.log("👉 Request for /agent/:username =", username);
  console.log("📱 User-Agent:", userAgent);

  const apiUrl = `${API_BASE_URL}/agent/${username}`;
  let agent;

  try {
    // Fetch agent data from API
    const response = await fetch(apiUrl);
    console.log("🌐 API Response:", response.status);

    if (response.ok) {
      const data = await response.json();
      agent = data.data;
    }

    // Retry if data missing for crawlers
    if (!agent && isCrawler(userAgent)) {
      console.log("⏳ Retry API fetch for crawler...");
      await delay(1000); // wait 1s
      const retryRes = await fetch(apiUrl);
      if (retryRes.ok) {
        const retryData = await retryRes.json();
        agent = retryData.data;
        console.log("✅ Data fetched on retry.");
      }
    }

    // Render with dynamic meta for crawlers
    if (isCrawler(userAgent)) {
      const meta = agent
        ? {
            title: `${agent.name} | Offplan Expert – Offplan.Market`,
            description: `Work with ${agent.name} to explore Dubai off-plan projects.`,
            ogImage: agent.profile_image_url || "/default-og-image.jpg",
          }
        : undefined;

      const html = await injectMetaTags(meta);
      return res.send(html);
    }

    // Serve React app for browsers
    return res.sendFile(path.join(frontendPath, "index.html"));
  } catch (err) {
    console.error("🚨 Error fetching agent data:", err);

    if (isCrawler(userAgent)) {
      const fallbackHtml = await injectMetaTags();
      return res.send(fallbackHtml);
    } else {
      return res.sendFile(path.join(frontendPath, "index.html"));
    }
  }
});

/**
 * Fallback route for all other pages
 */
app.get(/^\/(?!api).*/, async (req, res) => {
  const userAgent = req.headers["user-agent"] || "";
  if (isCrawler(userAgent)) {
    const html = await injectMetaTags();
    return res.send(html);
  } else {
    return res.sendFile(path.join(frontendPath, "index.html"));
  }
});

/**
 * Inject meta tags into index.html
 */
async function injectMetaTags(meta = {}) {
  const defaults = {
    title: "Offplan Market – Dubai Offplan Properties",
    description: "Explore Dubai's top off-plan projects and VIP property offers.",
    ogImage: "/lovable-uploads/93c61de1-b334-4926-a59a-2934c6cb5135.png",
  };
  const finalMeta = { ...defaults, ...meta };

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

/**
 * Delay utility
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ SSR Server running at http://localhost:${PORT}`);
});
