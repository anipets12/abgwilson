#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 CREACIÓN DE COMPONENTES BÁSICOS - ABOGADO WILSON WEBSITE        ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# Crear archivos React básicos
echo -e "${YELLOW}[1/5]${NC} Creando archivos React principales..."

# src/main.jsx
cat > src/main.jsx << 'EOL'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Renderización simple y directa
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
EOL

# src/App.jsx
cat > src/App.jsx << 'EOL'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Services from './components/Services'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
EOL

echo -e "${GREEN}✓${NC} Archivos React principales creados"

# Crear componentes básicos
echo -e "${YELLOW}[2/5]${NC} Creando componentes de navegación..."

# src/components/Navbar.jsx
cat > src/components/Navbar.jsx << 'EOL'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="font-bold text-xl">Abg. Wilson Ipiales</span>
            </Link>
          </div>
          
          {/* Menú de escritorio */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
                Inicio
              </Link>
              <Link to="/servicios" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
                Servicios
              </Link>
              <Link to="/contacto" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
                Contacto
              </Link>
            </div>
          </div>
          
          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800">
            Inicio
          </Link>
          <Link to="/servicios" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800">
            Servicios
          </Link>
          <Link to="/contacto" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800">
            Contacto
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
EOL

# src/components/Footer.jsx
cat > src/components/Footer.jsx << 'EOL'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="mb-2">Juan José Flores 4-73 y Vicente Rocafuerte</p>
            <p className="mb-2">Ibarra, Ecuador</p>
            <p className="mb-2">Teléfono: +593 988835269</p>
            <p>Email: alexip2@hotmail.com</p>
          </div>
          
          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-blue-400 transition-colors">Servicios</Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-blue-400 transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>
          
          {/* Columna 3: Horarios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horario de atención</h3>
            <p className="mb-2">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
            <p className="mb-2">Sábados: 9:00 AM - 1:00 PM</p>
            <p>Domingos: Cerrado</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {currentYear} Abg. Wilson Alexander Ipiales Guerron. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
EOL

echo -e "${GREEN}✓${NC} Componentes de navegación creados"

# Crear componente NotFound
echo -e "${YELLOW}[3/5]${NC} Creando componente 404..."

# src/components/NotFound.jsx
cat > src/components/NotFound.jsx << 'EOL'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Página no encontrada</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link 
          to="/" 
          className="px-5 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFound
EOL

echo -e "${GREEN}✓${NC} Componente 404 creado"

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ COMPONENTES BÁSICOS CREADOS                                     ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Ahora ejecuta: ${BLUE}./crear-componentes-paginas.sh${NC}"
echo "para crear las páginas principales de la aplicación."
echo ""
