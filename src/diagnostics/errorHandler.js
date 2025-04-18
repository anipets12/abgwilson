/**
 * Sistema de diagnóstico avanzado y manejo de errores para la plataforma Abogado Wilson
 * Optimizado específicamente para resolver el error 1042 de Cloudflare Workers
 * con detección de problemas de KV y Durable Objects
 * @version 2.0.0
 */

// Códigos de error conocidos y sus soluciones
const ERROR_CODES = {
  1000: 'Error general en la aplicación',
  1042: 'Error de conectividad, CORS o KV en Cloudflare Workers',
  1043: 'Error de configuración de KV namespace',
  1044: 'Error de Durable Objects',
  1045: 'Error de límites en plan Free de Cloudflare',
  1101: 'Error de autenticación con Supabase',
  1200: 'Error de conexión a la base de datos',
  1300: 'Error en la carga de archivos al storage',
  1400: 'Error en la carga de recursos estáticos'
};

// Mapeo detallado de errores específicos de Cloudflare Workers
const CLOUDFLARE_ERROR_MAP = {
  1042: {
    title: 'Error de Conectividad o KV',
    description: 'Problema al conectar con los servicios de Cloudflare o al acceder a KV storage',
    possibleCauses: [
      'Falta de configuración de KV namespace',
      'Problemas de CORS con Supabase',
      'Caché corrupta en el navegador',
      'Error en los bindings de Workers',
      'Límites del plan gratuito excedidos'
    ],
    solutions: [
      'Verificar la configuración de KV en wrangler.toml',
      'Limpiar caché del navegador y cookies',
      'Configurar correctamente CORS para Supabase',
      'Revisar los bindings en el dashboard de Cloudflare'
    ]
  }
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
 * Diagnóstico avanzado para error 1042 de Cloudflare Workers
 * Incluye verificación de KV namespace y configuración de CORS
 * @returns {Object} Diagnóstico completo y soluciones recomendadas
 */
export const diagnoseError1042 = async () => {
  const networkStatus = navigator.onLine;
  
  // Verificar si es un problema de CORS
  const corsIssue = await checkForCorsIssue();
  
  // Verificar si es un problema de conexión a Supabase
  const supabaseIssue = await checkSupabaseConnection();
  
  // Verificar problemas en el Service Worker
  const serviceWorkerIssue = checkServiceWorker();
  
  // Verificar configuración de KV (nueva comprobación)
  const kvConfigIssue = await checkKVConfiguration();
  
  // Verificar limitaciones del plan gratuito
  const freePlanLimits = checkFreePlanLimits();
  
  // Crear diagnóstico detallado
  const diagnosis = {
    code: 1042,
    description: CLOUDFLARE_ERROR_MAP[1042].description,
    timestamp: new Date().toISOString(),
    environment: {
      userAgent: navigator.userAgent,
      networkConnected: networkStatus,
      url: window.location.href,
      referrer: document.referrer
    },
    issues: {
      cors: corsIssue,
      supabaseConnection: supabaseIssue,
      serviceWorker: serviceWorkerIssue,
      kvConfiguration: kvConfigIssue,
      freePlanLimits: freePlanLimits
    },
    detailedReport: generateDetailedReport({
      cors: corsIssue,
      supabaseConnection: supabaseIssue,
      serviceWorker: serviceWorkerIssue,
      kvConfiguration: kvConfigIssue,
      freePlanLimits: freePlanLimits
    }),
    recommendedActions: generateRecommendedActions({
      cors: corsIssue,
      supabaseConnection: supabaseIssue,
      serviceWorker: serviceWorkerIssue,
      kvConfiguration: kvConfigIssue,
      freePlanLimits: freePlanLimits
    })
  };
  
  // Guardar diagnóstico en localStorage para recuperación
  try {
    localStorage.setItem('abogadoWilson_lastDiagnosis', JSON.stringify(diagnosis));
  } catch (e) {
    console.warn('No se pudo guardar el diagnóstico en localStorage');
  }
  
  return diagnosis;
};

/**
 * Verifica problemas con la configuración de KV namespace
 * @returns {Promise<Boolean>} true si hay problemas de configuración de KV
 */
async function checkKVConfiguration() {
  try {
    // Intentar detectar si el Worker tiene acceso a KV
    // Esta llamada se enruta al Worker para verificar KV
    const response = await fetch('/api/diagnostic/check-kv', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Diagnostic-Check': 'kv-test'
      }
    });
    
    if (!response.ok) return true;
    
    const data = await response.json();
    return !data.kvAvailable;
  } catch (error) {
    // Si hay error en la conexión, asumimos que hay problema con KV
    return true;
  }
}

/**
 * Verifica si se han alcanzado los límites del plan gratuito de Cloudflare
 * @returns {Boolean} true si hay indicios de límites alcanzados
 */
function checkFreePlanLimits() {
  // Verificar patrones de error que indican límites alcanzados
  // 1. Comprobar mensajes de error en localStorage
  const recentErrors = JSON.parse(localStorage.getItem('abogadoWilson_recentErrors') || '[]');
  
  // Buscar patrones que indiquen límites alcanzados
  const limitErrors = recentErrors.filter(err => 
    err.message && (
      err.message.includes('limit') ||
      err.message.includes('quota') ||
      err.message.includes('rate') ||
      err.message.includes('exceeded')
    )
  );
  
  return limitErrors.length > 0;
}

/**
 * Genera un reporte detallado basado en los problemas detectados
 */
function generateDetailedReport(issues) {
  const report = [];
  
  if (issues.kvConfiguration) {
    report.push('Se detectó un problema con la configuración de KV namespace en Cloudflare Workers. ' +
      'Esto puede impedir que la aplicación almacene y recupere datos de estado.');
  }
  
  if (issues.cors) {
    report.push('Se detectaron problemas de CORS (Cross-Origin Resource Sharing) que pueden estar ' +
      'impidiendo las comunicaciones entre el frontend y los servicios de backend.');
  }
  
  if (issues.supabaseConnection) {
    report.push('La conexión con Supabase presenta dificultades. Esto puede afectar la autenticación ' +
      'y el acceso a datos en la aplicación.');
  }
  
  if (issues.serviceWorker) {
    report.push('El Service Worker presenta anomalías que pueden afectar la carga y el funcionamiento ' +
      'offline de la aplicación.');
  }
  
  if (issues.freePlanLimits) {
    report.push('Es posible que se hayan alcanzado los límites del plan gratuito de Cloudflare. ' +
      'Esto puede resultar en limitaciones temporales de servicio.');
  }
  
  return report;
}

/**
 * Genera recomendaciones de acciones basadas en los problemas detectados
 */
function generateRecommendedActions(issues) {
  const actions = [];
  
  // Priorizar acciones basadas en el impacto del problema
  if (issues.kvConfiguration) {
    actions.push(
      'Configurar el KV namespace en wrangler.toml con: kv_namespaces = [{ binding = "STATE_STORE", id = "ID_DEL_NAMESPACE" }]',
      'Crear un KV namespace desde el dashboard de Cloudflare y vincular al Worker'
    );
  }
  
  if (issues.cors) {
    actions.push(
      'Verificar que los encabezados CORS en el Worker incluyan el origen de Supabase',
      'Configurar CORS en Supabase para permitir solicitudes desde el dominio de la aplicación'
    );
  }
  
  if (issues.serviceWorker || issues.supabaseConnection) {
    actions.push(
      'Limpiar la caché del navegador y datos de aplicación',
      'Recargar la página con Ctrl+F5 o Cmd+Shift+R'
    );
  }
  
  if (issues.freePlanLimits) {
    actions.push(
      'Considerar actualizar a un plan de Cloudflare con mayores límites',
      'Optimizar el código para reducir el número de solicitudes'
    );
  }
  
  // Si no hay acciones específicas, dar recomendaciones generales
  if (actions.length === 0) {
    actions.push(
      'Recargar la página',
      'Limpiar caché del navegador',
      'Verificar la conexión a internet'
    );
  }
  
  return actions;
}

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
