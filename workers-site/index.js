/**
 * Archivo de configuración avanzada para Cloudflare Workers
 * Implementa manejo de rutas, caching y optimización para la aplicación Abogado Wilson
 */

import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

const DEBUG = false;

/**
 * Función para manejar eventos fetch del Worker
 */
addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      );
    }
    event.respondWith(new Response('Error interno del servidor', { status: 500 }));
  }
});

/**
 * Función principal para manejar las solicitudes entrantes
 */
async function handleEvent(event) {
  const url = new URL(event.request.url);
  let options = {};

  try {
    // Manejo especial para las rutas de la SPA
    if (!url.pathname.includes('.')) {
      // Asumir que cualquier solicitud sin extensión es para la SPA
      options.mapRequestToAsset = req => {
        // Redireccionar todas las rutas a index.html
        return mapRequestToAsset(new Request(`${new URL(req.url).origin}/index.html`, req));
      };
    }

    // Configuración de cache según el tipo de archivo
    if (url.pathname.match(/\.(js|css)$/)) {
      // Cache más corto para JS y CSS para permitir actualizaciones
      options.cacheControl = {
        browserTTL: 60 * 60 * 24, // 1 día
        edgeTTL: 60 * 60 * 24, // 1 día
        bypassCache: false,
      };
    } else if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|woff|woff2)$/)) {
      // Cache largo para recursos estáticos 
      options.cacheControl = {
        browserTTL: 60 * 60 * 24 * 30, // 30 días
        edgeTTL: 60 * 60 * 24 * 30, // 30 días
        bypassCache: false,
      };
    } else if (url.pathname === '/index.html' || url.pathname === '/') {
      // No cachear el index.html
      options.cacheControl = {
        browserTTL: 0,
        edgeTTL: 0,
        bypassCache: true,
      };
    }

    // Obtener el activo del almacén KV
    const page = await getAssetFromKV(event, options);

    // Configurar encabezados de seguridad para todas las respuestas
    const response = new Response(page.body, page);
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Añadir CSP para mejorar la seguridad
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https:;"
    );

    return response;
  } catch (e) {
    // Si hay un error al recuperar el activo, servir una página de error personalizada
    if (DEBUG) {
      return new Response(e.message || e.toString(), { status: 500 });
    }

    try {
      // Intentar servir una página de error personalizada desde KV
      options.mapRequestToAsset = req => new Request(`${new URL(req.url).origin}/error.html`, req);
      const notFoundResponse = await getAssetFromKV(event, options);
      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 500,
        statusText: 'Error interno del servidor',
      });
    } catch (e) {
      // Si todo falla, mostrar una página de error básica
      return new Response(
        `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error Temporal - Abogado Wilson</title>
          <style>
            body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; text-align: center; }
            .error-container { max-width: 600px; padding: 40px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; margin-bottom: 20px; }
            p { color: #555; line-height: 1.6; margin-bottom: 30px; }
            .btn { display: inline-block; background: #3457dc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>Estamos trabajando en el sitio</h1>
            <p>Estamos realizando mejoras en nuestro servicio. Por favor, intente de nuevo en unos minutos.</p>
            <a href="/" class="btn">Regresar al inicio</a>
          </div>
        </body>
        </html>`,
        {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Cache-Control': 'no-store',
          },
          status: 500,
        },
      );
    }
  }
}
