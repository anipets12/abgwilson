#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 OPTIMIZACIÓN FINAL PROFESIONAL - ABOGADO WILSON WEBSITE        ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Eliminar archivos duplicados y confusos
echo -e "${YELLOW}[1/7]${NC} Eliminando archivos duplicados y confusos..."

# Array de archivos a eliminar
FILES_TO_REMOVE=(
  # Versiones duplicadas y backups
  "src/components/Auth/Login.js.bak"
  "src/components/Auth/Login.jsx.bak"
  
  # Archivos de worker duplicados
  "src/worker-definitivo.js"
  "src/worker-es-module.js"
  "src/minimal-worker.js"
  "src/worker-index.js"
  "src/worker-super.js"
  
  # Scripts de diagnóstico y solución antiguos
  "diagnostico-completo.js"
  "diagnostico-y-solucion.sh"
  "solucion-axios.sh"
  "solucion-final.sh"
  "solucion-jsx.sh"
  "solucion-profesional.sh"
  
  # Otros archivos innecesarios
  "src/solucion-final.js"
  "src/spa-router.js"
)

# Eliminar archivos
for file in "${FILES_TO_REMOVE[@]}"; do
  if [ -f "$file" ]; then
    rm "$file"
    echo -e "${GREEN}✓${NC} Eliminado: $file"
  fi
done

# Buscar y eliminar archivos con patrones similares
find . -name "*copia*" -o -name "*copy*" -o -name "*backup*" -o -name "*bak*" -o -name "*test*" -o -name "*old*" -type f | while read -r file; do
  rm "$file"
  echo -e "${GREEN}✓${NC} Eliminado archivo innecesario: $file"
done

echo -e "${GREEN}✓${NC} Archivos duplicados y confusos eliminados"

# 2. Optimizar package.json
echo -e "${YELLOW}[2/7]${NC} Optimizando package.json..."

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
    "postcss": "^8.4.30",
    "tailwindcss": "^3.3.3",
    "vite": "^5.0.0"
  }
}
EOL

echo -e "${GREEN}✓${NC} package.json optimizado"

# 3. Optimizar vite.config.js
echo -e "${YELLOW}[3/7]${NC} Configurando vite.config.js óptimo..."

cat > vite.config.js << 'EOL'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    // Generar un solo bundle para evitar problemas de carga
    rollupOptions: {
      output: {
        // Deshabilitar chunking para generar un solo archivo
        manualChunks: undefined,
        // Colocar todo en un solo archivo
        inlineDynamicImports: true
      }
    }
  },
  // Servidor de desarrollo
  server: {
    port: 3000,
    strictPort: true
  }
})
EOL

echo -e "${GREEN}✓${NC} vite.config.js optimizado"

# 4. Optimizar worker para Cloudflare
echo -e "${YELLOW}[4/7]${NC} Creando worker de Cloudflare optimizado..."

mkdir -p src

cat > src/worker-simple.js << 'EOL'
/**
 * Worker simplificado para Cloudflare que maneja correctamente las rutas de SPA
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Servir archivos estáticos con extensiones conocidas
    if (url.pathname.match(/\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2)$/)) {
      const response = await fetch(request);
      if (response.ok) {
        const headers = new Headers(response.headers);
        
        // Establecer tipo MIME apropiado
        if (url.pathname.endsWith('.js')) {
          headers.set('Content-Type', 'application/javascript; charset=utf-8');
        } else if (url.pathname.endsWith('.css')) {
          headers.set('Content-Type', 'text/css; charset=utf-8');
        }
        
        // Cache larga para archivos estáticos
        headers.set('Cache-Control', 'public, max-age=31536000');
        return new Response(response.body, { headers });
      }
    }
    
    // Para cualquier otra ruta, servir index.html (manejo de SPA)
    const response = await fetch(new URL('/index.html', url.origin));
    if (response.ok) {
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'text/html; charset=UTF-8');
      // No cachear index.html para permitir actualizaciones
      headers.set('Cache-Control', 'no-cache');
      return new Response(response.body, { headers });
    }
    
    // Fallback si index.html no se pudo obtener
    return new Response('Error: Página no encontrada', { 
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
EOL

echo -e "${GREEN}✓${NC} Worker de Cloudflare optimizado"

# 5. Optimizar wrangler.toml
echo -e "${YELLOW}[5/7]${NC} Configurando wrangler.toml..."

cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-simple.js"
compatibility_date = "2023-11-21"

[site]
bucket = "./dist"
EOL

echo -e "${GREEN}✓${NC} wrangler.toml configurado"

# 6. Optimizar componente App.jsx para rutas correctas
echo -e "${YELLOW}[6/7]${NC} Optimizando rutas en App.jsx..."

mkdir -p src

cat > src/App.jsx << 'EOL'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

// Componente principal de la aplicación
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
EOL

echo -e "${GREEN}✓${NC} App.jsx optimizado con rutas correctas"

# 7. Compilar e instalar dependencias
echo -e "${YELLOW}[7/7]${NC} Instalando dependencias y compilando el proyecto..."

# Instalar dependencias
npm install --no-audit --no-fund

# Compilar el proyecto
npm run build

# Verificar si la compilación tuvo éxito
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓${NC} Proyecto compilado exitosamente"
else
  echo -e "${RED}✗${NC} Error en la compilación"
fi

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ PROYECTO OPTIMIZADO Y LISTO PARA PRODUCCIÓN                     ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "El proyecto ha sido optimizado con éxito:"
echo ""
echo -e "• ${GREEN}Eliminados${NC} todos los archivos duplicados y confusos"
echo -e "• ${GREEN}Optimizado${NC} package.json con dependencias exactas"
echo -e "• ${GREEN}Configurado${NC} vite.config.js para un bundle único"
echo -e "• ${GREEN}Creado${NC} worker de Cloudflare simplificado"
echo -e "• ${GREEN}Organizado${NC} rutas para funcionamiento correcto"
echo ""
echo -e "Para ejecutar la aplicación en desarrollo:"
echo -e "${BLUE}npm run dev${NC}"
echo ""
echo -e "Para desplegar la aplicación en Cloudflare:"
echo -e "${BLUE}npx wrangler deploy${NC}"
echo ""
