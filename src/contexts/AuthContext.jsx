import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { toast } from 'react-hot-toast';

// Crear el contexto
export const AuthContext = createContext(null);

/**
 * Proveedor del contexto de autenticación para toda la aplicación
 * Maneja el estado de autenticación del usuario y provee métodos para login, registro, etc.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar sesión al cargar
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Obtener la sesión actual
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error al obtener sesión:', error);
          throw error;
        }
        
        setSession(data.session);
        setUser(data.session?.user || null);
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Suscribirse a cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      setLoading(false);
      
      if (event === 'SIGNED_IN') {
        toast.success('Has iniciado sesión correctamente');
      } else if (event === 'SIGNED_OUT') {
        toast.success('Has cerrado sesión correctamente');
      }
    });

    // Limpiar suscripción
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  /**
   * Inicia sesión con email y contraseña
   */
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  /**
   * Registra un nuevo usuario
   */
  const signUp = async (email, password, userData = {}) => {
    try {
      // Registrar usuario con supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...userData,
            created_at: new Date().toISOString()
          }
        }
      });
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  /**
   * Cierra la sesión del usuario
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      toast.error('Error al cerrar sesión');
      console.error('Error al cerrar sesión:', error);
    }
  };

  /**
   * Envía un correo para recuperar contraseña
   */
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  /**
   * Actualiza la contraseña del usuario
   */
  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  /**
   * Actualiza los datos del perfil del usuario
   */
  const updateProfile = async (userData) => {
    try {
      // Actualizar datos del usuario en auth
      const { error: authError } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (authError) throw authError;
      
      // También actualizar en la tabla de perfiles si existe
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            updated_at: new Date().toISOString(),
            ...userData
          })
          .eq('id', user.id);
          
        if (profileError) throw profileError;
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  // Valor proporcionado por el contexto
  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
