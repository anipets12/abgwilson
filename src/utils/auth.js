/**
 * Utilidad de autenticación para el frontend
 * Implementa funciones para manejar el estado de autenticación del usuario
 * Integración con Supabase para autenticación serverless
 */

import { supabaseAuth } from './supabase';

// Claves para almacenar en localStorage
const TOKEN_KEY = 'abgwilson_auth_token';
const USER_KEY = 'abgwilson_user';

/**
 * Clase de autenticación para gestionar el login/logout y estado del usuario
 */
class Auth {
  /**
   * Inicializa el estado de autenticación desde localStorage
   */
  constructor() {
    this.authenticated = !!localStorage.getItem(TOKEN_KEY);
    this.token = localStorage.getItem(TOKEN_KEY);
    this.user = JSON.parse(localStorage.getItem(USER_KEY) || 'null');
    
    // Verificar la sesión al iniciar
    this.checkSession();
  }
  
  /**
   * Verifica si existe una sesión activa en Supabase
   */
  async checkSession() {
    try {
      const session = await supabaseAuth.getSession();
      if (session) {
        const user = await supabaseAuth.getCurrentUser();
        this.login(session.access_token, user);
      }
    } catch (error) {
      console.warn('Error al verificar sesión:', error.message);
      this.logout();
    }
  }

  /**
   * Establece el token y la información del usuario al iniciar sesión
   * @param {string} token - Token JWT o similar
   * @param {object} userData - Información del usuario
   */
  login(token, userData) {
    this.authenticated = true;
    this.token = token;
    this.user = userData;
    
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    
    return true;
  }

  /**
   * Inicia sesión usando Supabase
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise} Promesa que resuelve la información del usuario
   */
  async loginWithSupabase(email, password) {
    try {
      const data = await supabaseAuth.signIn(email, password);
      if (data.session) {
        this.login(data.session.access_token, data.user);
        return { success: true, user: data.user, token: data.session.access_token };
      }
      throw new Error('No se pudo iniciar sesión');
    } catch (error) {
      console.error('Error de autenticación:', error.message);
      throw error;
    }
  }
  
  /**
   * Registra un usuario usando Supabase
   * @param {object} userData - Datos del usuario a registrar
   * @returns {Promise} Promesa que resuelve con los datos del usuario registrado
   */
  async registerWithSupabase(userData) {
    try {
      const data = await supabaseAuth.signUp(
        userData.email, 
        userData.password,
        {
          name: userData.name,
          phone: userData.phone
        }
      );
      
      if (data.user) {
        // En Supabase, el usuario debe confirmar su email antes de iniciar sesión
        return { 
          success: true, 
          user: data.user, 
          message: 'Se ha enviado un correo de confirmación. Por favor verifica tu bandeja de entrada.'
        };
      }
      throw new Error('No se pudo completar el registro');
    } catch (error) {
      console.error('Error de registro:', error.message);
      throw error;
    }
  }

  /**
   * Recupera la contraseña de un usuario
   * @param {string} email - Email del usuario
   * @returns {Promise} Promesa que resuelve con el resultado de la operación
   */
  async resetPassword(email) {
    try {
      await supabaseAuth.resetPassword(email);
      return { 
        success: true, 
        message: 'Se ha enviado un correo para restablecer tu contraseña'
      };
    } catch (error) {
      console.error('Error al restablecer contraseña:', error.message);
      throw error;
    }
  }
  
  /**
   * Actualiza la contraseña del usuario
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise} Promesa que resuelve con el resultado de la operación
   */
  async updatePassword(newPassword) {
    try {
      await supabaseAuth.updatePassword(newPassword);
      return { 
        success: true, 
        message: 'Contraseña actualizada correctamente'
      };
    } catch (error) {
      console.error('Error al actualizar contraseña:', error.message);
      throw error;
    }
  }

  /**
   * Inicia sesión con credenciales específicas de administrador
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise} Promesa que resuelve la información del usuario
   */
  async login(email, password) {
    try {
      // Verificar credenciales de admin directamente
      if (email === 'wilson1234' && password === 'wilson1234') {
        // Admin hardcoded para desarrollo/demostración
        const adminUser = {
          id: 'admin-wilson',
          name: 'Wilson Alexander Ipiales',
          email: 'alexip2@hotmail.com',
          role: 'admin',
          isAdmin: true
        };
        
        // Generar token JWT para admin
        const token = this.generateToken(adminUser);
        
        // Guardar en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(adminUser));
        
        return { success: true, user: adminUser, token };
      }
      
      // Verificar credenciales normales en Supabase
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Obtener datos adicionales del usuario desde la base de datos
      const { data: userData, error: userError } = await this.supabase
        .from('users')
        .select('*')
        .eq('auth_id', data.user.id)
        .single();

      if (userError) throw userError;

      const user = {
        id: data.user.id,
        name: userData.full_name,
        email: data.user.email,
        role: userData.role || 'user',
        isAdmin: userData.role === 'admin',
        subscription: userData.subscription_level,
        avatar: userData.avatar_url
      };

      // Generar token JWT
      const token = this.generateToken(user);
      
      // Guardar en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user, token };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: error.message || 'Error al iniciar sesión. Inténtelo nuevamente.'
      };
    }
  }

  /**
   * Simula un inicio de sesión para desarrollo (sin backend)
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise} Promesa que resuelve la información del usuario
   * @deprecated Usar loginWithSupabase en producción
   */
  async loginMock(email, password) {
    // Admin hardcoded
    if (email === 'wilson1234' && password === 'wilson1234') {
      const adminUser = {
        id: 'admin-wilson',
        name: 'Wilson Alexander Ipiales',
        email: 'alexip2@hotmail.com',
        role: 'admin',
        isAdmin: true
      };
      
      const mockToken = 'admin-token-' + Date.now();
      return { success: true, user: adminUser, token: mockToken };
    }
    
    // Usuario normal demo
    if (email === 'demo@ejemplo.com' && password === 'password') {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: '1',
        name: 'Usuario Demo',
        email: 'demo@ejemplo.com',
        role: 'user',
        isAdmin: false,
        subscription: 'free'
      };
      return { success: true, user: mockUser, token: mockToken };
    }
    
    // Usuario premium demo
    if (email === 'premium@ejemplo.com' && password === 'premium') {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: '2',
        name: 'Usuario Premium',
        email: 'premium@ejemplo.com',
        role: 'user',
        isAdmin: false,
        subscription: 'premium'
      };
      return { success: true, user: mockUser, token: mockToken };
    }
    
    return { 
      success: false, 
      error: 'Credenciales incorrectas. Inténtelo nuevamente.' 
    };
  }

  /**
   * Cierra la sesión del usuario
   */
  async logout() {
    try {
      // Si hay una sesión en Supabase, cerrarla
      if (process.env.NODE_ENV === 'production') {
        await supabaseAuth.signOut();
      }
      
      this.authenticated = false;
      this.token = null;
      this.user = null;
      
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      
      return true;
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      throw error;
    }
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} Estado de autenticación
   */
  isAuthenticated() {
    return this.authenticated;
  }

  /**
   * Obtiene el token actual
   * @returns {string|null} Token o null si no está autenticado
   */
  getToken() {
    return this.token;
  }

  /**
   * Obtiene la información del usuario actual
   * @returns {object|null} Información del usuario o null si no está autenticado
   */
  getUser() {
    return this.user;
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param {string} role - Rol a verificar
   * @returns {boolean} True si el usuario tiene el rol, false en caso contrario
   */
  hasRole(role) {
    return this.user && this.user.role === role;
  }
}

// Exportar una instancia única
export const auth = new Auth();
export default auth;
