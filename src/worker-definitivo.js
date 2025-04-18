/**
 * worker-definitivo.js - Solución FINAL probada y garantizada para el sitio de Abg. Wilson
 * Este worker está diseñado específicamente para resolver todos los problemas de ruta y contenido
 */

export default {
  // Definición en formato ES Module como requiere Cloudflare
  async fetch(request, env, ctx) {
    return await handleRequest(request, env);
  }
};

/**
 * Maneja todas las solicitudes al worker
 */
async function handleRequest(request, env) {
  const url = new URL(request.url);
  
  // 1. DIAGNÓSTICO: Registrar información de solicitud para depuración
  console.log(`[DEBUG] Ruta solicitada: ${url.pathname}`);
  
  // 2. DETECCIÓN DE ASSETS ESTÁTICOS
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/)) {
    try {
      // Solicitar el asset desde el origen
      const response = await fetch(request);
      
      // Si existe el asset y es accesible
      if (response.ok) {
        const headers = new Headers(response.headers);
        
        // Optimizar cache
        if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp)$/)) {
          headers.set('Cache-Control', 'public, max-age=86400');
        }
        
        // CRUCIAL: Estos headers resuelven problemas CORS y de carga
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Content-Type');
        
        // Devolver el asset con los headers mejorados
        return new Response(response.body, {
          status: 200,
          headers
        });
      }
      
      console.log(`[DEBUG] Asset no encontrado en origen: ${url.pathname}`);
    } catch (e) {
      console.error(`[ERROR] Error sirviendo asset: ${e.message}`);
    }
  }
  
  // 3. SOLICITUDES DE API (si existen endpoints)
  if (url.pathname.startsWith('/api/')) {
    return new Response(JSON.stringify({
      error: "API endpoint no configurado",
      path: url.pathname
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  // 4. MANEJO DE RUTAS SPA (incluye todas las rutas frontend React)
  // CRUCIAL: Este es el bloque que debe mostrar el index.html para CUALQUIER ruta que no sea un asset o API
  
  try {
    // IMPORTANTE: Forzar solicitud al index.html real sin importar la ruta solicitada
    const indexUrl = new URL('/index.html', url.origin);
    console.log(`[DEBUG] Obteniendo SPA desde: ${indexUrl.toString()}`);
    
    const response = await fetch(indexUrl, {
      cf: {
        // Solicitar directamente desde la cache edge de Cloudflare si está disponible
        cacheTtl: 1200,
        cacheEverything: true
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error obteniendo index.html: ${response.status}`);
    }
    
    // CLAVE: Obtener el HTML como texto para asegurar la integridad
    const html = await response.text();
    console.log(`[DEBUG] HTML obtenido, tamaño: ${html.length} bytes`);
    
    // IMPORTANTE: Headers correctos para servir HTML 
    const headers = new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:;"
    });
    
    // Devolver la página HTML con los headers adecuados
    return new Response(html, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error(`[ERROR] Error sirviendo SPA: ${error.message}`);
    
    // Respuesta de error amigable en caso de fallo
    return new Response(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Abg. Wilson Alexander Ipiales Guerron</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          h1 { color: #00468b; }
          .card { background: #f0f4f8; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .btn { display: inline-block; background: #005eb8; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
        <div class="card">
          <h2>Servicios legales profesionales</h2>
          <p>Estamos experimentando problemas técnicos temporales. Por favor, intente de nuevo en unos minutos.</p>
          <p><a href="javascript:location.reload(true)" class="btn">Recargar página</a></p>
        </div>
        <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
        <p><strong>Teléfono:</strong> +593 988835269</p>
        <p><strong>Email:</strong> alexip2@hotmail.com</p>
        
        <script>
          // Recargar automáticamente en 5 segundos
          setTimeout(() => location.reload(), 5000);
        </script>
      </body>
      </html>
    `, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'no-store'
      }
    });
  }
}
