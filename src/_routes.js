// Archivo para gestionar rutas de SPA en Cloudflare Workers
// Este script asegura que todas las rutas de navegaciu00f3n del frontend funcionen correctamente

export function handleSPARoutes(request, env) {
  const url = new URL(request.url);
  const { pathname } = url;
  
  // Rutas que deben ser manejadas por el frontend (React Router)
  const frontendRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/profile',
    '/dashboard',
    '/services',
    '/contact',
    '/blog',
    '/ebooks',
    '/forum',
    '/certificates',
    '/sponsorships',
    '/afiliados',
    '/appointments',
    '/auth',
    '/legal'
  ];
  
  // Verificar si la ruta actual coincide con alguna ruta del frontend
  const isFrontendRoute = frontendRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  // Si es una ruta de frontend, servir index.html
  if (isFrontendRoute) {
    return true;
  }
  
  // Verificar si es un recurso estu00e1tico o una solicitud API
  const hasExtension = /\.\w+$/.test(pathname);
  
  // Si es ruta rau00edz o tiene extensiu00f3n, servir directamente
  // De lo contrario, asumimos que es una ruta de frontend
  return !(pathname === '/' || hasExtension);
}
