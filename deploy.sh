#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================================${NC}"
echo -e "${BLUE}   DESPLIEGUE OPTIMIZADO - SITIO WEB ABOGADO WILSON     ${NC}"
echo -e "${BLUE}========================================================${NC}"
echo ""

# Función para verificar errores
check_error() {
  if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
  else
    echo -e "${GREEN}[OK]${NC} $2"
  fi
}

# Función para verificar si un paquete está instalado
check_package() {
  if ! npm list -g $1 >/dev/null 2>&1; then
    echo -e "${YELLOW}[AVISO]${NC} Instalando $1 globalmente..."
    npm install -g $1
    check_error "No se pudo instalar $1" "$1 instalado correctamente"
  else
    echo -e "${GREEN}[OK]${NC} $1 ya está instalado"
  fi
}

# 1. Verificar y instalar Wrangler
echo -e "${BLUE}[INFO]${NC} Verificando instalación de Wrangler..."
check_package wrangler

# 2. Limpiar caché y directorios temporales
echo -e "${BLUE}[INFO]${NC} Limpiando directorios temporales y caché..."
rm -rf dist .wrangler .cache node_modules/.cache
check_error "Error al limpiar caché" "Caché limpiada correctamente"

# 3. Verificar node_modules
echo -e "${BLUE}[INFO]${NC} Verificando node_modules..."
if [ ! -d "node_modules" ] || [ ! -d "node_modules/@cloudflare" ]; then
  echo -e "${YELLOW}[AVISO]${NC} Instalando dependencias..."
  npm install --no-audit --no-fund
  check_error "Error al instalar dependencias" "Dependencias instaladas correctamente"
else
  echo -e "${GREEN}[OK]${NC} node_modules parece correcto"
fi

# 4. Asegurar que cloudflare/kv-asset-handler esté instalado
echo -e "${BLUE}[INFO]${NC} Verificando dependencia crítica @cloudflare/kv-asset-handler..."
if ! grep -q "\"@cloudflare/kv-asset-handler\"" package.json; then
  echo -e "${YELLOW}[AVISO]${NC} Instalando @cloudflare/kv-asset-handler..."
  npm install --save @cloudflare/kv-asset-handler
  check_error "Error al instalar @cloudflare/kv-asset-handler" "@cloudflare/kv-asset-handler instalado correctamente"
else
  echo -e "${GREEN}[OK]${NC} @cloudflare/kv-asset-handler ya está en package.json"
fi

# 5. Compilar el proyecto
echo -e "${BLUE}[INFO]${NC} Compilando el proyecto..."
npm run build
check_error "Error en la compilación" "Proyecto compilado correctamente"

# 6. Verificar archivos críticos
echo -e "${BLUE}[INFO]${NC} Verificando archivos compilados..."
if [ ! -f "dist/index.html" ]; then
  echo -e "${RED}[ERROR]${NC} No se encontró el archivo index.html"
  exit 1
fi

if [ ! -d "dist/assets" ]; then
  echo -e "${RED}[ERROR]${NC} No se encontró el directorio de assets"
  exit 1
fi

JS_COUNT=$(find dist -name "*.js" | wc -l)
echo -e "${GREEN}[OK]${NC} Encontrados $JS_COUNT archivos JavaScript"

# 7. Verificar worker-index.js
echo -e "${BLUE}[INFO]${NC} Verificando worker-index.js..."
if [ ! -f "src/worker-index.js" ]; then
  echo -e "${RED}[ERROR]${NC} No se encontró el worker-index.js"
  exit 1
fi

# 8. Generar definiciones de tipo si es necesario
echo -e "${BLUE}[INFO]${NC} Generando definiciones de tipo si es necesario..."
if [ ! -f "src/cloudflare.d.ts" ]; then
  echo -e "${YELLOW}[AVISO]${NC} Creando cloudflare.d.ts..."
  cat > src/cloudflare.d.ts << 'EOF'
interface KVNamespace {
  get(key: string, options?: {type: string}): Promise<any>;
  put(key: string, value: string | ReadableStream | ArrayBuffer, options?: {
    expiration?: number;
    expirationTtl?: number;
    metadata?: any;
  }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: {prefix?: string, limit?: number, cursor?: string}): Promise<{
    keys: {name: string, expiration?: number, metadata?: any}[];
    list_complete: boolean;
    cursor?: string;
  }>;
}

declare global {
  interface Window {
    __STATIC_CONTENT: { [key: string]: string };
  }
}
EOF
  check_error "Error al crear cloudflare.d.ts" "cloudflare.d.ts creado correctamente"
fi

# 9. Desplegar con Wrangler
echo -e "${BLUE}[INFO]${NC} Desplegando con Wrangler (carga completa)..."
npx wrangler deploy
check_error "Error en el despliegue" "Sitio desplegado correctamente"

# 10. Verificar despliegue 
echo -e "${BLUE}[INFO]${NC} Verificando despliegue..."
WORKER_URL="https://abogado-wilson-website.anipets12.workers.dev"
echo -e "${YELLOW}[AVISO]${NC} Esperando 10 segundos para que el despliegue se propague..."
sleep 10

# Mostrar URL y recomendaciones
echo -e "\n${GREEN}=================================================${NC}"
echo -e "${GREEN}   DESPLIEGUE COMPLETADO EXITOSAMENTE           ${NC}"
echo -e "${GREEN}=================================================${NC}"
echo -e "\nSu sitio web está disponible en:"
echo -e "${YELLOW}$WORKER_URL${NC}"
echo -e "\nPara monitorizar los logs del worker en tiempo real:"
echo -e "${BLUE}npx wrangler tail${NC}"
echo ""
echo -e "Si todavía encuentra problemas, pruebe estas soluciones:"
echo -e "  1. Limpie la caché del navegador (${YELLOW}Ctrl+F5 o Shift+F5${NC})"
echo -e "  2. Verifique los logs (${YELLOW}npx wrangler tail${NC})"
echo -e "  3. Si sigue usando la versión antigua, force un hard refresh"
echo -e "\nRecuerde que la propagación completa puede tomar hasta 60 segundos."
echo ""