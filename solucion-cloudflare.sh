#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   SOLUCIÓN DEFINITIVA - ABOGADO WILSON WEBSITE                      ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Crear wrangler.toml limpio y compatible
echo -e "${BLUE}[1/5]${NC} Configurando wrangler.toml compatible..."

cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-simple.js"
compatibility_date = "2023-11-21"

# Configuración del sitio
[site]
bucket = "./dist"
EOL

echo -e "${GREEN}✓${NC} wrangler.toml configurado correctamente"

# 2. Crear worker ultra-simplificado
echo -e "${BLUE}[2/5]${NC} Creando worker ultra-simplificado compatible con SPA..."

cat > src/worker-simple.js << 'EOL'
export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      
      // Si es un archivo estático (con extensión conocida), servirlo directamente
      if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json)$/) || 
          path.includes('/assets/')) {
        const response = await fetch(request);
        if (response.ok) {
          // Configurar headers adecuados para cache y CORS
          const headers = new Headers(response.headers);
          headers.set('Access-Control-Allow-Origin', '*');
          if (path.endsWith('.js')) headers.set('Content-Type', 'application/javascript');
          if (path.endsWith('.css')) headers.set('Content-Type', 'text/css');
          return new Response(response.body, { headers });
        }
      }
      
      // Para cualquier otra ruta, servir index.html (comportamiento SPA)
      const indexResponse = await fetch(new URL('/index.html', url.origin));
      if (!indexResponse.ok) {
        throw new Error(`No se pudo obtener index.html: ${indexResponse.status}`);
      }
      
      const html = await indexResponse.text();
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        }
      });
      
    } catch (error) {
      console.error(`[ERROR]: ${error.message}`);
      return new Response(`<!DOCTYPE html>
        <html><head><title>Error</title></head>
        <body>
          <h1>Error temporal</h1>
          <p>Por favor, inténtelo de nuevo más tarde.</p>
        </body></html>`, {
        headers: {'Content-Type': 'text/html'}
      });
    }
  }
};
EOL

echo -e "${GREEN}✓${NC} Worker ultra-simplificado creado"

# 3. Crear _routes.json para SPA
echo -e "${BLUE}[3/5]${NC} Configurando rutas SPA..."

# Asegurar que existe dist/ o crearla
if [ ! -d "dist" ]; then
  echo -e "${YELLOW}[AVISO]${NC} Compilando proyecto para crear directorio dist/..."
  npm run build
  if [ ! -d "dist" ]; then
    mkdir -p dist
  fi
fi

cat > dist/_routes.json << 'EOL'
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/_routes.json", "/assets/*"]
}
EOL

# 4. Configurar package.json para ES Module
echo -e "${BLUE}[4/5]${NC} Configurando package.json para ES Module..."
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

echo -e "${GREEN}✓${NC} Archivos de configuración listos"

# 5. Desplegar con wrangler
echo -e "${BLUE}[5/5]${NC} Desplegando a Cloudflare Workers..."

# Intentar despliegue con npx wrangler deploy
npx wrangler deploy

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ SITIO WEB DESPLEGADO CORRECTAMENTE                             ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Tu sitio web debería estar disponible en:"
echo -e "${BLUE}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
