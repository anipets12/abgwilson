/**
 * spa-router.js - Router optimizado específicamente para rutas SPA
 * Enfocado en resolver problemas con rutas específicas como /registro
 */

// Formato ES Module para compatibilidad con D1
export default {
  // Punto de entrada principal
  async fetch(request, env, ctx) {
    return await handleRequest(request, env, ctx);
  }
};

// Manejador principal para todas las solicitudes
async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Registrar la solicitud para diagnóstico
  console.log(`[SPA Router] Procesando ruta: ${path}`);
  
  // 1. Manejo de archivos estáticos (JS, CSS, imágenes, etc.)
  if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$/)) {
    return serveStaticAsset(request, path);
  }
  
  // 2. Para TODAS las demás rutas, incluyendo / y /registro
  return serveSPA(url.origin);
}

// Servir archivos estáticos
async function serveStaticAsset(request, path) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const headers = new Headers(response.headers);
      
      // Configurar headers óptimos
      headers.set('Cache-Control', path.match(/\.(js|css)$/)
        ? 'public, max-age=31536000, immutable' 
        : 'public, max-age=86400');
      headers.set('Access-Control-Allow-Origin', '*');
      
      return new Response(response.body, {
        status: 200,
        headers
      });
    }
    
    throw new Error(`Asset no encontrado: ${path}`);
  } catch (error) {
    console.error(`[Error] Asset ${path}: ${error.message}`);
    return new Response(`Error cargando recurso: ${path}`, { 
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Servir la aplicación SPA para cualquier ruta
async function serveSPA(origin) {
  try {
    // Solicitar el index.html del origen
    const response = await fetch(`${origin}/index.html`);
    
    if (!response.ok) {
      throw new Error(`Error obteniendo index.html: ${response.status}`);
    }
    
    // CRUCIAL: obtener como texto para manipular si es necesario
    const html = await response.text();
    
    // Configuración de headers optimizada para SPA
    const headers = new Headers({
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
      // CSP menos restrictivo para permitir todos los recursos necesarios
      'Content-Security-Policy': "default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data:; font-src * data:;"
    });
    
    return new Response(html, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error(`[Error] SPA: ${error.message}`);
    
    // Página de error amigable
    return new Response(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Abg. Wilson Alexander Ipiales Guerron</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #2c5282; }
          .btn { display: inline-block; background: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
        <p>Estamos experimentando dificultades técnicas.</p>
        <p>Por favor, intente nuevamente en unos momentos o regrese a la <a href="/" class="btn">página principal</a>.</p>
      </body>
      </html>
    `, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' }
    });
  }
}
