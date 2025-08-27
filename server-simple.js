import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  // Serve static files
  app.use(express.static('dist'))

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      // Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template)

      // Load server entry
      const { render } = await vite.ssrLoadModule('/src/entry-server-simple.jsx')

      // Create context for StaticRouter
      const context = {}

      // Render app HTML
      const { app: appHtml, helmetContext } = await render(url, context)

      // Inject app HTML and meta tags
      const { helmet } = helmetContext
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('<!--head-tags-->', 
          helmet.title.toString() + 
          helmet.meta.toString() + 
          helmet.link.toString() + 
          helmet.script.toString() +
          helmet.style.toString()
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error('SSR Error:', e.message)
      console.error(e.stack)
      
      // Fallback to client-side rendering
      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template)
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
      } catch (fallbackError) {
        res.status(500).end('Server Error')
      }
    }
  })

  app.listen(3000, () => {
    console.log('SSR Server running at http://localhost:3000')
  })
}

createServer().catch(console.error)
