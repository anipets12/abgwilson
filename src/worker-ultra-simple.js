/**
 * worker-ultra-simple.js - Worker minimalista sin complejidades
 * Enfocado únicamente en servir correctamente la SPA y sus assets
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      
      // Servir index.html para cualquier ruta que no sea un archivo estático
      if (!url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        // Obtener index.html
        const response = await fetch(new URL('/index.html', url.origin));
        
        if (!response.ok) {
          return new Response('Error obteniendo index.html', { 
            status: 500,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
        
        const html = await response.text();
        
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
      
      // Servir archivos estáticos
      const response = await fetch(request);
      
      if (response.ok) {
        const headers = new Headers(response.headers);
        
        // Configurar headers específicos por tipo
        if (url.pathname.endsWith('.js')) {
          headers.set('Content-Type', 'application/javascript; charset=utf-8');
        } else if (url.pathname.endsWith('.css')) {
          headers.set('Content-Type', 'text/css; charset=utf-8');
        }
        
        headers.set('Access-Control-Allow-Origin', '*');
        
        return new Response(response.body, {
          status: 200,
          headers
        });
      }
      
      // Fallback
      return new Response('Not found', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
      
    } catch (error) {
      // Error simple sin complejidades
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
