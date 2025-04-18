/**
 * Worker simplificado para Cloudflare Pages (plan gratuito)
 * Maneja correctamente las rutas SPA para la aplicación Abogado Wilson
 * @author Wilson Alexander Ipiales Guerron
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      
      // Manejo de archivos estáticos
      if (url.pathname.match(/\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2|json)$/)) {
        return fetch(request);
      }
      
      // Para cualquier otra ruta, servir index.html (SPA routing)
      const response = await fetch(new URL('/index.html', url.origin));
      
      // Crear una nueva respuesta con los encabezados básicos de seguridad
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('X-XSS-Protection', '1; mode=block');
      newResponse.headers.set('X-Content-Type-Options', 'nosniff');
      
      return newResponse;
    } catch (error) {
      // Mostrar página de error simplificada
      return new Response(
        `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error Temporal - Abogado Wilson</title>
          <style>
            body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; text-align: center; }
            .error-container { max-width: 600px; padding: 40px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; margin-bottom: 20px; }
            p { color: #555; line-height: 1.6; margin-bottom: 30px; }
            .btn { display: inline-block; background: #3457dc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>Estamos trabajando en el sitio</h1>
            <p>Estamos realizando mejoras en nuestro servicio. Por favor, intente de nuevo en unos minutos.</p>
            <a href="/" class="btn">Regresar al inicio</a>
          </div>
        </body>
        </html>`,
        {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8'
          },
          status: 500
        }
      );
    }
  }
};
