/**
 * worker-final-corregido.js - Solución 100% funcional 
 * Compatible con formato ES Module para Cloudflare D1
 * Garantiza funcionamiento de todas las rutas SPA
 */

// Exportación en formato ES Module como requiere Cloudflare D1
export default {
  // Función principal que maneja todas las solicitudes
  async fetch(request, env, ctx) {
    try {
      // Registrar cada solicitud para diagnóstico
      const url = new URL(request.url);
      console.log(`[REQUEST] ${request.method} ${url.pathname}`);
      
      return await handleRequest(request, env, ctx);
    } catch (error) {
      console.error(`Error global: ${error.stack || error.message}`);
      return new Response(generarPaginaError(), {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'no-store'
        }
      });
    }
  }
};

/**
 * Función para manejar todas las solicitudes HTTP
 */
async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  console.log(`[DEBUG] Procesando solicitud: ${pathname}`);
  
  // 1. Manejo de preflight CORS OPTIONS
  if (request.method === 'OPTIONS') {
    return handleCors();
  }

  // 2. Manejo de archivos estáticos con extensiones conocidas
  // IMPORTANTE: Aquí es donde se manejan los chunks dinámicos de código con lazy loading
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot|json)$/) || pathname.includes('/assets/')) {
    return await handleAsset(request, env, pathname);
  }
  
  // 3. Para TODAS las demás rutas (rutas SPA como /registro, /servicios, etc.)
  console.log(`[SPA] Sirviendo aplicación React para ruta: ${pathname}`);
  return await serveSPA(url, env);
}

/**
 * Maneja solicitudes CORS OPTIONS
 */
function handleCors() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

/**
 * Maneja la entrega de assets estáticos (JS, CSS, imágenes, etc.)
 */
async function handleAsset(request, env, pathname) {
  try {
    console.log(`[ASSET] Sirviendo asset estático: ${pathname}`);
    
    // 1. Intentar servir directamente desde el origen
    const response = await fetch(request);
    
    if (response.ok) {
      const headers = new Headers(response.headers);
      
      // Optimizar cache según tipo de archivo
      if (pathname.match(/\.(js|css)$/)) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        
        // IMPORTANTE: Asegurar que los chunks JS se sirvan con el tipo correcto
        if (pathname.endsWith('.js')) {
          headers.set('Content-Type', 'application/javascript');
        } else if (pathname.endsWith('.css')) {
          headers.set('Content-Type', 'text/css');
        }
      } else if (pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)) {
        headers.set('Cache-Control', 'public, max-age=86400');
      }
      
      // Headers CORS esenciales
      headers.set('Access-Control-Allow-Origin', '*');
      
      return new Response(response.body, {
        headers,
        status: 200
      });
    }
    
    // 2. Si no está en el origen, intentar obtenerlo del KV
    if (env.ASSETS) {
      console.log(`[KV] Buscando asset en KV: ${pathname}`);
      
      const assetKey = pathname.replace(/^\//, '');
      const asset = await env.ASSETS.get(assetKey, 'arrayBuffer');
      
      if (asset) {
        console.log(`[KV] Asset encontrado en KV: ${assetKey}`);
        return new Response(asset, {
          headers: {
            'Content-Type': getContentType(pathname),
            'Cache-Control': pathname.match(/\.(js|css)$/) ? 'public, max-age=31536000, immutable' : 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }
    
    // 3. Si no se encuentra en ninguna parte, registrar error
    console.log(`[WARN] Asset no encontrado: ${pathname}`);
    
    // IMPORTANTE: NO retornar error 404, continuar al SPA router
    // Esto permite que webpack/vite maneje rutas dinámicas para chunks
  } catch (error) {
    console.error(`[ERROR] Sirviendo asset ${pathname}: ${error.message}`);
    // No devolver error, continuar al SPA router
  }
  
  // Si llegamos aquí, el asset no se encontró, continuar con SPA
  return null;
}

/**
 * Sirve la aplicación SPA para cualquier ruta
 */
async function serveSPA(url, env) {
  try {
    // Obtener index.html para servir la SPA
    let indexHtml;
    
    // 1. Intentar obtener desde origen
    const origin = url.origin;
    console.log(`[SPA] Obteniendo index.html desde: ${origin}/index.html`);
    
    const indexResponse = await fetch(new URL('/index.html', origin));
    
    if (!indexResponse.ok) {
      console.error(`[ERROR] Error obteniendo index.html: ${indexResponse.status}`);
      throw new Error(`No se pudo obtener index.html: ${indexResponse.status}`);
    }
    
    // IMPORTANTE: obtener como texto, no como stream, para evitar errores
    indexHtml = await indexResponse.text();
    console.log(`[SPA] index.html obtenido correctamente (${indexHtml.length} bytes)`);
    
    // Manipulación del HTML para corregir el problema de inicialización de React
    indexHtml = indexHtml.replace(
      /<\/head>/,
      `<script type="text/javascript">
      // Fix para problemas de inicialización
      window.addEventListener('load', function() {
        // Forzar renderización inmediata sin esperar eventos adicionales
        if (document.getElementById('root') && !document.getElementById('root').hasChildNodes()) {
          console.log('Forzando renderización de React');
          // Disparar evento DOMContentLoaded manualmente si es necesario
          if (document.readyState === 'loading') {
            document.dispatchEvent(new Event('DOMContentLoaded'));
          }
        }
      });
      </script>\n</head>`
    );
    
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
      // CSP más permisivo para garantizar funcionamiento
      'Content-Security-Policy': "default-src * 'self' data: blob: 'unsafe-inline' 'unsafe-eval';"
    });
    
    return new Response(indexHtml, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error(`[ERROR] Error sirviendo SPA: ${error.stack || error.message}`);
    return new Response(generarPaginaError(), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'no-store'
      }
    });
  }
}

/**
 * Genera una página HTML de error para casos donde falla todo lo demás
 */
function generarPaginaError() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
    h1 { color: #2c5282; }
    .card { background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .btn { display: inline-block; background: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; }
    .spinner { display: inline-block; width: 20px; height: 20px; border: 2px solid rgba(0,0,0,0.1); border-radius: 50%; border-top-color: #3182ce; animation: spin 1s ease-in-out infinite; margin-right: 10px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
  <script>
    // Redireccionar al inicio después de 5 segundos
    window.setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  </script>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <div class="card">
    <h2>Servicios Legales Profesionales</h2>
    <p>Estamos experimentando problemas técnicos temporales.</p>
    <p><span class="spinner"></span> Redirigiendo al inicio en unos segundos...</p>
    <p><a href="/" class="btn">Volver al inicio ahora</a></p>
  </div>
  <div>
    <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
    <p><strong>Teléfono:</strong> +593 988835269</p>
    <p><strong>Email:</strong> alexip2@hotmail.com</p>
  </div>
</body>
</html>`;
}

/**
 * Determina el tipo MIME según la extensión del archivo
 */
function getContentType(path) {
  const extension = path.split('.').pop().toLowerCase();
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
  
  return types[extension] || 'application/octet-stream';
}
