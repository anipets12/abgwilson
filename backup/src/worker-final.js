/**
 * worker-final.js - Solución DEFINITIVA para SPA en Cloudflare Workers
 * Configurado como ES Module y optimizado para resolver problemas de rutas
 */

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx);
    } catch (error) {
      console.error(`Error global: ${error.message}`);
      return new Response('Error interno del servidor', { status: 500 });
    }
  }
};

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const { pathname } = url;

  // 1. Manejo de archivos estáticos
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/)) {
    try {
      // Usar API específica de Cloudflare Workers para assets estáticos
      const assetUrl = new URL(url.pathname, url.origin);
      const assetResponse = await fetch(assetUrl);
      
      if (assetResponse.ok) {
        const headers = new Headers(assetResponse.headers);
        
        // Optimizar cache según el tipo de archivo
        if (pathname.match(/\.(js|css)$/)) {
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$/)) {
          headers.set('Cache-Control', 'public, max-age=86400');
        }
        
        // Configurar CORS para todos los assets
        headers.set('Access-Control-Allow-Origin', '*');
        
        return new Response(assetResponse.body, {
          status: 200,
          headers
        });
      }
      
      // Si el asset no se encuentra, intentar buscar en el KV si es que existe
      if (env.ASSETS) {
        const kvAsset = await env.ASSETS.get(pathname.replace(/^\//, ''), 'arrayBuffer');
        if (kvAsset) {
          // Determinar el tipo de contenido basado en la extensión
          const contentType = getContentType(pathname);
          return new Response(kvAsset, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=86400',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      }
    } catch (e) {
      console.error(`Error sirviendo asset estático ${pathname}: ${e.message}`);
      // Continuar al siguiente manejador en caso de error
    }
  }
  
  // 2. Manejo de API si existe en un path específico
  if (pathname.startsWith('/api/')) {
    // Este bloque podría manejar solicitudes a la API
    // Si tienes endpoints API, aquí es donde los procesarías
    try {
      // Ejemplo: return await handleApiRequest(request, env);
      return new Response(JSON.stringify({ error: "API no implementada" }), {
        status: 501,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (e) {
      console.error(`Error en API: ${e.message}`);
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }

  // 3. Para cualquier otra ruta (SPA), servir index.html
  try {
    // Obtener index.html como cualquier otro asset
    const indexResponse = await fetch(new URL('/index.html', url.origin));
    
    if (!indexResponse.ok) {
      throw new Error(`Error obteniendo index.html: ${indexResponse.status}`);
    }
    
    const indexContent = await indexResponse.text();
    
    const headers = new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
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
    console.error(`Error sirviendo SPA: ${error.message}`);
    
    // Respuesta de error genérica
    return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error - Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .btn { display: inline-block; background: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
  </style>
  <script>
    // Intentar recuperación automática
    window.addEventListener('DOMContentLoaded', () => {
      // Recargar automáticamente después de 3 segundos
      setTimeout(() => location.reload(true), 3000);
    });
  </script>
</head>
<body>
  <h1>Error Temporal</h1>
  <p>Estamos experimentando dificultades técnicas. El sitio se recargará automáticamente.</p>
  <a href="/" class="btn">Volver al inicio</a>
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

// Función auxiliar para determinar el tipo de contenido basado en la extensión del archivo
function getContentType(pathname) {
  const extension = pathname.split('.').pop().toLowerCase();
  const contentTypeMap = {
    'js': 'application/javascript',
    'css': 'text/css',
    'html': 'text/html',
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
  
  return contentTypeMap[extension] || 'application/octet-stream';
}
