/// <reference path="./cloudflare.d.ts" />
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export interface Env {
  ASSETS: KVNamespace;
  [key: string]: any;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Headers básicos de seguridad
    const securityHeaders = {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' data: https: blob:; connect-src 'self' https: wss: blob:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:;",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS"
    };

    // Manejo de CORS pre-flight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...securityHeaders,
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    // Url de la petición
    const url = new URL(request.url);

    try {
      // Opción 1: Si es una petición a un asset específico (JS, CSS, imágenes, etc)
      if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        console.log(`Sirviendo asset estático: ${url.pathname}`);
        const asset = await getAssetFromKV(request, {
          ASSET_NAMESPACE: env.ASSETS,
        });

        // Respuesta para recursos estáticos con caché prolongado
        return new Response(asset.body, {
          status: 200,
          headers: {
            ...asset.headers,
            ...securityHeaders,
            'Cache-Control': 'public, max-age=31536000, immutable',
          }
        });
      }
      
      // Opción 2: Para cualquier otra ruta, servir index.html (SPA routing)
      console.log(`Sirviendo SPA para ruta: ${url.pathname}`);
      const indexRequest = new Request(`${url.origin}/index.html`, request);
      const indexAsset = await getAssetFromKV(indexRequest, {
        ASSET_NAMESPACE: env.ASSETS,
        cacheControl: {
          bypassCache: true, // Siempre obtener la versión más reciente
          browserTTL: 0,     // No cachear en el navegador
          edgeTTL: 0,        // No cachear en el edge
        }
      });

      // Respuesta para la aplicación SPA
      return new Response(indexAsset.body, {
        status: 200,
        headers: {
          ...indexAsset.headers,
          ...securityHeaders,
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    } catch (err: any) {
      // Convertir el error a tipo conocido
      const error = err instanceof Error ? err : new Error(String(err));
      console.error(`Error en worker: ${error.message}`);
      
      // Intentar un último recurso para servir index.html (fallback absoluto)
      try {
        console.log("Intento de recuperación: sirviendo index.html como último recurso");
        const fallbackRequest = new Request(`${url.origin}/index.html`, new Request(url.toString(), {
          method: 'GET',
          headers: request.headers
        }));
        
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
      } catch (fallbackErr: any) {
        // Convertir el error a tipo conocido
        const fallbackError = fallbackErr instanceof Error ? fallbackErr : new Error(String(fallbackErr));
        console.error(`Error crítico, no se pudo servir index.html: ${fallbackError.message}`);
        
        // Página estática mínima solo como último recurso absoluto
        return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
    h1 { color: #2c5282; }
    .card { background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .btn { display: inline-block; background: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <div class="card">
    <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
    <p>Especialista en derecho civil, penal y administrativo.</p>
    <a href="javascript:window.location.reload()" class="btn">Recargar página</a>
  </div>
  <p><strong>Teléfono:</strong> +593 988835269</p>
  <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
  <p style="color:#e53e3e">Servicio temporalmente interrumpido. Por favor recargue la página o intente más tarde.</p>
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
