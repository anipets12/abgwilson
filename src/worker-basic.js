/**
 * worker-basic.js - Solución definitiva para SPA en Cloudflare Workers
 * Versión ultra-simple y altamente compatible 
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    try {
      // CORS preflight
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Max-Age": "86400"
          }
        });
      }

      // Archivos estáticos - servir directamente (enfoque simple)
      if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        console.log(`[Worker-Basic] Sirviendo archivo estático: ${pathname}`);
        return fetch(request);
      }

      // Cualquier otra ruta - servir index.html para SPA
      console.log(`[Worker-Basic] Sirviendo SPA para ruta: ${pathname}`);
      return fetch(new URL('/index.html', url.origin));

    } catch (error) {
      console.error(`[Worker-Basic] Error: ${error.message}`);
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }
}
