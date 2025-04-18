#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   SOLUCIÓN DEFINITIVA ERROR 100329 - CLOUDFLARE D1 ES MODULE         ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Actualizar wrangler.toml con configuración optimizada para ES Module
echo -e "${BLUE}[1/4]${NC} Configurando wrangler.toml para ES Module..."

cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-es-module.js"
compatibility_date = "2023-11-21"

# Asegura que se use el formato ES Module
type = "javascript"
# No bundling para mejor diagnóstico
no_bundle = true

[site]
bucket = "./dist"

# Configuración de D1 (importante para resolver error 100329)
[[d1_databases]]
binding = "DB"
database_id = "f00d15a2-6069-4f19-a8eb-6f2217af2176"

[build]
command = "npm run build"
EOL

echo -e "${GREEN}✓${NC} wrangler.toml configurado correctamente"

# 2. Actualizando package.json para formato ES Module
echo -e "${BLUE}[2/4]${NC} Actualizando package.json para ES Module..."

# Usar node para modificar package.json 
node -e '
const fs = require("fs");
const path = require("path");
const packagePath = path.join(process.cwd(), "package.json");

try {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  
  // Agregar tipo module
  packageJson.type = "module";
  
  // Guardar cambios
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log("Package.json actualizado para ES Module");
} catch (error) {
  console.error("Error actualizando package.json:", error);
  process.exit(1);
}
'

echo -e "${GREEN}✓${NC} package.json configurado como ES Module"

# 3. Compilar y preparar para despliegue
echo -e "${BLUE}[3/4]${NC} Compilando proyecto..."

# Instalar wrangler actualizado
npm install -g wrangler@latest

# Compilar proyecto
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error en la compilación. Abortando."
  exit 1
fi

# Crear archivos auxiliares en dist para optimizar routing
cat > dist/_routes.json << 'EOL'
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/_headers", "/_routes.json", "/assets/*"]
}
EOL

cat > dist/_headers << 'EOL'
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

echo -e "${GREEN}✓${NC} Proyecto compilado y configurado"

# 4. Desplegar con wrangler
echo -e "${BLUE}[4/4]${NC} Desplegando en Cloudflare Workers..."

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
npx wrangler deploy

if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error durante el despliegue."
  exit 1
fi

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ DESPLIEGUE EXITOSO - SITIO WEB DISPONIBLE                       ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Tu sitio web está ahora disponible en:"
echo -e "${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
echo -e "Todas las rutas deberían funcionar correctamente:"
echo -e "• Página principal: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo -e "• Servicios: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/servicios${NC}"
echo -e "• Login: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/login${NC}"
echo -e "• Contacto: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/contacto${NC}"
echo ""
echo -e "Para ver logs en tiempo real:"
echo -e "${BLUE}npx wrangler tail${NC}"
echo ""
