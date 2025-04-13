/// <reference path="./cloudflare.d.ts" />
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { WorkerEnv, WorkerRequest, Services } from './types'
import { handleAuthRoutes } from './routes/auth'
import { handleDocumentRoutes } from './routes/documents'
import { handleContactRoutes } from './routes/contacto'
import { createSupabaseClient, createPrismaClient, createNotionClient, createOpenAIClient, createPayPalClient, createMistralClient } from './shims'

// Importación segura del manifiesto estático
let assetManifest = {}
try {
  // @ts-ignore - Este import es generado por Cloudflare durante el despliegue
  const manifestJSON = globalThis.__STATIC_CONTENT_MANIFEST || '{}'
  assetManifest = JSON.parse(manifestJSON)
} catch (e) {
  console.error('Error al cargar el manifiesto de activos:', e)
}

export interface Env {
  DB: D1Database
  ASSETS: KVNamespace
  SUPABASE_URL: string
  SUPABASE_KEY: string
  DATABASE_URL: string
  JWT_SECRET: string
  TURSO_DATABASE_URL: string
  TURSO_AUTH_TOKEN: string
  CORS_ORIGIN: string
  NOTION_API_KEY: string
  NOTION_DATABASE_ID: string
  OPENAI_API_KEY: string
  PAYPAL_CLIENT_ID: string
  PAYPAL_CLIENT_SECRET: string
  MISTRAL_API_KEY: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

async function handleOptions(request: Request) {
  return new Response(null, {
    headers: {
      ...corsHeaders,
      'Allow': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  });
}

function createServices(env: Env) {
  try {
    const supabase = createSupabaseClient(env.SUPABASE_URL || '', env.SUPABASE_KEY || '');
    const prisma = createPrismaClient(env.DATABASE_URL || '');
    const notion = createNotionClient(env.NOTION_API_KEY || '', env.NOTION_DATABASE_ID || '');
    const openai = createOpenAIClient(env.OPENAI_API_KEY || '');
    const paypal = createPayPalClient(env.PAYPAL_CLIENT_ID || '', env.PAYPAL_CLIENT_SECRET || '');
    const mistral = createMistralClient(env.MISTRAL_API_KEY || '');
    
    return {
      supabase,
      prisma,
      notion,
      openai,
      paypal,
      mistral,
      db: env.DB,
      assets: env.ASSETS,
    };
  } catch (error) {
    console.error('Error al crear servicios:', error);
    // Devolver servicios vacíos que no fallen al ser llamados
    return {
      supabase: { auth: { getSession: () => ({ data: { session: null } }) } },
      prisma: {},
      notion: {},
      openai: {},
      paypal: {},
      mistral: {},
      db: env.DB,
      assets: env.ASSETS,
    };
  }
}

async function handleApiRequest(request: Request, env: Env): Promise<Response> {
  const services = createServices(env)
  const url = new URL(request.url)
  const path = url.pathname.replace('/api', '')

  try {
    // API routes handling
    if (path.startsWith('/auth')) {
      // Auth endpoints
      return await handleAuthRoutes(request, services)
    } else if (path.startsWith('/documents')) {
      // Document endpoints
      return await handleDocumentRoutes(request, services)
    } else if (path.startsWith('/contacto')) {
      // Contacto endpoints
      return await handleContactRoutes(request, services)
    }

    return new Response(JSON.stringify({ error: 'Ruta no encontrada' }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  } catch (error) {
    console.error('API Error:', error)
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }
}

export default {
  async fetch(request: WorkerRequest, env: WorkerEnv, ctx: ExecutionContext): Promise<Response> {
    const securityHeaders = {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co https://*.turso.io https://api.notion.com",
      ...corsHeaders
    }

    try {
      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return handleOptions(request)
      }

      // Advertir sobre variables de entorno faltantes pero no fallar
      if (!env.SUPABASE_URL || !env.SUPABASE_KEY || !env.DATABASE_URL || !env.JWT_SECRET) {
        console.warn('Advertencia: Algunas variables de entorno importantes podrían faltar, pero continuaremos')
      }

      const url = new URL(request.url)
      
      // Handle API requests
      if (url.pathname.startsWith('/api')) {
        return handleApiRequest(request, env)
      }

      // Implementación simplificada para servir activos estáticos
      try {
        // Intentar servir el activo solicitado directamente
        let response;
        try {
          const options = {
            ASSET_NAMESPACE: env.ASSETS,
            // Solo usar el manifiesto si está disponible
            ...((Object.keys(assetManifest).length > 0) ? { ASSET_MANIFEST: assetManifest } : {}),
            // Definir un cacheControl para mayor rendimiento
            cacheControl: {
              browserTTL: 60 * 60 * 24, // 1 día
              edgeTTL: 60 * 60 * 24 * 2, // 2 días
              bypassCache: false,
            },
          };

          const page = await getAssetFromKV(request, options);
          response = new Response(page.body, page);
        } catch (e) {
          // Si falla, intentar servir index.html para el enrutamiento SPA
          console.log('Error al servir activo específico, intentando con index.html:', e);
          const indexRequest = new Request(new URL('/index.html', request.url).toString(), request);
          const indexPage = await getAssetFromKV(indexRequest, {
            ASSET_NAMESPACE: env.ASSETS,
            ...((Object.keys(assetManifest).length > 0) ? { ASSET_MANIFEST: assetManifest } : {}),
          });
          response = new Response(indexPage.body, {
            ...indexPage,
            status: 200,
          });
        }
        
        // Agregar headers de seguridad
        response.headers.set('X-XSS-Protection', '1; mode=block');
        Object.entries(securityHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
        
        return response;
      } catch (error) {
        console.error('Error al servir activos estáticos:', error);
        // Devolver una respuesta HTML básica como fallback
        return new Response(`
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Abg. Wilson Alexander - Servicio Temporal</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
              h1 { color: #2c5282; }
              .message { background-color: #ebf8ff; padding: 20px; border-radius: 8px; }
              .contact { margin-top: 30px; }
            </style>
          </head>
          <body>
            <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
            <div class="message">
              <p>Nuestro sitio web está en mantenimiento. Disculpe las molestias.</p>
              <p>Por favor, comuníquese directamente si requiere asistencia legal.</p>
            </div>
            <div class="contact">
              <p><strong>Email:</strong> alexip2@hotmail.com</p>
              <p><strong>Teléfono:</strong> +593 988835269</p>
              <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
            </div>
          </body>
          </html>
        `, { 
          status: 200,
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            ...securityHeaders
          }
        });
      }
    } catch (error) {
      console.error('Worker Error:', error)
      return new Response('Error interno del servidor', {
        status: 500,
        headers: securityHeaders,
      })
    }
  },
}
