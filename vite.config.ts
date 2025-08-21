import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://ddkz68-3000.csb.app",
        changeOrigin: true,     // 🔥 Important for CORS
        secure: true,           // Since it's HTTPS
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: removes /api prefix
      },
    },
  },
})
