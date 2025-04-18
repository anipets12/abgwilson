/**
 * Worker simplificado para Cloudflare que gestiona correctamente las rutas de SPA
 * y sirve assets estáticos de manera eficiente
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      
      // Servir archivos estáticos si la URL apunta a un recurso
      if (url.pathname.match(/\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2|ttf)$/)) {
        const response = await fetch(request);
        if (response.ok) {
          // Configurar encabezados apropiados
          const headers = new Headers(response.headers);
          if (url.pathname.endsWith('.js')) {
            headers.set('Content-Type', 'application/javascript; charset=utf-8');
          } else if (url.pathname.endsWith('.css')) {
            headers.set('Content-Type', 'text/css; charset=utf-8');
          }
          
          // Cacheo agresivo para archivos estáticos
          headers.set('Cache-Control', 'public, max-age=31536000');
          return new Response(response.body, { status: 200, headers });
        }
      }
      
      // Para cualquier otra ruta, servir el index.html (SPA routing)
      const response = await fetch(new URL('/index.html', url.origin));
      if (response.ok) {
        const html = await response.text();
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-cache',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'X-XSS-Protection': '1; mode=block'
          }
        });
      }
      
      // Fallback si index.html no se pudo obtener
      return new Response('Error: Página no encontrada', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
      
    } catch (error) {
      // Manejo genérico de errores
      return new Response(`Error: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
