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

# 1. Limpiar caché y directorios temporales
echo -e "${BLUE}[INFO]${NC} Limpiando directorios temporales y caché..."
rm -rf dist .wrangler .cache node_modules/.cache
check_error "Error al limpiar caché" "Caché limpiada correctamente"

# 2. Instalar dependencias
echo -e "${BLUE}[INFO]${NC} Instalando dependencias..."
npm install --no-audit --no-fund
check_error "Error al instalar dependencias" "Dependencias instaladas correctamente"

# 3. Compilar el proyecto
echo -e "${BLUE}[INFO]${NC} Compilando el proyecto..."
npm run build
check_error "Error en la compilación" "Proyecto compilado correctamente"

# 4. Verificar archivos críticos
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

# 5. Desplegar con Wrangler
echo -e "${BLUE}[INFO]${NC} Desplegando con Wrangler..."
npx wrangler deploy
check_error "Error en el despliegue" "Sitio desplegado correctamente"

# 6. Mostrar URL del sitio
echo -e "\n${GREEN}=================================================${NC}"
echo -e "${GREEN}   DESPLIEGUE COMPLETADO EXITOSAMENTE           ${NC}"
echo -e "${GREEN}=================================================${NC}"
echo -e "\nSu sitio web está disponible en:"
echo -e "${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo -e "\nPara monitorizar los logs del worker en tiempo real:"
echo -e "${BLUE}npx wrangler tail${NC}"
echo ""