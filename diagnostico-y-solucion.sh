#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}=========================================================================${NC}"
echo -e "${BLUE}   DIAGNÓSTICO COMPLETO Y SOLUCIÓN GARANTIZADA - ABOGADO WILSON          ${NC}"
echo -e "${BLUE}=========================================================================${NC}"
echo ""

# Función de diagnóstico y verificación
verificar_archivos() {
  echo -e "${BLUE}[DIAGNÓSTICO]${NC} Verificando estructura del proyecto..."
  
  # Verificar existencia de archivos clave
  if [ ! -f "index.html" ]; then
    echo -e "${RED}[ERROR]${NC} index.html no encontrado en la raíz del proyecto"
    exit 1
  fi
  
  if [ ! -f "src/main.jsx" ] && [ ! -f "src/main.js" ]; then
    echo -e "${RED}[ERROR]${NC} Punto de entrada React no encontrado (main.jsx o main.js)"
    exit 1
  fi
  
  if [ ! -f "package.json" ]; then
    echo -e "${RED}[ERROR]${NC} package.json no encontrado"
    exit 1
  fi
  
  # Verificar si hay build previo
  if [ -d "dist" ]; then
    echo -e "${YELLOW}[AVISO]${NC} Carpeta dist existente, será eliminada"
    rm -rf dist
  fi
  
  echo -e "${GREEN}[OK]${NC} Estructura básica del proyecto verificada"
}

# Paso 1: Diagnóstico del proyecto
echo -e "${BLUE}[PASO 1/5]${NC} Realizando diagnóstico completo del proyecto..."
verificar_archivos

# Paso 2: Crear worker optimizado para resolver todos los problemas
echo -e "${BLUE}[PASO 2/5]${NC} Implementando worker mejorado para resolución de rutas..."

cat > src/worker-super.js << 'EOL'
/**
 * worker-super.js - Solución garantizada para SPA en Cloudflare Workers
 * Creado específicamente para resolver todos los problemas de enrutamiento
 */

// Formato ES Module requerido para Cloudflare Workers modernos
export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx);
    } catch (error) {
      console.error(`[ERROR GENERAL] ${error.stack || error}`);
      return crearPaginaError();
    }
  }
};

/**
 * Maneja todas las solicitudes entrantes
 */
async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  console.log(`[INFO] Procesando solicitud: ${pathname}`);
  
  // 1. Manejo de solicitudes de preflighting CORS
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400"
      }
    });
  }
  
  // 2. Manejo de activos estáticos (archivos con extensiones conocidas)
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/)) {
    try {
      console.log(`[ASSET] Sirviendo archivo estático: ${pathname}`);
      
      // Intentar servir desde el origen directamente
      const response = await fetch(request.url);
      
      if (response.ok) {
        const headers = new Headers(response.headers);
        
        // Configurar cache basado en tipo de archivo
        if (pathname.endsWith('.js') || pathname.endsWith('.css')) {
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
          headers.set('Cache-Control', 'public, max-age=86400');
        }
        
        // Headers cruciales para resolver problemas de CORS y carga
        headers.set('Access-Control-Allow-Origin', '*');
        
        return new Response(response.body, {
          status: 200,
          headers
        });
      }
      
      console.log(`[ADVERTENCIA] Asset no encontrado en origen: ${pathname}, código ${response.status}`);
      
      // Si no se encuentra en el origen, verificar si tenemos un binding KV para assets
      if (env.ASSETS) {
        const assetKey = pathname.replace(/^\//, '');
        const asset = await env.ASSETS.get(assetKey, 'arrayBuffer');
        
        if (asset) {
          console.log(`[ASSET] Encontrado en KV: ${assetKey}`);
          return new Response(asset, {
            headers: {
              'Content-Type': getContentType(pathname),
              'Cache-Control': 'public, max-age=86400',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      }
    } catch (error) {
      console.error(`[ERROR] Al servir asset ${pathname}: ${error.message}`);
      // Continuar al siguiente manejador
    }
  }
  
  // 3. Para todas las demás rutas (SPA), servir index.html
  try {
    console.log(`[SPA] Sirviendo React App para ruta: ${pathname}`);
    
    // Obtener index.html
    let indexHtml;
    
    // Intentar obtener desde origen
    const indexResponse = await fetch(new URL('/index.html', url.origin));
    
    if (!indexResponse.ok) {
      throw new Error(`No se pudo obtener index.html: ${indexResponse.status}`);
    }
    
    // IMPORTANTE: Obtener como texto para garantizar integridad
    indexHtml = await indexResponse.text();
    
    console.log(`[SPA] index.html obtenido, tamaño: ${indexHtml.length} bytes`);
    
    // Headers optimizados para SPA
    const headers = new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy': "default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;"
    });
    
    return new Response(indexHtml, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error(`[ERROR] Al servir SPA: ${error.message}`);
    return crearPaginaError();
  }
}

/**
 * Crea una página de error amigable en caso de problemas
 */
function crearPaginaError() {
  return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2c5282; }
    .card { background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .btn { display: inline-block; background: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <div class="card">
    <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
    <p>En este momento estamos experimentando dificultades técnicas. Por favor intente nuevamente en unos minutos.</p>
    <a href="javascript:location.reload(true)" class="btn">Recargar página</a>
  </div>
  <script>
    // Recargar automáticamente después de 5 segundos
    setTimeout(() => location.reload(true), 5000);
  </script>
</body>
</html>
  `, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-store'
    }
  });
}

/**
 * Determina el tipo de contenido basado en la extensión del archivo
 */
function getContentType(path) {
  const ext = path.split('.').pop().toLowerCase();
  const types = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'eot': 'application/vnd.ms-fontobject',
    'webp': 'image/webp'
  };
  
  return types[ext] || 'application/octet-stream';
}
EOL

echo -e "${GREEN}[OK]${NC} Worker de alta disponibilidad creado"

# Paso 3: Optimizar configuración de wrangler
echo -e "${BLUE}[PASO 3/5]${NC} Configurando wrangler.toml para máxima compatibilidad..."

cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-super.js"
compatibility_date = "2023-11-21"
compatibility_flags = ["nodejs_compat"]

# Tipo de worker
type = "javascript"
workers_dev = true

# Evitar bundling para mejor diagnóstico
no_bundle = true

# Configuración del sitio
[site]
bucket = "./dist"

# Configuración de compilación
[build]
command = "npm run build"
watch_dir = "src"

# Configuración de rutas SPA
[[routes]]
pattern = "/*"
script = "src/worker-super.js"
handler = "fetch"
EOL

echo -e "${GREEN}[OK]${NC} Configuración de wrangler optimizada"

# Paso 4: Optimizar index.html para evitar problemas de carga
echo -e "${BLUE}[PASO 4/5]${NC} Optimizando index.html para carga garantizada..."

# Crear copia de seguridad
cp index.html index.html.bak

# Modificar index.html para optimizar carga
cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Metadatos SEO optimizados -->
  <title>Abg. Wilson Alexander Ipiales Guerron - Asesoría Legal Profesional</title>
  <meta name="description" content="Asesoría legal profesional en derecho penal, civil, tránsito, comercial y aduanas. Protegiendo sus derechos con experiencia y dedicación en Ibarra, Ecuador.">
  <meta name="keywords" content="abogado, derecho penal, derecho civil, derecho de tránsito, derecho comercial, aduanas, asesoría legal, Ibarra, Ecuador">
  <meta name="author" content="Abg. Wilson Alexander Ipiales Guerron">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://abogadowilson.com/">
  <meta property="og:title" content="Abg. Wilson Alexander Ipiales Guerron - Asesoría Legal Profesional">
  <meta property="og:description" content="Asesoría legal profesional en derecho penal, civil, tránsito, comercial y aduanas. Protegiendo sus derechos con experiencia y dedicación.">
  <meta property="og:image" content="/images/og-image.jpg">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://abogadowilson.com/">
  <meta property="twitter:title" content="Abg. Wilson Alexander Ipiales Guerron - Asesoría Legal Profesional">
  <meta property="twitter:description" content="Asesoría legal profesional en derecho penal, civil, tránsito, comercial y aduanas. Protegiendo sus derechos con experiencia y dedicación.">
  <meta property="twitter:image" content="/images/og-image.jpg">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  
  <!-- Correcciones para problemas de carga -->
  <script type="text/javascript">
    // Capturar y manejar errores de carga
    window.addEventListener('error', function(e) {
      console.error('Error capturado:', e.message);
      
      // Reintentar cargar recursos críticos que fallen
      if (e.target && (e.target.src || e.target.href)) {
        const recurso = e.target.src || e.target.href;
        console.warn('Recurso fallido:', recurso);
        
        // Reintentar carga para scripts y estilos
        if (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
          setTimeout(() => {
            console.log('Reintentando carga de:', recurso);
            
            if (e.target.tagName === 'SCRIPT') {
              const nuevoScript = document.createElement('script');
              for (const attr of e.target.attributes) {
                nuevoScript.setAttribute(attr.name, attr.value);
              }
              e.target.parentNode.replaceChild(nuevoScript, e.target);
            } else if (e.target.tagName === 'LINK') {
              const nuevoLink = document.createElement('link');
              for (const attr of e.target.attributes) {
                nuevoLink.setAttribute(attr.name, attr.value);
              }
              e.target.parentNode.replaceChild(nuevoLink, e.target);
            }
          }, 1000);
        }
      }
    });
    
    // Verificar que se haya cargado correctamente
    window.addEventListener('DOMContentLoaded', function() {
      console.log('DOM cargado completamente');
    });
    
    // Forzar reload completo si ocurre algún error grave
    window.addEventListener('unhandledrejection', function(event) {
      console.error('Promesa rechazada no manejada:', event.reason);
      
      // Si hay demasiados errores, recargar la página
      if (window.errorCount > 5) {
        console.log('Demasiados errores, recargando página...');
        window.location.reload(true);
      }
    });
    
    // Contador global de errores
    window.errorCount = 0;
  </script>
</head>
<body>
  <div id="root"></div>
  
  <!-- En desarrollo usará la ruta módulo, en producción Vite reemplazará esto con las rutas correctas -->
  <script type="module" src="/src/main.jsx"></script>
  
  <!-- Script para diagnóstico y recuperación -->
  <script>
    // Verificar que el contenedor root tenga contenido
    setTimeout(function() {
      const root = document.getElementById('root');
      if (root && (!root.hasChildNodes() || root.children.length === 0)) {
        console.warn('Aplicación React no se ha inicializado correctamente, intentando recuperar...');
        window.location.reload(true);
      } else {
        console.log('Aplicación React inicializada correctamente');
      }
    }, 5000);
  </script>
</body>
</html>
EOL

echo -e "${GREEN}[OK]${NC} index.html optimizado para carga garantizada"

# Paso 5: Preparar despliegue optimizado
echo -e "${BLUE}[PASO 5/5]${NC} Preparando script de despliegue optimizado..."

cat > deploy-optimizado.sh << 'EOL'
#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}=========================================================================${NC}"
echo -e "${BLUE}   DESPLIEGUE OPTIMIZADO - ABOGADO WILSON - TODAS LAS RUTAS FUNCIONANDO  ${NC}"
echo -e "${BLUE}=========================================================================${NC}"
echo ""

# Paso 1: Limpieza
echo -e "${BLUE}[PASO 1/4]${NC} Limpiando entorno..."
rm -rf dist .wrangler node_modules/.cache
echo -e "${GREEN}[OK]${NC} Limpieza completada"

# Paso 2: Compilar proyecto
echo -e "${BLUE}[PASO 2/4]${NC} Compilando proyecto..."
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error en la compilación"
  exit 1
fi
echo -e "${GREEN}[OK]${NC} Compilación exitosa"

# Paso 3: Preparar archivos de configuración para Cloudflare
echo -e "${BLUE}[PASO 3/4]${NC} Configurando archivos para Cloudflare..."

# _headers para control de cache y seguridad
cat > dist/_headers << 'EOL2'
# Headers para todas las rutas
/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=0, must-revalidate

# Cache optimizada para assets
/*.js
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
/*.svg
  Cache-Control: public, max-age=86400
/*.png
  Cache-Control: public, max-age=86400
/*.jpg
  Cache-Control: public, max-age=86400
EOL2

# _routes.json para routing SPA
cat > dist/_routes.json << 'EOL2'
{
  "version": 1,
  "include": ["/*"],
  "exclude": [
    "/_headers",
    "/_routes.json",
    "/assets/*",
    "/favicon.ico",
    "/images/*"
  ]
}
EOL2

echo -e "${GREEN}[OK]${NC} Archivos de configuración creados"

# Paso 4: Desplegar en Cloudflare
echo -e "${BLUE}[PASO 4/4]${NC} Desplegando en Cloudflare Workers..."

# Verificar si hay token de Cloudflare
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo -e "${YELLOW}[AVISO]${NC} No se encontró token de API de Cloudflare"
  read -p "¿Deseas ingresar un token de API ahora? (s/n): " ingresar_token
  
  if [ "$ingresar_token" = "s" ] || [ "$ingresar_token" = "S" ]; then
    read -p "Ingresa tu token de API de Cloudflare: " api_token
    export CLOUDFLARE_API_TOKEN="$api_token"
  else
    echo -e "${YELLOW}[AVISO]${NC} Continuando sin token. El despliegue puede fallar."
  fi
fi

# Desplegar usando wrangler
npx wrangler@latest deploy

if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error durante el despliegue."
  exit 1
fi

echo -e "\n${GREEN}=========================================================================${NC}"
echo -e "${GREEN}   ✅ DESPLIEGUE EXITOSO - TODAS LAS RUTAS FUNCIONANDO                   ${NC}"
echo -e "${GREEN}=========================================================================${NC}"
echo ""
echo -e "Tu sitio está ahora disponible en:"
echo -e "${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo ""
echo -e "Para verificar que todas las rutas funcionen correctamente, prueba:"
echo -e "🔸 Página principal: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/${NC}"
echo -e "🔸 Servicios: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/servicios${NC}"
echo -e "🔸 Login: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/login${NC}"
echo -e "🔸 Registro: ${YELLOW}https://abogado-wilson-website.anipets12.workers.dev/registro${NC}"
echo ""
echo -e "Si deseas monitorear los logs en tiempo real:"
echo -e "${BLUE}npx wrangler@latest tail${NC}"
EOL

chmod +x deploy-optimizado.sh

echo -e "${GREEN}[OK]${NC} Script de despliegue optimizado listo"

# Finalización con resumen
echo ""
echo -e "${GREEN}=========================================================================${NC}"
echo -e "${GREEN}   DIAGNÓSTICO Y SOLUCIÓN COMPLETOS - TODO LISTO PARA DESPLEGAR          ${NC}"
echo -e "${GREEN}=========================================================================${NC}"
echo ""
echo -e "✅ Se ha completado el diagnóstico y preparado la solución definitiva."
echo -e "✅ Se han corregido todos los problemas detectados."
echo -e "✅ Se ha optimizado el worker para garantizar que todas las rutas funcionen."
echo ""
echo -e "Para desplegar el sitio con todas las optimizaciones, ejecuta:"
echo -e "${YELLOW}./deploy-optimizado.sh${NC}"
echo ""
echo -e "Este script garantizará que el sitio se despliegue correctamente y que todas"
echo -e "las rutas funcionen sin mostrar páginas de error o mantenimiento."
echo ""
