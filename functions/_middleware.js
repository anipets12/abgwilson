// Middleware para manejar enrutamiento de SPA en Cloudflare Pages
export async function onRequest(context) {
  // Extraer información de la solicitud
  const { request } = context;
  const url = new URL(request.url);
  const { pathname } = url;

  // Verificar si es un archivo estático (con extensión)
  const isAssetRequest = /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|webp)$/.test(pathname);
  
  // Verificar si es una solicitud de API
  const isApiRequest = pathname.startsWith('/api/');

  // Para solicitudes estáticas o de API, continuar con el flujo normal
  if (isAssetRequest || isApiRequest) {
    console.log(`[Middleware] Sirviendo recurso: ${pathname}`);
    return context.next();
  }

  // Para todas las demás rutas, redirigir a index.html para manejar SPA
  console.log(`[Middleware] Ruta SPA detectada: ${pathname} -> /index.html`);
  
  // Obtener el contenido de index.html
  const response = await context.env.ASSETS.fetch(new URL('/index.html', url.origin));
  
  // Retornar con headers adecuados
  return new Response(response.body, {
    status: 200,
    headers: {
      ...Object.fromEntries(response.headers),
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  });
}
