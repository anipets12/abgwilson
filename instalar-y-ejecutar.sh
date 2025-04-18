#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 INSTALACIÓN Y EJECUCIÓN - ABOGADO WILSON WEBSITE               ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# Verificar que todos los archivos necesarios estén presentes
echo -e "${YELLOW}[1/5]${NC} Verificando archivos necesarios..."

if [ ! -f "src/main.jsx" ] || [ ! -f "src/App.jsx" ]; then
  echo -e "${RED}Error: Faltan archivos básicos de React. Ejecute primero los scripts:${NC}"
  echo -e "${BLUE}./solucion-minima.sh${NC}"
  echo -e "${BLUE}./crear-componentes-basicos.sh${NC}"
  echo -e "${BLUE}./crear-pagina-home.sh${NC}"
  echo -e "${BLUE}./crear-pagina-servicios.sh${NC}"
  echo -e "${BLUE}./crear-pagina-contacto.sh${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Todos los archivos necesarios están presentes"

# Cerrar puertos previamente usados
echo -e "${YELLOW}[2/5]${NC} Cerrando aplicaciones en puertos utilizados..."
kill $(lsof -t -i:3000) 2>/dev/null || true
echo -e "${GREEN}✓${NC} Puerto 3000 liberado"

# Instalar dependencias
echo -e "${YELLOW}[3/5]${NC} Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: No se pudieron instalar las dependencias.${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Dependencias instaladas correctamente"

# Construir la aplicación
echo -e "${YELLOW}[4/5]${NC} Construyendo la aplicación..."
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: No se pudo construir la aplicación.${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Aplicación construida correctamente"

# Iniciar la aplicación en modo desarrollo
echo -e "${YELLOW}[5/5]${NC} Iniciando la aplicación en modo desarrollo..."
echo -e "${GREEN}La aplicación se iniciará en http://localhost:3000${NC}"
echo -e "${YELLOW}Presione Ctrl+C para detener la aplicación${NC}"
echo ""

npm run dev
