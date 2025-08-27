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
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')

      // Render app HTML
      const { app, helmetContext } = await render(url, {})

      // Inject app HTML and meta tags
      const { helmet } = helmetContext
      const html = template
        .replace(`<!--ssr-outlet-->`, app)
        .replace('<!--head-tags-->', helmet.title.toString() + helmet.meta.toString() + helmet.link.toString())

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
  })
}

createServer()
