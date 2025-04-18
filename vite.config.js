import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Configuración optimizada para Cloudflare Workers
    rollupOptions: {
      output: {
        // Estructura de chunks más simple para evitar problemas de carga
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', 'react-icons']
        },
        // Nombres de archivo predecibles
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Importante: ajustar la estrategia de carga de módulos para evitar error 1042
        inlineDynamicImports: false
      }
    },
    // Eliminar source maps en producción para reducir tamaño
    sourcemap: false,
    // Usar método de minificación más compatible
    minify: 'terser',
    terserOptions: {
      compress: {
        // Eliminar console.logs en producción
        drop_console: true
      }
    },
    // Evitar advertencias por chunks grandes
    chunkSizeWarningLimit: 1000,
    // Generar archivos compatibles con navegadores más antiguos
    target: 'es2018'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // Configurar CORS para desarrollo local
  server: {
    port: 3000,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  // Prevenir errores de carga en Cloudflare Workers
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2018'
    }
  }
})