/**
 * Mock de Supabase para desarrollo sin dependencias externas
 * Elimina los errores de carga de @supabase/supabase-js
 */

export const createClient = () => {
  console.log('Usando cliente Supabase simulado');
  
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
      signUp: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      })
    },
    from: (table) => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null })
          })
        }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        })
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: null })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: null })
      })
    }),
    storage: {
      from: (bucket) => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  };
};

// Export funciones simuladas para compatibilidad
export const REALTIME_LISTEN_TYPES = {
  BROADCAST: 'broadcast',
  PRESENCE: 'presence'
};

export const REALTIME_SUBSCRIBE_STATES = {
  SUBSCRIBED: 'SUBSCRIBED',
  TIMED_OUT: 'TIMED_OUT',
  CLOSED: 'CLOSED',
  CHANNEL_ERROR: 'CHANNEL_ERROR'
};

export default {
  createClient,
  REALTIME_LISTEN_TYPES,
  REALTIME_SUBSCRIBE_STATES
};
