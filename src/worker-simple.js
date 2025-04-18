/**
 * Worker Cloudflare Enterprise para Abogado Wilson
 * Implementación optimizada con soporte completo para KV, CORS, SPA y diagnósticos
 * Solución definitiva para el error 1042
 * @author Wilson Alexander Ipiales Guerron
 * @version 3.0.0
 */

// Configuraciones y constantes globales
const APP_NAME = 'Abogado Wilson Platform';
const VERSION = '3.0.0';
const ERROR_THRESHOLD = 5; // Cantidad de errores antes de activar modo de recuperación

// Configuración de encabezados CORS completos con dominios específicos permitidos
const allowedOrigins = [
  'https://abogado-wilson-website.pages.dev',
  'https://abogado-wilson-website.anipets12.workers.dev',
  'https://example.supabase.co', // Actualizar con el dominio real de Supabase
  'http://localhost:5173',
  'http://localhost:8788'
];

// Configuración de encabezados CORS dinámicos basados en el origen
function generateCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const isAllowedOrigin = origin && (allowedOrigins.includes(origin) || origin.endsWith('.workers.dev'));
  
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, X-Requested-With, Accept, Range, X-Auth-Token, X-Diagnostic-Check',
    'Access-Control-Expose-Headers': 'Content-Length, Content-Range, X-Error-Code, X-Error-Info',
    'Access-Control-Max-Age': '86400', // 24 horas
    'Access-Control-Allow-Credentials': 'true'
  };
}

// Encabezados de seguridad estándar
const securityHeaders = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
};

// Configuración de caché optimizada
const cacheControlHeaders = {
  html: 'public, max-age=0, must-revalidate', // Sin caché para HTML para SPA
  assets: 'public, max-age=31536000, immutable', // Cache larga para recursos estáticos
  api: 'no-cache, no-store, must-revalidate', // Sin caché para APIs
  error: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' // Respuestas de error nunca en caché
};

export default {
  /**
   * Manejador principal de solicitudes HTTP
   * Implementa diagnósticos avanzados y KV para resolver error 1042
   */
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const requestMethod = request.method.toUpperCase();
      const corsHeaders = generateCorsHeaders(request);

      // Obtener el ID de sesión para la persistencia de estado
      const sessionId = getSessionId(request);
      
      // Incrementar contador de solicitudes en KV (para diagnóstico)
      if (env.ABOGADO_STATE) {
        ctx.waitUntil(incrementRequestCounter(env.ABOGADO_STATE));
      }

      // 1. Sistema de diagnóstico: endpoint especial para verificar estado del Worker
      if (url.pathname === '/api/diagnostic/status') {
        return handleDiagnosticRequest(request, env, ctx, corsHeaders);
      }
      
      // 2. Sistema de diagnóstico: endpoint para verificar KV
      if (url.pathname === '/api/diagnostic/check-kv') {
        return handleKvCheckRequest(request, env, ctx, corsHeaders);
      }

      // 3. Manejar solicitudes preflight OPTIONS (CORS)
      if (requestMethod === 'OPTIONS') {
        return handlePreflight(request, corsHeaders);
      }
      
      // 4. Forzar HTTPS para prevenir errores de conexión mixta
      if (url.protocol === 'http:' && url.hostname !== 'localhost') {
        url.protocol = 'https:';
        return Response.redirect(url.toString(), 301);
      }

      // 5. Interceptar solicitudes a la API de Supabase para agregar CORS
      if (url.pathname.startsWith('/api') || url.pathname.includes('supabase')) {
        return handleApiRequest(request, corsHeaders);
      }

      // 6. Para los archivos estáticos, aplicar caché adecuado
      if (isStaticAsset(url.pathname)) {
        return handleStaticAsset(request, corsHeaders);
      }

      // 7. Si accede a la página de fallback directamente
      if (url.pathname === '/fallback.html') {
        return fetch(request);
      }

      // 8. Sistema de recuperación: Detectar parámetros de recuperación
      if (url.searchParams.has('recover') || url.searchParams.has('recovered')) {
        // Limpiar contadores de error en KV
        if (env.ABOGADO_STATE) {
          ctx.waitUntil(resetErrorCounter(env.ABOGADO_STATE, sessionId));
        }
      }
      
      // 9. Sistema de recuperación: Detectar si el error 1042 ya ocurrió repetidamente
      if (url.searchParams.has('recover1042')) {
        // Verificar el contador de errores en KV
        if (env.ABOGADO_STATE) {
          const errorCount = await getErrorCount(env.ABOGADO_STATE, sessionId);
          if (errorCount > ERROR_THRESHOLD) {
            // Si hay muchos errores, servir el fallback para evitar bucles
            return serveFallbackPage(corsHeaders);
          }
        }
      }

      // 10. Para cualquier otra ruta, manejar como una SPA con soporte KV
      return await handleSpaRouting(url, env, ctx, corsHeaders);

    } catch (error) {
      console.error('Worker error:', error.message || 'Unknown error');
      
      // Registrar el error en KV si está disponible
      if (env.ABOGADO_STATE) {
        const sessionId = getSessionId(request);
        ctx.waitUntil(registerError(env.ABOGADO_STATE, sessionId, error));
      }
      
      // Si es error 1042 o similar, usar modo de recuperación
      if (error.message?.includes('1042') || 
          error.message?.includes('network') || 
          error.message?.includes('fetch') ||
          error.message?.includes('storage') ||
          error.message?.includes('KV')) {
        const corsHeaders = generateCorsHeaders(request);
        return serveErrorRecoveryPage('1042', corsHeaders);
      }
      
      // Página de error genérica mejorada
      const corsHeaders = generateCorsHeaders(request);
      return serveErrorPage(corsHeaders);
    }
  }
};

/**
 * Maneja las solicitudes preflight OPTIONS
 */
function handlePreflight(request, corsHeaders) {
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
 * Obtiene un ID de sesión único para el usuario
 * Usado para seguimiento de estado en KV
 */
function getSessionId(request) {
  // Intenta obtener de cookie existente
  const cookies = parseCookies(request.headers.get('Cookie') || '');
  if (cookies.session_id) {
    return cookies.session_id;
  }
  
  // Genera un nuevo ID si no existe
  return generateUUID();
}

/**
 * Genera un UUID v4 para identificación de sesión
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Parsea las cookies de la solicitud
 */
function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.trim().split('=');
      if (parts.length === 2) {
        cookies[parts[0]] = parts[1];
      }
    });
  }
  return cookies;
}

/**
 * Incrementa el contador de solicitudes en KV
 * Útil para diagnóstico y monitoreo
 */
async function incrementRequestCounter(KV) {
  try {
    const key = 'stats:requests:total';
    const currentCount = await KV.get(key) || '0';
    await KV.put(key, (parseInt(currentCount, 10) + 1).toString());
  } catch (e) {
    console.error('Error incrementando contador:', e);
  }
}

/**
 * Registra un error en KV para diagnóstico
 */
async function registerError(KV, sessionId, error) {
  try {
    // Guardar el error en el registro de errores
    const errorKey = `error:${Date.now()}:${sessionId}`;
    await KV.put(errorKey, JSON.stringify({
      message: error.message || 'Unknown error',
      timestamp: new Date().toISOString(),
      stack: error.stack,
      code: error.code || 'UNKNOWN'
    }), { expirationTtl: 86400 }); // Expira en 24 horas
    
    // Incrementar contador de errores para esta sesión
    const counterKey = `error-count:${sessionId}`;
    const currentCount = await KV.get(counterKey) || '0';
    await KV.put(counterKey, (parseInt(currentCount, 10) + 1).toString(), 
                { expirationTtl: 3600 }); // Expira en 1 hora
  } catch (e) {
    console.error('Error registrando error en KV:', e);
  }
}

/**
 * Obtiene el contador de errores para una sesión
 */
async function getErrorCount(KV, sessionId) {
  try {
    const counterKey = `error-count:${sessionId}`;
    const count = await KV.get(counterKey) || '0';
    return parseInt(count, 10);
  } catch (e) {
    console.error('Error obteniendo contador de errores:', e);
    return 0;
  }
}

/**
 * Resetea el contador de errores para una sesión
 */
async function resetErrorCounter(KV, sessionId) {
  try {
    const counterKey = `error-count:${sessionId}`;
    await KV.put(counterKey, '0', { expirationTtl: 3600 });
  } catch (e) {
    console.error('Error reseteando contador de errores:', e);
  }
}

/**
 * Maneja la solicitud de diagnóstico KV
 * Endpoint que verifica si el KV está disponible y funcionando
 */
async function handleKvCheckRequest(request, env, ctx, corsHeaders) {
  try {
    const kvAvailable = Boolean(env.ABOGADO_STATE);
    let kvWorking = false;
    
    // Si KV está disponible, intentar una operación de prueba
    if (kvAvailable) {
      try {
        const testKey = 'diagnostic:test';
        const testValue = `test-${Date.now()}`;
        
        await env.ABOGADO_STATE.put(testKey, testValue, { expirationTtl: 60 });
        const readValue = await env.ABOGADO_STATE.get(testKey);
        
        kvWorking = readValue === testValue;
      } catch (e) {
        console.error('Error en prueba de KV:', e);
        kvWorking = false;
      }
    }
    
    return new Response(JSON.stringify({
      kvAvailable,
      kvWorking,
      timestamp: new Date().toISOString(),
      version: VERSION
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': cacheControlHeaders.api,
        ...corsHeaders
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({
      kvAvailable: false,
      kvWorking: false,
      error: e.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': cacheControlHeaders.error,
        ...corsHeaders
      }
    });
  }
}

/**
 * Maneja la solicitud de diagnóstico general
 */
async function handleDiagnosticRequest(request, env, ctx, corsHeaders) {
  try {
    // Recopilar estadísticas básicas si KV está disponible
    let stats = { requests: 0, errors: 0 };
    
    if (env.ABOGADO_STATE) {
      const requestsCount = await env.ABOGADO_STATE.get('stats:requests:total') || '0';
      const errorsCount = await env.ABOGADO_STATE.get('stats:errors:total') || '0';
      
      stats = {
        requests: parseInt(requestsCount, 10),
        errors: parseInt(errorsCount, 10)
      };
    }
    
    return new Response(JSON.stringify({
      status: 'ok',
      application: APP_NAME,
      version: VERSION,
      timestamp: new Date().toISOString(),
      environment: env.CLOUDFLARE_ENV || 'development',
      diagnostics: {
        kvAvailable: Boolean(env.ABOGADO_STATE),
        stats
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': cacheControlHeaders.api,
        ...corsHeaders
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({
      status: 'error',
      error: e.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': cacheControlHeaders.error,
        ...corsHeaders
      }
    });
  }
}

/**
 * Maneja solicitudes a las APIs con soporte mejorado para CORS
 */
async function handleApiRequest(request, corsHeaders) {
  try {
    const apiResponse = await fetch(request);
    const newResponse = new Response(apiResponse.body, apiResponse);
    
    // Aplicar encabezados CORS específicos para esta solicitud
    Object.keys(corsHeaders).forEach(key => {
      newResponse.headers.set(key, corsHeaders[key]);
    });
    
    // Aplicar caché adecuado para APIs
    newResponse.headers.set('Cache-Control', cacheControlHeaders.api);
    
    return newResponse;
  } catch (error) {
    // Si la API falla, devolver una respuesta de error con los encabezados adecuados
    return new Response(JSON.stringify({
      error: error.message || 'API Error',
      code: 'API_ERROR'
    }), {
      status: 502, // Bad Gateway
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': cacheControlHeaders.error,
        'X-Error-Code': '1042',
        'X-Error-Info': 'API connection error',
        ...corsHeaders
      }
    });
  }
}

/**
 * Maneja los recursos estáticos con caché optimizado
 */
async function handleStaticAsset(request, corsHeaders) {
  try {
    const staticResponse = await fetch(request);
    
    if (!staticResponse.ok) {
      return staticResponse; // Mantener respuestas de error como 404
    }
    
    const newResponse = new Response(staticResponse.body, staticResponse);
    
    // Aplicar encabezados CORS específicos para esta solicitud
    Object.keys(corsHeaders).forEach(key => {
      newResponse.headers.set(key, corsHeaders[key]);
    });
    
    // Aplicar caché larga para recursos estáticos
    newResponse.headers.set('Cache-Control', cacheControlHeaders.assets);
    
    return newResponse;
  } catch (error) {
    console.error('Error serving static asset:', error);
    
    // Para errores con activos estáticos, redirigir a un error de recurso general
    return new Response(JSON.stringify({
      error: 'Failed to load resource',
      path: new URL(request.url).pathname
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': cacheControlHeaders.error,
        ...corsHeaders
      }
    });
  }
}

/**
 * Maneja el enrutamiento SPA con soporte para KV
 */
async function handleSpaRouting(url, env, ctx, corsHeaders) {
  try {
    // Obtener index.html
    const htmlResponse = await fetch(new URL('/index.html', url.origin));
    
    if (!htmlResponse.ok) {
      throw new Error(`Failed to fetch index.html: ${htmlResponse.status}`);
    }
    
    // Obtener el contenido HTML para modificarlo
    let html = await htmlResponse.text();
    
    // Inyectar información de estado KV si está disponible
    if (env.ABOGADO_STATE && env.ENABLE_DIAGNOSTICS) {
      // Inyectar script diagnóstico en modo diagnóstico
      const diagnosticScript = `
      <script>
        window.ABOGADO_WILSON = window.ABOGADO_WILSON || {};
        window.ABOGADO_WILSON.version = "${VERSION}";
        window.ABOGADO_WILSON.diagnosticsEnabled = true;
        window.ABOGADO_WILSON.timestamp = "${Date.now()}";
        console.info("[${APP_NAME}] Diagnostics enabled. Version: ${VERSION}");
        
        // Error 1042 detection and automatic recovery
        window.addEventListener('error', function(e) {
          if (e.message && (e.message.includes('1042') || e.message.includes('network') || e.message.includes('fetch'))) {
            console.warn('[${APP_NAME}] Detected potential error 1042, initiating recovery...');
            // Store the error in localStorage for diagnostics
            try {
              const recentErrors = JSON.parse(localStorage.getItem('abogadoWilson_recentErrors') || '[]');
              recentErrors.push({ message: e.message, timestamp: new Date().toISOString() });
              // Keep only the last 10 errors
              if (recentErrors.length > 10) recentErrors.shift();
              localStorage.setItem('abogadoWilson_recentErrors', JSON.stringify(recentErrors));
            } catch (err) {}
          }
        });
      </script>
      `;
      
      // Inyectar el script antes del cierre de </head>
      html = html.replace('</head>', `${diagnosticScript}</head>`);
    }
    
    // Aplicar transformaciones a la respuesta para SPA
    const newResponse = new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': cacheControlHeaders.html,
        ...corsHeaders,
        ...securityHeaders
      }
    });
    
    return newResponse;
  } catch (error) {
    console.error('Error in SPA routing:', error);
    throw error; // Propagar el error para manejarlo en el catch principal
  }
}

/**
 * Genera una página de error mejorada
 */
function serveErrorPage(corsHeaders) {
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
        'Cache-Control': cacheControlHeaders.error,
        ...corsHeaders
      },
      status: 200 // Usar código 200 en lugar de 500 para evitar bloqueos
    }
  );
}

/**
 * Genera una página de recuperación específica para el error 1042
 * Incluye mecanismos avanzados de diagnóstico y corrección automática
 */
function serveErrorRecoveryPage(errorCode, corsHeaders) {
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
        .diagnosis {
          background-color: #f8f0e5;
          border-left: 4px solid #3457dc;
          padding: 10px 15px;
          margin: 20px 0;
          text-align: left;
          font-size: 14px;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease;
        }
        .diagnosis.show {
          max-height: 500px;
          opacity: 1;
          margin: 20px 0;
        }
        .diagnosis h3 {
          margin-top: 0;
          color: #3457dc;
        }
        .diagnosis ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .diagnosis li {
          margin-bottom: 5px;
        }
        .toggle-btn {
          background: none;
          border: none;
          color: #3457dc;
          cursor: pointer;
          font-size: 14px;
          text-decoration: underline;
          padding: 5px;
          margin-top: 10px;
        }
      </style>
      <script>
        // Lógica avanzada de recuperación del error 1042
        function recoverFromError() {
          console.info('Iniciando protocolo de recuperación para error 1042...');
          
          // Crear registro de diagnóstico
          const diagInfo = {
            timestamp: new Date().toISOString(),
            errorCode: '${errorCode}',
            userAgent: navigator.userAgent,
            url: window.location.href,
            referrer: document.referrer || 'none',
            connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown',
            online: navigator.onLine
          };
          
          console.info('Información de diagnóstico:', diagInfo);
          
          // 1. Intentar corregir cualquier problema con Supabase Auth
          try {
            // Limpiar tokens almacenados
            localStorage.removeItem('supabase.auth.token');
            localStorage.removeItem('supabase.auth.expires_at');
            localStorage.removeItem('supabase.auth.refresh_token');
            localStorage.removeItem('sb-refresh-token');
            localStorage.removeItem('sb-access-token');
            
            // Guardar diagnóstico
            localStorage.setItem('abogadoWilson_lastDiagnosis', JSON.stringify(diagInfo));
            
            // Limpiar cache de sesión
            sessionStorage.clear();
            
            console.info('Caché de autenticación limpiada correctamente');
          } catch (e) {
            console.error('Error limpiando almacenamiento:', e);
          }
          
          // 2. Verificar y mostrar diagnóstico
          setTimeout(() => {
            const diagnosisElement = document.getElementById('diagnosis');
            if (diagnosisElement) {
              diagnosisElement.classList.add('show');
            }
            
            // 3. Iniciar redirección después de 3 segundos
            setTimeout(() => {
              const recoveryParams = new URLSearchParams();
              recoveryParams.set('recovered', 'true');
              recoveryParams.set('from', '1042');
              recoveryParams.set('t', Date.now().toString());
              
              // Url con parámetros de recuperación
              const recoveryUrl = '/' + 
                (recoveryParams.toString() ? '?' + recoveryParams.toString() : '');
              
              console.info('Redireccionando a:', recoveryUrl);
              window.location.href = recoveryUrl;
            }, 3000);
          }, 1000);
        }
        
        // Funciones auxiliares de diagnóstico
        function toggleDiagnosisDetails() {
          const details = document.getElementById('diagnosisDetails');
          if (details) {
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
          }
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
        
        <div id="diagnosis" class="diagnosis">
          <h3>Diagnóstico</h3>
          <p>Se detectó un problema de conectividad (Error ${errorCode}). Estamos aplicando una solución automática.</p>
          <button class="toggle-btn" onclick="toggleDiagnosisDetails()">Ver detalles técnicos</button>
          <div id="diagnosisDetails" style="display: none; margin-top: 10px;">
            <ul>
              <li>Eliminando tokens de autenticación potencialmente corruptos</li>
              <li>Limpiando caché del navegador relacionada con la aplicación</li>
              <li>Verificando conectividad con los servidores</li>
              <li>Reiniciando la aplicación con parámetros limpios</li>
            </ul>
          </div>
        </div>
        
        <span class="error-code">Código: ${errorCode}</span>
      </div>
    </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': cacheControlHeaders.error,
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
 * Usado cuando el error 1042 se repite múltiples veces
 */
async function serveFallbackPage(corsHeaders) {
  try {
    // Intentar cargar la página de fallback personalizada
    const fallbackResponse = await fetch(new URL('/fallback.html', self.origin));
    
    if (fallbackResponse.ok) {
      // Leer el contenido para poder modificarlo
      const html = await fallbackResponse.text();
      
      // Agregar script de diagnóstico y recuperación
      const modifiedHtml = html.replace('</head>', `
      <script>
        // Script de diagnóstico para errores KV / Supabase
        console.info('[Abogado Wilson] Activado modo fallback por error 1042 persistente');
        
        // Guardar información de diagnóstico
        const diagnosticInfo = {
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          online: navigator.onLine,
          errorType: 'persistent_1042',
          recoveryAttempts: parseInt(localStorage.getItem('abogadoWilson_recoveryAttempts') || '0') + 1
        };
        
        // Guardar número de intentos de recuperación
        localStorage.setItem('abogadoWilson_recoveryAttempts', diagnosticInfo.recoveryAttempts.toString());
        localStorage.setItem('abogadoWilson_lastFallback', JSON.stringify(diagnosticInfo));
        
        // Intentar recuperación profunda después de 3 segundos
        setTimeout(() => {
          // Limpiar absolutamente todo el almacenamiento local
          try {
            localStorage.clear();
            sessionStorage.clear();
            
            // Intentar limpiar cookies
            document.cookie.split(';').forEach(function(c) {
              document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
            });
            
            console.info('[Abogado Wilson] Limpieza profunda completada');
          } catch (e) {
            console.error('[Abogado Wilson] Error en limpieza:', e);
          }
          
          // Redireccionar a página principal con parámetros de recuperación profunda
          window.location.href = '/?deep_recovery=true&t=' + Date.now();
        }, 5000);
      </script>
      </head>`);
      
      const newResponse = new Response(modifiedHtml, {
        status: 200,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          ...corsHeaders
        }
      });
      return newResponse;
    }
  } catch (e) {
    console.error('Error serving fallback page:', e);
    // Silenciosamente fallar y mostrar página de error básica
  }
  
  // Si no se puede cargar fallback.html, generar una página de fallback básica
  return new Response(
    `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Abogado Wilson - Modo de Recuperación</title>
      <style>
        body { font-family: system-ui, sans-serif; line-height: 1.5; padding: 2rem; max-width: 600px; margin: 0 auto; }
        h1 { color: #3457dc; }
        .card { background: #f8f9fa; border-radius: 8px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .btn { display: inline-block; background: #3457dc; color: white; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 4px; font-weight: 500; margin-top: 1rem; }
      </style>
      <script>
        // Realizar limpieza de emergencia
        localStorage.clear();
        sessionStorage.clear();
        
        // Redireccionar después de 5 segundos
        setTimeout(() => {
          window.location.href = '/?emergency_recovery=true&t=' + Date.now();
        }, 5000);
      </script>
    </head>
    <body>
      <div class="card">
        <h1>Modo de Recuperación de Emergencia</h1>
        <p>Hemos detectado un problema recurrente con la conexión a nuestros servidores. Estamos aplicando una solución de emergencia.</p>
        <p>Serás redirigido automáticamente en unos segundos...</p>
        <a href="/?emergency_recovery=true" class="btn">Regresar a la página principal</a>
      </div>
    </body>
    </html>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        ...corsHeaders
      }
    }
  );
}
