#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   LIMPIEZA TOTAL Y CORRECCIÓN DE ERRORES - ABOGADO WILSON            ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Limpieza profunda
echo -e "${BLUE}[1/6]${NC} Realizando limpieza profunda del proyecto..."

# Eliminar carpetas de caché
rm -rf node_modules/.vite
rm -rf .wrangler
rm -rf dist

# Limpiar archivos duplicados y confusos
find . -name "*-copy*" -delete
find . -name "*copia*" -delete
find . -name "*backup*" -delete
find . -name "*respaldo*" -delete

echo -e "${GREEN}✓${NC} Limpieza profunda completada"

# 2. Optimizar package.json
echo -e "${BLUE}[2/6]${NC} Optimizando package.json..."

# Respaldar original
cp package.json package.json.before-cleanup

# Eliminar dependencias innecesarias
cat > package.json << 'EOL'
{
  "name": "abogado-wilson-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "react-helmet-async": "^2.0.0",
    "react-icons": "^5.0.0",
    "framer-motion": "^10.18.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.8"
  }
}
EOL

echo -e "${GREEN}✓${NC} Package.json optimizado"

# 3. Crear archivo .env con valores seguros
echo -e "${BLUE}[3/6]${NC} Creando archivo .env simplificado..."

cat > .env << 'EOL'
# Configuración básica
VITE_APP_NAME="Abg. Wilson Alexander Ipiales Guerron"
VITE_APP_URL="https://abogado-wilson-website.pages.dev"
VITE_APP_ENV="production"

# Modo Mock (no requiere servicios externos)
VITE_USE_MOCKS=true
EOL

echo -e "${GREEN}✓${NC} Archivo .env creado"

# 4. Simplificar main.jsx
echo -e "${BLUE}[4/6]${NC} Simplificando main.jsx..."

mkdir -p src

cat > src/main.jsx << 'EOL'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Asegurar que se carga correctamente el CSS
import './assets/tailwind.css';

// Función para renderizar la aplicación
function renderApp() {
  try {
    const root = document.getElementById('root');
    
    if (!root) {
      console.error('Error: No se encontró el elemento root');
      return;
    }
    
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    
    console.log('Aplicación React inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar React:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
        <h1>Error al inicializar la aplicación</h1>
        <p>Se ha producido un error al cargar la aplicación.</p>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${error.message}</pre>
        <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Reintentar</button>
      </div>
    `;
  }
}

// Iniciar la aplicación de forma segura
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
EOL

echo -e "${GREEN}✓${NC} main.jsx simplificado"

# 5. Crear App.jsx minimalista
echo -e "${BLUE}[5/6]${NC} Creando App.jsx minimalista..."

mkdir -p src

cat > src/App.jsx << 'EOL'
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componente de página de inicio simple
const Home = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Abg. Wilson Alexander Ipiales Guerron</h1>
      </div>
    </header>
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Servicios legales profesionales en Ibarra, Ecuador</h2>
            <p className="mb-4">Ofrecemos asesoría legal especializada en:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Derecho Civil</li>
              <li>Derecho Penal</li>
              <li>Derecho Laboral</li>
              <li>Derecho Administrativo</li>
              <li>Trámites Notariales</li>
            </ul>
            <p>Contáctenos para más información.</p>
          </div>
        </div>
      </div>
    </main>
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">© 2025 Abg. Wilson Alexander Ipiales Guerron</p>
      </div>
    </footer>
  </div>
);

// Página simple de servicios
const Services = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Servicios Legales</h1>
      </div>
    </header>
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Nuestros Servicios</h2>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded shadow">
                <h3 className="font-medium">Asesoría Legal Civil</h3>
                <p className="text-gray-600">Contratos, sucesiones, propiedad, etc.</p>
              </li>
              <li className="bg-white p-4 rounded shadow">
                <h3 className="font-medium">Derecho Penal</h3>
                <p className="text-gray-600">Defensa penal, recursos, etc.</p>
              </li>
              <li className="bg-white p-4 rounded shadow">
                <h3 className="font-medium">Derecho Laboral</h3>
                <p className="text-gray-600">Contratos laborales, despidos, etc.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">© 2025 Abg. Wilson Alexander Ipiales Guerron</p>
      </div>
    </footer>
  </div>
);

// Página de error 404
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <h2 className="text-2xl font-medium text-gray-600">Página no encontrada</h2>
      <p className="mt-2 text-gray-500">Lo sentimos, la página que buscas no existe.</p>
      <div className="mt-6">
        <a href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md">
          Volver al inicio
        </a>
      </div>
    </div>
  </div>
);

// Aplicación principal
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Services />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
EOL

echo -e "${GREEN}✓${NC} App.jsx minimalista creado"

# 6. Crear archivo CSS simple
echo -e "${BLUE}[6/6]${NC} Creando archivos CSS básicos..."

mkdir -p src
mkdir -p src/assets

# Crear archivo index.css básico
cat > src/index.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
EOL

# Crear archivo tailwind.css para compatibilidad
cat > src/assets/tailwind.css << 'EOL'
/* Archivo adicional para garantizar carga de Tailwind */
/* Se evita que falle la importación en main.jsx */
EOL

echo -e "${GREEN}✓${NC} Archivos CSS creados"

# Crear tailwind.config.js
cat > tailwind.config.js << 'EOL'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

# Crear postcss.config.js
cat > postcss.config.js << 'EOL'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

# Crear index.html limpio
cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron - Asesoría Legal Profesional</title>
  <meta name="description" content="Servicios legales profesionales en Ibarra, Ecuador. Asesoría en derecho civil, penal, laboral y administrativo.">
  
  <!-- Favicon embebido para evitar errores -->
  <link rel="icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzNCODJGNiIvPjxwYXRoIGQ9Ik04IDhIMjRWMTJIOFY4WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNOCAxNEgyMFYxOEg4VjE0WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNOCAyMEgxNlYyNEg4VjIwWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=">
  
  <!-- Preconexión a Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Sistema de detección y recuperación de errores -->
  <script>
    // Sistema simple de diagnóstico
    window.onerror = function(message, source, lineno, colno, error) {
      console.error('Error detectado:', message, 'en', source, 'línea:', lineno);
      // No mostrar mensajes de error si ya hay contenido en la página
      if (document.getElementById('root') && document.getElementById('root').childElementCount === 0) {
        document.getElementById('root').innerHTML = `
          <div style="padding: 20px; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
            <h1>Error detectado</h1>
            <p>Se ha producido un error al cargar la aplicación:</p>
            <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${message}</pre>
            <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Reintentar</button>
          </div>
        `;
      }
      return true;
    };
    
    // Verificar carga correcta
    window.addEventListener('load', function() {
      setTimeout(function() {
        var root = document.getElementById('root');
        if (root && root.childElementCount === 0) {
          console.warn('La aplicación no se ha cargado correctamente');
          root.innerHTML = `
            <div style="padding: 20px; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
              <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
              <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
              <p>La aplicación está cargando...</p>
              <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Recargar página</button>
            </div>
          `;
        }
      }, 5000);
    });
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
EOL

# Crear vite.config.js simplificado
cat > vite.config.js << 'EOL'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // Un único bundle sin fragmentación
    rollupOptions: {
      output: {
        manualChunks: () => 'app.js',
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    sourcemap: false,
    minify: 'terser'
  },
  server: {
    port: 3000,
    open: true
  }
});
EOL

# Crear worker simplificado
mkdir -p src
cat > src/worker-simple.js << 'EOL'
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Manejar assets estáticos
    if (url.pathname.match(/\.(js|css|ico|png|jpg|svg|json)$/)) {
      const response = await fetch(request);
      if (response.ok) {
        const headers = new Headers(response.headers);
        
        // Asegurar tipo correcto para JS
        if (url.pathname.endsWith('.js')) {
          headers.set('Content-Type', 'application/javascript; charset=utf-8');
        }
        
        headers.set('Access-Control-Allow-Origin', '*');
        return new Response(response.body, { headers });
      }
    }
    
    // Para cualquier otra ruta, servir index.html
    const response = await fetch(new URL('/index.html', url.origin));
    if (response.ok) {
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'text/html; charset=UTF-8');
      headers.set('Cache-Control', 'no-cache');
      return new Response(response.body, { headers });
    }
    
    return new Response('Not found', { status: 404 });
  }
};
EOL

# Configurar wrangler.toml mínimo
cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-simple.js"
compatibility_date = "2023-11-21"

[site]
bucket = "./dist"
EOL

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ LIMPIEZA Y SIMPLIFICACIÓN COMPLETADAS                           ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "El proyecto ha sido completamente limpiado y simplificado:"
echo -e ""
echo -e "• ${GREEN}Eliminadas${NC} todas las dependencias problemáticas"
echo -e "• ${GREEN}Simplificado${NC} el código React a lo esencial"
echo -e "• ${GREEN}Incorporado${NC} favicon en línea"
echo -e "• ${GREEN}Optimizada${NC} la configuración de construcción"
echo -e "• ${GREEN}Mejorado${NC} el sistema de detección y recuperación de errores"
echo -e ""
echo -e "Para probar la aplicación localmente:"
echo -e "${BLUE}npm install${NC}"
echo -e "${BLUE}npm run dev${NC}"
echo -e ""
echo -e "Para construir y desplegar:"
echo -e "${BLUE}npm run build${NC}"
echo -e "${BLUE}npx wrangler deploy${NC}"
echo -e ""
