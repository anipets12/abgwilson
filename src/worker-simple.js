/**
 * Worker Cloudflare avanzado con solución robusta para el error 1042
 * Optimizado para Abogado Wilson con soporte completo para SPA, CORS y almacenamiento en Supabase
 * @author Wilson Alexander Ipiales Guerron
 * @version 2.0.0
 */

// Configuración de encabezados CORS completos
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, X-Requested-With, Accept, Range, X-Auth-Token',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range',
  'Access-Control-Max-Age': '86400', // 24 horas
  'Access-Control-Allow-Credentials': 'true'
};

// Encabezados de seguridad estándar
const securityHeaders = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

// Configuración de caché optimizada
const cacheControlHeaders = {
  html: 'public, max-age=0, must-revalidate', // Sin caché para HTML para SPA
  assets: 'public, max-age=31536000, immutable', // Cache larga para recursos estáticos
  api: 'no-cache, no-store, must-revalidate' // Sin caché para APIs
};

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const requestMethod = request.method.toUpperCase();

      // 1. Manejar las solicitudes preflight OPTIONS (CORS)
      if (requestMethod === 'OPTIONS') {
        return handlePreflight();
      }
      
      // 2. Forzar HTTPS para prevenir errores de conexión mixta
      if (url.protocol === 'http:' && url.hostname !== 'localhost') {
        url.protocol = 'https:';
        return Response.redirect(url.toString(), 301);
      }

      // 3. Interceptar solicitudes a la API de Supabase para agregar CORS
      if (url.pathname.startsWith('/api') || url.pathname.includes('supabase')) {
        return handleApiRequest(request);
      }

      // 4. Para los archivos estáticos, aplicar caché adecuado
      if (isStaticAsset(url.pathname)) {
        return handleStaticAsset(request);
      }

      // 5. Si accede a la página de fallback directamente
      if (url.pathname === '/fallback.html') {
        return fetch(request);
      }

      // 6. Detectar si el error 1042 ya ocurrió previamente
      const hasError1042History = url.searchParams.has('recover1042');
      if (hasError1042History) {
        // Estrategia de recuperación: servir fallback para error 1042 repetido
        return serveFallbackPage();
      }

      // 7. Para cualquier otra ruta, manejar como una SPA
      return await handleSpaRouting(url);

    } catch (error) {
      console.error('Worker error:', error.message || 'Unknown error');
      
      // Si es error 1042 o similar, usar modo de recuperación
      if (error.message?.includes('1042') || error.message?.includes('network') || error.message?.includes('fetch')) {
        return serveErrorRecoveryPage('1042');
      }
      
      // Página de error genérica mejorada
      return serveErrorPage();
    }
  }
};

/**
 * Maneja las solicitudes preflight OPTIONS
 */
function handlePreflight() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
}

/**
 * Determina si una ruta es un recurso estático
 */
function isStaticAsset(pathname) {
  return pathname.match(/\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2|ttf|eot|json|webp|mp4|webm|gif)$/);
}

/**
 * Maneja solicitudes a las APIs
 */
async function handleApiRequest(request) {
  const apiResponse = await fetch(request);
  const newResponse = new Response(apiResponse.body, apiResponse);
  
  // Aplicar encabezados CORS a todas las respuestas de API
  Object.keys(corsHeaders).forEach(key => {
    newResponse.headers.set(key, corsHeaders[key]);
  });
  
  // Aplicar caché adecuado para APIs
  newResponse.headers.set('Cache-Control', cacheControlHeaders.api);
  
  return newResponse;
}

/**
 * Maneja los recursos estáticos con caché optimizado
 */
async function handleStaticAsset(request) {
  const staticResponse = await fetch(request);
  
  if (!staticResponse.ok) {
    return staticResponse; // Mantener respuestas de error como 404
  }
  
  const newResponse = new Response(staticResponse.body, staticResponse);
  
  // Aplicar encabezados CORS
  Object.keys(corsHeaders).forEach(key => {
    newResponse.headers.set(key, corsHeaders[key]);
  });
  
  // Aplicar caché larga para recursos estáticos
  newResponse.headers.set('Cache-Control', cacheControlHeaders.assets);
  
  return newResponse;
}

/**
 * Maneja el enrutamiento SPA
 */
async function handleSpaRouting(url) {
  // Obtener index.html
  const htmlResponse = await fetch(new URL('/index.html', url.origin));
  
  if (!htmlResponse.ok) {
    throw new Error(`Failed to fetch index.html: ${htmlResponse.status}`);
  }
  
  // Aplicar transformaciones a la respuesta para SPA
  const newResponse = new Response(htmlResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': cacheControlHeaders.html,
      ...corsHeaders,
      ...securityHeaders
    }
  });
  
  return newResponse;
}

/**
 * Genera una página de error mejorada
 */
function serveErrorPage() {
  return new Response(
    `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Abogado Wilson - Error Temporal</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
          background-color: #f8f9fa;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          text-align: center;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 15px;
          color: #3457dc;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 25px;
          color: #555;
        }
        .btn {
          display: inline-block;
          background: #3457dc;
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .btn:hover {
          background: #2a45b3;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .reload-info {
          margin-top: 20px;
          font-size: 14px;
          color: #777;
        }
      </style>
      <script>
        // Recargar la página automáticamente después de 5 segundos
        setTimeout(() => {
          window.location.href = '/';
        }, 5000);
      </script>
    </head>
    <body>
      <div class="container">
        <h1>Estamos realizando mejoras</h1>
        <p>Nuestro equipo está trabajando para brindarte un mejor servicio. Por favor, intenta acceder nuevamente en unos momentos.</p>
        <a href="/" class="btn">Intentar ahora</a>
        <p class="reload-info">La página se recargará automáticamente en 5 segundos...</p>
      </div>
    </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        ...corsHeaders
      },
      status: 200 // Usar código 200 en lugar de 500 para evitar bloqueos
    }
  );
}

/**
 * Genera una página de recuperación específica para el error 1042
 */
function serveErrorRecoveryPage(errorCode) {
  return new Response(
    `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Abogado Wilson - Recuperando conexión</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
          background-color: #f8f9fa;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          text-align: center;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 15px;
          color: #3457dc;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 25px;
          color: #555;
        }
        .btn {
          display: inline-block;
          background: #3457dc;
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .progress {
          height: 10px;
          background-color: #f0f0f0;
          border-radius: 5px;
          margin: 20px 0;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          width: 0%;
          background-color: #3457dc;
          animation: progressAnimation 3s linear forwards;
        }
        @keyframes progressAnimation {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .error-code {
          display: inline-block;
          background: #f0f0f0;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 14px;
          color: #666;
          margin-top: 20px;
        }
      </style>
      <script>
        // Lógica de recuperación del error 1042
        function recoverFromError() {
          // Limpiar cualquier caché o datos de sesión problemáticos
          try {
            localStorage.removeItem('supabase.auth.token');
            sessionStorage.clear();
          } catch (e) {
            console.error('Error clearing storage:', e);
          }
          
          // Esperar 3 segundos para completar la animación
          setTimeout(() => {
            // Redireccionar a la home con parámetro de recuperación y timestamp
            window.location.href = '/?recovered=true&t=' + Date.now();
          }, 3000);
        }
        
        // Iniciar recuperación cuando se carga la página
        window.addEventListener('DOMContentLoaded', recoverFromError);
      </script>
    </head>
    <body>
      <div class="container">
        <h1>Recuperando conexión</h1>
        <p>Estamos restableciendo la conexión con nuestros servidores. Por favor, espera un momento...</p>
        
        <div class="progress">
          <div class="progress-bar"></div>
        </div>
        
        <p>Serás redirigido automáticamente cuando el proceso termine.</p>
        
        <span class="error-code">Código: ${errorCode}</span>
      </div>
    </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...corsHeaders
      },
      status: 200
    }
  );
}

/**
 * Sirve la página de fallback en caso de problemas persistentes
 */
async function serveFallbackPage() {
  try {
    // Intentar cargar la página de fallback personalizada
    const fallbackResponse = await fetch(new URL('/fallback.html', self.origin));
    
    if (fallbackResponse.ok) {
      const newResponse = new Response(fallbackResponse.body, {
        status: 200,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'no-store',
          ...corsHeaders
        }
      });
      return newResponse;
    }
  } catch (e) {
    // Silenciosamente fallar y mostrar página de error básica
  }
  
  // Si no se puede cargar fallback.html, mostrar error básico
  return serveErrorPage();
}
