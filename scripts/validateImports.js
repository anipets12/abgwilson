/**
 * Script de pre-build para validar importaciones
 * Verifica que todos los componentes referenciados en routes.jsx existan
 * Ejecutar antes del build para evitar errores de compilación
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Ruta raíz del proyecto
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

console.log(chalk.blue('🔎 Validando importaciones de componentes en routes.jsx...'));

// Leer archivo de rutas
const routesPath = path.join(SRC_DIR, 'routes.jsx');
const routesContent = fs.readFileSync(routesPath, 'utf-8');

// Extraer importaciones
const importRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;
const imports = [];
let match;

while ((match = importRegex.exec(routesContent)) !== null) {
  imports.push({
    componentName: match[1],
    importPath: match[2]
  });
}

console.log(chalk.gray(`Encontradas ${imports.length} importaciones en routes.jsx`));

// Filtrar solo importaciones locales (ignora bibliotecas)
const localImports = imports.filter(imp => imp.importPath.startsWith('./'));

console.log(chalk.gray(`Verificando ${localImports.length} importaciones locales...`));

// Verificar que cada componente existe
let missingComponents = [];

localImports.forEach(({ componentName, importPath }) => {
  let normalizedPath = importPath;
  
  // Si la ruta no tiene extensión, probar con .jsx
  if (!path.extname(normalizedPath)) {
    normalizedPath = `${normalizedPath}.jsx`;
  }
  
  // Convertir ruta relativa a absoluta
  const absolutePath = path.resolve(SRC_DIR, normalizedPath.replace('./', ''));
  
  // Verificar paths alternativos (para directorios con index.jsx)
  const indexPath = path.resolve(absolutePath.replace('.jsx', ''), 'index.jsx');
  
  if (!fs.existsSync(absolutePath) && !fs.existsSync(indexPath)) {
    missingComponents.push({
      componentName,
      importPath,
      absolutePath,
      indexPath
    });
  }
});

// Reporte de resultados
if (missingComponents.length === 0) {
  console.log(chalk.green('✅ Todas las importaciones son válidas. No hay componentes faltantes.'));
  process.exit(0);
} else {
  console.log(chalk.red(`❌ Se encontraron ${missingComponents.length} componentes faltantes:`));
  
  missingComponents.forEach(comp => {
    console.log(chalk.yellow(`  - ${comp.componentName} (${comp.importPath})`));
    console.log(chalk.gray(`    Se buscó en: ${comp.absolutePath}`));
    console.log(chalk.gray(`    También se buscó en: ${comp.indexPath}`));
  });
  
  console.log(chalk.red('\n⚠️ La validación de importaciones ha fallado. Corrija los errores antes de continuar.'));
  process.exit(1);
}
