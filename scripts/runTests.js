#!/usr/bin/env node

/**
 * Script para ejecutar pruebas automatizadas en el proyecto
 * Verifica la integridad de los componentes y rutas
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Configuración
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const TEST_DIR = path.join(SRC_DIR, 'tests');

console.log(chalk.blue('🧪 Iniciando suite de pruebas para Abogado Wilson Legal Platform'));
console.log(chalk.gray('=========================================='));

// Función para verificar existencia de archivos críticos
function checkCriticalFiles() {
  console.log(chalk.yellow('Verificando archivos críticos...'));
  
  const criticalFiles = [
    { path: path.join(SRC_DIR, 'routes.jsx'), name: 'Configuración de rutas' },
    { path: path.join(SRC_DIR, 'utils/auth.js'), name: 'Sistema de autenticación' },
    { path: path.join(SRC_DIR, 'pages/NotFound.jsx'), name: 'Página 404' },
    { path: path.join(SRC_DIR, 'pages/Home.jsx'), name: 'Página de inicio' },
    { path: path.join(SRC_DIR, 'pages/Servicios.jsx'), name: 'Página de servicios' }
  ];
  
  let allFilesExist = true;
  
  criticalFiles.forEach(file => {
    if (fs.existsSync(file.path)) {
      console.log(chalk.green(`✓ ${file.name} (${file.path})`));
    } else {
      console.log(chalk.red(`✗ ${file.name} (${file.path})`));
      allFilesExist = false;
    }
  });
  
  return allFilesExist;
}

// Función para verificar servicios legales
function checkLegalServicesComponents() {
  console.log(chalk.yellow('\nVerificando componentes de servicios legales...'));
  
  const servicesDir = path.join(SRC_DIR, 'pages/Services');
  
  if (!fs.existsSync(servicesDir)) {
    console.log(chalk.red(`✗ Directorio de servicios no encontrado (${servicesDir})`));
    return false;
  }
  
  const requiredServices = [
    { file: 'Civil.jsx', name: 'Derecho Civil' },
    { file: 'Familiar.jsx', name: 'Derecho Familiar' },
    { file: 'Penal.jsx', name: 'Derecho Penal' }
  ];
  
  let allServicesExist = true;
  
  requiredServices.forEach(service => {
    const servicePath = path.join(servicesDir, service.file);
    if (fs.existsSync(servicePath)) {
      console.log(chalk.green(`✓ ${service.name} (${servicePath})`));
    } else {
      console.log(chalk.red(`✗ ${service.name} (${servicePath})`));
      allServicesExist = false;
    }
  });
  
  return allServicesExist;
}

// Función para ejecutar pruebas Jest
function runJestTests() {
  console.log(chalk.yellow('\nEjecutando pruebas unitarias con Jest...'));
  
  try {
    // Verificar si existen archivos de prueba
    const routesTestPath = path.join(TEST_DIR, 'routes.test.js');
    
    if (!fs.existsSync(routesTestPath)) {
      console.log(chalk.red(`✗ Archivo de pruebas de rutas no encontrado (${routesTestPath})`));
      return false;
    }
    
    // Ejecutar las pruebas
    console.log(chalk.gray('Ejecutando pruebas, esto puede tomar unos momentos...'));
    
    try {
      const testOutput = execSync('npm test', { 
        cwd: ROOT_DIR,
        stdio: ['pipe', 'pipe', 'pipe'],
        encoding: 'utf-8'
      });
      
      console.log(chalk.green('✓ Pruebas completadas con éxito'));
      console.log(chalk.gray(testOutput));
      return true;
    } catch (error) {
      console.log(chalk.red('✗ Algunas pruebas han fallado'));
      console.log(chalk.gray(error.stdout));
      return false;
    }
  } catch (error) {
    console.log(chalk.red(`Error al ejecutar pruebas: ${error.message}`));
    return false;
  }
}

// Función para validar importaciones en routes.jsx
function validateRouteImports() {
  console.log(chalk.yellow('\nValidando importaciones en routes.jsx...'));
  
  try {
    // Ejecutar script de validación de importaciones
    const validateImportsPath = path.join(__dirname, 'validateImports.js');
    
    if (!fs.existsSync(validateImportsPath)) {
      console.log(chalk.red(`✗ Script de validación no encontrado (${validateImportsPath})`));
      return false;
    }
    
    try {
      const validationOutput = execSync(`node ${validateImportsPath}`, { 
        cwd: ROOT_DIR, 
        stdio: ['pipe', 'pipe', 'pipe'],
        encoding: 'utf-8'
      });
      
      console.log(chalk.green('✓ Validación de importaciones exitosa'));
      console.log(chalk.gray(validationOutput));
      return true;
    } catch (error) {
      console.log(chalk.red('✗ Validación de importaciones fallida'));
      console.log(chalk.gray(error.stdout));
      return false;
    }
  } catch (error) {
    console.log(chalk.red(`Error al validar importaciones: ${error.message}`));
    return false;
  }
}

// Ejecución principal
(async function main() {
  let success = true;
  
  // Verificar archivos críticos
  const criticalFilesOk = checkCriticalFiles();
  success = success && criticalFilesOk;
  
  // Verificar componentes de servicios legales
  const servicesOk = checkLegalServicesComponents();
  success = success && servicesOk;
  
  // Validar importaciones en routes.jsx
  const importsOk = validateRouteImports();
  success = success && importsOk;
  
  // Ejecutar pruebas Jest si todo lo anterior está bien
  if (criticalFilesOk && servicesOk && importsOk) {
    console.log(chalk.blue('\nTodos los archivos críticos están presentes. Procediendo con las pruebas...'));
    const testsOk = runJestTests();
    success = success && testsOk;
  } else {
    console.log(chalk.red('\nSe encontraron problemas con los archivos críticos. Resuelva estos problemas antes de ejecutar las pruebas.'));
  }
  
  // Resultado final
  console.log(chalk.gray('\n=========================================='));
  if (success) {
    console.log(chalk.green('✅ Todas las verificaciones completadas con éxito'));
    console.log(chalk.blue('La plataforma legal Abogado Wilson está lista para el despliegue'));
  } else {
    console.log(chalk.red('❌ Se encontraron problemas durante las verificaciones'));
    console.log(chalk.yellow('Resuelva los problemas mencionados antes de continuar con el despliegue'));
  }
  
  // Sugerencias finales
  console.log(chalk.gray('\nPróximos pasos sugeridos:'));
  console.log(chalk.gray('1. Ejecutar npm start para probar la aplicación localmente'));
  console.log(chalk.gray('2. Revisar el diseño responsive en diferentes dispositivos'));
  console.log(chalk.gray('3. Preparar el entorno de producción para el despliegue'));
})();
