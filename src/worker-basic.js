/**
 * worker-basic.js - Solución definitiva para SPA en Cloudflare Workers
 * Versión ultra-simple y altamente compatible 
 */

// Utiliza la API de Cloudflare Workers Sites más reciente
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    try {
      // CORS preflight - Importante para APIs
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Access-Control-Max-Age": "86400"
          }
        });
      }

      // Para archivos estáticos con extensión conocida - servir directamente
      if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|json)$/)) {
        console.log(`[Worker] Sirviendo archivo estático: ${pathname}`);
        
        // Método 1: Usar el namespace ASSETS para obtener archivos estáticos
        try {
          // Quitar el / inicial para obtener la ruta relativa en el KV namespace
          const key = pathname.startsWith('/') ? pathname.substring(1) : pathname;
          const asset = await env.ASSETS.get(key, { type: 'arrayBuffer' });
          
          if (asset === null) {
            throw new Error(`Asset no encontrado en KV: ${key}`);
          }
          
          // Determinar tipo de contenido según extensión
          let contentType = 'application/octet-stream';
          if (pathname.endsWith('.html')) contentType = 'text/html; charset=UTF-8';
          else if (pathname.endsWith('.css')) contentType = 'text/css; charset=UTF-8';
          else if (pathname.endsWith('.js')) contentType = 'application/javascript; charset=UTF-8';
          else if (pathname.endsWith('.json')) contentType = 'application/json; charset=UTF-8';
          else if (pathname.endsWith('.png')) contentType = 'image/png';
          else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) contentType = 'image/jpeg';
          else if (pathname.endsWith('.svg')) contentType = 'image/svg+xml';
          else if (pathname.endsWith('.ico')) contentType = 'image/x-icon';
          
          // Determinar cache-control según tipo de archivo
          let cacheControl;
          if (pathname.match(/\.(js|css)$/)) {
            cacheControl = 'public, max-age=31536000, immutable'; // 1 año para JS/CSS versionados
          } else if (pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$/)) {
            cacheControl = 'public, max-age=86400'; // 1 día para imágenes y fuentes
          } else {
            cacheControl = 'public, max-age=60'; // 1 minuto para otros tipos
          }
          
          return new Response(asset, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': cacheControl,
              ...securityHeaders
            }
          });
        } catch (assetError) {
          console.error(`[Worker] Error obteniendo asset de KV: ${assetError.message}`);
          
          // Método 2: Fallback a fetch request normal
          try {
            console.log(`[Worker] Intentando servir via fetch: ${request.url}`);
            return fetch(request);
          } catch (fetchError) {
            console.error(`[Worker] Error en fetch fallback: ${fetchError.message}`);
            throw fetchError; // Re-lanzar para manejarlo en el catch externo
          }
        }
      }

      // Para todas las demás rutas (SPA) - servir index.html
      console.log(`[Worker] Sirviendo SPA (index.html) para ruta: ${pathname}`);
      
      // Método 1: Intentar obtener index.html del namespace ASSETS
      try {
        const html = await env.ASSETS.get('index.html', { type: 'text' });
        
        if (html === null) {
          throw new Error('index.html no encontrado en KV namespace');
        }
        
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            ...securityHeaders
          }
        });
      } catch (htmlError) {
        console.error(`[Worker] Error obteniendo index.html de KV: ${htmlError.message}`);
        
        // Método 2: Fallback a fetch request para index.html
        try {
          console.log('[Worker] Intentando servir index.html via fetch');
          const response = await fetch(new URL('/index.html', url.origin));
          
          if (!response.ok) {
            throw new Error(`Error fetch index.html: ${response.status}`);
          }
          
          const html = await response.text();
          
          return new Response(html, {
            headers: {
              'Content-Type': 'text/html; charset=UTF-8',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              ...securityHeaders
            }
          });
        } catch (fetchHtmlError) {
          console.error(`[Worker] Error en fetch index.html: ${fetchHtmlError.message}`);
          throw fetchHtmlError; // Re-lanzar para manejarlo en el catch externo
        }
      }
    } catch (error) {
      console.error(`[Worker] Error global: ${error.stack || error.message || error}`);
      return createErrorResponse();
    }
  }
};

// Función para crear respuesta de error personalizada
function createErrorResponse() {
  return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #2c5282; margin-top: 40px; text-align: center; }
    .card { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .btn { display: inline-block; background: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-weight: 500; cursor: pointer; }
    .btn:hover { background: #2c5282; }
    .info { margin-top: 30px; }
    .error-msg { border-left: 4px solid #e53e3e; padding-left: 15px; margin: 20px 0; color: #e53e3e; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  
  <div class="card">
    <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
    <p>Especialista en derecho civil, penal y administrativo.</p>
    <button onclick="location.reload(true)" class="btn">Recargar sitio</button>
  </div>
  
  <p class="error-msg">Estamos realizando mejoras en el sitio web. Por favor intente nuevamente en unos momentos.</p>
  
  <div class="info">
    <p><strong>Teléfono:</strong> +593 988835269</p>
    <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
    <p><strong>Email:</strong> alexip2@hotmail.com</p>
  </div>

  <script>
    // Intenta recargar automáticamente después de 5 segundos
    setTimeout(() => {
      location.reload(true);
    }, 5000);
  </script>
</body>
</html>`, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      ...securityHeaders
    }
  });
}

// Headers de seguridad estándar
const securityHeaders = {
  "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; connect-src 'self' https: wss:; font-src 'self' https: data:; img-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin"
};
