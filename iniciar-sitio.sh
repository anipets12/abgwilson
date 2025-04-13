#!/bin/bash
echo "Iniciando el sitio web de Abogado Wilson en http://localhost:8080"
echo "Presiona Ctrl+C para detener el servidor"
cd "$(dirname "$0")"
npm run dev
