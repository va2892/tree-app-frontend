import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log("VITE CONFIG LOADED")

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5083',
        changeOrigin: true,
        rewrite: (path) => {
          console.log("PROXY HIT:", path)
          return path
        }
      }
    }
  }
})