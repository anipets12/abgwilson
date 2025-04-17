#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================================${NC}"
echo -e "${BLUE}   EJECUTANDO SITIO WEB LOCALMENTE - ABOGADO WILSON     ${NC}"
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

# Verificar que node_modules exista
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}[AVISO]${NC} Instalando dependencias..."
  npm install --no-audit --no-fund
  check_error "No se pudieron instalar las dependencias" "Dependencias instaladas correctamente"
fi

# Iniciar el servidor de desarrollo
echo -e "${BLUE}[INFO]${NC} Iniciando servidor de desarrollo..."
echo -e "${YELLOW}[AVISO]${NC} El sitio estará disponible en: http://localhost:3000"
echo -e "${YELLOW}[AVISO]${NC} Presione Ctrl+C para detener el servidor"
echo ""

npx vite --port 3000 --host
