/**
 * minimal-worker.js - Worker ultra simplificado para Cloudflare Workers
 * Diseñado para garantizar el funcionamiento básico del sitio SPA
 */

// Exportar como ES Module para compatibilidad D1
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // 1. Manejo de archivos estáticos (JS, CSS, imágenes)
    if (path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp)$/)) {
      try {
        // Solicitar el asset directamente
        const response = await fetch(request);
        if (response.ok) {
          const headers = new Headers(response.headers);
          headers.set('Access-Control-Allow-Origin', '*');
          
          // Configurar cache según tipo
          if (path.endsWith('.js') || path.endsWith('.css')) {
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          }
          
          return new Response(response.body, { headers });
        }
      } catch (error) {
        console.error(`Error sirviendo asset ${path}: ${error.message}`);
      }
    }
    
    // 2. Para TODAS las demás rutas, servir index.html SIN EXCEPCIÓN
    try {
      // Obtener index.html
      const response = await fetch(new URL('/index.html', url.origin));
      
      if (!response.ok) {
        throw new Error(`Error obteniendo index.html: ${response.status}`);
      }
      
      const html = await response.text();
      
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      console.error(`Error crítico: ${error.message}`);
      
      // Página de error muy simple
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Abg. Wilson Alexander</title>
          <style>
            body { font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
            a { color: blue; }
          </style>
        </head>
        <body>
          <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
          <p>El sitio web está experimentando problemas técnicos.</p>
          <p><a href="/">Reintentar</a></p>
        </body>
        </html>
      `, {
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          'Cache-Control': 'no-store'
        }
      });
    }
  }
};
