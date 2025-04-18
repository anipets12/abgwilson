/**
 * Worker optimizado para Cloudflare Pages que maneja correctamente las rutas SPA
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Servir archivos estáticos directamente
    if (url.pathname.match(/\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2)$/)) {
      return fetch(request);
    }
    
    // Para cualquier otra ruta, servir index.html (SPA routing)
    return fetch(new URL('/index.html', url.origin));
  }
};
