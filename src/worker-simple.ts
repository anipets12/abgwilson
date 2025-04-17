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
        },
        // Configuración para manejar rutas SPA
        mapRequestToAsset: (req) => {
          const parsedUrl = new URL(req.url);
          
          // Las rutas específicas de la aplicación React
          const spaRoutes = [
            '/',
            '/servicios',
            '/contacto',
            '/iniciar-sesion',
            '/registro',
            '/dashboard',
            '/politica-privacidad',
            '/terminos-condiciones',
            '/consultas',
            '/pago',
            '/gracias'
          ];
          
          // Si es una ruta de SPA o no contiene extensión de archivo, servir index.html
          if (spaRoutes.includes(parsedUrl.pathname) || 
              !parsedUrl.pathname.includes('.') || 
              parsedUrl.pathname === '/') {
            return new Request(`${parsedUrl.origin}/index.html`, req);
          }
          
          return req;
        }
      };

      // Manejo especial para el favicon.ico
      if (url.pathname === '/favicon.ico') {
        try {
          // Intentar servir el favicon directamente desde KV
          let favicon = await env.ASSETS.get('favicon.ico', 'arrayBuffer');
          
          // Si no está en KV, buscar en otros formatos
          if (!favicon) {
            favicon = await env.ASSETS.get('favicon.svg', 'arrayBuffer') ||
                     await env.ASSETS.get('favicon.png', 'arrayBuffer') ||
                     await env.ASSETS.get('logo.svg', 'arrayBuffer');
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
      
      // Para otros recursos estáticos o rutas SPA
      let asset;
      try {
        asset = await getAssetFromKV(request, options);
      } catch (e) {
        // Si no se encuentra el activo directamente, intentar servir index.html para rutas SPA
        if (!url.pathname.includes('.')) {
          const indexRequest = new Request(`${url.origin}/index.html`, request);
          asset = await getAssetFromKV(indexRequest, { ASSET_NAMESPACE: env.ASSETS });
        } else {
          throw e;
        }
      }
      
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
      } else if (url.pathname === '/index.html' || !url.pathname.includes('.')) {
        // Para index.html y rutas SPA, no cachear para evitar problemas con actualizaciones
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      }

      return response;
    } catch (error) {
      console.error("Error serving asset:", error);
      
      // Siempre intentar servir index.html para cualquier error en rutas SPA
      // Esto garantiza que no se muestre una página de error
      if (!url.pathname.includes('.') || url.pathname === '/') {
        try {
          const indexRequest = new Request(`${url.origin}/index.html`, request);
          const indexAsset = await getAssetFromKV(indexRequest, { ASSET_NAMESPACE: env.ASSETS });
          
          return new Response(indexAsset.body, {
            status: 200, // OK - Para que no haya errores de navegación
            headers: {
              ...indexAsset.headers,
              ...securityHeaders,
              'Cache-Control': 'no-cache, no-store, must-revalidate' // No cachear index.html
            }
          });
        } catch (e) {
          // Aquí no entrará en una instancia correctamente configurada
          console.error("Error crítico, no se pudo servir index.html:", e);
        }
      }
      
      // Si es un recurso estático que no se pudo encontrar, responder con 404 pero sin página de error
      if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot)$/i)) {
        return new Response(null, {
          status: 204, // No Content en lugar de 404 para evitar errores en consola
          headers: {
            'Cache-Control': 'no-cache',
            ...securityHeaders
          },
        });
      }
      
      // En caso de que todo falle, redirigir a la página principal en lugar de mostrar error
      return Response.redirect(url.origin, 302);
    }
  }
};
