/**
 * worker-index.js - Worker Definitivo para Abogado Wilson Website
 * Optimizado para Cloudflare Workers Sites con soporte SPA
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;

      // 1. Manejar solicitudes CORS preflight
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

      // 2. Verificar si es un archivo estático (por extensión)
      const isAsset = /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/.test(pathname);
      
      // 3. Verificar si es una solicitud de API
      const isApi = pathname.startsWith('/api/');

      // 4. Para archivos estáticos, servir directamente
      if (isAsset) {
        try {
          // Usar env.ASSETS para acceder al namespace KV de workers sites
          const asset = await env.ASSETS.get(pathname.slice(1), { type: "arrayBuffer" });
          
          if (asset === null) {
            throw new Error(`Asset not found: ${pathname}`);
          }
          
          // Determinar Content-Type basado en la extensión
          let contentType = "application/octet-stream";
          if (pathname.endsWith('.html')) contentType = "text/html; charset=utf-8";
          else if (pathname.endsWith('.css')) contentType = "text/css; charset=utf-8";
          else if (pathname.endsWith('.js')) contentType = "application/javascript; charset=utf-8";
          else if (pathname.endsWith('.json')) contentType = "application/json; charset=utf-8";
          else if (pathname.endsWith('.png')) contentType = "image/png";
          else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) contentType = "image/jpeg";
          else if (pathname.endsWith('.svg')) contentType = "image/svg+xml";
          
          // Headers adecuados según el tipo de archivo
          const headers = {
            "Content-Type": contentType,
            "Cache-Control": pathname.match(/\.(js|css)$/) 
              ? "public, max-age=31536000, immutable" // Cachear JS/CSS por 1 año
              : "public, max-age=86400" // Cachear otros archivos por 1 día
          };
          
          return new Response(asset, { headers });
        } catch (error) {
          console.error(`Error al servir asset ${pathname}:`, error);
          // Intentar caer al KV Asset Handler si falla nuestro método personalizado
          return serveAsset(request, env);
        }
      }
      
      // 5. Para todas las demás rutas no-API (rutas SPA), servir index.html
      if (!isApi) {
        try {
          // Obtener index.html del KV Storage
          const html = await env.ASSETS.get("index.html", { type: "text" });
          
          if (html === null) {
            throw new Error("No se encontró index.html");
          }
          
          return new Response(html, {
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "no-cache, no-store, must-revalidate",
              ...securityHeaders
            }
          });
        } catch (error) {
          console.error("Error al servir index.html:", error);
          return serveAsset(request, env);
        }
      }
      
      // 6. Para solicitudes de API u otras rutas especiales
      // Implementar lógica específica de API si es necesario
      // ...

      // Fallback a Assets KV para cualquier otra ruta
      return serveAsset(request, env);
    } catch (error) {
      console.error("Error global:", error);
      return new Response(`Error del servidor: ${error.message}`, { 
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
};

// Función auxiliar para servir assets usando el mecanismo de Cloudflare Workers Sites
async function serveAsset(request, env) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Para rutas SPA (no-estáticas), redirigir a index.html
    if (!pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/)) {
      const html = await env.ASSETS.get("index.html", { type: "text" });
      
      if (html === null) {
        throw new Error("No se encontró index.html");
      }
      
      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          ...securityHeaders
        }
      });
    }
    
    // Para archivos estáticos, intentar servirlos directamente
    const key = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    const asset = await env.ASSETS.get(key, { type: "arrayBuffer" });
    
    if (asset === null) {
      throw new Error(`Asset not found: ${key}`);
    }
    
    // Determinar Content-Type basado en la extensión
    let contentType = "application/octet-stream";
    if (pathname.endsWith('.html')) contentType = "text/html; charset=utf-8";
    else if (pathname.endsWith('.css')) contentType = "text/css; charset=utf-8";
    else if (pathname.endsWith('.js')) contentType = "application/javascript; charset=utf-8";
    else if (pathname.endsWith('.json')) contentType = "application/json; charset=utf-8";
    else if (pathname.endsWith('.png')) contentType = "image/png";
    else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) contentType = "image/jpeg";
    else if (pathname.endsWith('.svg')) contentType = "image/svg+xml";
    
    return new Response(asset, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": pathname.match(/\.(js|css)$/) 
          ? "public, max-age=31536000, immutable" 
          : "public, max-age=86400",
        ...securityHeaders
      }
    });
  } catch (error) {
    console.error(`Error en serveAsset: ${error.message}`);
    
    // Respuesta de error personalizada
    return createErrorResponse();
  }
}

// Página de error personalizada
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
