import { createClient } from '@supabase/supabase-js';

// Crear una única instancia del cliente Supabase
// Usar valores de configuración directamente si no están disponibles en env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://phzldiaohelbyobhjrnc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'sbp_db5898ecc094d37ec87562399efe3833e63ab20f';

if (!import.meta.env.VITE_SUPABASE_KEY) {
  console.warn('No se encontró VITE_SUPABASE_KEY en variables de entorno, usando valor por defecto.');
}

// Asegurando que siempre tenemos un valor para createClient
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Funciones de autenticación con Supabase
 */
export const supabaseAuth = {
  // Registro con email y contraseña
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.name || '',
          phone: userData.phone || '',
          role: 'client',
          created_at: new Date().toISOString(),
        }
      }
    });
    
    if (error) throw error;
    return data;
  },
  
  // Iniciar sesión con email y contraseña
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },
  
  // Cerrar sesión
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  },
  
  // Recuperar contraseña
  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    return data;
  },
  
  // Actualizar contraseña
  async updatePassword(password) {
    const { data, error } = await supabase.auth.updateUser({
      password
    });
    
    if (error) throw error;
    return data;
  },
  
  // Obtener sesión actual
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },
  
  // Obtener usuario actual
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  }
};

/**
 * Funciones para manejar los perfiles de usuario
 */
export const profileService = {
  // Obtener perfil por ID
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  // Actualizar perfil
  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
      
    if (error) throw error;
    return data;
  },
  
  // Subir avatar
  async uploadAvatar(userId, file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    // Actualizar URL de avatar en el perfil
    const { data: publicURL } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
      
    await this.updateProfile(userId, {
      avatar_url: publicURL.publicUrl
    });
    
    return publicURL.publicUrl;
  }
};

/**
 * Servicios para manejar las consultas jurídicas
 */
export const consultationService = {
  // Crear una nueva consulta
  async createConsultation(consultationData) {
    const { data, error } = await supabase
      .from('consultations')
      .insert([{
        ...consultationData,
        created_at: new Date().toISOString(),
        status: 'pendiente'
      }]);
      
    if (error) throw error;
    return data;
  },
  
  // Obtener consultas de un usuario
  async getUserConsultations(userId) {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },
  
  // Obtener todas las consultas (admin)
  async getAllConsultations() {
    const { data, error } = await supabase
      .from('consultations')
      .select('*, profiles(*)')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },
  
  // Actualizar estado de consulta
  async updateConsultationStatus(consultationId, newStatus) {
    const { data, error } = await supabase
      .from('consultations')
      .update({ status: newStatus })
      .eq('id', consultationId);
      
    if (error) throw error;
    return data;
  }
};

/**
 * Servicios para el foro legal
 */
export const forumService = {
  // Crear un nuevo tema
  async createTopic(topicData) {
    const { data, error } = await supabase
      .from('forum_topics')
      .insert([{
        ...topicData,
        created_at: new Date().toISOString(),
        views: 0,
        is_highlighted: false
      }]);
      
    if (error) throw error;
    return data;
  },
  
  // Obtener temas del foro
  async getTopics(category = null) {
    let query = supabase
      .from('forum_topics')
      .select('*, profiles(name, avatar_url)')
      .order('is_highlighted', { ascending: false })
      .order('created_at', { ascending: false });
      
    if (category && category !== 'Todos') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    return data;
  },
  
  // Obtener un tema específico
  async getTopic(topicId) {
    const { data, error } = await supabase
      .from('forum_topics')
      .select('*, profiles(name, avatar_url)')
      .eq('id', topicId)
      .single();
      
    if (error) throw error;
    
    // Incrementar vistas
    await supabase
      .from('forum_topics')
      .update({ views: data.views + 1 })
      .eq('id', topicId);
      
    return data;
  },
  
  // Añadir respuesta a un tema
  async addReply(topicId, replyData) {
    const { data, error } = await supabase
      .from('forum_replies')
      .insert([{
        topic_id: topicId,
        ...replyData,
        created_at: new Date().toISOString()
      }]);
      
    if (error) throw error;
    return data;
  },
  
  // Obtener respuestas de un tema
  async getReplies(topicId) {
    const { data, error } = await supabase
      .from('forum_replies')
      .select('*, profiles(name, avatar_url)')
      .eq('topic_id', topicId)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    return data;
  }
};

/**
 * Servicios para documentos y recursos exclusivos
 */
export const exclusiveContentService = {
  // Obtener documentos exclusivos
  async getExclusiveDocuments(category = null) {
    let query = supabase
      .from('exclusive_documents')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
      
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  },
  
  // Obtener documento por ID
  async getDocument(docId) {
    const { data, error } = await supabase
      .from('exclusive_documents')
      .select('*')
      .eq('id', docId)
      .single();
      
    if (error) throw error;
    
    // Registrar vista
    await this.recordDocumentView(docId);
    
    return data;
  },
  
  // Registrar vista de documento
  async recordDocumentView(docId) {
    const session = await supabaseAuth.getSession();
    if (!session) return;
    
    await supabase.from('document_views').insert([{
      document_id: docId,
      user_id: session.user.id,
      viewed_at: new Date().toISOString()
    }]);
  },
  
  // Verificar si el usuario tiene acceso premium
  async checkPremiumAccess() {
    const session = await supabaseAuth.getSession();
    if (!session) return false;
    
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('status', 'active')
      .single();
      
    return !!data;
  }
};

export default supabase;
