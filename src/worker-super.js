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
