/// <reference path="./cloudflare.d.ts" />
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

// Definición simplificada de ambiente
export interface Env {
  ASSETS: KVNamespace
  [key: string]: any
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Headers de seguridad optimizados para aplicación React SPA
    const securityHeaders = {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' data: https: blob:; connect-src 'self' https: wss: blob:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:;",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS"
    };

    // Manejar preflight OPTIONS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...securityHeaders,
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    // Obtener URL
    const url = new URL(request.url);
    
    // Handle API routes if needed
    if (url.pathname.startsWith('/api')) {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: {
          'Content-Type': 'application/json',
          ...securityHeaders
        }
      });
    }

    try {
      // Configuración para getAssetFromKV
      const options = {
        ASSET_NAMESPACE: env.ASSETS,
        // Estrategia de caché optimizada
        cacheControl: {
          browserTTL: 60 * 60 * 24, // 1 día en el navegador
          edgeTTL: 60 * 60 * 24 * 7, // 7 días en el edge
          bypassCache: false, // No saltar la caché
        }
      };

      // Manejo especial para el favicon.ico
      if (url.pathname === '/favicon.ico') {
        try {
          // Intentar servir el favicon directamente desde KV
          let favicon = await env.ASSETS.get('favicon.ico', 'arrayBuffer');
          
          // Si no está en KV, buscar en otros formatos
          if (!favicon) {
            try {
              favicon = await env.ASSETS.get('favicon.svg', 'arrayBuffer');
            } catch (e) {}
            
            if (!favicon) {
              try {
                favicon = await env.ASSETS.get('favicon.png', 'arrayBuffer');
              } catch (e) {}
            }
            
            if (!favicon) {
              try {
                favicon = await env.ASSETS.get('logo.svg', 'arrayBuffer');
              } catch (e) {}
            }
          }
          
          // Si todavía no se encuentra, usar un favicon genérico
          if (!favicon) {
            favicon = new Uint8Array([0,0,0,0]).buffer;
          }
          
          const contentType = url.pathname.endsWith('.svg') 
            ? 'image/svg+xml' 
            : 'image/x-icon';
            
          return new Response(favicon, {
            headers: {
              'Content-Type': contentType,
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
      
      // Para rutas SPA, servir index.html
      if (!url.pathname.includes('.') || url.pathname === '/') {
        try {
          const indexRequest = new Request(`${url.origin}/index.html`, request);
          const indexAsset = await getAssetFromKV(indexRequest, { ASSET_NAMESPACE: env.ASSETS });
          
          return new Response(indexAsset.body, {
            status: 200,
            headers: {
              ...indexAsset.headers,
              ...securityHeaders,
              'Cache-Control': 'no-cache, no-store, must-revalidate' // No cachear index.html
            }
          });
        } catch (e) {
          console.error("Error al servir index.html para SPA:", e);
          throw e; // Re-lanzar para manejarlo en el catch global
        }
      }
      
      // Para otros recursos estáticos
      try {
        const asset = await getAssetFromKV(request, options);
        
        // Ajustar headers y crear respuesta
        const response = new Response(asset.body, {
          status: 200,
          headers: {
            ...asset.headers,
            ...securityHeaders
          }
        });

        // Ajustar Cache-Control para diferentes tipos de contenido
        const contentType = response.headers.get('content-type') || '';
        
        if (contentType.includes('application/javascript') || 
            contentType.includes('text/css')) {
          // Recursos críticos: JS y CSS con hashes para versiones
          response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (contentType.includes('image/') || 
                  contentType.includes('font/') ||
                  url.pathname.match(/\.(woff|woff2|ttf|eot)$/i)) {
          // Recursos estáticos: imágenes y fuentes
          response.headers.set('Cache-Control', 'public, max-age=604800'); // 7 días
        }

        return response;
      } catch (e) {
        console.error("Error al servir recurso estático:", e);
        throw e; // Re-lanzar para manejarlo en el catch global
      }
    } catch (error) {
      console.error("Error general:", error);
      
      // Si es un recurso estático que no se pudo encontrar, responder con 404 pero sin página de error
      if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot|js|css)$/i)) {
        return new Response(null, {
          status: 404, // Not Found
          headers: {
            'Cache-Control': 'no-cache',
            ...securityHeaders
          },
        });
      }
      
      // Para cualquier otra ruta, servir index.html (comportamiento SPA)
      try {
        const indexRequest = new Request(`${url.origin}/index.html`, request);
        const indexAsset = await getAssetFromKV(indexRequest, { ASSET_NAMESPACE: env.ASSETS });
        
        return new Response(indexAsset.body, {
          status: 200,
          headers: {
            ...indexAsset.headers,
            ...securityHeaders,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      } catch (e) {
        // Error crítico: no se pudo servir index.html
        console.error("Error crítico, no se pudo servir index.html:", e);
        
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
