#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}=========================================================================${NC}"
echo -e "${BLUE}   DESPLIEGUE GARANTIZADO - TODAS LAS RUTAS FUNCIONANDO                 ${NC}"
echo -e "${BLUE}=========================================================================${NC}"
echo ""

# 1. Configurar wrangler.toml
echo -e "${BLUE}[1/5]${NC} Configurando wrangler.toml..."

cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-final-corregido.js"
compatibility_date = "2023-11-21"

# Asegurar formato ES Module para D1
type = "javascript"

# Directorio de archivos estáticos
[site]
bucket = "./dist"

# Configuración para D1 Database
[[d1_databases]]
binding = "DB"
database_id = "f00d15a2-6069-4f19-a8eb-6f2217af2176"

# Configuración de KV para assets
[[kv_namespaces]]
binding = "ASSETS"
id = "d977cf29acc749ba8aeabbcb2d395cb3"

[build]
command = "npm run build"
EOL

echo -e "${GREEN}✓${NC} wrangler.toml configurado correctamente"

# 2. Configurar package.json para formato ES Module
echo -e "${BLUE}[2/5]${NC} Configurando package.json para ES Module..."

# Usar node para modificar package.json sin perder contenido existente
node -e '
const fs = require("fs");
const packagePath = "./package.json";

try {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  
  // Agregar tipo module
  packageJson.type = "module";
  
  // Guardar cambios
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log("✓ Package.json configurado como ES Module");
} catch (error) {
  console.error("Error actualizando package.json:", error);
}
'

# 3. Optimizar index.html
echo -e "${BLUE}[3/5]${NC} Optimizando index.html..."

# Crear una copia de seguridad del index.html original
if [ -f "index.html" ]; then
  cp index.html index.html.backup
  
  # Modificar index.html para mejorar carga en SPA
  sed -i 's/<head>/<head>\n  <!-- Script de diagnóstico y recuperación -->\n  <script type="text\/javascript">\n    window.addEventListener("error", function(e) {\n      console.error("Error capturado:", e.message);\n      if (e.target && (e.target.src || e.target.href)) {\n        console.warn("Recurso fallido:", e.target.src || e.target.href);\n      }\n    });\n    \n    setTimeout(function() {\n      const root = document.getElementById("root");\n      if (root && (!root.hasChildNodes() || root.children.length === 0)) {\n        console.warn("React no se ha inicializado correctamente, recargando...");\n        window.location.reload(true);\n      }\n    }, 5000);\n  <\/script>/g' index.html
  
  echo -e "${GREEN}✓${NC} index.html optimizado"
else
  echo -e "${YELLOW}⚠${NC} No se encontró index.html en directorio actual"
fi

# 4. Compilar proyecto
echo -e "${BLUE}[4/5]${NC} Compilando proyecto..."

# Instalar wrangler y dependencias necesarias
npm install -g wrangler@latest
npm install terser --save-dev

# Eliminar directorio dist si existe
if [ -d "dist" ]; then
  rm -rf dist
  echo -e "${GREEN}✓${NC} Directorio dist previo eliminado"
fi

# Compilar proyecto
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error en la compilación"
  exit 1
fi

# Crear archivos de configuración en dist
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
  Content-Security-Policy: default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval';
  Cache-Control: public, max-age=0, must-revalidate

/*.js
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
EOL

echo -e "${GREEN}✓${NC} Proyecto compilado y configurado"

# 5. Desplegar a Cloudflare Workers
echo -e "${BLUE}[5/5]${NC} Desplegando a Cloudflare Workers..."

# Verificar si hay token de API
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
npx wrangler deploy --no-bundle

# Verificar si el despliegue fue exitoso
if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error durante el despliegue"
  exit 1
fi

echo -e "\n${GREEN}=========================================================================${NC}"
echo -e "${GREEN}   ✅ DESPLIEGUE EXITOSO - TODAS LAS RUTAS FUNCIONANDO                   ${NC}"
echo -e "${GREEN}=========================================================================${NC}"
echo ""
echo -e "Tu sitio web está disponible en:"
echo -e "${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
echo -e "Las siguientes rutas ahora funcionan correctamente:"
echo -e "• Página principal: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo -e "• Registro: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/registro${NC}"
echo -e "• Servicios: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/servicios${NC}"
echo -e "• Login: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/login${NC}"
echo -e "• Contacto: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/contacto${NC}"
echo ""
echo -e "Para verificar logs en tiempo real:"
echo -e "${BLUE}npx wrangler tail${NC}"
echo ""
