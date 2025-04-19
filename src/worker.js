// Archivo optimizado para Cloudflare Workers
import { createClient } from '@supabase/supabase-js';
import { handleSPARoutes } from './_routes';

// Instancia única de Supabase a nivel global con valores por defecto
let supabase;
// Valores por defecto para el servicio
const DEFAULT_SUPABASE_URL = 'https://phzldiaohelbyobhjrnc.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sbp_db5898ecc094d37ec87562399efe3833e63ab20f';

// Configuración de Cloudflare Turnstile
const TURNSTILE_SITE_KEY = '0x4AAAAAABDkl--Sw4n_bwmU';
const TURNSTILE_SECRET_KEY = '0x4AAAAAABDkl-wPYTurHAniMDA2wqOJ__k';

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

    // Servir recursos estáticos y manejar rutas de SPA
    if (!pathname.startsWith('/api/')) {
      // Usa nuestro gestor de rutas SPA para determinar si debemos servir index.html
      const shouldServeIndexHtml = handleSPARoutes(request, env);
      
      if (env.ASSETS) {
        // Crear una nueva petición para el asset
        let assetRequest = new Request(request.url, request);
        
        if (shouldServeIndexHtml) {
          // Si es una ruta SPA como /login o /register, servir index.html
          console.log(`Sirviendo index.html para ruta SPA: ${pathname}`);
          assetRequest = new Request(`${url.origin}/index.html`, request);
        }
        
        return env.ASSETS.fetch(assetRequest);
      } else {
        // Si no hay ASSETS binding, intentar fallback para desarrollo local
        console.warn('No ASSETS binding found, attempting fallback for local development');
        try {
          if (shouldServeIndexHtml) {
            return fetch(new URL('/index.html', request.url));
          } else {
            return fetch(request.url);
          }
        } catch (err) {
          console.error('Fallback failed:', err);
        }
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
          environment: env.CLOUDFLARE_ENV || 'development',
          turnstile_enabled: true
        }), { headers });
      }
      
      // Endpoint para verificar tokens de Turnstile
      if (pathname === '/api/verify-turnstile' && request.method === 'POST') {
        const { token, action } = await request.json();
        
        if (!token) {
          return new Response(JSON.stringify({
            success: false,
            message: 'Token de Turnstile es requerido'
          }), { headers, status: 400 });
        }
        
        try {
          // Verificar token con Turnstile API
          const formData = new URLSearchParams();
          formData.append('secret', env.TURNSTILE_SECRET_KEY || TURNSTILE_SECRET_KEY);
          formData.append('response', token);
          formData.append('remoteip', request.headers.get('CF-Connecting-IP'));
          
          const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          
          const turnstileResult = await turnstileResponse.json();
          
          if (turnstileResult.success) {
            // Si la verificación fue exitosa, registramos la acción
            if (action === 'contact_form' || action === 'consultation') {
              // Opcional: registrar el evento en Supabase
              await supabase.from('security_logs').insert({
                action: action,
                token: token.substring(0, 10) + '...',  // Solo guardar una parte del token por seguridad
                success: true,
                created_at: new Date().toISOString()
              }).catch(err => console.warn('Error al registrar verificación Turnstile:', err));
            }
            
            return new Response(JSON.stringify({
              success: true,
              verification: turnstileResult
            }), { headers });
          } else {
            return new Response(JSON.stringify({
              success: false,
              message: 'Verificación de Turnstile fallida',
              errors: turnstileResult['error-codes']
            }), { headers, status: 400 });
          }
        } catch (error) {
          return new Response(JSON.stringify({
            success: false,
            message: 'Error al verificar token de Turnstile',
            error: env.ENABLE_DIAGNOSTICS === 'true' ? error.message : undefined
          }), { headers, status: 500 });
        }
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
