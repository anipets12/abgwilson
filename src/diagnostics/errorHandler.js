/**
 * Sistema de diagnóstico y manejo de errores para la plataforma Abogado Wilson
 * Específicamente optimizado para resolver el error 1042 de Cloudflare Workers
 */

// Códigos de error conocidos y sus soluciones
const ERROR_CODES = {
  1000: 'Error general en la aplicación',
  1042: 'Error de conectividad o CORS en Cloudflare Workers',
  1101: 'Error de autenticación con Supabase',
  1200: 'Error de conexión a la base de datos',
  1300: 'Error en la carga de archivos al storage',
  1400: 'Error en la carga de recursos estáticos'
};

/**
 * Registra errores y envía telemetría si está habilitada
 * @param {Error} error - Error capturado
 * @param {Object} context - Contexto adicional del error
 */
export const logError = (error, context = {}) => {
  console.error('[ErrorHandler]', {
    message: error.message,
    stack: error.stack,
    code: error.code || 'UNKNOWN',
    context,
    timestamp: new Date().toISOString()
  });
  
  // En producción, aquí se enviarían los errores a un servicio de monitoreo
};

/**
 * Diagnóstico específico para error 1042 de Cloudflare Workers
 * @returns {Object} Diagnóstico y solución recomendada
 */
export const diagnoseError1042 = () => {
  const networkStatus = navigator.onLine;
  
  // Verificar si es un problema de CORS
  const corsIssue = checkForCorsIssue();
  
  // Verificar si es un problema de conexión a Supabase
  const supabaseIssue = checkSupabaseConnection();
  
  // Verificar problemas en el Service Worker
  const serviceWorkerIssue = checkServiceWorker();
  
  return {
    code: 1042,
    description: 'Error de conectividad en Cloudflare Workers',
    networkConnected: networkStatus,
    possibleCauses: {
      cors: corsIssue,
      supabaseConnection: supabaseIssue,
      serviceWorker: serviceWorkerIssue,
    },
    recommendedAction: getRecommendedAction(corsIssue, supabaseIssue, serviceWorkerIssue)
  };
};

/**
 * Verifica si hay problemas de CORS
 * @returns {Boolean} true si se detecta un problema de CORS
 */
const checkForCorsIssue = () => {
  // Revisar si hay errores de CORS en la consola
  const recentErrors = window.performance && window.performance.getEntries 
    ? window.performance.getEntries().filter(entry => 
        entry.entryType === 'resource' && entry.name.includes('supabase')
      )
    : [];
    
  return recentErrors.some(entry => entry.responseStatus >= 400);
};

/**
 * Verifica la conexión a Supabase
 * @returns {Promise<Boolean>} true si hay problemas de conexión 
 */
const checkSupabaseConnection = async () => {
  try {
    // Intentar una conexión básica a Supabase
    const response = await fetch(import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co', {
      method: 'HEAD',
      cache: 'no-cache',
    });
    
    return !response.ok;
  } catch (error) {
    return true; // Hay problemas de conexión
  }
};

/**
 * Verifica problemas con el Service Worker
 * @returns {Boolean} true si hay problemas con el Service Worker
 */
const checkServiceWorker = () => {
  if (!('serviceWorker' in navigator)) return false;
  
  // Verificar si hay errores registrados del Service Worker
  return Boolean(sessionStorage.getItem('serviceWorkerError'));
};

/**
 * Obtiene la acción recomendada basada en el diagnóstico
 */
const getRecommendedAction = (corsIssue, supabaseIssue, serviceWorkerIssue) => {
  if (corsIssue) {
    return 'Actualizar los encabezados CORS en el Worker y en Supabase';
  }
  
  if (supabaseIssue) {
    return 'Verificar la conectividad con Supabase y las variables de entorno';
  }
  
  if (serviceWorkerIssue) {
    return 'Eliminar caché del navegador y Service Worker; recargar la aplicación';
  }
  
  return 'Recargar la aplicación y verificar la conectividad de red';
};

/**
 * Aplica fixes automáticos para errores comunes
 * @param {Number} errorCode - Código de error a corregir
 * @returns {Boolean} true si se pudo aplicar una corrección
 */
export const applyAutoFix = async (errorCode) => {
  if (errorCode === 1042) {
    // Limpiar caché local potencialmente corrupta
    try {
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      
      // Forzar recarga sin caché
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for(let registration of registrations) {
          await registration.unregister();
        }
      }
      
      // Agregar timestamp para evitar caché
      const timestamp = Date.now();
      window.location.href = `${window.location.pathname}?nocache=${timestamp}`;
      return true;
    } catch (e) {
      console.error('Error applying auto-fix:', e);
      return false;
    }
  }
  
  return false;
};

/**
 * Aplica soluciones para errores específicos
 */
export default {
  logError,
  diagnoseError1042,
  applyAutoFix,
  ERROR_CODES
};
