#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 CORRECCIÓN DE DEPENDENCIAS CSS - ABOGADO WILSON WEBSITE         ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Eliminar configuraciones problemáticas
echo -e "${YELLOW}[1/5]${NC} Eliminando configuraciones problemáticas..."
rm -f postcss.config.js postcss.config.cjs tailwind.config.js tailwind.config.cjs
echo -e "${GREEN}✓${NC} Configuraciones antiguas eliminadas"

# 2. Eliminar node_modules y package-lock.json para una instalación limpia
echo -e "${YELLOW}[2/5]${NC} Eliminando node_modules para instalación limpia..."
rm -rf node_modules package-lock.json
echo -e "${GREEN}✓${NC} node_modules eliminado"

# 3. Actualizar package.json con versiones específicas
echo -e "${YELLOW}[3/5]${NC} Actualizando package.json..."

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
    "react-router-dom": "^6.4.0",
    "react-icons": "^4.12.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.3",
    "vite": "^5.0.0"
  }
}
EOL

echo -e "${GREEN}✓${NC} package.json actualizado"

# 4. Crear configuraciones nuevas compatibles
echo -e "${YELLOW}[4/5]${NC} Creando nuevas configuraciones compatibles..."

# Crear postcss.config.js en formato ESM
cat > postcss.config.js << 'EOL'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

# Crear tailwind.config.js en formato ESM
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

echo -e "${GREEN}✓${NC} Nuevas configuraciones creadas"

# 5. Instalar dependencias y compilar
echo -e "${YELLOW}[5/5]${NC} Instalando dependencias y compilando proyecto..."

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build

# Verificar si la compilación tuvo éxito
if [ $? -eq 0 ]; then
  echo -e "\n${GREEN}======================================================================${NC}"
  echo -e "${GREEN}   ✅ CORRECCIÓN COMPLETADA CON ÉXITO                                 ${NC}"
  echo -e "${GREEN}======================================================================${NC}"
  echo ""
  echo -e "El proyecto ha sido corregido y compilado exitosamente."
  echo ""
  echo -e "Para ejecutar la aplicación en desarrollo:"
  echo -e "${BLUE}npm run dev${NC}"
  echo ""
  echo -e "Para desplegar la aplicación en Cloudflare:"
  echo -e "${BLUE}npx wrangler deploy${NC}"
else
  echo -e "\n${RED}======================================================================${NC}"
  echo -e "${RED}   ❌ ERROR DURANTE LA COMPILACIÓN                                     ${NC}"
  echo -e "${RED}======================================================================${NC}"
  echo ""
  echo -e "Se encontraron errores durante la compilación. Por favor revise los mensajes anteriores."
  echo ""
  echo -e "Algunas posibles soluciones:"
  echo -e "• Intente ejecutar: ${BLUE}VITE_FORCE_SKIP_POSTCSS=true npm run build${NC}"
  echo -e "• O desactive temporalmente Tailwind y PostCSS en vite.config.js"
fi
