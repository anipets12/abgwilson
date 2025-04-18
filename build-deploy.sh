#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   CONSTRUCCIÓN Y DESPLIEGUE OPTIMIZADOS PARA GITHUB Y CLOUDFLARE     ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Limpiar ambiente
echo -e "${BLUE}[1/5]${NC} Limpiando ambiente..."
rm -rf dist .wrangler node_modules/.cache
echo -e "${GREEN}✓${NC} Ambiente limpio"

# 2. Instalar dependencias si es necesario
echo -e "${BLUE}[2/5]${NC} Verificando dependencias..."
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/vite" ]; then
  echo -e "${YELLOW}[AVISO]${NC} Instalando dependencias..."
  npm install
else
  echo -e "${GREEN}✓${NC} Dependencias instaladas"
fi

# 3. Optimizar package.json
echo -e "${BLUE}[3/5]${NC} Optimizando package.json..."
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

# 4. Construir proyecto optimizado
echo -e "${BLUE}[4/5]${NC} Construyendo proyecto optimizado..."
NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error en la compilación"
  exit 1
fi

# Crear _routes.json para SPA
echo -e "${BLUE}   Configurando rutas SPA...${NC}"
cat > dist/_routes.json << 'EOL'
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/_routes.json", "/assets/*"]
}
EOL

# Crear wrangler.toml optimizado
echo -e "${BLUE}   Configurando wrangler.toml...${NC}"
cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-simple.js"
compatibility_date = "2023-11-21"

[site]
bucket = "./dist"
EOL

# Crear worker simple
echo -e "${BLUE}   Creando worker simplificado...${NC}"
cat > src/worker-simple.js << 'EOL'
export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      
      // Assets estáticos
      if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json)$/) || 
          path.includes('/assets/')) {
        const response = await fetch(request);
        if (response.ok) {
          const headers = new Headers(response.headers);
          headers.set('Access-Control-Allow-Origin', '*');
          if (path.endsWith('.js')) headers.set('Content-Type', 'application/javascript');
          if (path.endsWith('.css')) headers.set('Content-Type', 'text/css');
          return new Response(response.body, { headers });
        }
      }
      
      // Para cualquier otra ruta, servir index.html (SPA)
      const indexResponse = await fetch(new URL('/index.html', url.origin));
      if (!indexResponse.ok) {
        throw new Error(`No se pudo obtener index.html: ${indexResponse.status}`);
      }
      
      const html = await indexResponse.text();
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      
    } catch (error) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
EOL

echo -e "${GREEN}✓${NC} Proyecto construido y optimizado correctamente"

# 5. Desplegar con Wrangler
echo -e "${BLUE}[5/5]${NC} Desplegando a Cloudflare Workers..."

# Intentar despliegue con npx wrangler deploy
npx wrangler deploy

if [ $? -ne 0 ]; then
  echo -e "${YELLOW}[AVISO]${NC} Error con nuevo formato, intentando formato antiguo..."
  npx wrangler publish
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR]${NC} Error en el despliegue."
    exit 1
  fi
fi

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ APLICACIÓN REACT DESPLEGADA CORRECTAMENTE                       ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Tu sitio web está disponible en:"
echo -e "${BLUE}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
