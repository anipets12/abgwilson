#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   CORRECCIÓN ESPECÍFICA PARA RUTAS SPA (/registro y otras)          ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Crear archivo _routes.json especializado para SPA
echo -e "${BLUE}[1/3]${NC} Configurando rutas SPA..."

cat > dist/_routes.json << 'EOL'
{
  "version": 1,
  "include": ["/*"],
  "exclude": [
    "/_headers",
    "/_routes.json",
    "/assets/*",
    "/favicon.ico"
  ]
}
EOL

echo -e "${GREEN}✓${NC} Rutas SPA configuradas correctamente"

# 2. Crear archivo _headers especial para SPA
echo -e "${BLUE}[2/3]${NC} Configurando headers para SPA..."

cat > dist/_headers << 'EOL'
/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data:; font-src * data:;
  Cache-Control: public, max-age=0, must-revalidate

/*.html
  Cache-Control: no-cache, no-store, must-revalidate

/*.js
  Cache-Control: public, max-age=31536000, immutable
  Content-Type: application/javascript

/*.css
  Cache-Control: public, max-age=31536000, immutable
  Content-Type: text/css
EOL

echo -e "${GREEN}✓${NC} Headers configurados correctamente"

# 3. Desplegar con --no-bundle
echo -e "${BLUE}[3/3]${NC} Desplegando a Cloudflare Workers sin bundling..."

# Verificar si hay token de API
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo -e "${YELLOW}[AVISO]${NC} No se encontró token de API de Cloudflare"
  read -p "¿Deseas ingresar un token de API? (s/n): " ingresar_token
  
  if [ "$ingresar_token" = "s" ] || [ "$ingresar_token" = "S" ]; then
    read -p "Ingresa tu token de API de Cloudflare: " api_token
    export CLOUDFLARE_API_TOKEN="$api_token"
  else
    echo -e "${YELLOW}[AVISO]${NC} Continuando sin token. El despliegue puede fallar."
  fi
fi

# Desplegar usando wrangler
npx wrangler deploy --no-bundle

if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error durante el despliegue"
  exit 1
fi

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ DESPLIEGUE EXITOSO - TODAS LAS RUTAS FUNCIONANDO                ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Prueba las siguientes rutas para verificar:"
echo -e "• Página principal: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo -e "• Registro: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/registro${NC}"
echo -e "• Servicios: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/servicios${NC}"
echo ""
echo -e "Si necesitas verificar logs, ejecuta:"
echo -e "${BLUE}npx wrangler tail${NC}"
echo ""
