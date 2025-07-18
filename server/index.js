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

// ✅ Serve static assets properly
app.use("/", express.static(path.join(__dirname, "..", "dist")));



// Dynamic meta for agent pages
app.get("/agent/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const response = await fetch(`${process.env.VITE_HOST_URL}/agent/${username}`);
    const agent = await response.json();

    const html = await getHtmlWithMeta({
      title: `${agent.name} | Offplan Expert – Offplan.Market`,
      description: `Work with ${agent.name} to explore Dubai off-plan projects.`,
      ogImage: `${agent.profile_image_url}`,
    });

    res.send(html);
  } catch (err) {
    console.error("Error fetching agent data:", err);
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

  let html = await fs.readFile(path.join(__dirname,"..", "dist", "index.html"), "utf-8");

  html = html
    .replace(/<title>.*<\/title>/, `<title>${finalMeta.title}</title>`)
    .replace(
      /<meta name="description" content=".*">/,
      `<meta name="description" content="${finalMeta.description}">`
    )
    .replace(
      /<meta property="og:title" content=".*">/,
      `<meta property="og:title" content="${finalMeta.title}">`
    )
    .replace(
      /<meta property="og:description" content=".*">/,
      `<meta property="og:description" content="${finalMeta.description}">`
    )
    .replace(
      /<meta property="og:image" content=".*">/,
      `<meta property="og:image" content="${finalMeta.ogImage}">`
    );

  return html;
}

app.listen(PORT, () => {
  console.log(`✅ SSR Server running at http://localhost:${PORT}`);
});
