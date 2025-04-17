/**
 * Worker optimizado y simplificado para la aplicación SPA de Abogado Wilson
 * Garantiza manejo correcto de rutas SPA y archivos estáticos
 */

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// Headers de seguridad estándar
const securityHeaders = {
  "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; connect-src 'self' https: wss:; font-src 'self' https: data:; img-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Manejar CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          ...securityHeaders,
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    console.log(`[Worker] Procesando ruta: ${pathname}`);

    try {
      // Configurar opciones para KV asset handler
      const options = {
        ASSET_NAMESPACE: env.ASSETS,
        cacheControl: {
          bypassCache: false,
          edgeTTL: 2 * 60 * 60 * 24, // 2 días en borde
          browserTTL: 8 * 60 * 60 // 8 horas en navegador
        },
        // Función crítica que determina como servir rutas para SPA
        mapRequestToAsset: (req) => {
          const reqUrl = new URL(req.url);
          const pathname = reqUrl.pathname;
          
          // Verificar si es un asset estático por extensión
          if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/)) {
            console.log(`[Worker] Sirviendo archivo estático: ${pathname}`);
            return req;
          }
          
          // Si no es un archivo estático, servir index.html (clave para SPA)
          console.log(`[Worker] Sirviendo SPA (index.html) para ruta: ${pathname}`);
          return new Request(`${reqUrl.origin}/index.html`, req);
        }
      };

      // Obtener el asset desde KV
      const asset = await getAssetFromKV(request, options);
      
      // Configurar cache-control según el tipo de archivo
      let cacheControl;
      if (pathname.match(/\.(js|css)$/)) {
        // Archivos JS y CSS versionados - cache largo
        cacheControl = 'public, max-age=31536000, immutable';
      } else if (pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$/)) {
        // Multimedia - cache medio
        cacheControl = 'public, max-age=86400';
      } else {
        // HTML y otros - no cachear
        cacheControl = 'public, max-age=0, must-revalidate';
      }

      // Construir respuesta con headers optimizados
      return new Response(asset.body, {
        status: 200,
        headers: {
          ...asset.headers,
          ...securityHeaders,
          'Cache-Control': cacheControl
        }
      });
    } catch (error) {
      console.error(`[Worker] Error en ruta ${pathname}: ${error.message || error.toString()}`);
      
      // Intentar servir index.html como fallback para cualquier ruta
      try {
        console.log('[Worker] Intentando fallback a index.html');
        const fallbackUrl = `${url.origin}/index.html`;
        const fallbackRequest = new Request(fallbackUrl, request);
        const fallbackOptions = {
          ASSET_NAMESPACE: env.ASSETS,
          cacheControl: { bypassCache: true }
        };
        
        const fallbackAsset = await getAssetFromKV(fallbackRequest, fallbackOptions);
        
        return new Response(fallbackAsset.body, {
          status: 200,
          headers: {
            ...fallbackAsset.headers,
            ...securityHeaders,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      } catch (fallbackError) {
        console.error(`[Worker] Error crítico en fallback: ${fallbackError.message || fallbackError.toString()}`);
        
        // Página de error generada dinámicamente como último recurso
        return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #2c5282; margin-top: 40px; }
    .card { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .btn { display: inline-block; background: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-weight: 500; }
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
    <a href="javascript:window.location.reload(true)" class="btn">Recargar sitio</a>
  </div>
  
  <p class="error-msg">Estamos realizando mejoras en el sitio. Por favor intente nuevamente en unos momentos.</p>
  
  <div class="info">
    <p><strong>Teléfono:</strong> +593 988835269</p>
    <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
    <p><strong>Email:</strong> alexip2@hotmail.com</p>
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
  }
};
