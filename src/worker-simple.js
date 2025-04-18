/**
 * Worker avanzado para Cloudflare Pages con manejo de errores y optimización
 * Para la plataforma legal Abogado Wilson
 * @author Wilson Alexander Ipiales Guerron
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      
      // Cache personalizado para mejorar rendimiento
      const cacheKey = new Request(url.toString(), request);
      const cache = caches.default;
      
      // Intentar obtener respuesta del cache
      let response = await cache.match(cacheKey);
      
      if (response) {
        return response; // Retornar desde cache si está disponible
      }
      
      // Manejo de archivos estáticos con configuración de cache
      if (url.pathname.match(/\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2|json)$/)) {
        response = await fetch(request);
        
        // Solo cachear respuestas exitosas
        if (response.status < 400) {
          // Clonar la respuesta antes de cachearla
          const responseToCache = new Response(response.clone().body, response);
          
          // Configurar encabezados de cache según el tipo de archivo
          const headers = new Headers(responseToCache.headers);
          const contentType = headers.get('content-type') || '';
          
          // Cachear recursos estáticos más tiempo (1 semana)
          if (contentType.includes('image') || url.pathname.endsWith('.woff2') || url.pathname.endsWith('.woff')) {
            headers.set('Cache-Control', 'public, max-age=604800');
          } else {
            // Otros recursos (1 día)
            headers.set('Cache-Control', 'public, max-age=86400');
          }
          
          // Crear nueva respuesta con encabezados optimizados
          const cachedResponse = new Response(responseToCache.body, {
            status: responseToCache.status,
            statusText: responseToCache.statusText,
            headers
          });
          
          // Guardar en cache
          ctx.waitUntil(cache.put(cacheKey, cachedResponse));
        }
        
        return response;
      }
      
      // Para cualquier otra ruta, servir index.html (SPA routing)
      response = await fetch(new URL('/index.html', url.origin));
      
      // Verificar si la respuesta es válida
      if (!response.ok) {
        throw new Error(`Error al cargar index.html: ${response.status} ${response.statusText}`);
      }
      
      // Configurar encabezados para SPA
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=3600'); // 1 hora de cache para index.html
      headers.set('X-Content-Type-Options', 'nosniff');
      headers.set('X-Frame-Options', 'DENY');
      headers.set('X-XSS-Protection', '1; mode=block');
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    } catch (error) {
      // Log del error para debugging
      console.error('Worker error:', error);
      
      // Retornar una página de error amigable
      return new Response(
        `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Abogado Wilson - Error Temporal</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f7f9fc; }
            .container { max-width: 600px; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); text-align: center; }
            h1 { color: #2c3e50; font-size: 24px; margin-bottom: 16px; }
            p { color: #596677; line-height: 1.6; margin-bottom: 24px; }
            .btn { display: inline-block; background: #3490dc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500; transition: all 0.2s ease; }
            .btn:hover { background: #2779bd; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Estamos realizando mejoras en el sistema</h1>
            <p>Estamos trabajando para mejorar nuestros servicios. Por favor, inténtelo de nuevo en unos minutos.</p>
            <a href="/" class="btn">Intentar nuevamente</a>
          </div>
        </body>
        </html>`,
        {
          status: 503,
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Cache-Control': 'no-store',
            'Retry-After': '300'
          }
        }
      );
    }
  }
};
