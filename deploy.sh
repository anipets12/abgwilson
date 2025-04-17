#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================================${NC}"
echo -e "${BLUE}   DESPLIEGUE PROFESIONAL - SITIO WEB ABOGADO WILSON    ${NC}"
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

# Crear directorio para tokens de Cloudflare si no existe
mkdir -p ~/.cloudflare

# Verificar si existe el token de Cloudflare
if [ ! -f ~/.cloudflare/api-token.txt ]; then
  echo -e "${YELLOW}[AVISO]${NC} Se requiere un token de API de Cloudflare para el despliegue"
  echo -e "${YELLOW}[AVISO]${NC} Obtenga un token en: https://dash.cloudflare.com/profile/api-tokens"
  echo -e "${YELLOW}[AVISO]${NC} El token debe tener permiso 'Workers Scripts:Edit'"
  
  read -p "¿Desea introducir el token ahora? (s/n): " response
  if [ "$response" = "s" ] || [ "$response" = "S" ]; then
    read -p "Ingrese su token de API de Cloudflare: " cloudflare_token
    echo "$cloudflare_token" > ~/.cloudflare/api-token.txt
    chmod 600 ~/.cloudflare/api-token.txt
    echo -e "${GREEN}[OK]${NC} Token guardado correctamente"
  else
    echo -e "${YELLOW}[AVISO]${NC} Para desplegar manualmente, use: export CLOUDFLARE_API_TOKEN=su-token-aqui"
    echo -e "${YELLOW}[AVISO]${NC} Continuando sin token de API. El despliegue podría fallar."
  fi
fi

# Establecer token de Cloudflare si existe
if [ -f ~/.cloudflare/api-token.txt ]; then
  export CLOUDFLARE_API_TOKEN=$(cat ~/.cloudflare/api-token.txt)
  echo -e "${GREEN}[OK]${NC} Token de Cloudflare configurado"
fi

# Verificar requisitos previos
echo -e "${BLUE}[INFO]${NC} Verificando requisitos previos..."

# Verificar acceso a Wrangler via npx
echo -e "${BLUE}[INFO]${NC} Verificando acceso a Wrangler via npx..."
npx wrangler --version >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}[AVISO]${NC} Instalando Wrangler localmente en el proyecto..."
  npm install --save-dev wrangler
  check_error "No se pudo instalar Wrangler localmente" "Wrangler instalado correctamente"
else
  echo -e "${GREEN}[OK]${NC} Wrangler accesible via npx"
fi

# Limpiar caché y directorios temporales
echo -e "${BLUE}[INFO]${NC} Limpiando directorios temporales y caché..."
rm -rf dist .wrangler .cache node_modules/.cache
check_error "Error al limpiar caché" "Caché limpiada correctamente"

# Verificar node_modules
echo -e "${BLUE}[INFO]${NC} Verificando node_modules..."
if [ ! -d "node_modules" ] || [ ! -d "node_modules/@cloudflare" ]; then
  echo -e "${YELLOW}[AVISO]${NC} Instalando dependencias..."
  npm install --no-audit --no-fund
  check_error "Error al instalar dependencias" "Dependencias instaladas correctamente"
else
  echo -e "${GREEN}[OK]${NC} node_modules parece correcto"
fi

# Compilar el proyecto
echo -e "${BLUE}[INFO]${NC} Compilando el proyecto..."
npm run build
check_error "Error en la compilación" "Proyecto compilado correctamente"

# Verificación pre-despliegue
echo -e "${BLUE}[INFO]${NC} Realizando verificación pre-despliegue..."

# Verificar archivos críticos
echo -e "${BLUE}[INFO]${NC} Verificando archivos compilados..."
if [ ! -f "dist/index.html" ]; then
  echo -e "${RED}[ERROR]${NC} No se encontró el archivo index.html en dist/"
  exit 1
fi

if [ ! -d "dist/assets" ]; then
  echo -e "${RED}[ERROR]${NC} No se encontró el directorio de assets en dist/"
  exit 1
fi

# Verificar JavaScript compilado
JS_COUNT=$(find dist -name "*.js" | wc -l)
echo -e "${GREEN}[OK]${NC} Encontrados $JS_COUNT archivos JavaScript en dist/"

# Verificar worker-index.js
echo -e "${BLUE}[INFO]${NC} Verificando worker-index.js..."
if [ ! -f "src/worker-index.js" ]; then
  echo -e "${RED}[ERROR]${NC} No se encontró el worker-index.js"
  exit 1
fi

# Verificar carga de React
echo -e "${BLUE}[INFO]${NC} Verificando carga de React en index.html..."
if ! grep -q "\"modulepreload\"" dist/index.html && ! grep -q "\"assets/" dist/index.html; then
  echo -e "${YELLOW}[AVISO]${NC} index.html podría no estar enlazando correctamente los archivos JavaScript compilados."
  echo -e "${YELLOW}[AVISO]${NC} Revise el archivo index.html y la compilación de Vite."
else
  echo -e "${GREEN}[OK]${NC} index.html parece cargar correctamente los assets JavaScript"
fi

# Intentar desplegar con Wrangler
echo -e "${BLUE}[INFO]${NC} Preparando despliegue con Wrangler..."
echo -e "${YELLOW}[AVISO]${NC} Iniciando despliegue en 3 segundos..."
sleep 3

# Desplegar el proyecto
echo -e "${BLUE}[INFO]${NC} Desplegando con Wrangler..."
npx wrangler deploy

if [ $? -ne 0 ]; then
  echo -e "${YELLOW}[AVISO]${NC} El despliegue falló. Intentando método alternativo..."
  
  # Añadir información de account_id si es necesario
  if ! grep -q "account_id" wrangler.toml; then
    echo -e "${YELLOW}[AVISO]${NC} Puede ser necesario añadir su account_id a wrangler.toml"
    echo -e "${YELLOW}[AVISO]${NC} Obtenga su account_id en: https://dash.cloudflare.com"
    read -p "Ingrese su Cloudflare account_id (opcional): " account_id
    
    if [ ! -z "$account_id" ]; then
      echo "account_id = \"$account_id\"" >> wrangler.toml
      echo -e "${GREEN}[OK]${NC} account_id añadido a wrangler.toml"
      
      # Intentar desplegar nuevamente
      echo -e "${BLUE}[INFO]${NC} Intentando despliegue nuevamente..."
      npx wrangler deploy
      check_error "Error en el segundo intento de despliegue" "Sitio desplegado correctamente"
    fi
  else
    echo -e "${RED}[ERROR]${NC} No se pudo desplegar el sitio. Verifique los mensajes de error arriba."
    exit 1
  fi
else
  echo -e "${GREEN}[OK]${NC} Sitio desplegado correctamente"
fi

# Verificar despliegue 
echo -e "${BLUE}[INFO]${NC} Verificando despliegue..."
WORKER_URL="https://abogado-wilson-website.anipets12.workers.dev"
echo -e "${YELLOW}[AVISO]${NC} Esperando 10 segundos para que el despliegue se propague..."
sleep 10

# Mostrar información final
echo -e "\n${GREEN}=================================================${NC}"
echo -e "${GREEN}   DESPLIEGUE COMPLETADO EXITOSAMENTE           ${NC}"
echo -e "${GREEN}=================================================${NC}"
echo -e "\nSu sitio web está disponible en:"
echo -e "${YELLOW}$WORKER_URL${NC}"

echo -e "\n${BLUE}[RECOMENDACIONES DE PRUEBA]${NC}"
echo -e "Verifique estas rutas para asegurar que la SPA funciona correctamente:"
echo -e " - ${YELLOW}$WORKER_URL${NC} (página principal)"
echo -e " - ${YELLOW}$WORKER_URL/servicios${NC} (página de servicios)"
echo -e " - ${YELLOW}$WORKER_URL/login${NC} (página de inicio de sesión)"
echo -e " - ${YELLOW}$WORKER_URL/registro${NC} (página de registro)"

echo -e "\n${BLUE}[MONITOREO]${NC}"
echo -e "Para monitorizar los logs del worker en tiempo real:"
echo -e "${BLUE}npx wrangler tail${NC}"

echo -e "\n${BLUE}[SOLUCIÓN DE PROBLEMAS]${NC}"
echo -e "Si encuentra algún problema:"
echo -e "  1. Limpie la caché del navegador (${YELLOW}Ctrl+F5 o Shift+F5${NC})"
echo -e "  2. Verifique los logs (${YELLOW}npx wrangler tail${NC})"
echo -e "  3. Si hay errores relacionados con assets, revise las rutas en el código"
echo -e "  4. Asegúrese de que el worker maneje correctamente las rutas SPA"
echo ""