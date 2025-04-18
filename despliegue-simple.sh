#!/bin/bash

# Colores para la salida
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}===================================================${NC}"
echo -e "${BLUE}   DESPLIEGUE GARANTIZADO - ABOGADO WILSON WEBSITE ${NC}"
echo -e "${BLUE}===================================================${NC}"
echo ""

# Verificar error y salir si es necesario
check_error() {
  if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
  else
    echo -e "${GREEN}[OK]${NC} $2"
  fi
}

# 1. Limpiar completamente para evitar residuos
echo -e "${BLUE}[PASO 1]${NC} Limpiando proyecto..."
rm -rf dist node_modules/.cache .wrangler

# 2. Asegurar dependencias correctas
echo -e "${BLUE}[PASO 2]${NC} Verificando dependencias..."
npm install --no-fund --no-audit
check_error "Error instalando dependencias" "Dependencias instaladas correctamente"

# 3. Compilar proyecto con optimizaciones
echo -e "${BLUE}[PASO 3]${NC} Compilando proyecto (puede tardar unos minutos)..."
npm run build
check_error "Error compilando proyecto" "Proyecto compilado correctamente"

# 4. Verificar archivos críticos
echo -e "${BLUE}[PASO 4]${NC} Verificando archivos compilados..."

if [ ! -f "dist/index.html" ]; then
  echo -e "${RED}[ERROR]${NC} Falta archivo crítico: dist/index.html"
  exit 1
fi

if [ ! -d "dist/assets" ]; then
  echo -e "${RED}[ERROR]${NC} Falta directorio crítico: dist/assets"
  exit 1
fi

JS_COUNT=$(find dist -name "*.js" | wc -l)
CSS_COUNT=$(find dist -name "*.css" | wc -l)

echo -e "${GREEN}[OK]${NC} Encontrados $JS_COUNT archivos JavaScript y $CSS_COUNT archivos CSS"

# 5. Verificar html
echo -e "${BLUE}[PASO 5]${NC} Verificando archivo index.html..."
if grep -q "assetlinks.json" dist/index.html; then
  echo -e "${GREEN}[OK]${NC} index.html parece estar bien formado"
else
  # Verificar si contiene referencias a assets
  if grep -q "assets/" dist/index.html; then
    echo -e "${GREEN}[OK]${NC} index.html contiene referencias a assets"
  else
    echo -e "${YELLOW}[ADVERTENCIA]${NC} index.html podría no estar cargando correctamente los assets"
  fi
fi

# 6. Desplegar con wrangler
echo -e "${BLUE}[PASO 6]${NC} Configurando token de Cloudflare (si existe)..."

if [ -f "${HOME}/.cloudflare/api-token.txt" ]; then
  export CLOUDFLARE_API_TOKEN=$(cat ${HOME}/.cloudflare/api-token.txt)
  echo -e "${GREEN}[OK]${NC} Token de Cloudflare configurado desde archivo"
else
  echo -e "${YELLOW}[AVISO]${NC} Para desplegar, se requiere un token de Cloudflare"
  echo -e "${YELLOW}[AVISO]${NC} Obtenga un token en: https://dash.cloudflare.com/profile/api-tokens"
  
  read -p "¿Tiene un token de API de Cloudflare para ingresar? (s/n): " TIENE_TOKEN
  
  if [ "$TIENE_TOKEN" = "s" ] || [ "$TIENE_TOKEN" = "S" ]; then
    read -p "Ingrese su token de API de Cloudflare: " API_TOKEN
    export CLOUDFLARE_API_TOKEN="$API_TOKEN"
    
    # Guardar para futuros despliegues
    mkdir -p ${HOME}/.cloudflare
    echo "$API_TOKEN" > ${HOME}/.cloudflare/api-token.txt
    chmod 600 ${HOME}/.cloudflare/api-token.txt
    
    echo -e "${GREEN}[OK]${NC} Token de Cloudflare configurado y guardado"
  else
    echo -e "${YELLOW}[AVISO]${NC} Continuando sin token. El despliegue probablemente fallará."
  fi
fi

echo -e "${BLUE}[PASO 7]${NC} Desplegando a Cloudflare Workers..."
npx wrangler deploy

if [ $? -ne 0 ]; then
  echo -e "${YELLOW}[ADVERTENCIA]${NC} Error en el despliegue. Revisando posible causa..."
  
  # Verificar si falta account_id
  if ! grep -q "account_id" wrangler.toml; then
    echo -e "${YELLOW}[AVISO]${NC} wrangler.toml no contiene account_id. Esto puede ser necesario."
    echo -e "${YELLOW}[AVISO]${NC} Obtenga su account_id en: https://dash.cloudflare.com"
    
    read -p "Ingrese su account_id de Cloudflare (o presione ENTER para omitir): " ACCOUNT_ID
    
    if [ ! -z "$ACCOUNT_ID" ]; then
      echo "account_id = \"$ACCOUNT_ID\"" >> wrangler.toml
      echo -e "${GREEN}[OK]${NC} account_id añadido a wrangler.toml"
      
      echo -e "${BLUE}[INFO]${NC} Intentando desplegar nuevamente..."
      npx wrangler deploy
      
      if [ $? -ne 0 ]; then
        echo -e "${RED}[ERROR]${NC} El despliegue falló nuevamente. Revise los errores anteriores."
        exit 1
      else
        echo -e "${GREEN}[OK]${NC} ¡Despliegue exitoso en el segundo intento!"
      fi
    else
      echo -e "${RED}[ERROR]${NC} No se pudo completar el despliegue."
      exit 1
    fi
  else
    echo -e "${RED}[ERROR]${NC} El despliegue falló. Revise los mensajes de error anteriores."
    exit 1
  fi
else
  echo -e "${GREEN}[OK]${NC} ¡Sitio desplegado exitosamente!"
fi

# Información final
echo -e "\n${GREEN}=================================================${NC}"
echo -e "${GREEN}       SITIO DESPLEGADO EXITOSAMENTE            ${NC}"
echo -e "${GREEN}=================================================${NC}"

echo -e "\nSu sitio está disponible en: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev${NC}"

echo -e "\n${BLUE}[PRÓXIMOS PASOS]${NC}"
echo -e "1. Verifique que todas las rutas funcionen correctamente:"
echo -e "   - Página principal: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo -e "   - Servicios: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/servicios${NC}"
echo -e "   - Login: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/login${NC}"
echo -e "   - Registro: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/registro${NC}"

echo -e "\n2. Si hay problemas, verifique los logs en tiempo real:"
echo -e "   ${BLUE}npx wrangler tail${NC}"

echo -e "\n3. Para forzar una recarga completa en el navegador:"
echo -e "   - Chrome/Firefox: Presione ${YELLOW}Ctrl+F5${NC}"
echo -e "   - Safari: Presione ${YELLOW}Cmd+Option+R${NC}"

echo ""
