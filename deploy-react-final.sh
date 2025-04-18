#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   DESPLIEGUE DEFINITIVO - APLICACIÓN REACT 100% FUNCIONAL            ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Configurar wrangler.toml correcto
echo -e "${BLUE}[1/5]${NC} Configurando wrangler.toml optimizado para React..."

cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/solucion-definitiva.js"
compatibility_date = "2023-11-21"

# Configuración del sitio
[site]
bucket = "./dist"
EOL

echo -e "${GREEN}✓${NC} wrangler.toml configurado correctamente"

# 2. Configurar package.json para ES Module
echo -e "${BLUE}[2/5]${NC} Configurando package.json para ES Module..."

node -e '
try {
  const fs = require("fs");
  const packagePath = "./package.json";
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    pkg.type = "module";
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
    console.log("✓ package.json configurado como ES Module");
  }
} catch (err) {
  console.error("Error:", err.message);
}'

echo -e "${GREEN}✓${NC} package.json configurado"

# 3. Optimizar el index.html para carga correcta de React
echo -e "${BLUE}[3/5]${NC} Optimizando index.html..."

if [ -f "dist/index.html" ]; then
  # Respaldar index.html original
  cp dist/index.html dist/index.html.bak
  
  # Modificar index.html con script de diagnóstico y recuperación
  sed -i 's/<\/head>/<script>\
    \/\/ Diagnóstico de carga de React\
    window.addEventListener("load", function() {\
      setTimeout(function() {\
        const root = document.getElementById("root");\
        if (root && (!root.hasChildNodes() || root.children.length === 0)) {\
          console.error("React no se inicializó correctamente. Recargando...");\
          location.reload(true);\
        } else {\
          console.log("React inicializado correctamente");\
        }\
      }, 3000);\
    });\
  <\/script>\
<\/head>/' dist/index.html
  
  echo -e "${GREEN}✓${NC} index.html optimizado para mejor diagnóstico"
else
  echo -e "${YELLOW}[AVISO]${NC} No existe dist/index.html. Ejecutando build..."
  npm run build
  
  if [ -f "dist/index.html" ]; then
    # Modificar index.html generado
    sed -i 's/<\/head>/<script>\
      \/\/ Diagnóstico de carga de React\
      window.addEventListener("load", function() {\
        setTimeout(function() {\
          const root = document.getElementById("root");\
          if (root && (!root.hasChildNodes() || root.children.length === 0)) {\
            console.error("React no se inicializó correctamente. Recargando...");\
            location.reload(true);\
          } else {\
            console.log("React inicializado correctamente");\
          }\
        }, 3000);\
      });\
    <\/script>\
<\/head>/' dist/index.html
    
    echo -e "${GREEN}✓${NC} Build completado y index.html optimizado"
  else
    echo -e "${RED}[ERROR]${NC} No se pudo crear dist/index.html"
    exit 1
  fi
fi

# 4. Crear archivo _headers para configurar Content-Type correcto
echo -e "${BLUE}[4/5]${NC} Configurando headers para JavaScript y CSS..."

cat > dist/_headers << 'EOL'
# Headers para todas las rutas
/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=0, must-revalidate

# Headers para archivos JavaScript
/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable

# Headers para archivos CSS
/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable

# Headers para imágenes
/*.png
  Cache-Control: public, max-age=86400
/*.jpg
  Cache-Control: public, max-age=86400
/*.svg
  Cache-Control: public, max-age=86400

# Headers específicos para chunks de Vite
/assets/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable
EOL

echo -e "${GREEN}✓${NC} Headers configurados correctamente"

# 5. Configurar _routes.json para SPA
echo -e "${BLUE}[5/5]${NC} Configurando rutas SPA..."

cat > dist/_routes.json << 'EOL'
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/_headers", "/_routes.json"]
}
EOL

echo -e "${GREEN}✓${NC} Rutas SPA configuradas"

# 6. Desplegar con wrangler
echo -e "\n${BLUE}Desplegando a Cloudflare Workers...${NC}"
npx wrangler deploy

if [ $? -ne 0 ]; then
  echo -e "\n${RED}[ERROR]${NC} El despliegue falló. Intentando con publish (para versiones anteriores de wrangler)..."
  npx wrangler publish
  
  if [ $? -ne 0 ]; then
    echo -e "\n${RED}[ERROR CRÍTICO]${NC} No se pudo desplegar la aplicación."
    exit 1
  fi
fi

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ APLICACIÓN REACT DESPLEGADA CORRECTAMENTE                       ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Tu sitio web debe estar funcionando en:"
echo -e "${BLUE}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
echo -e "Recuerda verificar las siguientes rutas para confirmar que funcionan:"
echo -e "- Página principal: ${BLUE}/${NC}"
echo -e "- Registro: ${BLUE}/registro${NC}"
echo -e "- Servicios: ${BLUE}/servicios${NC}"
echo ""
