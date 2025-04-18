/**
 * worker-final.js - Solución DEFINITIVA para SPA en Cloudflare Workers
 * Optimizado específicamente para resolver error 1042
 * Convertido a formato ES Module para compatibilidad con D1
 */

// Exportar la función que maneja los eventos fetch
export default {
  async fetch(request, env, ctx) {
    return await handleRequest(request, env);
  }
};

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Activar diagnóstico
  console.log(`[Worker] Procesando: ${pathname}`);
  
  try {
    // Si es una solicitud de archivo estático con extensión conocida
    if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/)) {
      console.log(`[Worker] Sirviendo archivo estático: ${pathname}`);
      
      // Servir archivo estático directamente
      const response = await fetch(request);
      
      if (response.ok) {
        // Adecuar cache-control según el tipo de archivo
        const newHeaders = new Headers(response.headers);
        
        if (pathname.match(/\.(js|css)$/)) {
          newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$/)) {
          newHeaders.set('Cache-Control', 'public, max-age=86400');
        }
        
        return new Response(response.body, {
          status: response.status,
          headers: newHeaders
        });
      }
      
      console.log(`[Worker] Asset no encontrado, código: ${response.status}`);
    }
    
    // Para cualquier otra ruta (SPA), servir index.html
    console.log(`[Worker] Ruta SPA detectada: ${pathname}`);
    
    // Método simple y directo para obtener index.html
    const indexResponse = await fetch(new URL('/index.html', url.origin));
    
    if (!indexResponse.ok) {
      throw new Error(`Error obteniendo index.html: ${indexResponse.status}`);
    }
    
    // Adecuar headers para index.html
    const newHeaders = new Headers(indexResponse.headers);
    newHeaders.set('Content-Type', 'text/html; charset=UTF-8');
    newHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // Si el error 1042 persiste, agregar header específico para solucionarlo
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    
    return new Response(indexResponse.body, {
      status: 200,
      headers: newHeaders
    });
    
  } catch (error) {
    console.error(`[Worker] Error: ${error.message}`);
    
    // Respuesta de error personalizada
    return new Response(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2c5282; text-align: center; }
    .card { background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .btn { display: inline-block; background: #3182ce; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
  <div class="card">
    <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
    <p>Especialista en derecho civil, penal y administrativo.</p>
    <a href="javascript:location.reload(true)" class="btn">Recargar sitio</a>
  </div>
  <p><strong>Teléfono:</strong> +593 988835269</p>
  <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
  <p><strong>Email:</strong> alexip2@hotmail.com</p>
  
  <script>
    // Recargar automáticamente después de 3 segundos
    setTimeout(() => location.reload(true), 3000);
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
