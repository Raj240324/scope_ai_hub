import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['chrome 100'], // Updated from chrome 70
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
    // Updated from chrome70 — react-snap works fine with es2020
    // Removes ~15-30kb of legacy polyfills
    target: 'es2020',
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
