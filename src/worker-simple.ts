/// <reference path="./cloudflare.d.ts" />
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// Definición simplificada de ambiente
export interface Env {
  ASSETS: KVNamespace;
  [key: string]: any;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Headers de seguridad
    const securityHeaders = {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' data: https: blob:; connect-src 'self' https: wss: blob:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:;",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS"
    };

    // Manejar OPTIONS para CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...securityHeaders,
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    const url = new URL(request.url);
    
    try {
      // Determinar si esta es una solicitud de archivo estático con extensión
      const isAssetRequest = url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/);

      if (isAssetRequest) {
        // Para archivos estáticos, servir directamente
        const asset = await getAssetFromKV(request, {
          ASSET_NAMESPACE: env.ASSETS,
          cacheControl: {
            browserTTL: 60 * 60 * 24 * 30, // 30 días
            edgeTTL: 60 * 60 * 24 * 30
          }
        });
        
        if (!asset) {
          throw new Error(`Asset not found: ${url.pathname}`);
        }
        
        return new Response(asset.body, {
          status: 200,
          headers: {
            ...asset.headers,
            ...securityHeaders,
            'Cache-Control': 'public, max-age=2592000, immutable' // 30 días
          }
        });
      } else {
        // Para todas las otras rutas (SPA), servir index.html
        const indexRequest = new Request(`${url.origin}/index.html`, request);
        const indexAsset = await getAssetFromKV(indexRequest, {
          ASSET_NAMESPACE: env.ASSETS,
          cacheControl: {
            browserTTL: 0, // No cachear index.html
            edgeTTL: 0,
            bypassCache: true // Siempre obtener la versión más reciente
          }
        });
        
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
      }
    } catch (error) {
      console.error('Error al servir contenido:', error);
      
      // Página de error simple y útil en caso de fallo
      return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #2c5282; margin-bottom: 20px; }
    p { margin-bottom: 10px; }
    .card { background-color: #f0f4f8; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .btn { display: inline-block; background-color: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; transition: background-color 0.3s; }
    .btn:hover { background-color: #2c5282; }
    .error-message { color: #e53e3e; margin-top: 20px; background: #fff5f5; padding: 10px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <div class="card">
    <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
    <p>Especialista en derecho civil, penal y administrativo.</p>
    <a href="mailto:alexip2@hotmail.com" class="btn">Contactar</a>
  </div>
  <p><strong>Teléfono:</strong> +593 988835269</p>
  <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
  <p class="error-message">El sitio estará disponible en breve. Por favor, intente nuevamente en unos momentos.</p>
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
};
