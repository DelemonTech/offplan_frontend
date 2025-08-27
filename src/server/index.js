import express from 'express'
import { renderPage } from 'vite-plugin-ssr/server'

const app = express()

app.get('*', async (req, res, next) => {
  const pageContext = await renderPage({ urlOriginal: req.originalUrl })
  const { httpResponse } = pageContext
  if (!httpResponse) return next()
  res.status(httpResponse.statusCode).send(httpResponse.body)
})

app.listen(3000)
