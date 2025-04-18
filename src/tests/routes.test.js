import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../routes';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Suite de pruebas para verificar la integridad de las rutas
 * Asegura que todas las rutas definidas tengan componentes correspondientes
 */

// Función auxiliar para verificar que un componente existe físicamente
function componentFileExists(importPath) {
  // Convertir path de importación a path de archivo relativo
  // Por ejemplo: './pages/Home' -> 'src/pages/Home.jsx'
  const filePath = path.join(
    'src',
    importPath.replace('./', '') + '.jsx'
  );
  
  // También verificar si existe como index.jsx en un directorio
  const dirPath = path.join(
    'src',
    importPath.replace('./', ''),
    'index.jsx'
  );
  
  return fs.existsSync(filePath) || fs.existsSync(dirPath);
}

// Extraer todas las importaciones de componentes del archivo de rutas
function extractComponentImports() {
  const routesContent = fs.readFileSync('src/routes.jsx', 'utf-8');
  const importRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;
  
  const imports = [];
  let match;
  while ((match = importRegex.exec(routesContent)) !== null) {
    imports.push({
      componentName: match[1],
      importPath: match[2]
    });
  }
  
  return imports;
}

describe('Routes Integrity Tests', () => {
  test('All route components should exist as files', () => {
    const componentImports = extractComponentImports();
    
    // Verificar que cada componente importado existe como archivo
    componentImports.forEach(({ componentName, importPath }) => {
      // Ignorar importaciones de react-router-dom y react
      if (!importPath.startsWith('.')) return;
      
      const exists = componentFileExists(importPath);
      expect(exists).toBe(true, `Component file for "${componentName}" (${importPath}) does not exist`);
    });
  });
  
  test('All routes render without crashing', () => {
    // Rutas principales a probar
    const routesToTest = [
      '/',
      '/servicios',
      '/blog',
      '/contacto',
      '/foro',
      '/legal/privacidad',
      '/legal/terminos',
      '/login',
      '/registro',
      '/ebooks'
    ];
    
    // Probar cada ruta
    routesToTest.forEach(route => {
      // Limpiar entre pruebas
      cleanup();
      
      render(
        <MemoryRouter initialEntries={[route]}>
          <AppRoutes />
        </MemoryRouter>
      );
      
      // Si llega aquí sin errores, la ruta renderiza sin problemas
      expect(true).toBe(true);
    });
  });
});

// Prueba específica para verificar que el componente NotFound existe y se usa
describe('NotFound Component', () => {
  test('NotFound component exists and is used for invalid routes', () => {
    // Verificar que el archivo existe
    expect(componentFileExists('./pages/NotFound')).toBe(true);
    
    // Verificar que se renderiza para una ruta inválida
    render(
      <MemoryRouter initialEntries={['/ruta-que-no-existe-123']}>
        <AppRoutes />
      </MemoryRouter>
    );
    
    // Esperar que el texto típico de NotFound aparezca
    expect(screen.getByText(/página no encontrada/i) || 
           screen.getByText(/not found/i) ||
           screen.getByText(/404/i)).toBeInTheDocument();
  });
});
