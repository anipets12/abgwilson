// Servidor local para probar la aplicación SPA
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Directorio donde están los archivos compilados
const DIST_DIR = path.join(__dirname, 'dist');

// Puerto para el servidor
const PORT = 8080;

// Tipos MIME para diferentes extensiones de archivo
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

// Crear el servidor
const server = http.createServer((req, res) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  
  // Parsear la URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Si la ruta termina con /, servir index.html
  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }
  
  // Comprobar si la ruta tiene una extensión conocida
  const ext = path.extname(pathname);
  
  // Si no tiene extensión, probablemente sea una ruta de SPA, servir index.html
  let filePath;
  if (!ext) {
    console.log(`Ruta SPA detectada: ${pathname} → /index.html`);
    filePath = path.join(DIST_DIR, 'index.html');
  } else {
    filePath = path.join(DIST_DIR, pathname);
  }
  
  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si el archivo no existe, intentar servir index.html para rutas SPA
      console.log(`Archivo no encontrado: ${filePath}, sirviendo index.html`);
      filePath = path.join(DIST_DIR, 'index.html');
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          // Si index.html tampoco existe, enviar error 404
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - Archivo no encontrado');
          return;
        }
        
        // Servir index.html
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      return;
    }
    
    // Leer el archivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Error interno del servidor');
        return;
      }
      
      // Determinar el tipo MIME
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      // Servir el archivo
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`
===================================================
  SERVIDOR LOCAL - SITIO ABOGADO WILSON
===================================================

✅ Servidor ejecutándose en: http://localhost:${PORT}

📝 Puedes probar las siguientes rutas:
  - Página principal: http://localhost:${PORT}/
  - Servicios: http://localhost:${PORT}/servicios
  - Login: http://localhost:${PORT}/login
  - Registro: http://localhost:${PORT}/registro

🛑 Presiona Ctrl+C para detener el servidor
`);
});
