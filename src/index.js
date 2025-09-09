// server/index.js
import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import compression from 'compression'
import sirv from 'sirv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

const createServer = async () => {
  const app = express()

  // Compression middleware
  app.use(compression())

  let vite
  if (!isProduction) {
    // Development mode with Vite
    const { createServer } = await import('vite')
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    app.use(vite.ssrLoadModule)
  } else {
    // Production mode - serve static assets
    app.use('/', sirv(path.resolve(__dirname, '../dist/client'), {
      extensions: []
    }))
  }

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // SSR Handler
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template, render

      if (!isProduction) {
        // Development - read template and transform with Vite
        template = fs.readFileSync(
          path.resolve(__dirname, '../index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        // Production - use built files
        template = fs.readFileSync(
          path.resolve(__dirname, '../dist/client/index.html'),
          'utf-8'
        )
        render = (await import('../dist/server/entry-server.js')).render
      }

      // Render the app
      const { html, helmet, initialData, context } = await render(url, {})

      // Handle redirects
      if (context.url) {
        return res.redirect(301, context.url)
      }

      // Handle 404
      if (context.statusCode === 404) {
        res.status(404)
      }

      // Build the final HTML
      const finalHtml = template
        .replace(`<!--ssr-outlet-->`, html)
        .replace(
          `<title>OffPlan Market - Premium Off-Plan Properties in UAE</title>`,
          helmet?.title?.toString() || `<title>OffPlan Market - Premium Off-Plan Properties in UAE</title>`
        )
        .replace(
          `<meta name="description" content="Discover premium off-plan properties in Dubai and UAE. Connect with top real estate agents, explore luxury developments, and find your dream home with OffPlan Market's comprehensive property listings." />`,
          helmet?.meta?.toString() || ''
        )
        .replace(
          `<link rel="canonical" href="https://offplan.market/" />`,
          helmet?.link?.toString() || `<link rel="canonical" href="https://offplan.market${url}" />`
        )
        .replace(
          `</head>`,
          `${helmet?.script?.toString() || ''}\n<script>window.__INITIAL_DATA__=${JSON.stringify(initialData)}</script>\n</head>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
    } catch (e) {
      !isProduction && vite.ssrFixStacktrace(e)
      console.error('SSR Error:', e.stack)
      res.status(500).end('Internal Server Error')
    }
  })

  return app
}

createServer().then(app => {
  app.listen(port, () => {
    console.log(`🚀 SSR Server running at http://localhost:${port}`)
    console.log(`📱 Environment: ${isProduction ? 'production' : 'development'}`)
    console.log(`🌐 API Base URL: ${process.env.API_BASE_URL || 'https://offplan.market/api'}`)
  })
})