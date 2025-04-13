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

      // Solución directa para servir archivos estáticos
      try {
        // Si es la ruta raíz o termina en .html, intentamos servir index.html directamente
        if (url.pathname === '/' || url.pathname.endsWith('.html') || !url.pathname.includes('.')) {
          const indexRequest = new Request(new URL('/index.html', request.url).toString(), request);
          let indexResponse;
          
          try {
            // Intentar obtener index.html del KV
            const indexContent = await env.ASSETS.get('index.html');
            if (indexContent) {
              indexResponse = new Response(indexContent, {
                headers: {
                  'Content-Type': 'text/html;charset=UTF-8',
                  ...securityHeaders
                }
              });
            } else {
              throw new Error('index.html no encontrado en KV');
            }
          } catch (kvError) {
            console.log('Error al obtener index.html de KV, usando getAssetFromKV:', kvError);
            // Fallback a getAssetFromKV
            const indexPage = await getAssetFromKV(indexRequest, {
              ASSET_NAMESPACE: env.ASSETS
            });
            indexResponse = new Response(indexPage.body, {
              ...indexPage,
              headers: {
                ...indexPage.headers,
                ...securityHeaders
              }
            });
          }
          
          return indexResponse;
        }
        
        // Para otros activos estáticos (CSS, JS, imágenes)
        const assetResponse = await getAssetFromKV(request, {
          ASSET_NAMESPACE: env.ASSETS
        });
        
        // Agregar headers de seguridad
        Object.entries(securityHeaders).forEach(([key, value]) => {
          assetResponse.headers.set(key, value);
        });
        
        return assetResponse;
      } catch (error) {
        console.error('Error al servir activos estáticos:', error);
        
        // Comprobar si el error es 404 y redirigir a index.html para SPAs
        if (error.status === 404) {
          try {
            const indexRequest = new Request(new URL('/index.html', request.url).toString(), request);
            const indexPage = await getAssetFromKV(indexRequest, {
              ASSET_NAMESPACE: env.ASSETS
            });
            return new Response(indexPage.body, {
              ...indexPage,
              headers: {
                ...indexPage.headers,
                ...securityHeaders
              }
            });
          } catch (indexError) {
            console.error('Error al servir index.html como fallback:', indexError);
          }
        }
        
        // Si todo falla, devolver una respuesta básica
        return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander - Sitio en mantenimiento</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #2c5282; margin-bottom: 30px; }
    .message { background-color: #ebf8ff; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .contact { margin-top: 30px; background-color: #f7fafc; padding: 20px; border-radius: 8px; }
    .contact p { margin: 10px 0; }
    .error-info { font-size: 0.8em; color: #777; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <div class="message">
    <p><strong>Nuestro sitio web está en mantenimiento.</strong> Disculpe las molestias.</p>
    <p>Por favor, comuníquese directamente si requiere asistencia legal inmediata.</p>
  </div>
  <div class="contact">
    <p><strong>Email:</strong> alexip2@hotmail.com</p>
    <p><strong>Teléfono:</strong> +593 988835269</p>
    <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
  </div>
  <div class="error-info">
    <p>Información técnica: Estamos actualizando nuestros sistemas para mejorar su experiencia. El sitio estará disponible pronto.</p>
  </div>
</body>
</html>`, {
          status: 503, // Service Unavailable
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Retry-After': '3600',
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
