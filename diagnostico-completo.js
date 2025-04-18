/**
 * diagnostico-completo.js - Sistema integral de diagnóstico para Abogado Wilson Website
 * 
 * Este script captura errores en:
 * - React (componentes, hooks, renderizado)
 * - Rutas (404, redirecciones)
 * - Favicon y recursos estáticos
 * - Backend serverless (Cloudflare Workers)
 * - Frontend (carga de JS, CSS)
 */

// Configuración global
const CONFIG = {
  // Nivel de detalle del log
  logLevel: 'debug', // 'debug', 'info', 'warn', 'error'
  
  // Activar/desactivar diferentes tipos de diagnóstico
  enableReactDiagnostics: true,
  enableRouteDiagnostics: true,
  enableAssetDiagnostics: true,
  enableServerlessDiagnostics: true,
  
  // URL para endpoint de diagnóstico
  diagnosticEndpoint: '/api/__diagnostics',
  
  // Almacenamiento de errores (memoria, indexedDB, KV)
  storageType: 'memory', // 'memory', 'indexedDB', 'kv'
};

// Función para inicializar diagnóstico en el cliente (React)
export function initializeClientDiagnostics() {
  console.log('[DIAGNÓSTICO] Inicializando sistema de diagnóstico en cliente');
  
  // Capturar errores no manejados
  window.addEventListener('error', event => {
    const { message, filename, lineno, colno, error } = event;
    logError('unhandled', {
      message,
      source: filename,
      line: lineno,
      column: colno,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    });
  });
  
  // Capturar promesas rechazadas no manejadas
  window.addEventListener('unhandledrejection', event => {
    logError('unhandledrejection', {
      message: event.reason?.message || String(event.reason),
      stack: event.reason?.stack,
      timestamp: new Date().toISOString(),
    });
  });
  
  // Capturar errores de carga de recursos
  document.addEventListener('error', event => {
    if (event.target && (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK')) {
      logError('resource', {
        message: `Error al cargar recurso: ${event.target.src || event.target.href}`,
        element: event.target.tagName,
        source: event.target.src || event.target.href,
        timestamp: new Date().toISOString(),
      });
    }
  }, true);
  
  // Inyectar en console.error para capturar errores de React
  const originalConsoleError = console.error;
  console.error = function(...args) {
    originalConsoleError.apply(console, args);
    
    // Capturar errores específicos de React
    const errorStr = String(args[0] || '');
    if (errorStr.includes('React') || errorStr.includes('Warning') || errorStr.includes('Error:')) {
      logError('react', {
        message: errorStr,
        details: args.slice(1).map(arg => String(arg)).join(' '),
        timestamp: new Date().toISOString(),
      });
    }
  };
  
  return {
    // API pública para informar errores manualmente
    reportError: (type, details) => {
      logError(type, { ...details, timestamp: new Date().toISOString() });
    },
    // Obtener log de errores
    getErrorLog: () => getErrorLog(),
    // Limpiar log de errores
    clearErrorLog: () => clearErrorLog(),
  };
}

// Función para inicializar diagnóstico en el servidor (Cloudflare Worker)
export function initializeServerDiagnostics(env) {
  console.log('[DIAGNÓSTICO] Inicializando sistema de diagnóstico en servidor');
  
  return {
    // Interceptor de requests para diagnóstico
    handleRequest: async (request, ctx) => {
      const url = new URL(request.url);
      const startTime = Date.now();
      let error = null;
      
      try {
        // Ruta especial para obtener diagnósticos
        if (url.pathname === CONFIG.diagnosticEndpoint) {
          return generateDiagnosticResponse(env);
        }
        
        // Registrar acceso a rutas
        logServerEvent('route_access', {
          path: url.pathname,
          method: request.method,
          timestamp: new Date().toISOString(),
        });
        
        // Detectar si es un asset
        if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
          logServerEvent('asset_request', {
            asset: url.pathname,
            timestamp: new Date().toISOString(),
          });
        }
        
        // Continuar con el flujo normal
        return null;
      } catch (err) {
        error = err;
        logServerError('server', {
          message: err.message,
          stack: err.stack,
          path: url.pathname,
          timestamp: new Date().toISOString(),
        });
        throw err;
      } finally {
        // Registrar tiempo de respuesta
        const duration = Date.now() - startTime;
        logServerEvent('request_completed', {
          path: url.pathname,
          duration,
          status: error ? 'error' : 'success',
          timestamp: new Date().toISOString(),
        });
      }
    },
    
    // API para informar errores manualmente
    reportServerError: (type, details) => {
      logServerError(type, { ...details, timestamp: new Date().toISOString() });
    },
    
    // Wrapper para respuestas que añade headers de diagnóstico
    wrapResponse: (response) => {
      const headers = new Headers(response.headers);
      headers.set('X-Diagnostics-Enabled', 'true');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    },
  };
}

// Función para generar informe de diagnóstico
function generateDiagnosticReport() {
  return {
    timestamp: new Date().toISOString(),
    clientErrors: getErrorLog(),
    serverErrors: getServerErrorLog(),
    environment: {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      url: window.location.href,
    },
    reactInfo: {
      renderCount: window.__REACT_RENDER_COUNT || 0,
      suspenseCount: window.__REACT_SUSPENSE_COUNT || 0,
    },
    performance: {
      loadTime: performance.timing ? performance.timing.loadEventEnd - performance.timing.navigationStart : null,
      domContentLoaded: performance.timing ? performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart : null,
    }
  };
}

// Función para generar respuesta con datos de diagnóstico
async function generateDiagnosticResponse(env) {
  const serverErrors = await getServerErrorsFromStorage(env);
  const report = {
    timestamp: new Date().toISOString(),
    serverErrors,
    serverInfo: {
      workerVersion: '1.0.0',
      cfRegion: env.CF_REGION || 'unknown',
    }
  };
  
  return new Response(JSON.stringify(report, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    }
  });
}

// Sistema de almacenamiento de errores (cliente)
const errorLog = [];

function logError(type, details) {
  if (errorLog.length >= 100) {
    errorLog.shift(); // Eliminar el error más antiguo si alcanzamos el límite
  }
  errorLog.push({ type, ...details });
  
  // Enviar al servidor si está configurado
  if (CONFIG.diagnosticEndpoint) {
    try {
      fetch(CONFIG.diagnosticEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...details }),
        keepalive: true,
      }).catch(() => {
        // Ignorar errores de envío
      });
    } catch (e) {
      // Ignorar errores de envío
    }
  }
  
  // Log local
  if (CONFIG.logLevel === 'debug') {
    console.warn(`[DIAGNÓSTICO] Error ${type}:`, details);
  }
}

function getErrorLog() {
  return [...errorLog];
}

function clearErrorLog() {
  errorLog.length = 0;
}

// Sistema de almacenamiento de errores (servidor)
const serverErrorLog = [];

function logServerError(type, details) {
  if (serverErrorLog.length >= 100) {
    serverErrorLog.shift();
  }
  serverErrorLog.push({ type, ...details });
  
  console.error(`[SERVER DIAGNÓSTICO] Error ${type}:`, details);
}

function logServerEvent(type, details) {
  if (CONFIG.logLevel === 'debug') {
    console.log(`[SERVER DIAGNÓSTICO] Evento ${type}:`, details);
  }
}

function getServerErrorLog() {
  return [...serverErrorLog];
}

// Función para obtener errores desde almacenamiento persistente
async function getServerErrorsFromStorage(env) {
  if (CONFIG.storageType === 'kv' && env.DIAGNOSTICS_KV) {
    try {
      const storedErrors = await env.DIAGNOSTICS_KV.get('server_errors', { type: 'json' });
      return storedErrors || [];
    } catch (e) {
      console.error('Error al obtener errores de KV:', e);
      return [];
    }
  }
  
  return getServerErrorLog();
}

// Exportar funciones principales
export default {
  clientDiagnostics: initializeClientDiagnostics,
  serverDiagnostics: initializeServerDiagnostics,
  CONFIG,
};
