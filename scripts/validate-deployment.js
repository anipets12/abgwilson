/**
 * Script para validar todos los componentes antes del despliegue
 * Asegura que no hay errores en la aplicación
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const workersDir = path.join(rootDir, 'workers-site');

console.log('🔍 Iniciando validación para despliegue...');

// Verificar que el directorio dist existe
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: El directorio dist no existe. Ejecuta npm run build primero.');
  process.exit(1);
}

// Verificar que el index.html existe en el directorio dist
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ Error: El archivo index.html no existe en el directorio dist.');
  process.exit(1);
}

// Verificar contenido de index.html
const indexContent = fs.readFileSync(indexPath, 'utf8');
if (!indexContent.includes('<div id="root"></div>')) {
  console.error('❌ Error: El archivo index.html no contiene el elemento root para React.');
  process.exit(1);
}

// Verificar archivos JS y CSS
const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ Error: El directorio assets no existe en dist.');
  process.exit(1);
}

const hasJsFiles = fs.readdirSync(assetsDir).some(file => file.endsWith('.js'));
const hasCssFiles = fs.readdirSync(assetsDir).some(file => file.endsWith('.css'));

if (!hasJsFiles) {
  console.error('❌ Error: No se encontraron archivos JavaScript en el directorio assets.');
  process.exit(1);
}

if (!hasCssFiles) {
  console.error('❌ Error: No se encontraron archivos CSS en el directorio assets.');
  process.exit(1);
}

// Verificar Worker
if (!fs.existsSync(workersDir)) {
  console.error('❌ Error: El directorio workers-site no existe.');
  process.exit(1);
}

const workerIndexPath = path.join(workersDir, 'index.js');
if (!fs.existsSync(workerIndexPath)) {
  console.error('❌ Error: El archivo index.js no existe en el directorio workers-site.');
  process.exit(1);
}

// Verificar archivo de configuración wrangler.toml
const wranglerPath = path.join(rootDir, 'wrangler.toml');
if (!fs.existsSync(wranglerPath)) {
  console.error('❌ Error: El archivo wrangler.toml no existe.');
  process.exit(1);
}

const wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
if (!wranglerContent.includes('main = "workers-site/index.js"')) {
  console.error('❌ Error: El archivo wrangler.toml no está configurado correctamente.');
  process.exit(1);
}

// Verificar página de error
const errorPagePath = path.join(rootDir, 'public', 'error.html');
if (!fs.existsSync(errorPagePath)) {
  console.warn('⚠️ Advertencia: La página de error personalizada no existe.');
} 

// Si llegamos hasta aquí, todo está bien
console.log('✅ Validación completada! La aplicación está lista para despliegue.');
console.log('');
console.log('📋 Resumen de la validación:');
console.log('   ✓ Directorio dist existe');
console.log('   ✓ Archivo index.html existe y contiene el elemento root');
console.log('   ✓ Archivos JavaScript y CSS existen');
console.log('   ✓ Configuración del Worker es correcta');
console.log('   ✓ Archivo wrangler.toml está correctamente configurado');
console.log('');
console.log('🚀 Para desplegar la aplicación, ejecuta:');
console.log('   npx wrangler deploy');

process.exit(0);
