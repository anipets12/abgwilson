/**
 * worker-es-module.js - Worker 100% compatible con Cloudflare D1
 * Escrito en formato ES Module como es requerido por D1
 */

// Exportar como ES Module (requerido para D1)
export default {
  // Esta función es la que maneja todas las solicitudes HTTP
  async fetch(request, env, ctx) {
    return await handleRequest(request, env, ctx);
  }
};

/**
 * Función principal para manejar solicitudes
 */
async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  
  // PARTE 1: SERVIR ARCHIVOS ESTÁTICOS CON EXTENSIONES CONOCIDAS
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/)) {
    try {
      // Intentar servir directamente desde el origen
      const assetResponse = await fetch(request);
      
      if (assetResponse.ok) {
        // Configurar headers óptimos para caching
        const headers = new Headers(assetResponse.headers);
        
        // Configuración de cache optimizada por tipo de archivo
        if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
          headers.set('Cache-Control', 'public, max-age=86400');
        }
        
        // Headers CORS
        headers.set('Access-Control-Allow-Origin', '*');
        
        return new Response(assetResponse.body, {
          status: 200,
          headers
        });
      }
      
      // Si no se encuentra el asset en el origen, intentar en el KV
      if (env.ASSETS) {
        const assetKey = url.pathname.replace(/^\//, '');
        const asset = await env.ASSETS.get(assetKey, 'arrayBuffer');
        
        if (asset) {
          const contentType = getContentType(url.pathname);
          return new Response(asset, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=86400',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      }
    } catch (error) {
      // Si hay un error, continuar al siguiente manejador
      console.error(`Error serving asset: ${error.message}`);
    }
  }
  
  // PARTE 2: PARA TODAS LAS DEMÁS RUTAS, SERVIR EL SPA (index.html)
  try {
    // Obtener index.html
    const indexResponse = await fetch(new URL('/index.html', url.origin));
    
    if (!indexResponse.ok) {
      throw new Error(`Error fetching index.html: ${indexResponse.status}`);
    }
    
    // Obtener el contenido como texto para garantizar integridad
    const indexContent = await indexResponse.text();
    
    // Headers optimizados para SPA
    const headers = new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Access-Control-Allow-Origin': '*'
    });
    
    return new Response(indexContent, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error(`Error serving SPA: ${error.message}`);
    
    // En caso de error, devolver una página de error amigable
    return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2c5282; }
    .card { background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .btn { display: inline-block; background: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <div class="card">
    <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
    <p>Estamos experimentando problemas técnicos temporales. Por favor intente de nuevo en unos minutos.</p>
    <a href="/" class="btn">Volver al inicio</a>
  </div>
  <script>
    // Recargar automáticamente después de 5 segundos
    setTimeout(() => window.location.reload(), 5000);
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
