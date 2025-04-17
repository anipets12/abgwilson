#!/bin/bash

# =============================
# Diagnóstico y Despliegue para Abogado Wilson Website
# =============================

# Configuración de colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directorio del proyecto
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
cd "$PROJECT_DIR"

# Función para imprimir mensajes de log
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[ÉXITO]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[ADVERTENCIA]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Función para verificar errores
verify_error() {
  if [ $? -ne 0 ]; then
    log_error "$1"
    return 1
  else
    log_success "$2"
    return 0
  fi
}

# Limpiar la consola
clear

# Banner
echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}  DIAGNÓSTICO Y DESPLIEGUE - ABOGADO WILSON WEBSITE ${NC}"
echo -e "${BLUE}=================================================${NC}"
echo ""

# Paso 1: Verificar estructura del proyecto
log_info "Verificando estructura del proyecto..."
if [ ! -f "package.json" ]; then
  log_error "No se encontró package.json. Asegúrate de estar en el directorio correcto."
  exit 1
fi

if [ ! -f "wrangler.toml" ]; then
  log_error "No se encontró wrangler.toml. Es necesario para el despliegue."
  exit 1
fi

if [ ! -d "src" ]; then
  log_error "No se encontró el directorio de código fuente (src)."
  exit 1
fi

if [ ! -f "src/worker-simple.ts" ]; then
  log_error "No se encontró el archivo worker-simple.ts. Es esencial para el despliegue."
  exit 1
fi

log_success "Estructura del proyecto verificada."

# Paso 2: Eliminar node_modules y package-lock.json para instalación limpia
log_info "Preparando instalación limpia de dependencias..."
rm -rf node_modules package-lock.json || true
log_success "Directorios de dependencias limpiados."

# Paso 3: Instalación de dependencias
log_info "Instalando dependencias del proyecto..."
npm install --legacy-peer-deps

verify_error "Error al instalar dependencias." "Dependencias instaladas correctamente."

# Paso 4: Verificar y corregir worker-simple.ts
log_info "Verificando configuración del worker..."

# Verificar que no se use manifestJSON que causa problemas
if grep -q "import manifestJSON from '__STATIC_CONTENT_MANIFEST'" src/worker-simple.ts; then
  log_warning "Detectado uso de manifestJSON que puede causar problemas. Corrigiendo..."
  
  # Hacer backup
  cp src/worker-simple.ts src/worker-simple.ts.backup
  
  # Reemplazar con versión sin manifest
  cat > src/worker-simple.ts << 'EOF'
/// <reference path="./cloudflare.d.ts" />
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// Definición simplificada de ambiente
export interface Env {
  ASSETS: KVNamespace;
  [key: string]: any;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Headers de seguridad
    const securityHeaders = {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' data: https: blob:; connect-src 'self' https: wss: blob:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:;",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS"
    };

    // Manejar OPTIONS para CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...securityHeaders,
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    const url = new URL(request.url);
    
    // Manejar API si existe
    if (url.pathname.startsWith('/api')) {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: {
          'Content-Type': 'application/json',
          ...securityHeaders
        }
      });
    }

    // Determinar si es una solicitud de archivo estático
    const isAssetRequest = url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/);

    try {
      // Para archivos estáticos, servir directamente
      if (isAssetRequest) {
        const asset = await getAssetFromKV(request, {
          ASSET_NAMESPACE: env.ASSETS
        });
        
        return new Response(asset.body, {
          status: 200,
          headers: {
            ...asset.headers,
            ...securityHeaders,
            'Cache-Control': 'public, max-age=31536000' // Cache largo para recursos estáticos
          }
        });
      }
      
      // Para rutas SPA, servir siempre index.html
      const indexRequest = new Request(`${url.origin}/index.html`, request);
      const indexAsset = await getAssetFromKV(indexRequest, {
        ASSET_NAMESPACE: env.ASSETS
      });
      
      return new Response(indexAsset.body, {
        status: 200,
        headers: {
          ...indexAsset.headers,
          ...securityHeaders,
          'Cache-Control': 'no-cache, no-store, must-revalidate' // No cachear index.html
        }
      });
    } catch (error) {
      console.error('Error:', error);
      
      // Página de error simple y útil
      return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { color: #2c5282; }
    .error { color: #e53e3e; margin-top: 20px; background: #fff5f5; padding: 10px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <p>Servicios legales profesionales en Ibarra, Ecuador</p>
  <p><strong>Contacto:</strong> +593 988835269</p>
  <div class="error">
    Lo sentimos, estamos experimentando dificultades técnicas. 
    Por favor, intente nuevamente en unos momentos.
  </div>
</body>
</html>`, {
        status: 200,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          ...securityHeaders
        }
      });
    }
  }
};
EOF
  
  log_success "Worker corregido para mejorar manejo de rutas SPA."
else
  log_success "Configuración del worker parece correcta."
fi

# Paso 5: Verificar configuración de wrangler.toml
log_info "Verificando configuración de wrangler.toml..."

# Verificar y corregir wrangler.toml
if ! grep -q "\[site\]" wrangler.toml || ! grep -q "entry-point" wrangler.toml; then
  log_warning "Configuración de wrangler.toml incompleta. Actualizando..."
  
  # Hacer backup
  cp wrangler.toml wrangler.toml.backup
  
  # Escribir configuración optimizada
  cat > wrangler.toml << 'EOF'
name = "abogado-wilson-website"
compatibility_date = "2023-11-21"
type = "javascript"
workers_dev = true

[site]
bucket = "./dist"
entry-point = "src/worker-simple.ts"

[build]
command = "npm run build"
watch_dir = "src"

[build.upload]
format = "service-worker"

[dev]
port = 3000
local_protocol = "http"

[vars]
ENVIRONMENT = "production"
EOF
  
  log_success "Configuración de wrangler.toml actualizada."
else
  log_success "Configuración de wrangler.toml parece correcta."
fi

# Paso 6: Verificar package.json
log_info "Verificando configuración de package.json..."

# Asegurar que las dependencias críticas estén presentes
if ! grep -q "@cloudflare/kv-asset-handler" package.json; then
  log_warning "Falta dependencia crítica @cloudflare/kv-asset-handler. Instalando..."
  npm install --save @cloudflare/kv-asset-handler
  verify_error "Error al instalar dependencia crítica." "Dependencia instalada correctamente."
fi

# Paso 7: Verificar vite.config.js
log_info "Verificando configuración de Vite..."

if [ -f "vite.config.js" ]; then
  # Verificar que esté usando esbuild para minificación
  if ! grep -q "esbuild" vite.config.js; then
    log_warning "Configuración de Vite no optimizada. Actualizando..."
    
    # Hacer backup
    cp vite.config.js vite.config.js.backup
    
    # Reemplazar con versión optimizada
    cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'react-icons']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
EOF
    
    log_success "Configuración de Vite actualizada para mejor rendimiento."
  else
    log_success "Configuración de Vite parece correcta."
  fi
else
  log_error "No se encontró vite.config.js. Esto es crítico para la compilación."
  exit 1
fi

# Paso 8: Limpiar la caché y el directorio de compilación
log_info "Limpiando cachés y directorios de compilación..."
rm -rf dist .wrangler node_modules/.cache dist .wrangler
log_success "Directorios de cache limpiados."

# Paso 9: Compilar el proyecto
log_info "Compilando el proyecto..."
npm run build

if [ $? -ne 0 ]; then
  log_error "Error al compilar el proyecto. Revisando errores comunes..."
  
  # Comprobar espacio en disco
  DISK_SPACE=$(df -h . | awk 'NR==2 {print $5}' | tr -d '%')
  if [ "$DISK_SPACE" -gt 95 ]; then
    log_error "Espacio en disco crítico: $DISK_SPACE%. Libere espacio e intente nuevamente."
    exit 1
  fi
  
  # Comprobar memoria disponible
  FREE_MEM=$(free -m | awk 'NR==2 {print $4}')
  if [ "$FREE_MEM" -lt 500 ]; then
    log_warning "Memoria disponible baja: $FREE_MEM MB. Esto puede afectar la compilación."
  fi
  
  # Intentar con --force
  log_warning "Intentando compilación forzada..."
  NODE_OPTIONS=--max-old-space-size=4096 npm run build --force
  
  if [ $? -ne 0 ]; then
    log_error "La compilación sigue fallando. Revise los errores anteriores."
    exit 1
  else
    log_success "Compilación forzada completada."
  fi
else
  log_success "Proyecto compilado correctamente."
fi

# Paso 10: Verificar archivos críticos en /dist
log_info "Verificando archivos de compilación críticos..."
if [ ! -f "dist/index.html" ]; then
  log_error "No se encontró index.html en la compilación. Compilación incompleta."
  exit 1
fi

if [ ! -d "dist/assets" ]; then
  log_error "No se encontró el directorio de assets en la compilación."
  exit 1
fi

# Contar archivos JS para verificar que hay recursos
JS_FILES=$(find dist -name "*.js" | wc -l)
if [ "$JS_FILES" -lt 2 ]; then
  log_warning "Muy pocos archivos JavaScript ($JS_FILES) en la compilación. Posible problema."
else
  log_success "Encontrados $JS_FILES archivos JavaScript en la compilación."
fi

log_success "Archivos de compilación verificados correctamente."

# Paso 11: Desplegar con Wrangler
log_info "Desplegando con Wrangler..."

# Verificar si wrangler está instalado globalmente o usamos npx
if command -v wrangler &> /dev/null; then
  WRANGLER_CMD="wrangler"
else
  WRANGLER_CMD="npx wrangler"
fi

# Desplegar con confirmación de ruta
$WRANGLER_CMD publish

if [ $? -ne 0 ]; then
  log_error "Error al desplegar con Wrangler. Intentando solución alternativa..."
  
  # Verificar login
  log_info "Verificando estado de login en Cloudflare..."
  $WRANGLER_CMD whoami
  
  if [ $? -ne 0 ]; then
    log_warning "No autenticado en Cloudflare. Por favor, ejecute 'npx wrangler login' y siga las instrucciones."
    exit 1
  fi
  
  # Intentar solución alternativa con deploy
  log_warning "Intentando despliegue alternativo..."
  $WRANGLER_CMD deploy
  
  if [ $? -ne 0 ]; then
    log_error "El despliegue alternativo también falló. Revise los mensajes de error anteriores."
    exit 1
  else
    log_success "Despliegue alternativo completado correctamente."
  fi
else
  log_success "Despliegue completado exitosamente."
fi

# Paso 12: Mostrar URL y verificación final
log_info "Obteniendo información del despliegue..."
$WRANGLER_CMD whoami

# Verificar si el dominio workers.dev está activo
WORKER_URL="https://abogado-wilson-website.anipets12.workers.dev"
log_info "URL del sitio web: $WORKER_URL"

# Paso 13: Verificar que el sitio esté accesible
log_info "Verificando accesibilidad del sitio..."
curl -s -o /dev/null -w "%{http_code}" $WORKER_URL > /tmp/status_code

STATUS_CODE=$(cat /tmp/status_code)
if [ "$STATUS_CODE" = "200" ]; then
  log_success "Sitio web accesible (código HTTP $STATUS_CODE)."
else
  log_warning "El sitio devolvió código HTTP $STATUS_CODE. Puede haber problemas de accesibilidad."
fi

# Finalización
echo ""
echo -e "${GREEN}=================================================${NC}"
echo -e "${GREEN}  DIAGNÓSTICO Y DESPLIEGUE COMPLETADO  ${NC}"
echo -e "${GREEN}=================================================${NC}"
echo ""
echo -e "URL del sitio: ${BLUE}$WORKER_URL${NC}"
echo -e "Para ver logs en tiempo real: ${YELLOW}npx wrangler tail${NC}"
echo ""
echo -e "Si encuentra problemas, revise los logs o ejecute nuevamente este script."
echo -e "Para obtener soporte técnico, contacte al desarrollador."

exit 0
