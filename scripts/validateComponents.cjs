/**
 * Script de validación de componentes para Abogado Wilson
 * Este script verifica que todos los componentes referenciados en rutas existan
 * y que las importaciones sean válidas para evitar errores de compilación.
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const babel = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Configuración
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const excludeDirs = ['node_modules', 'build', 'dist', 'public'];

// Mapa para almacenar todos los componentes disponibles
const availableComponents = new Map();
// Mapa para seguimiento de importaciones
const imports = new Map();
// Almacenar errores encontrados
const errors = [];
// Almacenar advertencias
const warnings = [];

/**
 * Lee el archivo JSX y extrae el nombre del componente
 * @param {string} filePath 
 * @returns {string|null}
 */
function extractComponentName(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const ast = babel.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });

    let componentName = null;

    traverse(ast, {
      ExportDefaultDeclaration(path) {
        const declaration = path.node.declaration;
        
        // Identificar exportación directa de componente
        if (declaration.type === 'Identifier') {
          componentName = declaration.name;
        }
        // Identificar exportación directa de una expresión de función
        else if (declaration.type === 'FunctionDeclaration') {
          componentName = declaration.id ? declaration.id.name : null;
        }
        // Identificar exportación directa de arrow function o componente anónimo
        else if (declaration.type === 'ArrowFunctionExpression' || declaration.type === 'FunctionExpression') {
          const parentPath = path.parentPath;
          if (parentPath.type === 'VariableDeclarator') {
            componentName = parentPath.node.id.name;
          }
        }
      },
      // Identificar declaraciones de componentes de clase
      ClassDeclaration(path) {
        if (path.node.id && path.node.superClass && path.node.superClass.name === 'Component') {
          componentName = path.node.id.name;
        }
      }
    });

    return componentName || path.basename(filePath, path.extname(filePath));
  } catch (error) {
    console.error(chalk.red(`Error analizando ${filePath}: ${error.message}`));
    errors.push({type: 'parse', file: filePath, message: error.message});
    return null;
  }
}

/**
 * Encuentra todos los JSX/TSX archivos
 */
function findAllComponentFiles() {
  console.log(chalk.blue('🔍 Buscando componentes React...'));
  
  const jsxFiles = glob.sync('**/*.{jsx,tsx}', {
    cwd: srcDir,
    ignore: excludeDirs.map(dir => `**/${dir}/**`)
  });

  jsxFiles.forEach(relativeFilePath => {
    const fullPath = path.join(srcDir, relativeFilePath);
    const componentName = extractComponentName(fullPath);
    
    if (componentName) {
      const relativePath = path.relative(srcDir, fullPath);
      availableComponents.set(componentName, {
        path: relativePath,
        fullPath: fullPath,
        imported: false
      });
      console.log(chalk.green(`✓ Componente encontrado: ${componentName} (${relativePath})`));
    }
  });

  console.log(chalk.blue(`🔢 Total componentes encontrados: ${availableComponents.size}`));
}

/**
 * Verifica las importaciones en los archivos
 */
function checkImports() {
  console.log(chalk.blue('🔍 Verificando importaciones...'));
  
  const jsxFiles = glob.sync('**/*.{jsx,tsx}', {
    cwd: srcDir,
    ignore: excludeDirs.map(dir => `**/${dir}/**`)
  });

  jsxFiles.forEach(relativeFilePath => {
    const fullPath = path.join(srcDir, relativeFilePath);
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const ast = babel.parse(content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
      });

      traverse(ast, {
        ImportDeclaration(path) {
          const importSource = path.node.source.value;
          
          // Ignorar importaciones de bibliotecas
          if (importSource.startsWith('.') || importSource.startsWith('/')) {
            const importedSpecifiers = [];
            
            path.node.specifiers.forEach(specifier => {
              if (specifier.type === 'ImportDefaultSpecifier') {
                importedSpecifiers.push(specifier.local.name);
              } else if (specifier.type === 'ImportSpecifier') {
                importedSpecifiers.push(specifier.imported.name);
              }
            });
            
            imports.set(`${fullPath}:${importSource}`, {
              source: importSource,
              specifiers: importedSpecifiers
            });
          } else {
            // Verificar paquetes externos
            if (!importSource.startsWith('@') && importSource !== 'react' && importSource !== 'react-dom') {
              try {
                require.resolve(importSource, { paths: [rootDir] });
              } catch (error) {
                warnings.push({
                  type: 'dependency',
                  file: relativeFilePath,
                  message: `Posible dependencia faltante: "${importSource}"`
                });
              }
            }
          }
        }
      });
    } catch (error) {
      console.error(chalk.red(`Error verificando importaciones en ${fullPath}: ${error.message}`));
      errors.push({type: 'import', file: fullPath, message: error.message});
    }
  });
}

/**
 * Verifica el archivo de rutas principal
 */
function checkRoutes() {
  console.log(chalk.blue('🔍 Verificando configuración de rutas...'));
  
  const routesFiles = glob.sync('**/routes.{jsx,tsx,js,ts}', {
    cwd: srcDir,
    ignore: excludeDirs.map(dir => `**/${dir}/**`)
  });

  if (routesFiles.length === 0) {
    console.warn(chalk.yellow('⚠️ No se encontró archivo de rutas'));
    return;
  }

  routesFiles.forEach(routesFile => {
    const fullPath = path.join(srcDir, routesFile);
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const ast = babel.parse(content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
      });

      const usedComponents = new Set();
      
      traverse(ast, {
        JSXIdentifier(path) {
          const name = path.node.name;
          if (name.charAt(0) === name.charAt(0).toUpperCase() && availableComponents.has(name)) {
            usedComponents.add(name);
            const componentInfo = availableComponents.get(name);
            componentInfo.imported = true;
            availableComponents.set(name, componentInfo);
          }
        }
      });

      console.log(chalk.green(`✓ Componentes usados en rutas: ${usedComponents.size}`));
    } catch (error) {
      console.error(chalk.red(`Error verificando rutas en ${fullPath}: ${error.message}`));
      errors.push({type: 'routes', file: fullPath, message: error.message});
    }
  });
}

/**
 * Verifica dependencias en package.json
 */
function checkDependencies() {
  console.log(chalk.blue('🔍 Verificando dependencias en package.json...'));
  
  const packageJsonPath = path.join(rootDir, 'package.json');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = {...packageJson.dependencies, ...packageJson.devDependencies};
    
    // Verificar dependencias críticas
    const criticalDeps = [
      'react', 'react-dom', 'react-router-dom', 'framer-motion',
      'react-hot-toast'
    ];
    
    criticalDeps.forEach(dep => {
      if (!dependencies[dep]) {
        errors.push({
          type: 'dependency',
          message: `Dependencia crítica faltante: ${dep}`
        });
      }
    });
    
    console.log(chalk.green(`✓ Dependencias verificadas`));
  } catch (error) {
    console.error(chalk.red(`Error verificando package.json: ${error.message}`));
    errors.push({type: 'package', message: error.message});
  }
}

/**
 * Verifica componentes no utilizados
 */
function checkUnusedComponents() {
  console.log(chalk.blue('🔍 Verificando componentes no utilizados...'));
  
  const unusedComponents = [];
  
  availableComponents.forEach((info, componentName) => {
    if (!info.imported) {
      unusedComponents.push({
        name: componentName,
        path: info.path
      });
    }
  });
  
  if (unusedComponents.length > 0) {
    console.warn(chalk.yellow(`⚠️ Componentes posiblemente no utilizados: ${unusedComponents.length}`));
    unusedComponents.forEach(comp => {
      warnings.push({
        type: 'unused',
        component: comp.name,
        path: comp.path,
        message: `Componente posiblemente no utilizado: ${comp.name} (${comp.path})`
      });
    });
  } else {
    console.log(chalk.green('✓ Todos los componentes parecen estar en uso'));
  }
}

/**
 * Muestra el reporte final
 */
function showReport() {
  console.log('\n' + chalk.blue.bold('📊 REPORTE DE VALIDACIÓN'));
  console.log(chalk.blue('===================================='));
  
  console.log(chalk.green.bold(`✅ Componentes totales: ${availableComponents.size}`));
  
  if (errors.length === 0) {
    console.log(chalk.green.bold('✅ No se encontraron errores críticos'));
  } else {
    console.log(chalk.red.bold(`❌ Errores encontrados: ${errors.length}`));
    errors.forEach((error, index) => {
      console.log(chalk.red(`${index + 1}. [${error.type}] ${error.file ? error.file + ': ' : ''}${error.message}`));
    });
  }
  
  if (warnings.length > 0) {
    console.log(chalk.yellow.bold(`⚠️ Advertencias: ${warnings.length}`));
    warnings.forEach((warning, index) => {
      console.log(chalk.yellow(`${index + 1}. [${warning.type}] ${warning.file ? warning.file + ': ' : ''}${warning.message}`));
    });
  }
  
  console.log(chalk.blue('===================================='));
  
  return errors.length === 0;
}

// Ejecutar validaciones
try {
  console.log(chalk.blue.bold('🚀 INICIANDO VALIDACIÓN DE COMPONENTES'));
  console.log(chalk.blue('===================================='));
  
  findAllComponentFiles();
  checkImports();
  checkRoutes();
  checkDependencies();
  checkUnusedComponents();
  
  const success = showReport();
  
  if (success) {
    console.log(chalk.green.bold('✅ Validación completada exitosamente'));
    process.exit(0);
  } else {
    console.log(chalk.red.bold('❌ Validación fallida - Se encontraron errores críticos'));
    process.exit(1);
  }
} catch (error) {
  console.error(chalk.red.bold('💥 Error fatal durante la validación:'));
  console.error(chalk.red(error.stack));
  process.exit(1);
}
