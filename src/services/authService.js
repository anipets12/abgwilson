/**
 * Servicio de autenticación para la aplicación
 * Proporciona funciones para inicio de sesión, registro, recuperación de contraseña, etc.
 */

import { supabase } from '../config/supabase';

/**
 * Inicia sesión con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} Respuesta con resultado y posible error
 */
export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    return { success: true, user: data.user, session: data.session };
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, error: error.message || 'Error al iniciar sesión' };
  }
};

/**
 * Inicia sesión con credenciales simuladas (modo desarrollo)
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} Respuesta simulada
 */
export const loginMock = async (email, password) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Credenciales de admin para desarrollo
  if (email === 'wilson1234' && password === 'wilson1234') {
    const adminUser = {
      id: 'admin-wilson',
      name: 'Wilson Alexander Ipiales',
      email: 'admin@abogadowilson.com',
      role: 'admin',
      isAdmin: true
    };
    return { success: true, user: adminUser, token: 'admin-token' };
  }
  
  // Credenciales de usuario normal para desarrollo
  if (email === 'user@example.com' && password === 'password123') {
    const user = {
      id: 'user-test',
      name: 'Usuario Prueba',
      email: 'user@example.com',
      role: 'client',
      isAdmin: false
    };
    return { success: true, user: user, token: 'user-token' };
  }
  
  // Credenciales inválidas
  return { 
    success: false, 
    error: 'Credenciales inválidas. Por favor verifique su email y contraseña.'
  };
};

/**
 * Registra un nuevo usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {Object} userData - Datos adicionales del usuario
 * @returns {Promise<Object>} Respuesta con resultado y posible error
 */
export const register = async (email, password, userData = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name || '',
          phone: userData.phone || '',
          role: 'client'
        }
      }
    });
    
    if (error) throw error;
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Error en register:', error);
    return { success: false, error: error.message || 'Error al registrar usuario' };
  }
};

/**
 * Cierra la sesión del usuario actual
 * @returns {Promise<Object>} Respuesta con resultado y posible error
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error en logout:', error);
    return { success: false, error: error.message || 'Error al cerrar sesión' };
  }
};

/**
 * Envía email de recuperación de contraseña
 * @param {string} email - Email del usuario
 * @returns {Promise<Object>} Respuesta con resultado y posible error
 */
export const resetPasswordRequest = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password'
    });
    
    if (error) throw error;
    
    return { 
      success: true, 
      message: 'Hemos enviado un correo con instrucciones para restablecer tu contraseña' 
    };
  } catch (error) {
    console.error('Error en resetPasswordRequest:', error);
    return { 
      success: false, 
      error: error.message || 'Error al enviar correo de recuperación' 
    };
  }
};

/**
 * Actualiza la contraseña del usuario
 * @param {string} password - Nueva contraseña
 * @param {string} token - Token de recuperación
 * @returns {Promise<Object>} Respuesta con resultado y posible error
 */
export const updatePassword = async (password, token) => {
  try {
    // Si tenemos un token en la URL, primero tenemos que autenticarnos con ese token
    if (token) {
      // Autenticar con el token de recuperación
      const { error: tokenError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'recovery'
      });
      
      if (tokenError) throw tokenError;
    }
    
    // Cambiar la contraseña
    const { error } = await supabase.auth.updateUser({
      password
    });
    
    if (error) throw error;
    
    return { 
      success: true, 
      message: 'Contraseña actualizada correctamente' 
    };
  } catch (error) {
    console.error('Error en updatePassword:', error);
    return { 
      success: false, 
      error: error.message || 'Error al actualizar la contraseña' 
    };
  }
};

/**
 * Verifica si hay un usuario autenticado
 * @returns {Promise<boolean>} true si hay un usuario autenticado
 */
export const isAuthenticated = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  } catch (error) {
    console.error('Error en isAuthenticated:', error);
    return false;
  }
};

/**
 * Obtiene el usuario actual
 * @returns {Promise<Object|null>} Usuario actual o null si no hay sesión
 */
export const getCurrentUser = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch (error) {
    console.error('Error en getCurrentUser:', error);
    return null;
  }
};

// Exportar todas las funciones como un objeto
export const authService = {
  login,
  loginMock,
  register,
  logout,
  resetPasswordRequest,
  updatePassword,
  isAuthenticated,
  getCurrentUser
};

export default authService;
