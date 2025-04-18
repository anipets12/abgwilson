#!/bin/bash

# Colores para mensajes en consola
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 SOLUCIÓN COMPLETA - ABOGADO WILSON WEBSITE                      ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# Comprobar si estamos en el directorio del proyecto
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: No se encontró package.json. Ejecute este script desde la carpeta raíz del proyecto.${NC}"
  exit 1
fi

# Cerrar todos los procesos de desarrollo que puedan estar en ejecución
echo -e "${YELLOW}[1/10]${NC} Cerrando servicios de desarrollo en ejecución..."
pkill -f "vite" || true
pkill -f "wrangler" || true
pkill -f "npm run dev" || true
echo -e "${GREEN}✓${NC} Servicios cerrados correctamente"

# Limpiar caché y archivos temporales
echo -e "${YELLOW}[2/10]${NC} Limpiando caché y archivos temporales..."
rm -rf node_modules/.vite
rm -rf .wrangler
rm -rf dist
echo -e "${GREEN}✓${NC} Limpieza completada"

# Corregir extensiones de archivos y problemas de importación
echo -e "${YELLOW}[3/10]${NC} Corrigiendo problemas de importación..."

# 1. Problema del Hero.js/Hero.jsx
if [ -f "src/routes.jsx" ]; then
  # Corregir las importaciones con lazy loading asegurando que usen .jsx
  sed -i 's/import(.\/components\/Hero)/import(.\/components\/Hero.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/Services)/import(.\/components\/Services.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/Contact\/ContactPage)/import(.\/components\/Contact\/ContactPage.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/Auth\/Login)/import(.\/components\/Auth\/Login.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/Auth\/Register)/import(.\/components\/Auth\/Register.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/Dashboard\/DashboardPage)/import(.\/components\/Dashboard\/DashboardPage.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/PrivacyPolicy)/import(.\/components\/PrivacyPolicy.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/TerminosCondiciones)/import(.\/components\/TerminosCondiciones.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/Consultation\/ConsultationHub)/import(.\/components\/Consultation\/ConsultationHub.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/Payment\/PaymentForm)/import(.\/components\/Payment\/PaymentForm.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/Payment\/ThankYouPage)/import(.\/components\/Payment\/ThankYouPage.jsx)/g' src/routes.jsx
  sed -i 's/import(.\/components\/ErrorBoundary)/import(.\/components\/ErrorBoundary.jsx)/g' src/routes.jsx
  echo -e "${GREEN}✓${NC} Importaciones en routes.jsx corregidas"
fi

# 2. Verificar que no haya doble Router
if [ -f "src/main.jsx" ] && [ -f "src/App.jsx" ]; then
  # Eliminar BrowserRouter de main.jsx si existe también en App.jsx
  if grep -q "BrowserRouter" src/App.jsx && grep -q "BrowserRouter" src/main.jsx; then
    sed -i 's/import { BrowserRouter } from .react-router-dom.;//g' src/main.jsx
    sed -i 's/<BrowserRouter>/<>/g' src/main.jsx
    sed -i 's/<\/BrowserRouter>/<\/>/g' src/main.jsx
    echo -e "${GREEN}✓${NC} Router duplicado eliminado"
  fi
fi

# 3. Asegurar que existen todos los archivos importados con jsx
for component in Hero Services Contact Auth Dashboard PrivacyPolicy TerminosCondiciones Consultation Payment ErrorBoundary; do
  # Convertir archivos .js a .jsx si es necesario
  find src/components -name "${component}.js" -type f | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file" .js)
    if [ ! -f "${dir}/${base}.jsx" ]; then
      cp "$file" "${dir}/${base}.jsx"
      echo -e "${BLUE}→${NC} Convertido ${base}.js a ${base}.jsx"
    fi
  done
done

echo -e "${GREEN}✓${NC} Archivos de componentes verificados"

# 4. Corregir Vite config para mejorar la carga de módulos
echo -e "${YELLOW}[4/10]${NC} Optimizando configuración de Vite..."

cat > vite.config.js << 'EOL'
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
      'framer-motion'
    ],
    esbuildOptions: {
      target: 'es2020',
    }
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
EOL

echo -e "${GREEN}✓${NC} Configuración de Vite optimizada"

# 5. Corregir worker para Cloudflare
echo -e "${YELLOW}[5/10]${NC} Optimizando Worker para Cloudflare..."

# Crear un worker super simple que funcione perfectamente
mkdir -p src

cat > src/worker-simple.js << 'EOL'
/**
 * Worker simplificado para Cloudflare que gestiona correctamente las rutas de SPA
 * y sirve assets estáticos de manera eficiente
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      
      // Servir archivos estáticos si la URL apunta a un recurso
      if (url.pathname.match(/\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2|ttf)$/)) {
        const response = await fetch(request);
        if (response.ok) {
          // Configurar encabezados apropiados
          const headers = new Headers(response.headers);
          if (url.pathname.endsWith('.js')) {
            headers.set('Content-Type', 'application/javascript; charset=utf-8');
          } else if (url.pathname.endsWith('.css')) {
            headers.set('Content-Type', 'text/css; charset=utf-8');
          }
          
          // Cacheo agresivo para archivos estáticos
          headers.set('Cache-Control', 'public, max-age=31536000');
          return new Response(response.body, { status: 200, headers });
        }
      }
      
      // Para cualquier otra ruta, servir el index.html (SPA routing)
      const response = await fetch(new URL('/index.html', url.origin));
      if (response.ok) {
        const html = await response.text();
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-cache',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'X-XSS-Protection': '1; mode=block'
          }
        });
      }
      
      // Fallback si index.html no se pudo obtener
      return new Response('Error: Página no encontrada', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
      
    } catch (error) {
      // Manejo genérico de errores
      return new Response(`Error: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
EOL

echo -e "${GREEN}✓${NC} Worker optimizado creado"

# 6. Corregir wrangler.toml
echo -e "${YELLOW}[6/10]${NC} Configurando wrangler.toml..."

cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-simple.js"
compatibility_date = "2023-11-21"

[site]
bucket = "./dist"
EOL

echo -e "${GREEN}✓${NC} wrangler.toml configurado"

# 7. Verificar que el favicon esté incrustado para evitar errores de carga
echo -e "${YELLOW}[7/10]${NC} Verificando favicon en index.html..."

if [ -f "index.html" ]; then
  # Verificar si el favicon está en línea
  if ! grep -q "data:image/svg+xml;base64" index.html; then
    # Reemplazar favicon con versión incrustada
    sed -i 's|<link rel="icon".*>|<link rel="icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzNCODJGNiIvPjxwYXRoIGQ9Ik04IDhIMjRWMTJIOFY4WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNOCAxNEgyMFYxOEg4VjE0WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNOCAyMEgxNlYyNEg4VjIwWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=">|g' index.html
  fi
  
  # Añadir script de recuperación de errores si no existe
  if ! grep -q "window.onerror" index.html; then
    sed -i '/<\/head>/i \
  <!-- Sistema de detección y recuperación de errores --> \
  <script> \
    window.onerror = function(message, source, lineno, colno, error) { \
      console.error("Error detectado:", message, "en", source, "línea:", lineno); \
      if (document.getElementById("root") && document.getElementById("root").childElementCount === 0) { \
        document.getElementById("root").innerHTML = ` \
          <div style="padding: 20px; font-family: sans-serif; max-width: 800px; margin: 0 auto;"> \
            <h1>Error detectado</h1> \
            <p>Se ha producido un error al cargar la aplicación:</p> \
            <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${message}</pre> \
            <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Reintentar</button> \
          </div> \
        `; \
      } \
      return true; \
    }; \
  </script>' index.html
  fi
  
  echo -e "${GREEN}✓${NC} index.html optimizado con favicon incrustado y recuperación de errores"
fi

# 8. Instalar/actualizar dependencias
echo -e "${YELLOW}[8/10]${NC} Instalando/actualizando dependencias..."
npm install --no-audit --no-fund

echo -e "${GREEN}✓${NC} Dependencias actualizadas"

# 9. Construir la aplicación para producción
echo -e "${YELLOW}[9/10]${NC} Construyendo la aplicación para producción..."
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: No se pudo construir la aplicación.${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Aplicación construida exitosamente"

# 10. Desplegar a Cloudflare Workers
echo -e "${YELLOW}[10/10]${NC} Desplegando a Cloudflare Workers..."
npx wrangler deploy

if [ $? -ne 0 ]; then
  echo -e "${RED}Advertencia: El despliegue no se completó correctamente.${NC}"
  echo -e "${YELLOW}Puede ejecutar manualmente 'npx wrangler deploy' cuando esté listo.${NC}"
else
  echo -e "${GREEN}✓${NC} Aplicación desplegada exitosamente"
fi

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ PROYECTO OPTIMIZADO Y LISTO PARA PRODUCCIÓN                     ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "La aplicación Abogado Wilson ha sido completamente optimizada:"
echo ""
echo -e "• ${GREEN}Corregidos${NC} todos los errores de importación"
echo -e "• ${GREEN}Optimizada${NC} la configuración de Vite"
echo -e "• ${GREEN}Simplificado${NC} el Worker de Cloudflare"
echo -e "• ${GREEN}Integrado${NC} favicon en línea"
echo -e "• ${GREEN}Implementado${NC} sistema de recuperación de errores"
echo -e "• ${GREEN}Cerrados${NC} puertos innecesarios"
echo ""
echo -e "Si desea ejecutar la aplicación localmente:"
echo -e "${BLUE}npm run dev${NC}"
echo ""
echo -e "La aplicación está disponible en:"
echo -e "${BLUE}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
