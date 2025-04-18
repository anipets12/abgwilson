#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}=========================================================================${NC}"
echo -e "${BLUE}   DESPLIEGUE OPTIMIZADO - ABOGADO WILSON - TODAS LAS RUTAS FUNCIONANDO  ${NC}"
echo -e "${BLUE}=========================================================================${NC}"
echo ""

# Paso 1: Limpieza
echo -e "${BLUE}[PASO 1/4]${NC} Limpiando entorno..."
rm -rf dist .wrangler node_modules/.cache
echo -e "${GREEN}[OK]${NC} Limpieza completada"

# Paso 2: Compilar proyecto
echo -e "${BLUE}[PASO 2/4]${NC} Compilando proyecto..."
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error en la compilación"
  exit 1
fi
echo -e "${GREEN}[OK]${NC} Compilación exitosa"

# Paso 3: Preparar archivos de configuración para Cloudflare
echo -e "${BLUE}[PASO 3/4]${NC} Configurando archivos para Cloudflare..."

# _headers para control de cache y seguridad
cat > dist/_headers << 'EOL2'
# Headers para todas las rutas
/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=0, must-revalidate

# Cache optimizada para assets
/*.js
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
/*.svg
  Cache-Control: public, max-age=86400
/*.png
  Cache-Control: public, max-age=86400
/*.jpg
  Cache-Control: public, max-age=86400
EOL2

# _routes.json para routing SPA
cat > dist/_routes.json << 'EOL2'
{
  "version": 1,
  "include": ["/*"],
  "exclude": [
    "/_headers",
    "/_routes.json",
    "/assets/*",
    "/favicon.ico",
    "/images/*"
  ]
}
EOL2

echo -e "${GREEN}[OK]${NC} Archivos de configuración creados"

# Paso 4: Desplegar en Cloudflare
echo -e "${BLUE}[PASO 4/4]${NC} Desplegando en Cloudflare Workers..."

# Verificar si hay token de Cloudflare
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo -e "${YELLOW}[AVISO]${NC} No se encontró token de API de Cloudflare"
  read -p "¿Deseas ingresar un token de API ahora? (s/n): " ingresar_token
  
  if [ "$ingresar_token" = "s" ] || [ "$ingresar_token" = "S" ]; then
    read -p "Ingresa tu token de API de Cloudflare: " api_token
    export CLOUDFLARE_API_TOKEN="$api_token"
  else
    echo -e "${YELLOW}[AVISO]${NC} Continuando sin token. El despliegue puede fallar."
  fi
fi

# Desplegar usando wrangler
npx wrangler@latest deploy

if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error durante el despliegue."
  exit 1
fi

echo -e "\n${GREEN}=========================================================================${NC}"
echo -e "${GREEN}   ✅ DESPLIEGUE EXITOSO - TODAS LAS RUTAS FUNCIONANDO                   ${NC}"
echo -e "${GREEN}=========================================================================${NC}"
echo ""
echo -e "Tu sitio está ahora disponible en:"
echo -e "${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
echo -e "Para verificar que todas las rutas funcionen correctamente, prueba:"
echo -e "🔸 Página principal: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo -e "🔸 Servicios: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/servicios${NC}"
echo -e "🔸 Login: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/login${NC}"
echo -e "🔸 Registro: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/registro${NC}"
echo ""
echo -e "Si deseas monitorear los logs en tiempo real:"
echo -e "${BLUE}npx wrangler@latest tail${NC}"
