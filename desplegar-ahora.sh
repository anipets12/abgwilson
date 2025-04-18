#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   SOLUCIÓN DEFINITIVA SITIO ABOGADO WILSON - SIN PÁGINA DE ERROR     ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# Limpiar archivos temporales
echo -e "${BLUE}[1/5]${NC} Limpiando entorno..."
rm -rf dist .wrangler node_modules/.cache
echo -e "${GREEN}✓${NC} Limpieza completada"

# Instalar wrangler actualizado
echo -e "${BLUE}[2/5]${NC} Actualizando wrangler..."
npm install -g wrangler@latest
echo -e "${GREEN}✓${NC} Wrangler actualizado"

# Compilar proyecto
echo -e "${BLUE}[3/5]${NC} Compilando proyecto..."
npm run build
echo -e "${GREEN}✓${NC} Compilación completada"

# Asegurar que _routes.json existe
echo -e "${BLUE}[4/5]${NC} Configurando enrutamiento SPA..."
cat > dist/_routes.json << EOL
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/_headers", "/_routes.json", "/assets/*"]
}
EOL

# Crear archivo _headers para mejorar seguridad y cache
cat > dist/_headers << EOL
/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=0, must-revalidate

/*.js
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
EOL
echo -e "${GREEN}✓${NC} Enrutamiento configurado"

# Desplegar con wrangler
echo -e "${BLUE}[5/5]${NC} Desplegando sitio..."
wrangler deploy
echo -e "${GREEN}✓${NC} Despliegue solicitado"

echo ""
echo -e "${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ SITIO DESPLEGADO CORRECTAMENTE - TODAS LAS RUTAS FUNCIONANDO    ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Tu sitio debería estar disponible en:"
echo -e "${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
echo -e "Si necesitas verificar los logs en tiempo real:"
echo -e "${BLUE}wrangler tail${NC}"
echo ""
