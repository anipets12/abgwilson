import { createClient } from '@supabase/supabase-js';

// Variables de entorno para conexión a Supabase
// En producción, estas variables se leerán de las variables de entorno de Cloudflare Workers
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Función para manejar errores comunes de autenticación
export const handleAuthError = (error) => {
  const errorMessages = {
    'Invalid login credentials': 'Credenciales inválidas. Por favor verifica tu correo y contraseña.',
    'Email not confirmed': 'Por favor confirma tu correo electrónico antes de iniciar sesión.',
    'User already registered': 'Este correo ya está registrado. Intenta iniciar sesión o recuperar tu contraseña.',
    'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
    'Rate limit exceeded': 'Demasiados intentos. Por favor, espera unos minutos antes de intentar nuevamente.',
    'Network error': 'Error de conexión. Por favor verifica tu conexión a internet.',
  };

  return errorMessages[error.message] || error.message || 'Ocurrió un error. Por favor intenta nuevamente.';
};

// Función para verificar si un token es válido
export const isValidToken = async (token) => {
  try {
    const { error } = await supabase.auth.api.getUser(token);
    return !error;
  } catch (error) {
    console.error('Error verificando token:', error);
    return false;
  }
};

// Exportar funciones de utilidad para auth
export default {
  supabase,
  handleAuthError,
  isValidToken
};
