import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { TooltipProvider } from './components/ui/tooltip'
import App from './App'

export function render(url, context) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const helmetContext = {}

  try {
    const app = ReactDOMServer.renderToString(
      <StaticRouter location={url} context={context}>
        <HelmetProvider context={helmetContext}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <LanguageProvider>
                <TooltipProvider>
                  <App />
                </TooltipProvider>
              </LanguageProvider>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </StaticRouter>
    )

    return { app, helmetContext }
  } catch (error) {
    console.error('Render error:', error)
    // Return a basic fallback
    return { 
      app: '<div id="root">Loading...</div>', 
      helmetContext: { helmet: { title: { toString: () => '<title>OffPlan Market</title>' }, meta: { toString: () => '' }, link: { toString: () => '' }, script: { toString: () => '' }, style: { toString: () => '' } } }
    }
  }
}
