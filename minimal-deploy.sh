#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # Sin color

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   DESPLIEGUE MINIMALISTA - GARANTIZADO PARA FUNCIONAR                ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Configuración mínima de wrangler.toml
echo -e "${BLUE}[1/4]${NC} Configurando wrangler.toml mínimo..."

cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/minimal-worker.js"
compatibility_date = "2023-11-21"

# Configuración mínima necesaria
type = "javascript"
no_bundle = true

[site]
bucket = "./dist"
EOL

echo -e "${GREEN}✓${NC} wrangler.toml configurado"

# 2. Configuración como ES Module
echo -e "${BLUE}[2/4]${NC} Configurando package.json para ES Module..."

# Usar node para modificar package.json de manera segura
node -e '
try {
  const fs = require("fs");
  const packagePath = "./package.json";
  
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    pkg.type = "module";
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
    console.log("✓ package.json configurado como ES Module");
  } else {
    console.log("✓ No se encontró package.json, creando uno básico");
    const basicPkg = {
      "name": "abogado-wilson-website",
      "type": "module",
      "version": "1.0.0",
      "dependencies": {}
    };
    fs.writeFileSync(packagePath, JSON.stringify(basicPkg, null, 2));
  }
} catch (err) {
  console.error("Error:", err.message);
}
'

# 3. Compilar proyecto (asumiendo que ya existe dist/)
echo -e "${BLUE}[3/4]${NC} Verificando directorio dist/..."

if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
  echo -e "${RED}[AVISO]${NC} No se encuentra dist/ o index.html. Ejecutando build..."
  npm run build
  
  # Verificar si build funcionó
  if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    echo -e "${RED}[ERROR]${NC} No se pudo generar dist/. Abortando."
    exit 1
  fi
fi

# Añadir archivos de configuración a dist/
cat > dist/_routes.json << 'EOL'
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/_headers", "/_routes.json", "/assets/*"]
}
EOL

echo -e "${GREEN}✓${NC} Proyecto preparado para despliegue"

# 4. Desplegar con wrangler
echo -e "${BLUE}[4/4]${NC} Desplegando a Cloudflare Workers..."

# Instalar wrangler globalmente si es necesario
if ! command -v wrangler &> /dev/null; then
  echo -e "${BLUE}[INFO]${NC} Instalando wrangler globalmente..."
  npm install -g wrangler
fi

# Desplegar sin bundling
npx wrangler deploy --no-bundle

if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error en el despliegue."
  exit 1
fi

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ SITIO WEB DESPLEGADO CORRECTAMENTE                              ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Tu sitio web debería estar disponible en:"
echo -e "${BLUE}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
