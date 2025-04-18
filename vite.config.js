import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Optimizar resolución de módulos
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'react-icons',
      'framer-motion',
      'react-hot-toast'
    ]
  },
  
  // Resolución de importaciones
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    // Permitir importaciones sin extensión
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  
  // Servidor desarrollo
  server: {
    port: 3000,
    strictPort: true, // No intenta otros puertos si 3000 está ocupado
    host: true, // Escucha en todas las interfaces de red
    open: true,
    cors: true,
    headers: {
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*'
    }
  },
  
  // Configuración de build para producción
  build: {
    outDir: 'dist',
    target: 'es2018',
    minify: 'terser',
    cssCodeSplit: false,
    rollupOptions: {
      // Externalizar dependencias problemáticas
      external: [
        'react-hot-toast'
      ],
      output: {
        // Un solo archivo JavaScript para evitar problemas de carga
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 5000
  }
});
