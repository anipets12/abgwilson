/**
 * solucion-definitiva.js - Solución completa para Abogado Wilson Website
 * Optimizado para Cloudflare Workers, React y Vite con corrección de problemas de inicialización
 */

// Formato ES Module para compatibilidad con Cloudflare D1
export default {
  async fetch(request, env, ctx) {
    try {
      // Registrar cada solicitud para diagnóstico completo
      const url = new URL(request.url);
      console.log(`[REQUEST] ${request.method} ${url.pathname}`);
      
      return await handleRequest(request, env, ctx);
    } catch (error) {
      // Capturar cualquier error no manejado
      console.error(`[ERROR] Error general: ${error.stack || error.message || error}`);
      return generarPaginaError(error.message);
    }
  }
};

/**
 * Manejador principal de solicitudes
 * Esta función determina cómo procesar cada solicitud entrante
 */
async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  console.log(`[DEBUG] Procesando solicitud: ${pathname}`);
  
  // 1. Manejo de preflight CORS OPTIONS
  if (request.method === 'OPTIONS') {
    return handleCors();
  }
  
  // 2. Manejo especial para el manifest.json
  if (pathname === '/manifest.json') {
    return serveManifest();
  }
  
  // 3. Manejo para favicon.ico
  if (pathname === '/favicon.ico') {
    return serveFavicon(request, url);
  }
  
  // 4. Punto crítico: Manejo de assets estáticos y chunks dinámicos
  // Nota: Modificado para detectar correctamente chunks generados por Vite
  if (
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot|json)$/) || 
    pathname.includes('/assets/') ||
    pathname.includes('chunk-') ||
    pathname.includes('.module.') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css')
  ) {
    return await serveStaticAsset(request, env, url, pathname);
  }
  
  // 5. Para TODAS las demás rutas (SPA)
  console.log(`[SPA] Sirviendo aplicación React para ruta: ${pathname}`);
  return await serveSPA(url, env);
}

/**
 * Manejo de CORS
 */
function handleCors() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400'
    }
  });
}

/**
 * Servir manifest.json
 */
function serveManifest() {
  const manifest = {
    name: "Abg. Wilson Alexander Ipiales Guerron",
    short_name: "Abg. Wilson",
    description: "Servicios legales profesionales en Ibarra, Ecuador",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color": "#3c638e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon"
      }
    ]
  };
  
  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}

/**
 * Servir favicon.ico
 */
async function serveFavicon(request, url) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      return response;
    }
    
    // Favicon genérico si no existe
    return new Response('', {
      status: 204,
      statusText: 'No Content'
    });
  } catch (err) {
    console.error('[ERROR] Error sirviendo favicon:', err);
    return new Response('', { status: 204 });
  }
}

/**
 * Servir assets estáticos con diagnóstico y recuperación
 */
async function serveStaticAsset(request, env, url, pathname) {
  try {
    console.log(`[ASSET] Sirviendo asset: ${pathname}`);
    
    // 1. Intentar servir desde origen
    const response = await fetch(request);
    
    if (response.ok) {
      const headers = new Headers(response.headers);
      
      // Configuración correcta de Content-Type para JavaScript
      if (pathname.endsWith('.js')) {
        headers.set('Content-Type', 'application/javascript; charset=utf-8');
      } else if (pathname.endsWith('.css')) {
        headers.set('Content-Type', 'text/css; charset=utf-8');
      } else if (pathname.endsWith('.json')) {
        headers.set('Content-Type', 'application/json; charset=utf-8');
      }
      
      // Configurar cache según tipo
      if (pathname.match(/\.(js|css)$/)) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
        headers.set('Cache-Control', 'public, max-age=86400');
      } else {
        headers.set('Cache-Control', 'public, max-age=3600');
      }
      
      // Headers CORS y seguridad
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('X-Content-Type-Options', 'nosniff');
      
      // Agregar diagnóstico
      headers.set('X-Asset-Served', 'CloudflareWorker');
      
      return new Response(response.body, {
        status: 200,
        headers
      });
    }
    
    console.warn(`[ADVERTENCIA] Asset no encontrado en origen: ${pathname} (${response.status})`);
    
    // 2. Retornar 404 apropiado para assets
    return new Response(`Asset not found: ${pathname}`, {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store'
      }
    });
    
  } catch (error) {
    console.error(`[ERROR] Error sirviendo asset ${pathname}:`, error);
    return new Response(`Error loading asset: ${error.message}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store'
      }
    });
  }
}

/**
 * Servir aplicación SPA (React)
 */
async function serveSPA(url, env) {
  try {
    console.log('[SPA] Obteniendo index.html para SPA');
    
    // Obtener index.html
    const response = await fetch(new URL('/index.html', url.origin));
    
    if (!response.ok) {
      throw new Error(`Error obteniendo index.html: ${response.status}`);
    }
    
    let html = await response.text();
    
    // CORRECCIÓN CRÍTICA: Modificar index.html para garantizar carga de React
    html = html.replace(
      '</head>',
      `<script>
        // Fix para problemas de inicialización de React
        window.addEventListener('load', function() {
          console.log('Verificando inicialización de React...');
          setTimeout(function() {
            const root = document.getElementById('root');
            if (root && (!root.hasChildNodes() || root.children.length === 0)) {
              console.log('React no se ha inicializado correctamente, reintentando...');
              
              // Verificar si hay errores de carga de módulos
              const scriptErrors = Array.from(document.querySelectorAll('script'))
                .filter(s => s.src && !s.hasAttribute('loaded'))
                .map(s => s.src);
                
              if (scriptErrors.length > 0) {
                console.error('Scripts no cargados:', scriptErrors);
              }
              
              // Forzar recarga limpia
              window.location.reload(true);
            } else {
              console.log('React inicializado correctamente');
            }
          }, 2000);
        });
        
        // Marcar scripts como cargados
        document.addEventListener('DOMContentLoaded', function() {
          Array.from(document.querySelectorAll('script[src]')).forEach(script => {
            script.addEventListener('load', function() {
              this.setAttribute('loaded', 'true');
            });
            script.addEventListener('error', function() {
              console.error('Error cargando script:', this.src);
            });
          });
        });
      </script>
      </head>`
    );
    
    // Headers optimizados para SPA
    const headers = new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy': "default-src * 'self' data: blob: 'unsafe-inline' 'unsafe-eval';"
    });
    
    return new Response(html, {
      status: 200,
      headers
    });
    
  } catch (error) {
    console.error('[ERROR] Error sirviendo SPA:', error);
    return generarPaginaError(error.message);
  }
}

/**
 * Generar página de error con UI atractiva
 */
function generarPaginaError(errorMessage = 'Error desconocido') {
  return new Response(`
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abg. Wilson Alexander Ipiales Guerron</title>
    <style>
      * { box-sizing: border-box; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
        line-height: 1.6; 
        color: #333; 
        max-width: 800px;
        margin: 0 auto; 
        padding: 20px; 
        background-color: #f5f7fa;
      }
      .header { text-align: center; margin-bottom: 30px; color: #2c5282; }
      .card { 
        background-color: white;
        border-radius: 8px;
        padding: 25px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        margin-bottom: 20px;
      }
      .error-message {
        font-size: 14px;
        background-color: #f8f9fa;
        border-left: 3px solid #e53e3e;
        padding: 10px;
        margin: 15px 0;
        overflow-wrap: break-word;
      }
      .btn {
        display: inline-block;
        background-color: #3182ce;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        text-decoration: none;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
        border: none;
      }
      .btn:hover { background-color: #2b6cb0; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
    </div>
    
    <div class="card">
      <h2>Servicios legales profesionales en Ibarra, Ecuador.</h2>
      <p>En este momento estamos experimentando dificultades técnicas. Por favor intente nuevamente en unos momentos.</p>
      
      <button class="btn" onclick="window.location.reload(true)">Recargar página</button>
      
      <div class="error-message">
        Diagnóstico: ${errorMessage || 'Error en la aplicación'}
      </div>
    </div>
    
    <script>
      // Recargar automáticamente después de 10 segundos
      setTimeout(() => window.location.reload(true), 10000);
      
      // Registrar diagnóstico
      console.error('Diagnóstico de error:', ${JSON.stringify(errorMessage)});
    </script>
  </body>
  </html>
  `, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-store'
    }
  });
}
