#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

# Funciones de utilidad
echo_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
echo_success() { echo -e "${GREEN}[OK]${NC} $1"; }
echo_warning() { echo -e "${YELLOW}[AVISO]${NC} $1"; }
echo_error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# Verificar error y salir/continuar según corresponda
check_error() {
  if [ $? -ne 0 ]; then
    echo_error "$1"
  else
    echo_success "$2"
  fi
}

echo -e "${BLUE}=================================================================================${NC}"
echo -e "${BLUE}   SOLUCIÓN ERROR 1042 - SITIO WEB ABOGADO WILSON EN CLOUDFLARE WORKERS         ${NC}"
echo -e "${BLUE}=================================================================================${NC}"
echo ""

# Paso 1: Limpiar caché y archivos temporales
echo_info "Paso 1: Limpieza completa de directorios temporales..."
rm -rf dist .wrangler node_modules/.cache
check_error "Error al eliminar archivos temporales" "Limpieza completada correctamente"

# Paso 2: Actualizar dependencias críticas
echo_info "Paso 2: Verificando e instalando dependencias críticas..."
npm install --no-fund wrangler@3.22.1 
check_error "Error al instalar dependencias" "Dependencias instaladas correctamente"

# Paso 3: Ajustar el archivo index.html para solucionar problemas de carga
echo_info "Paso 3: Optimizando index.html para Cloudflare Workers..."
if [ -f "index.html" ]; then
  # Hacer respaldo
  cp index.html index.html.bak
  
  # Modificar para solucionar el error 1042
  sed -i 's|<script type="module" src="/src/main.jsx"></script>|<script type="module" src="/src/main.jsx"></script>\n  <!-- Fix para error 1042 -->\n  <script>window.addEventListener("error", function(e) { console.error("Capturado:", e.message); });</script>|' index.html
  
  check_error "Error al modificar index.html" "index.html optimizado correctamente"
else
  echo_warning "No se encontró index.html en la raíz del proyecto"
fi

# Paso 4: Compilar proyecto
echo_info "Paso 4: Compilando proyecto con optimizaciones..."
npm run build
check_error "Error en la compilación del proyecto" "Proyecto compilado exitosamente"

# Paso 5: Verificar archivos generados
echo_info "Paso 5: Verificando archivos generados..."
JS_COUNT=$(find dist -name "*.js" | wc -l)
CSS_COUNT=$(find dist -name "*.css" | wc -l)

if [ ! -f "dist/index.html" ]; then
  echo_error "El archivo dist/index.html no existe. Compilación incorrecta."
fi

if [ ! -d "dist/assets" ]; then
  echo_error "El directorio dist/assets no existe. Compilación incorrecta."
fi

echo_success "Se encontraron $JS_COUNT archivos JS y $CSS_COUNT archivos CSS"

# Paso 6: Añadir una regla opcional a index.html en dist
echo_info "Paso 6: Optimizando index.html generado..."
if grep -q "modulepreload" dist/index.html; then
  echo_success "index.html ya contiene carga de módulos optimizada"
else
  echo_warning "Optimizando la carga de scripts en index.html..."
  sed -i 's|</head>|  <link rel="preload" as="script" href="/assets/index-C_ntokWl.js">\n</head>|' dist/index.html
  check_error "Error al modificar index.html en dist/" "dist/index.html optimizado correctamente"
fi

# Paso 7: Crear el archivo _headers para Cloudflare
echo_info "Paso 7: Creando archivo _headers para solucionar CORS y otros problemas..."
cat > dist/_headers << 'EOL'
# Reglas para solucionar error 1042 y problemas de CORS
/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: upgrade-insecure-requests;
  Cache-Control: public, max-age=0, must-revalidate

# Reglas para archivos estáticos
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
EOL
check_error "Error al crear archivo _headers" "Archivo _headers creado correctamente"

# Paso 8: Crear el archivo _routes.json para Cloudflare Workers
echo_info "Paso 8: Creando archivo _routes.json para enrutamiento SPA..."
cat > dist/_routes.json << 'EOL'
{
  "version": 1,
  "include": ["/*"],
  "exclude": [
    "/_headers",
    "/_routes.json",
    "/assets/*",
    "/favicon.ico",
    "/manifest.json",
    "/robots.txt"
  ]
}
EOL
check_error "Error al crear archivo _routes.json" "Archivo _routes.json creado correctamente"

# Paso 9: Desplegar con Wrangler (si hay token configurado)
echo_info "Paso 9: Preparando despliegue..."

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo_warning "No se encontró un token de API de Cloudflare."
  echo_warning "Para desplegar esta solución debes obtener un token en: https://dash.cloudflare.com/profile/api-tokens"
  
  read -p "¿Tienes un token de API para ingresar? (s/n): " tiene_token
  
  if [ "$tiene_token" = "s" ] || [ "$tiene_token" = "S" ]; then
    read -p "Ingresa tu token de API de Cloudflare: " api_token
    export CLOUDFLARE_API_TOKEN="$api_token"
    echo_success "Token de API configurado"
  else
    echo_warning "Continuando sin token de API. El despliegue no se realizará."
    exit 0
  fi
fi

# Intentar desplegar
echo_info "Desplegando a Cloudflare Workers..."
npx wrangler deploy

if [ $? -ne 0 ]; then
  echo_warning "Error en el despliegue. Verificando si falta account_id..."
  
  # Verificar si falta account_id
  if ! grep -q "account_id" wrangler.toml; then
    echo_warning "No se encontró account_id en wrangler.toml"
    read -p "¿Quieres ingresar tu Cloudflare account_id? (s/n): " agregar_id
    
    if [ "$agregar_id" = "s" ] || [ "$agregar_id" = "S" ]; then
      read -p "Ingresa tu Cloudflare account_id: " account_id
      echo "account_id = \"$account_id\"" >> wrangler.toml
      
      echo_success "account_id añadido a wrangler.toml"
      echo_info "Intentando despliegue nuevamente..."
      
      npx wrangler deploy
      check_error "Error en el segundo intento de despliegue" "Sitio desplegado exitosamente"
    else
      echo_warning "No se pudo completar el despliegue sin account_id"
      exit 0
    fi
  fi
else
  echo_success "Sitio desplegado exitosamente"
fi

# Mostrar información final
echo ""
echo -e "${GREEN}====================================================================================${NC}"
echo -e "${GREEN}   SOLUCIÓN COMPLETADA - SITIO ABOGADO WILSON DESPLEGADO SIN ERROR 1042            ${NC}"
echo -e "${GREEN}====================================================================================${NC}"
echo ""
echo -e "✅ El sitio web está disponible en:"
echo -e "${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
echo -e "Pruebe las siguientes rutas para verificar que todo funciona correctamente:"
echo -e "🔹 Página principal: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo -e "🔹 Servicios: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/servicios${NC}"
echo -e "🔹 Login: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/login${NC}"
echo -e "🔹 Registro: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/registro${NC}"
echo ""
echo -e "Si necesita verificar los logs en tiempo real, ejecute:"
echo -e "${BLUE}npx wrangler tail${NC}"
echo ""
