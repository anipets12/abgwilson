/**
 * solucion-final.js - Worker optimizado final para resolver todos los problemas
 */

// Este worker usa el formato ES Module requerido por D1
export default {
  // Implementamos la interfaz fetch que Cloudflare Workers usa
  async fetch(request, env, ctx) {
    return await handleRequest(request, env, ctx);
  }
};

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Para solicitudes de archivos estáticos con extensiones conocidas
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/)) {
    try {
      // Usando la API de assets de Cloudflare Workers
      if (env.ASSETS) {
        const assetKey = pathname.replace(/^\//, '');
        const asset = await env.ASSETS.get(assetKey, 'arrayBuffer');
        
        if (asset) {
          // Configurar headers adecuados
          const headers = new Headers();
          headers.set('Content-Type', getContentType(pathname));
          
          // Configurar cache óptimo según tipo de archivo
          if (pathname.endsWith('.js') || pathname.endsWith('.css')) {
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          } else {
            headers.set('Cache-Control', 'public, max-age=86400');
          }
          
          // Configurar CORS
          headers.set('Access-Control-Allow-Origin', '*');
          
          return new Response(asset, { 
            headers,
            status: 200 
          });
        }
      }
      
      // Si no está en KV o no hay KV, intentar servir normalmente
      const assetResponse = await fetch(request);
      if (assetResponse.status === 200) {
        return assetResponse;
      }
    } catch (e) {
      console.error(`Error al servir ${pathname}: ${e.message}`);
    }
  }
  
  // Para cualquier otra ruta - manejar como SPA
  try {
    // Buscar primero en Assets KV si existe
    let content;
    
    if (env.ASSETS) {
      content = await env.ASSETS.get('index.html');
    }
    
    // Si no está en KV, obtener desde origin
    if (!content) {
      const response = await fetch(new URL('/index.html', url.origin));
      if (response.ok) {
        content = await response.text();
      } else {
        throw new Error(`No se pudo obtener index.html: ${response.status}`);
      }
    }
    
    // Headers optimizados para SPA
    const headers = new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, private, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Access-Control-Allow-Origin': '*'
    });
    
    return new Response(content, {
      headers,
      status: 200
    });
  } catch (error) {
    console.error(`Error al servir SPA: ${error.message}`);
    
    // Respuesta genérica en caso de error
    return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2c5282; text-align: center; }
    .card { background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .btn { display: inline-block; background: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>Sitio en mantenimiento</h1>
  <div class="card">
    <p>Pronto estaremos de vuelta con servicios legales profesionales.</p>
    <a href="/" class="btn">Recargar</a>
  </div>
  <script>
    // Recargar automáticamente después de 5 segundos
    setTimeout(() => location.reload(), 5000);
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

// Utilidad para determinar el tipo MIME según la extensión
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
