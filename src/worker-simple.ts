/// <reference path="./cloudflare.d.ts" />
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export interface Env {
  ASSETS: KVNamespace;
  [key: string]: any;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Constantes para el manejo de rutas
    const url = new URL(request.url);
    const METHOD = request.method;

    // Headers básicos de seguridad
    const securityHeaders = {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' data: https: blob:; connect-src 'self' https: wss: blob:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:;",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS"
    };

    // Manejar CORS pre-flight OPTIONS
    if (METHOD === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...securityHeaders,
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    // Opciones para KV Asset Handler
    const options = {
      ASSET_NAMESPACE: env.ASSETS,
      cacheControl: {
        // No cachear nada para evitar problemas durante desarrollo
        browserTTL: 0,
        edgeTTL: 0,
        bypassCache: true
      },
      // Esto es crucial: mapear todas las rutas no-estáticas a index.html
      mapRequestToAsset: (req: Request) => {
        const reqUrl = new URL(req.url);
        const pathname = reqUrl.pathname;

        // Si es un archivo estático con extensión, servir directamente
        if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
          return req;
        }

        // Cualquier otra ruta, servir index.html para SPA routing
        return new Request(`${reqUrl.origin}/index.html`, req);
      }
    };

    try {
      console.log(`Procesando solicitud para: ${url.pathname}`);
      
      // Obtener asset de KV storage
      const asset = await getAssetFromKV(request, options);
      
      // Personalizar cache-control basado en tipo de contenido
      let cacheControl = 'no-store, no-cache, must-revalidate';
      
      // Si es un archivo estático, permitir cache
      if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        const contentType = asset.headers.get('content-type') || '';
        if (contentType.includes('javascript') || contentType.includes('css')) {
          cacheControl = 'public, max-age=31536000, immutable';
        } else if (contentType.includes('image/') || contentType.includes('font/')) {
          cacheControl = 'public, max-age=86400';
        }
      }

      // Devolver respuesta con headers adecuados
      return new Response(asset.body, {
        status: 200,
        headers: {
          ...asset.headers,
          ...securityHeaders,
          'Cache-Control': cacheControl
        }
      });
    } catch (err) {
      console.error(`Error al servir la solicitud para ${url.pathname}: ${err instanceof Error ? err.message : String(err)}`);
      
      // Intento final de servir index.html para cualquier ruta
      try {
        const fallbackRequest = new Request(`${url.origin}/index.html`, request);
        const fallbackAsset = await getAssetFromKV(fallbackRequest, {
          ASSET_NAMESPACE: env.ASSETS,
          cacheControl: { bypassCache: true }
        });
        
        return new Response(fallbackAsset.body, {
          status: 200,
          headers: {
            ...fallbackAsset.headers,
            ...securityHeaders,
            'Cache-Control': 'no-store, no-cache, must-revalidate'
          }
        });
      } catch (fallbackErr) {
        console.error(`Error crítico al servir index.html: ${fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr)}`);
        
        // Respuesta de emergencia en caso de error total
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
    .btn { background: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <div class="card">
    <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
    <p>Especialista en derecho civil, penal y administrativo.</p>
    <a href="javascript:location.reload(true)" class="btn">Recargar página</a>
  </div>
  <p><strong>Teléfono:</strong> +593 988835269</p>
  <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
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
