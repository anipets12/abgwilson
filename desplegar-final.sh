#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}====================================================${NC}"
echo -e "${BLUE}   DESPLIEGUE FINAL - ABOGADO WILSON WEBSITE        ${NC}"
echo -e "${BLUE}====================================================${NC}"
echo ""

# 1. Limpiar entorno
rm -rf dist
echo -e "${GREEN}✓${NC} Entorno limpiado"

# 2. Construir la aplicación con la configuración optimizada
echo -e "${BLUE}» Construyendo aplicación sin chunking...${NC}"
NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Error en la compilación${NC}"
  exit 1
fi

# 3. Verificar el contenido generado
echo -e "${BLUE}» Verificando archivos generados...${NC}"
ls -la dist/assets/

# 4. Desplegar con Wrangler
echo -e "${BLUE}» Desplegando a Cloudflare Workers...${NC}"
npx wrangler deploy

if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Error en el despliegue${NC}"
  exit 1
fi

echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}   ✅ DESPLIEGUE COMPLETADO EXITOSAMENTE           ${NC}"
echo -e "${GREEN}====================================================${NC}"
echo ""
echo -e "Tu sitio web está disponible en:"
echo -e "${BLUE}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
