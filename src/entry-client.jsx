import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { TooltipProvider } from './components/ui/tooltip'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <HelmetProvider>
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
  </BrowserRouter>
)
