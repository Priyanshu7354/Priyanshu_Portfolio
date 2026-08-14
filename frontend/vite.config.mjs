import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Required for GitHub Pages project site
  base: '/Priyanshu_Portfolio/',

  // Only active during development (npm run dev)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // You can remove build: { outDir: "dist" } — it's the default
})