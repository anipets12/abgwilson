/**
 * Worker simplificado para Abogado Wilson Website
 * Enfoque: servir correctamente aplicación SPA React
 */

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// Opciones para servir activos estáticos
const defaultOptions = {
  cacheControl: {
    browserTTL: null,
    edgeTTL: 2 * 60 * 60 * 24, // 2 días en edge
    bypassCache: false, // No saltar caché
  },
  // Función crítica para manejo de rutas SPA
  mapRequestToAsset: (request) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Archivos estáticos se sirven directamente
    if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      return request;
    }

    // Para todas las demás rutas, servir index.html (SPA)
    return new Request(`${url.origin}/index.html`, request);
  },
};

// Headers de seguridad estándar
const securityHeaders = {
  "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' data: https: blob:; connect-src 'self' https: wss: blob:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:;",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS"
};

// Handler principal
export default {
  async fetch(request, env, ctx) {
    try {
      // Manejar preflight CORS 
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            ...securityHeaders,
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Access-Control-Max-Age": "86400"
          }
        });
      }

      // Variables para logging y diagnóstico
      const url = new URL(request.url);
      const pathname = url.pathname;
      console.log(`Procesando ruta: ${pathname}`);
      
      // Obtener activo de KV
      const asset = await getAssetFromKV(request, {
        ASSET_NAMESPACE: env.ASSETS,
        ...defaultOptions
      });

      // Ajustar el Cache-Control según el tipo de activo
      let cacheControl;
      if (pathname.match(/\.(js|css)$/)) {
        cacheControl = 'public, max-age=31536000, immutable'; // 1 año para JS/CSS versionados
      } else if (pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        cacheControl = 'public, max-age=86400'; // 1 día para multimedia
      } else {
        cacheControl = 'no-cache, no-store, must-revalidate'; // No cachear HTML
      }

      // Respuesta exitosa
      return new Response(asset.body, {
        headers: {
          ...asset.headers,
          ...securityHeaders,
          'Cache-Control': cacheControl
        }
      });
    } catch (error) {
      console.error(`Error en worker: ${error.message || error.toString()}`);
      
      // Intento de recuperación para aplicación SPA
      try {
        const fallbackRequest = new Request(`${new URL(request.url).origin}/index.html`, request);
        const fallbackAsset = await getAssetFromKV(fallbackRequest, {
          ASSET_NAMESPACE: env.ASSETS,
          cacheControl: { bypassCache: true }
        });

        // Último intento de servir la SPA
        console.log('Recuperación: Sirviendo index.html como fallback para SPA');
        return new Response(fallbackAsset.body, {
          headers: {
            ...fallbackAsset.headers,
            ...securityHeaders,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      } catch (fallbackError) {
        console.error(`Error crítico: ${fallbackError.message || fallbackError.toString()}`);
        
        // Página de error elegante como último recurso
        return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { color: #2c5282; }
    p { margin-bottom: 16px; }
    .card { background: #f0f4f8; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .btn { display: inline-block; background-color: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
    .notice { border-left: 4px solid #e53e3e; padding-left: 15px; margin: 20px 0; color: #e53e3e; }
    .contact { margin-top: 30px; color: #4a5568; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <div class="card">
    <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
    <p>Especialista en derecho civil, penal y administrativo.</p>
    <a href="javascript:window.location.reload(true)" class="btn">Recargar sitio</a>
  </div>
  
  <p class="notice">Estamos realizando mejoras en el sitio web. Por favor intente nuevamente en unos momentos.</p>
  
  <div class="contact">
    <p><strong>Teléfono:</strong> +593 988835269</p>
    <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
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
