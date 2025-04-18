/**
 * Gestor seguro de variables de entorno
 * 
 * Este módulo proporciona acceso seguro a las variables de entorno y
 * evita que se expongan directamente al cliente. Utiliza un patrón
 * de acceso controlado para prevenir filtraciones de información sensible.
 */

// Variables públicas expuestas al cliente (seguras)
const publicEnvVars = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'https://phzldiaohelbyobhjrnc.supabase.co',
  CORS_ORIGIN: import.meta.env.VITE_CORS_ORIGIN || '*',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  CLOUDFLARE_TURNSTILE_SITE_KEY: import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || '0x4AAAAAAADnPIDROrmt1Vae',
  STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_sample',
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
};

// Variables privadas (nunca expuestas directamente al cliente)
const privateEnvVars = {
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET,
  STRIPE_SECRET_KEY: import.meta.env.VITE_STRIPE_SECRET_KEY,
  CLOUDFLARE_TURNSTILE_SECRET_KEY: import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SECRET_KEY,
};

/**
 * Función segura para obtener variables de entorno públicas
 * @param {string} key - Nombre de la variable
 * @returns {string} Valor de la variable o cadena vacía
 */
export const getPublicEnv = (key) => {
  if (!key) return '';
  
  // Solo devolver variables definidas como públicas
  if (publicEnvVars.hasOwnProperty(key)) {
    return publicEnvVars[key] || '';
  }
  
  // No permitir acceso a variables privadas
  if (privateEnvVars.hasOwnProperty(key)) {
    console.error(`Error: Intento de acceso a variable privada ${key}`);
    return '';
  }
  
  console.warn(`Variable de entorno no encontrada: ${key}`);
  return '';
};

/**
 * Función para comprobar si estamos en entorno de producción
 * @returns {boolean} True si estamos en producción
 */
export const isProduction = () => {
  return publicEnvVars.NODE_ENV === 'production';
};

/**
 * Función para comprobar si estamos en entorno de desarrollo
 * @returns {boolean} True si estamos en desarrollo
 */
export const isDevelopment = () => {
  return publicEnvVars.NODE_ENV === 'development';
};

/**
 * Acceso controlado a API URLs basado en el entorno
 * @returns {Object} Objeto con URLs para APIs
 */
export const getApiUrls = () => {
  const baseUrl = publicEnvVars.API_BASE_URL;
  
  return {
    auth: `${baseUrl}/auth`,
    users: `${baseUrl}/users`,
    payments: `${baseUrl}/payments`,
    documents: `${baseUrl}/documents`,
    forum: `${baseUrl}/forum`,
    affiliates: `${baseUrl}/affiliates`,
    consultations: `${baseUrl}/consultations`,
    turnstileVerify: `${baseUrl}/security/verify-turnstile`,
  };
};

export default {
  getPublicEnv,
  isProduction,
  isDevelopment,
  getApiUrls,
};
