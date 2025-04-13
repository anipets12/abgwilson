/// <reference path="./cloudflare.d.ts" />
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

// Definición simplificada de ambiente
export interface Env {
  ASSETS: KVNamespace
  [key: string]: any
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Headers de seguridad básicos
    const securityHeaders = {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:; img-src 'self' data: https:;",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS"
    };

    // Manejar preflight OPTIONS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...securityHeaders,
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    // Obtener URL
    const url = new URL(request.url);
    
    // Handle API routes if needed (simplified)
    if (url.pathname.startsWith('/api')) {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: {
          'Content-Type': 'application/json',
          ...securityHeaders
        }
      });
    }

    try {
      // Configuración simple para getAssetFromKV
      const options = {
        ASSET_NAMESPACE: env.ASSETS,
        // Habilitar caché para mejor rendimiento
        cacheControl: {
          browserTTL: 60 * 60 * 24, // 1 día en el navegador
          edgeTTL: 60 * 60 * 24 * 7, // 7 días en el edge
          bypassCache: false, // No saltar la caché
        },
      };

      // Manejo especial para el favicon.ico
      if (url.pathname === '/favicon.ico') {
        try {
          // Intentar servir el favicon directamente desde KV
          let favicon = await env.ASSETS.get('favicon.ico', 'arrayBuffer');
          
          // Si no está en KV, usamos un favicon genérico
          if (!favicon) {
            // Favicon genérico de un abogado (1x1 pixel transparente como fallback)
            favicon = new Uint8Array([0,0,0,0]).buffer;
          }
          
          return new Response(favicon, {
            headers: {
              'Content-Type': 'image/x-icon',
              'Cache-Control': 'public, max-age=86400',
            },
          });
        } catch (e) {
          console.error('Error al servir favicon:', e);
          // Si falla, devolvemos una respuesta vacía pero válida
          return new Response(null, {
            status: 204, // No Content
            headers: {
              'Cache-Control': 'public, max-age=86400',
            },
          });
        }
      }
      
      // Para rutas SPA, redirigir todo a index.html
      if (!url.pathname.includes('.') || url.pathname === '/') {
        const indexRequest = new Request(`${url.origin}/index.html`, request);
        const indexAsset = await getAssetFromKV(indexRequest, options);
        
        const response = new Response(indexAsset.body, {
          status: 200,
          headers: indexAsset.headers
        });

        // Añadir headers de seguridad
        Object.entries(securityHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });

        return response;
      }

      // Para otros recursos estáticos
      const asset = await getAssetFromKV(request, options);
      const response = new Response(asset.body, asset);

      // Añadir headers de seguridad
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;
    } catch (error) {
      console.error("Error serving asset:", error);
      
      // Si es un favicon, devolver una respuesta vacía pero válida
      if (url.pathname === '/favicon.ico') {
        return new Response(null, {
          status: 204, // No Content
          headers: {
            'Cache-Control': 'public, max-age=86400',
          },
        });
      }
      
      // Si es una imagen u otro recurso estático, devolver una respuesta vacía
      if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot)$/i)) {
        return new Response(null, {
          status: 204, // No Content
          headers: {
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }
      
      // Intentar servir index.html para rutas SPA en caso de error
      try {
        const indexRequest = new Request(`${url.origin}/index.html`, request);
        const indexAsset = await getAssetFromKV(indexRequest, { ASSET_NAMESPACE: env.ASSETS });
        
        return new Response(indexAsset.body, {
          status: 200,
          headers: {
            ...indexAsset.headers,
            ...securityHeaders
          }
        });
      } catch (e) {
        // Si todo lo demás falla, mostrar una página básica
        return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { color: #2c5282; margin-bottom: 20px; }
    p { margin-bottom: 10px; }
    .card { background-color: #f0f4f8; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .btn { display: inline-block; background-color: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
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
</body>
</html>`, {
          status: 200,
          headers: {
            "Content-Type": "text/html;charset=UTF-8",
            ...securityHeaders
          }
        });
      }
    }
  }
};
