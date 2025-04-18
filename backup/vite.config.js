import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Incluye archivos .js - por defecto es solo .jsx
      include: "**/*.{jsx,js}",
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true
      }
    }
  }
})
