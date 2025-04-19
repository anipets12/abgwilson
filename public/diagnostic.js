/**
 * Sistema de diagnóstico avanzado para abgwilson
 * Maneja errores de conexión, favicon y problemas comunes
 */

(function() {
  console.log('[DiagnosticSystem] Inicializado');
  
  // 1. Asegurar que siempre haya un favicon válido
  function ensureFavicon() {
    // Verificar si ya existe un favicon
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (!existingFavicon) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = '/favicon.ico'; // Usar el favicon físico actualizado
      document.head.appendChild(link);
      console.log('[DiagnosticSystem] Favicon creado');
    }
  }
  
  // 2. Interceptar errores de red
  function setupNetworkErrorHandler() {
    window.addEventListener('error', function(e) {
      if (e && e.message && (
          e.message.includes('1042') || 
          e.message.includes('network') ||
          e.message.includes('Failed to fetch') ||
          e.message.includes('NetworkError')
      )) {
        console.warn('[DiagnosticSystem] Error de red detectado:', e.message);
        handleNetworkError();
      }
    });
    
    // También monitorear promesas rechazadas sin capturar
    window.addEventListener('unhandledrejection', function(e) {
      if (e && e.reason && (
          (e.reason.message && (
            e.reason.message.includes('network') ||
            e.reason.message.includes('fetch') ||
            e.reason.message.includes('1042')
          )) ||
          (typeof e.reason === 'string' && (
            e.reason.includes('network') ||
            e.reason.includes('fetch') ||
            e.reason.includes('1042')
          ))
      )) {
        console.warn('[DiagnosticSystem] Promesa rechazada con error de red:', e.reason);
        handleNetworkError();
      }
    });
  }
  
  // 3. Función para manejar errores de red
  function handleNetworkError() {
    // Evitar múltiples redirecciones por el mismo error
    if (window.location.search.includes('recovered=true') || 
        sessionStorage.getItem('networkRecoveryInProgress') === 'true') {
      return;
    }
    
    sessionStorage.setItem('networkRecoveryInProgress', 'true');
    console.log('[DiagnosticSystem] Iniciando proceso de recuperación de red');
    
    // Intentar limpiar caché de API
    try {
      if ('caches' in window) {
        caches.keys().then(names => {
          for (let name of names) {
            if (name.includes('api') || name.includes('dynamic')) {
              caches.delete(name).then(() => {
                console.log(`[DiagnosticSystem] Caché ${name} eliminada`);
              });
            }
          }
        });
      }
    } catch (e) {
      console.error('[DiagnosticSystem] Error al limpiar caché:', e);
    }
    
    // Redirigir para recuperación
    window.location.href = '/?recovered=true&from=network&t=' + Date.now();
  }
  
  // 4. Verificar estado de Supabase periódicamente
  function checkSupabaseConnection() {
    try {
      const CHECK_INTERVAL = 30000; // Cada 30 segundos
      
      // Realizar comprobación solo si la ventana está activa
      function performCheck() {
        // Solo si window.supabase está disponible (se establece en el componente principal)
        if (window.supabase) {
          console.log('[DiagnosticSystem] Verificando conexión a Supabase...');
          
          window.supabase.from('health_check').select('count').then(({ data, error }) => {
            if (error) {
              console.warn('[DiagnosticSystem] Error de conexión a Supabase:', error);
              // Solo iniciar recuperación si el error parece de conexión
              if (error.message && (
                  error.message.includes('network') ||
                  error.message.includes('fetch') ||
                  error.message.includes('connection')
              )) {
                handleNetworkError();
              }
            } else {
              console.log('[DiagnosticSystem] Conexión a Supabase OK');
            }
          });
        }
      }
      
      // Configurar comprobación periódica
      setInterval(performCheck, CHECK_INTERVAL);
      
      // También verificar cuando la ventana obtiene foco
      window.addEventListener('focus', performCheck);
    } catch (e) {
      console.error('[DiagnosticSystem] Error al configurar verificación de Supabase:', e);
    }
  }
  
  // Inicializar todas las funciones de diagnóstico
  ensureFavicon();
  setupNetworkErrorHandler();
  setTimeout(checkSupabaseConnection, 5000); // Esperar 5s para que la app se inicialice
  
  // Exponer API de diagnóstico global
  window.diagnosticSystem = {
    forceNetworkRecovery: handleNetworkError,
    checkSupabaseConnection: checkSupabaseConnection,
    ensureFavicon: ensureFavicon
  };
})();
