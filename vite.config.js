import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Asegurar que JSX se compile correctamente
      jsxRuntime: 'automatic',
      // Optimizar para desarrollo y producción
      fastRefresh: true,
    })
  ],
  build: {
    // Usar esbuild para minificación (más rápido y efectivo)
    minify: 'esbuild',
    // Directorio de salida
    outDir: 'dist',
    // Configuraciones avanzadas para optimización
    rollupOptions: {
      output: {
        // Separar código por chunks para optimizar carga
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'react-icons']
        },
        // Asegurar que los scripts se carguen correctamente en el HTML
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Especificar el objetivo de JavaScript
    target: 'es2018',
    // Asegurar que todos los recursos se compilen correctamente
    assetsInlineLimit: 4096,
    // Generar sourcemaps para debugging
    sourcemap: false,
    // Asegurar que el CSS se extraiga correctamente
    cssCodeSplit: true
  },
  // Configuración de resolución de rutas
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true,
    // Configuración CORS para desarrollo
    cors: true
  },
  // Optimizaciones para producción
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})