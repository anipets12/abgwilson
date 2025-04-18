#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 CORRECCIÓN DE DEPENDENCIAS - ABOGADO WILSON WEBSITE             ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Añadir dependencias faltantes
echo -e "${YELLOW}[1/3]${NC} Añadiendo dependencias faltantes..."

cd /home/wily/CascadeProjects/abgwilson

# Instalar dependencias faltantes
npm install @headlessui/react @heroicons/react react-countup react-intersection-observer

echo -e "${GREEN}✓${NC} Dependencias añadidas"

# 2. Actualizar package.json
echo -e "${YELLOW}[2/3]${NC} Actualizando package.json..."

cat > package.json << 'EOL'
{
  "name": "abogado-wilson-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.0",
    "react-icons": "^4.12.0",
    "framer-motion": "^10.16.4",
    "react-hook-form": "^7.43.9",
    "react-datepicker": "^4.16.0",
    "react-toastify": "^9.1.3",
    "react-slick": "^0.29.0",
    "slick-carousel": "^1.8.1",
    "@supabase/supabase-js": "^2.38.0",
    "date-fns": "^2.30.0",
    "react-countup": "^6.4.2",
    "react-intersection-observer": "^9.5.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.3",
    "vite": "^5.0.0"
  }
}
EOL

echo -e "${GREEN}✓${NC} package.json actualizado"

# 3. Compilar proyecto
echo -e "${YELLOW}[3/3]${NC} Compilando el proyecto..."

npm install
npm run build

# Verificar si la compilación tuvo éxito
if [ $? -eq 0 ]; then
  echo -e "\n${GREEN}======================================================================${NC}"
  echo -e "${GREEN}   ✅ COMPILACIÓN EXITOSA                                            ${NC}"
  echo -e "${GREEN}======================================================================${NC}"
  echo ""
  echo -e "El sitio web está listo para ser utilizado."
  echo -e "Para iniciar el servidor de desarrollo, ejecute:"
  echo -e "${BLUE}npm run dev${NC}"
  echo ""
  echo -e "Para previsualizar la versión compilada:"
  echo -e "${BLUE}npm run preview${NC}"
  echo ""
else
  echo -e "\n${RED}======================================================================${NC}"
  echo -e "${RED}   ❌ ERROR EN LA COMPILACIÓN                                         ${NC}"
  echo -e "${RED}======================================================================${NC}"
  echo ""
  echo -e "Para solucionar este problema, intentemos extraer y modificar directamente el componente Header:"
  echo -e "${BLUE}./extraer-header.sh${NC}"
fi

# Crear script para extraer y modificar Header
cat > extraer-header.sh << 'EOL'
#!/bin/bash

# Extraer y modificar el componente Header
mkdir -p src/components/Navigation

# Crear un componente Header simplificado
cat > src/components/Header.jsx << 'HEADER'
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar el menú cuando se cambia de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Abg. Wilson Ipiales
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">Inicio</Link>
            <Link to="/servicios" className="text-gray-800 hover:text-blue-600 transition-colors">Servicios</Link>
            <Link to="/blog" className="text-gray-800 hover:text-blue-600 transition-colors">Blog</Link>
            <Link to="/foro" className="text-gray-800 hover:text-blue-600 transition-colors">Foro</Link>
            <Link to="/contacto" className="text-gray-800 hover:text-blue-600 transition-colors">Contacto</Link>
          </nav>
          
          {/* Authentication Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Iniciar Sesión</Link>
            <Link to="/registro" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">Registrarse</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">Inicio</Link>
              <Link to="/servicios" className="text-gray-800 hover:text-blue-600 transition-colors">Servicios</Link>
              <Link to="/blog" className="text-gray-800 hover:text-blue-600 transition-colors">Blog</Link>
              <Link to="/foro" className="text-gray-800 hover:text-blue-600 transition-colors">Foro</Link>
              <Link to="/contacto" className="text-gray-800 hover:text-blue-600 transition-colors">Contacto</Link>
              <div className="pt-4 border-t border-gray-200">
                <Link to="/login" className="block text-blue-600 hover:text-blue-800 font-medium mb-2">Iniciar Sesión</Link>
                <Link to="/registro" className="block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-center">Registrarse</Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
HEADER

chmod +x extraer-header.sh

echo -e "${GREEN}✓${NC} Script para extraer Header creado"
