/**
 * Script para simplificar importaciones en archivos JSX
 * Elimina la extensión .js o .jsx de las importaciones para permitir
 * que Vite las resuelva automáticamente según la configuración
 */
const fs = require('fs');
const path = require('path');

// Lista de directorios a examinar
const directories = ['src'];

// Extensiones a procesar
const extensions = ['.js', '.jsx'];

// Función para procesar un archivo
function processFile(filePath) {
  try {
    // Leer el contenido del archivo
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Buscar importaciones como: import X from './path/to/file.js' o './path/to/file.jsx'
    // y reemplazarlas por: import X from './path/to/file'
    const updatedContent = content.replace(
      /import\s+(?:.*?)\s+from\s+['"]([^'"]+)(\.jsx?)['"]/g,
      'import $1 from \'$1\''
    );
    
    // Si hay cambios, escribir el archivo actualizado
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✓ Actualizado: ${filePath}`);
      return 1;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error procesando ${filePath}:`, error.message);
    return 0;
  }
}

// Función para recorrer directorios recursivamente
function traverseDirectory(dir) {
  let count = 0;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursivamente procesar subdirectorios
      count += traverseDirectory(filePath);
    } else if (extensions.includes(path.extname(filePath))) {
      // Procesar archivos con extensiones especificadas
      count += processFile(filePath);
    }
  }
  
  return count;
}

// Procesar todos los directorios especificados
let totalUpdated = 0;
for (const dir of directories) {
  totalUpdated += traverseDirectory(dir);
}

console.log(`\nTotal de archivos actualizados: ${totalUpdated}`);
