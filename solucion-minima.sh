#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 SOLUCIÓN MÍNIMA GARANTIZADA - ABOGADO WILSON WEBSITE            ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Detener procesos y limpiar
echo -e "${YELLOW}[1/5]${NC} Limpiando el entorno..."
pkill -f "vite" || true
pkill -f "npm run dev" || true
rm -rf dist
rm -rf node_modules/.vite
echo -e "${GREEN}✓${NC} Entorno limpio"

# 2. Restaurar package.json simple
echo -e "${YELLOW}[2/5]${NC} Configurando package.json mínimo..."
cat > package.json << 'EOL'
{
  "name": "abogado-wilson-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.17",
    "@types/react-dom": "^18.0.6",
    "@vitejs/plugin-react": "^2.1.0",
    "autoprefixer": "^10.4.12",
    "postcss": "^8.4.16",
    "tailwindcss": "^3.1.8",
    "vite": "^3.1.0"
  }
}
EOL
echo -e "${GREEN}✓${NC} package.json configurado"

# 3. Crear vite.config.js simple
echo -e "${YELLOW}[3/5]${NC} Creando configuración de Vite simple..."
cat > vite.config.js << 'EOL'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true
      }
    }
  }
})
EOL
echo -e "${GREEN}✓${NC} vite.config.js creado"

# 4. Crear estructura de carpetas
echo -e "${YELLOW}[4/5]${NC} Creando estructura de carpetas..."
mkdir -p src/components
mkdir -p src/assets
mkdir -p public
echo -e "${GREEN}✓${NC} Carpetas creadas"

# 5. Crear archivos base
echo -e "${YELLOW}[5/5]${NC} Creando archivos base de React..."

# index.html
cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzNCODJGNiIvPjxwYXRoIGQ9Ik04IDhIMjRWMTJIOFY4WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNOCAxNEgyMFYxOEg4VjE0WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNOCAyMEgxNlYyNEg4VjIwWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Abg. Wilson Alexander Ipiales Guerron - Asesoría Legal Profesional</title>
    <meta name="description" content="Servicios legales profesionales en Ibarra, Ecuador. Asesoría en derecho civil, penal, laboral y más." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
      // Sistema simple de recuperación
      window.onerror = function(message, source, lineno, colno, error) {
        console.error('Error detectado:', message, 'en', source, 'línea:', lineno);
        return true;
      };
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOL

# tailwind.config.js
cat > tailwind.config.js << 'EOL'
/** @type {import('tailwindcss').Config} */
module.exports = {
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

# postcss.config.js
cat > postcss.config.js << 'EOL'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

# src/index.css
cat > src/index.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
}
EOL

echo -e "${GREEN}✓${NC} Archivos base creados"

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ PREPARACIÓN BÁSICA COMPLETADA                                   ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Ejecuta: ${BLUE}./crear-componentes.sh${NC}"
echo "para crear los componentes necesarios para la aplicación."
echo ""
echo -e "Luego: ${BLUE}npm install${NC}"
echo -e "       ${BLUE}npm run dev${NC}"
echo ""
