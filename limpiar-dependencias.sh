#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 LIMPIEZA DE DEPENDENCIAS - ABOGADO WILSON WEBSITE              ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Buscar archivos con dependencias problemáticas
echo -e "${YELLOW}[1/4]${NC} Buscando archivos con dependencias no instaladas..."

# Buscar archivos que importan framer-motion
FRAMER_FILES=$(grep -r "from 'framer-motion'" --include="*.js" --include="*.jsx" ./src || echo "")
if [ ! -z "$FRAMER_FILES" ]; then
  echo -e "Archivos con imports de framer-motion:"
  echo -e "$FRAMER_FILES"
  echo ""
fi

# Buscar otros imports problemáticos
AXIOS_FILES=$(grep -r "from 'axios'" --include="*.js" --include="*.jsx" ./src || echo "")
if [ ! -z "$AXIOS_FILES" ]; then
  echo -e "Archivos con imports de axios:"
  echo -e "$AXIOS_FILES"
  echo ""
fi

# 2. Crear versiones simplificadas de estos componentes
echo -e "${YELLOW}[2/4]${NC} Creando versiones simplificadas de los componentes..."

# Si Contact.js existe y tiene framer-motion, reemplazarlo
if [ -f "./src/components/Contact.js" ]; then
  echo -e "Reemplazando Contact.js con versión sin dependencias..."
  mv ./src/components/Contact.js ./src/components/Contact.js.old
  cat > ./src/components/Contact.jsx << 'EOL'
import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
            <p className="mb-2"><strong>Abogado:</strong> Wilson Alexander Ipiales Guerron</p>
            <p className="mb-2"><strong>Ubicación:</strong> Ibarra, Ecuador</p>
            <p className="mb-2"><strong>Teléfono:</strong> +593 988835269</p>
            <p className="mb-2"><strong>Email:</strong> alexip2@hotmail.com</p>
            <p className="mb-2"><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Envíe su Consulta</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mensaje</label>
                <textarea rows="4" className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
EOL
  echo -e "${GREEN}✓${NC} Contact.jsx creado sin dependencias externas"
fi

# Revisar más archivos con dependencias problemáticas
for file in $(find ./src -name "*.js" -o -name "*.jsx"); do
  if grep -q "framer-motion\|axios" "$file"; then
    echo -e "Analizando archivo con dependencias externas: $file"
    # Crear una copia de seguridad
    cp "$file" "${file}.bak"
    
    # Reemplazar imports problemáticos
    sed -i 's/import {.*} from .framer-motion.;//g' "$file"
    sed -i 's/import axios from .axios.;//g' "$file"
    
    # Eliminar uso de motion components
    sed -i 's/<motion\.div/<div/g' "$file"
    sed -i 's/<motion\.//g' "$file"
    sed -i 's/animate=//g' "$file"
    sed -i 's/transition=//g' "$file"
    sed -i 's/whileHover=//g' "$file"
    sed -i 's/variants=//g' "$file"
    
    # Eliminar uso de axios
    sed -i 's/axios\.get/fetch/g' "$file"
    sed -i 's/axios\.post.*(\([^,]*\),/fetch(\1, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(/g' "$file"
    
    echo -e "${GREEN}✓${NC} Limpiado archivo: $file"
  fi
done

# 3. Actualizar package.json para asegurar las dependencias correctas
echo -e "${YELLOW}[3/4]${NC} Actualizando package.json con dependencias correctas..."

cat > package.json << 'EOL'
{
  "name": "abogado-wilson-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.0",
    "react-icons": "^4.12.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.3",
    "vite": "^5.0.0"
  }
}
EOL

echo -e "${GREEN}✓${NC} package.json actualizado"

# 4. Reinstalar y compilar
echo -e "${YELLOW}[4/4]${NC} Reinstalando dependencias y compilando..."

# Limpiar node_modules para una instalación fresca
rm -rf node_modules package-lock.json

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build

# Verificar éxito
if [ $? -eq 0 ]; then
  echo -e "\n${GREEN}======================================================================${NC}"
  echo -e "${GREEN}   ✅ DEPENDENCIAS LIMPIADAS Y PROYECTO COMPILADO CON ÉXITO           ${NC}"
  echo -e "${GREEN}======================================================================${NC}"
  echo ""
  echo -e "Puedes iniciar el servidor de vista previa con:"
  echo -e "${BLUE}npm run preview${NC}"
  echo ""
  echo -e "Para desplegar en Cloudflare Pages:"
  echo -e "${BLUE}npx wrangler pages deploy dist${NC}"
else
  echo -e "\n${RED}======================================================================${NC}"
  echo -e "${RED}   ❌ ERROR DURANTE LA COMPILACIÓN                                     ${NC}"
  echo -e "${RED}======================================================================${NC}"
  echo ""
  echo -e "Se encontraron errores durante la compilación."
fi
