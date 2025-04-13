#!/bin/bash

# Script para desplegar a GitHub y Cloudflare Workers
# Para Abg. Wilson - 2025

echo "=== Iniciando despliegue a GitHub y Cloudflare Workers ==="

# Verificar si git está instalado
if ! command -v git &> /dev/null; then
  echo "❌ ERROR: Git no está instalado"
  echo "Por favor, instale Git desde https://git-scm.com/"
  exit 1
fi

# Configuración de git si no está ya configurado
if [[ -z $(git config --global user.name) ]]; then
  read -p "Ingrese su nombre para la configuración de Git: " git_name
  git config --global user.name "$git_name"
fi

if [[ -z $(git config --global user.email) ]]; then
  read -p "Ingrese su email para la configuración de Git: " git_email
  git config --global user.email "$git_email"
fi

# Añadir todos los archivos modificados y nuevos
echo "Añadiendo archivos al repositorio..."
git add .

# Realizar commit
read -p "Ingrese un mensaje para el commit (o presione Enter para usar 'Actualización del sitio web'): " commit_message
if [[ -z "$commit_message" ]]; then
  commit_message="Actualización del sitio web"
fi

git commit -m "$commit_message"

# Configurar el remoto de GitHub si no existe
if ! git remote | grep -q "origin"; then
  echo "Configurando el remoto de GitHub..."
  git remote add origin https://github.com/anipets12/abgwilson.git
else
  # Verificar si el remoto es correcto
  current_remote=$(git remote get-url origin)
  if [[ "$current_remote" != "https://github.com/anipets12/abgwilson.git" ]]; then
    echo "Actualizando URL del remoto..."
    git remote set-url origin https://github.com/anipets12/abgwilson.git
  fi
fi

# Crear la rama main si no existe y cambiar a ella
if ! git branch | grep -q "main"; then
  echo "Creando y cambiando a la rama main..."
  git branch -M main
else
  echo "Cambiando a la rama main..."
  git checkout main
fi

# Subir al repositorio
echo "Subiendo al repositorio de GitHub..."
git push -u origin main

# Verificar si el push fue exitoso
if [ $? -eq 0 ]; then
  echo "✅ Repositorio subido exitosamente a GitHub"
  
  # Preguntar si desea desplegar a Cloudflare Workers
  read -p "¿Desea desplegar también a Cloudflare Workers? (s/n): " deploy_cf
  if [[ "$deploy_cf" == "s" || "$deploy_cf" == "S" ]]; then
    echo "Desplegando a Cloudflare Workers..."
    bash ./deploy-workers.sh
  else
    echo "Despliegue a Cloudflare Workers omitido."
  fi
else
  echo "❌ Error al subir al repositorio"
  echo "Verifique sus credenciales y conexión a internet"
  exit 1
fi

echo "=== Proceso de despliegue completado ==="
echo "Repositorio GitHub: https://github.com/anipets12/abgwilson"
