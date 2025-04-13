#!/bin/bash

# Script para desplegar a Cloudflare Workers
# Por AbogadoWilson.com - 2025

echo "=== Iniciando despliegue a Cloudflare Workers ==="

# Crear archivo .env a partir de env.example si no existe
if [ ! -f .env ]; then
  echo "Creando archivo .env a partir de env.example..."
  cp env.example .env
  echo "✅ Archivo .env creado correctamente"
fi

# Verificar si está instalado Node.js
if ! command -v node &> /dev/null; then
  echo "❌ ERROR: Node.js no está instalado"
  echo "Por favor, instale Node.js desde https://nodejs.org/"
  exit 1
fi

# Verificar si está instalado npm
if ! command -v npm &> /dev/null; then
  echo "❌ ERROR: npm no está instalado"
  echo "Por favor, instale npm o reinstale Node.js desde https://nodejs.org/"
  exit 1
fi

# Ya no es necesario instalar wrangler globalmente
# Usaremos npx para ejecutar wrangler localmente

# Instalar dependencias
echo "Instalando dependencias..."
npm install
echo "✅ Dependencias instaladas correctamente"

# Compilar TypeScript
echo "Compilando TypeScript..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Error al compilar TypeScript"
  echo "Por favor, corrija los errores y vuelva a intentarlo"
  exit 1
fi
echo "✅ Código compilado correctamente"

# Desplegar a Cloudflare Workers
echo "Desplegando a Cloudflare Workers..."
npx wrangler deploy

# Verificar si el despliegue fue exitoso
if [ $? -eq 0 ]; then
  echo "✅ Despliegue exitoso a Cloudflare Workers"
  echo "Para verificar, ejecute: npx wrangler tail"
else
  echo "❌ Error en el despliegue"
  echo "Por favor, revise los errores y vuelva a intentarlo"
  exit 1
fi

echo "=== Proceso de despliegue completado ==="
