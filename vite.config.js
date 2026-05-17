import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // This is the key for Docker/WSL
    },
    host: true, // Allows the container to be reached
    strictPort: true,
    port: 5173,
  },
})