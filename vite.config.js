import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import ssr from 'vite-plugin-ssr/plugin' 


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ssr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // <-- maps @ to /src
      '@components': path.resolve(__dirname, './src/components')
    },
  },
  server: {
    host: '0.0.0.0', // required to expose on LAN
    port: 5173,      // optional: set fixed port
  },
})
