import { createClient } from '@supabase/supabase-js';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  CORS_ORIGIN: string;
  ENABLE_DIAGNOSTICS: string;
  CLOUDFLARE_ENV: string;
}

let supabase: ReturnType<typeof createClient>;

// Add authentication check middleware
const checkAuth = async (request: Request) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) return null;
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  return error ? null : user;
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Initialize Supabase with environment variables
    if (!supabase) {
      supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
    }

    const url = new URL(request.url);
    const { pathname } = url;
    const headers = {
      'Access-Control-Allow-Origin': env.CORS_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    try {
      // Add authentication endpoints
      if (pathname.startsWith('/api/auth')) {
        if (pathname === '/api/auth/check') {
          const user = await checkAuth(request);
          return new Response(
            JSON.stringify({ isAuthenticated: !!user, user }), 
            { headers, status: 200 }
          );
        }
      }

      // Protect dashboard routes
      if (pathname.startsWith('/api/dashboard')) {
        const user = await checkAuth(request);
        if (!user) {
          return new Response(
            JSON.stringify({ error: 'Unauthorized' }), 
            { headers, status: 401 }
          );
        }
      }

      // Add quick consultation endpoint
      if (pathname === '/api/quick-consultation') {
        if (request.method === 'POST') {
          const data = await request.json() as Record<string, unknown>;
          // En vez de usar Prisma, guardamos con Supabase
          const { data: consultation, error } = await supabase
            .from('consultations')
            .insert([{ ...data, status: 'pending', created_at: new Date().toISOString() }])
            .select();
            
          if (error) throw error;
          return new Response(JSON.stringify(consultation[0]), { headers, status: 201 });
        }
      }

      // Add payment verification endpoint
      if (pathname.startsWith('/api/payments/verify')) {
        // Add PayPal verification logic
        if (request.method === 'POST') {
          const { paymentId } = await request.json() as { paymentId: string };
          // Verify with PayPal API
          // Add your PayPal verification logic here
          return new Response(JSON.stringify({ verified: true }), { headers, status: 200 });
        }
      }

      if (pathname.startsWith('/api/items')) {
        if (request.method === 'GET') {
          // Obtener todos los items usando Supabase en vez de Prisma
          const { data: items, error } = await supabase
            .from('items')
            .select('*');
            
          if (error) throw error;
          return new Response(JSON.stringify(items), { headers, status: 200 });
        } else if (request.method === 'POST') {
          // Crear un nuevo item
          const data = await request.json() as Record<string, unknown>;
          const { data: newItem, error } = await supabase
            .from('items')
            .insert([data])
            .select();
            
          if (error) throw error;
          return new Response(JSON.stringify(newItem[0]), { headers, status: 201 });
        } else if (request.method === 'PUT') {
          // Actualizar un item existente
          const data = await request.json() as Record<string, unknown> & { id: string };
          const { data: updatedItem, error } = await supabase
            .from('items')
            .update(data)
            .eq('id', data.id)
            .select();
            
          if (error) throw error;
          return new Response(JSON.stringify(updatedItem[0]), { headers, status: 200 });
        } else if (request.method === 'DELETE') {
          // Borrar un item
          const { id } = await request.json() as { id: string };
          const { error } = await supabase
            .from('items')
            .delete()
            .eq('id', id);
            
          if (error) throw error;
          return new Response(JSON.stringify({ deleted: true }), { headers, status: 200 });
        }
      }

      if (pathname.startsWith('/api/supabase')) {
        const { data, error } = await supabase.from('table_name').select('*');
        if (error) {
          throw error;
        }
        return new Response(JSON.stringify(data), { headers, status: 200 });
      }

      return new Response(JSON.stringify({ message: 'Not Found' }), { 
        headers, 
        status: 404 
      });

    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), { 
        headers, 
        status: 500 
      });
    }
  }
};