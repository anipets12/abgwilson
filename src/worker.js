// Archivo optimizado para Cloudflare Workers
import { createClient } from '@supabase/supabase-js';

// Instancia única de Supabase a nivel global con valores por defecto
let supabase;
// Valores por defecto para el servicio
const DEFAULT_SUPABASE_URL = 'https://phzldiaohelbyobhjrnc.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sbp_db5898ecc094d37ec87562399efe3833e63ab20f';

export default {
  async fetch(request, env, ctx) {
    // Asegurarnos de disponer del cliente sólo una vez, usando valores por defecto si no están en env
    if (!supabase) {
      const supabaseUrl = env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
      const supabaseKey = env.SUPABASE_KEY || DEFAULT_SUPABASE_KEY;
      
      if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
        console.warn('Variables de entorno de Supabase no encontradas, usando valores por defecto');
      }
      
      supabase = createClient(supabaseUrl, supabaseKey);
    }

    const url = new URL(request.url);
    const { pathname } = url;

    // Servir directamente cualquier recurso estático (HTML, JS, imágenes, favicon, etc.)
    if (!pathname.startsWith('/api/')) {
      // Si existe binding de assets usamos esa opción, de lo contrario devolvemos 404
      if (env.ASSETS) {
        return env.ASSETS.fetch(request);
      }
    }

    // A partir de aquí todo lo que sea /api/* recibe cabeceras CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    // Manejar CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        headers: corsHeaders,
        status: 204
      });
    }

    // Headers por defecto para respuestas
    const headers = {
      ...corsHeaders,
      'Content-Type': 'application/json'
    };

    try {
      // ------------------------------------------------------------
      // RUTAS API
      // ------------------------------------------------------------

      // API para verificar estado
      if (pathname === '/api/status') {
        return new Response(JSON.stringify({
          status: 'healthy',
          timestamp: new Date().toISOString(),
          environment: env.CLOUDFLARE_ENV || 'development'
        }), { headers });
      }

      // Verificación de autenticación
      if (pathname.startsWith('/api/auth')) {
        if (pathname === '/api/auth/check') {
          const authHeader = request.headers.get('Authorization');
          const token = authHeader?.split(' ')[1];
          
          if (!token) {
            return new Response(JSON.stringify({ 
              isAuthenticated: false 
            }), { headers });
          }
          
          const { data: { user }, error } = await supabase.auth.getUser(token);
          return new Response(JSON.stringify({ 
            isAuthenticated: !!user && !error,
            user: user || null
          }), { headers });
        }
      }

      // Rutas para consultas legales
      if (pathname === '/api/quick-consultation' && request.method === 'POST') {
        const data = await request.json();
        
        // Validación básica
        if (!data.name || !data.email || !data.message) {
          return new Response(JSON.stringify({
            success: false,
            message: 'Se requieren los campos name, email y message'
          }), { headers, status: 400 });
        }
        
        // Guardar en Supabase
        const { data: result, error } = await supabase
          .from('consultations')
          .insert([{
            name: data.name,
            email: data.email,
            message: data.message,
            phone: data.phone || null,
            status: 'pending',
            created_at: new Date().toISOString()
          }])
          .select();
          
        if (error) throw error;
        
        return new Response(JSON.stringify({
          success: true,
          consultation: result[0]
        }), { headers, status: 201 });
      }
      
      // Ruta para obtener servicios
      if (pathname === '/api/services' && request.method === 'GET') {
        const { data, error } = await supabase
          .from('services')
          .select('*');
          
        if (error) throw error;
        
        return new Response(JSON.stringify(data), { headers });
      }

      // Si no se encuentra la ruta dentro de /api
      return new Response(JSON.stringify({
        success: false,
        message: 'Ruta no encontrada'
      }), { headers, status: 404 });
      
    } catch (err) {
      // Log de error (visible en dashboard de Cloudflare)
      console.error(`Error en Worker: ${err.stack || err}`);
      
      // Respuesta de error
      return new Response(JSON.stringify({
        success: false,
        message: 'Error interno del servidor',
        error: env.ENABLE_DIAGNOSTICS === 'true' ? err.message : undefined
      }), { headers, status: 500 });
    }
  }
};
