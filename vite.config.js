import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import ssr from 'vite-plugin-ssr/plugin';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ssr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // SSR configuration
    noExternal: ['react-helmet-async'],
  },
  build: {
    
  },
})
