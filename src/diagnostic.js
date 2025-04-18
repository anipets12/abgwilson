/**
 * Sistema de diagnóstico y corrección para errores 1042 y favicon
 * Versión 2.0.0 - Solución definitiva
 */

// Carga automática al inicio
(function() {
  console.log('[DiagnosticSystem] Iniciando sistema de corrección automática');

  // 1. Interceptar y corregir errores de favicon
  fixFaviconErrors();
  
  // 2. Instalar detector de errores 1042
  installErrorDetector();
  
  // 3. Limpiar localStorage y sessionStorage potencialmente corruptos
  cleanStorageIfNeeded();
})();

/**
 * Corrige problemas relacionados con favicon
 */
function fixFaviconErrors() {
  // Eliminar cualquier favicon existente que pueda causar problemas
  document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach(el => el.remove());
  
  // Crear un nuevo favicon inline para evitar solicitudes de red
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREQAAAAAAEAAAEAAAAAEAAAABAAAAEAAAAAAQAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAERAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  document.head.appendChild(link);
  
  // Interceptar solicitudes de favicon.ico para evitar 404s
  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function(resource, init) {
      if (typeof resource === 'string' && resource.includes('favicon.ico')) {
        console.log('[DiagnosticSystem] Interceptando solicitud de favicon:', resource);
        return Promise.resolve(new Response(new Blob(), {status: 200}));
      }
      return originalFetch.apply(this, arguments);
    };
  }
}

/**
 * Instala detector de errores 1042 y otros problemas de red
 */
function installErrorDetector() {
  window.addEventListener('error', function(e) {
    console.error('[DiagnosticSystem] Error detectado:', e.message);
    
    // Errores relacionados con favicon - simplemente suprimirlos
    if (e.target && (e.target.href || '').includes('favicon')) {
      console.log('[DiagnosticSystem] Error de favicon suprimido');
      e.preventDefault();
      return;
    }
    
    // Detección de error 1042 y problemas de red
    if (e.message && (
        e.message.includes('1042') || 
        e.message.includes('network') || 
        e.message.includes('fetch') ||
        e.message.includes('Failed to fetch')
    )) {
      console.warn('[DiagnosticSystem] Detectado error 1042 o problema de red, iniciando recuperación');
      
      // Grabar información de diagnóstico
      try {
        const diagInfo = {
          timestamp: new Date().toISOString(),
          url: window.location.href,
          error: e.message,
          userAgent: navigator.userAgent
        };
        localStorage.setItem('abogadoWilson_diagnosticInfo', JSON.stringify(diagInfo));
      } catch (err) {}
      
      // Redirigir a la página de recuperación si no estamos ya ahí
      if (!window.location.href.includes('recovered=true')) {
        window.location.href = '/?recovered=true&from=1042&t=' + Date.now();
        e.preventDefault();
      }
    }
  }, true);
  
  // También capturar promesas rechazadas sin manejar
  window.addEventListener('unhandledrejection', function(e) {
    console.error('[DiagnosticSystem] Promesa rechazada sin manejar:', e.reason);
    
    // Detección específica de errores de red en promesas
    if (e.reason && (
        (e.reason.message && e.reason.message.includes('fetch')) ||
        (e.reason.stack && e.reason.stack.includes('fetch'))
    )) {
      console.warn('[DiagnosticSystem] Detectado problema de red en promesa, iniciando recuperación');
      
      // Redirigir a la página de recuperación si no estamos ya ahí
      if (!window.location.href.includes('recovered=true')) {
        window.location.href = '/?recovered=true&from=1042&t=' + Date.now();
      }
    }
  });
}

/**
 * Limpia almacenamiento potencialmente corrupto
 */
function cleanStorageIfNeeded() {
  // Verificar si estamos en la página de recuperación
  if (window.location.search.includes('recovered=true')) {
    console.log('[DiagnosticSystem] Modo de recuperación detectado, limpiando almacenamiento');
    
    // Limpiar tokens de autenticación potencialmente corruptos
    try {
      const itemsToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('token') || key.includes('auth') || key.includes('session'))) {
          itemsToRemove.push(key);
        }
      }
      
      // Eliminar los elementos identificados
      itemsToRemove.forEach(key => {
        console.log('[DiagnosticSystem] Eliminando item potencialmente corrupto:', key);
        localStorage.removeItem(key);
      });
      
      // Limpiar sessionStorage completamente
      sessionStorage.clear();
      
      console.log('[DiagnosticSystem] Limpieza completada, redirigiendo a página principal');
      
      // Temporizador para redirigir automáticamente después de la limpieza
      setTimeout(function() {
        window.location.href = '/';
      }, 3000);
    } catch (err) {
      console.error('[DiagnosticSystem] Error durante la limpieza:', err);
    }
  }
}
