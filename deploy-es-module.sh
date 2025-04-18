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
echo -e "${BLUE}   SOLUCIÓN ERROR 100329 - FORMATO ES MODULE PARA CLOUDFLARE D1                  ${NC}"
echo -e "${BLUE}=================================================================================${NC}"
echo ""

# Paso 1: Limpiar archivos temporales
echo_info "Paso 1: Limpiando archivos temporales..."
rm -rf dist .wrangler node_modules/.cache
check_error "Error al eliminar archivos temporales" "Limpieza completada correctamente"

# Paso 2: Instalar dependencias específicas para ES Module
echo_info "Paso 2: Instalando dependencias específicas para ES Module..."
npm install --save-dev wrangler@latest
check_error "Error al instalar wrangler actualizado" "Wrangler actualizado correctamente"

# Paso 3: Forzar el tipo module en package.json
echo_info "Paso 3: Configurando package.json para formato ES Module..."
if grep -q "\"type\": \"module\"" package.json; then
  echo_success "package.json ya está configurado para ES Module"
else
  # Usar jq si existe para modificar package.json
  if command -v jq >/dev/null 2>&1; then
    jq '. + {"type":"module"}' package.json > package.json.tmp && mv package.json.tmp package.json
    check_error "Error al actualizar package.json con jq" "package.json actualizado con jq correctamente"
  else
    # Método alternativo si jq no está disponible
    sed -i 's/"dependencies": {/"type": "module",\n  "dependencies": {/' package.json
    check_error "Error al actualizar package.json manualmente" "package.json actualizado manualmente correctamente"
  fi
fi

# Paso 4: Actualizar wrangler.toml
echo_info "Paso 4: Actualizando wrangler.toml con configuración para ES Module..."
cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-final.js"
compatibility_date = "2023-11-21"
compatibility_flags = ["nodejs_compat"]

# Configuración para formato ES Module
module_rule = [
  { type = "ESModule", globs = ["**/*.js"] },
]

[site]
bucket = "./dist"

[build]
command = "npm run build"

# Entorno de producción
[env.production]
workers_dev = true
EOL
check_error "Error al actualizar wrangler.toml" "wrangler.toml actualizado correctamente"

# Paso 5: Construcción del proyecto
echo_info "Paso 5: Compilando proyecto..."
npm run build
check_error "Error en la compilación del proyecto" "Proyecto compilado exitosamente"

# Paso 6: Crear archivos auxiliares
echo_info "Paso 6: Creando archivos auxiliares..."
# Archivo _headers para CORS y otras configuraciones
cat > dist/_headers << 'EOL'
# Configuración para resolver problemas de CORS y error 1042
/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: upgrade-insecure-requests;
  Cache-Control: public, max-age=0, must-revalidate

# Cache optimizada para archivos estáticos
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

# Crear archivo _routes.json para enrutamiento SPA
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

# Paso 7: Despliegue en Cloudflare Workers
echo_info "Paso 7: Desplegando a Cloudflare Workers..."

# Verificar si tiene token de API configurado
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

# Usar npx wrangler publish para asegurar compatibilidad
npx wrangler deploy

if [ $? -ne 0 ]; then
  echo_warning "Hubo un problema con el despliegue. Intentando soluciones alternativas..."
  
  # Verificar si falta account_id en wrangler.toml
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

# Información final
echo ""
echo -e "${GREEN}====================================================================================${NC}"
echo -e "${GREEN}   SOLUCIÓN COMPLETADA - SITIO ABOGADO WILSON DESPLEGADO CON FORMATO ES MODULE     ${NC}"
echo -e "${GREEN}====================================================================================${NC}"
echo ""
echo -e "✅ El sitio web está ahora disponible en:"
echo -e "${YELLOW}https://abogado-wilson-website.workers.dev/${NC}"
echo ""
echo -e "Pruebe las siguientes rutas para verificar que todo funciona correctamente:"
echo -e "🔹 Página principal: ${YELLOW}https://abogado-wilson-website.workers.dev/${NC}"
echo -e "🔹 Servicios: ${YELLOW}https://abogado-wilson-website.workers.dev/servicios${NC}"
echo -e "🔹 Login: ${YELLOW}https://abogado-wilson-website.workers.dev/login${NC}"
echo -e "🔹 Registro: ${YELLOW}https://abogado-wilson-website.workers.dev/registro${NC}"
echo ""
echo -e "Si necesita verificar los logs en tiempo real, ejecute:"
echo -e "${BLUE}npx wrangler tail${NC}"
echo ""
