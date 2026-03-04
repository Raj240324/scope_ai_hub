import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['chrome 70'], // Old enough for react-snap's puppeteer
      modernPolyfills: true
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://scope-ai-hub.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    target: 'es2015',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'framer-motion', 'gsap'],
        },
      },
    },
  },
})
