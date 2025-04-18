#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🔧 CORRECCIÓN DE ERRORES EN HEADER Y DEPENDENCIAS                 ${NC}"
echo -e "${BLUE}======================================================================${NC}"

# Directorio del proyecto
TARGET_DIR="/home/wily/CascadeProjects/abgwilson"
COMPONENTS_DIR="${TARGET_DIR}/src/components"

# 1. Corregir Header.jsx
echo -e "${YELLOW}[1/3]${NC} Corrigiendo Header.jsx..."

# Crear un Header simplificado
cat > "${COMPONENTS_DIR}/Header.jsx" << 'EOL'
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
            <Link to="/consultas/procesos-judiciales" className="text-gray-800 hover:text-blue-600 transition-colors">Consultas</Link>
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
              <Link to="/consultas/procesos-judiciales" className="text-gray-800 hover:text-blue-600 transition-colors">Consultas</Link>
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
EOL

echo -e "${GREEN}✓${NC} Header.jsx corregido"

# 2. Crear Footer si no existe
echo -e "${YELLOW}[2/3]${NC} Verificando y creando Footer.jsx..."

# Verificar si existe el Footer
if [ ! -f "${COMPONENTS_DIR}/Footer.jsx" ]; then
  cat > "${COMPONENTS_DIR}/Footer.jsx" << 'EOL'
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Abg. Wilson Ipiales</h3>
            <p className="mb-2">Juan José Flores 4-73 y Vicente Rocafuerte</p>
            <p className="mb-2">Ibarra, Ecuador</p>
            <p className="mb-2">+593 988835269</p>
            <p className="mb-2">alexip2@hotmail.com</p>
          </div>
          
          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-300 transition-colors">Inicio</Link></li>
              <li><Link to="/servicios" className="hover:text-blue-300 transition-colors">Servicios</Link></li>
              <li><Link to="/blog" className="hover:text-blue-300 transition-colors">Blog</Link></li>
              <li><Link to="/foro" className="hover:text-blue-300 transition-colors">Foro</Link></li>
              <li><Link to="/contacto" className="hover:text-blue-300 transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          {/* Servicios */}
          <div>
            <h3 className="text-xl font-bold mb-4">Servicios Legales</h3>
            <ul className="space-y-2">
              <li><Link to="/servicios" className="hover:text-blue-300 transition-colors">Derecho Penal</Link></li>
              <li><Link to="/servicios" className="hover:text-blue-300 transition-colors">Derecho Civil</Link></li>
              <li><Link to="/servicios" className="hover:text-blue-300 transition-colors">Derecho de Tránsito</Link></li>
              <li><Link to="/servicios" className="hover:text-blue-300 transition-colors">Derecho Comercial</Link></li>
              <li><Link to="/servicios" className="hover:text-blue-300 transition-colors">Derecho Laboral</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Suscríbete</h3>
            <p className="mb-4">Recibe noticias legales y actualizaciones importantes directamente en tu correo electrónico.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-gray-900"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                Enviar
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright y políticas */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <div className="mb-4">
            <Link to="/politica-privacidad" className="mx-3 hover:text-blue-300 transition-colors">Política de Privacidad</Link>
            <Link to="/terminos-condiciones" className="mx-3 hover:text-blue-300 transition-colors">Términos y Condiciones</Link>
            <Link to="/programa-afiliados" className="mx-3 hover:text-blue-300 transition-colors">Programa de Afiliados</Link>
          </div>
          <p>&copy; {currentYear} Abg. Wilson Alexander Ipiales Guerron. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
EOL
  echo -e "${GREEN}✓${NC} Footer.jsx creado"
else
  echo -e "${GREEN}✓${NC} Footer.jsx ya existe"
fi

# 3. Crear WhatsAppButton si no existe
echo -e "${YELLOW}[3/3]${NC} Verificando y creando WhatsAppButton.jsx..."

# Verificar si existe el WhatsAppButton
if [ ! -f "${COMPONENTS_DIR}/WhatsAppButton.jsx" ]; then
  cat > "${COMPONENTS_DIR}/WhatsAppButton.jsx" << 'EOL'
import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "593988835269"; // Número de WhatsApp
  const message = "Hola, me gustaría recibir más información sobre sus servicios legales."; // Mensaje predeterminado
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      aria-label="Chatear por WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 448 512" 
        className="w-6 h-6 fill-current"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;
EOL
  echo -e "${GREEN}✓${NC} WhatsAppButton.jsx creado"
else
  echo -e "${GREEN}✓${NC} WhatsAppButton.jsx ya existe"
fi

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ CORRECCIONES COMPLETADAS                                        ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Ahora intente compilar nuevamente el proyecto con:"
echo -e "${BLUE}cd ${TARGET_DIR} && npm run build${NC}"
echo ""
echo -e "O ejecutar el servidor de desarrollo con:"
echo -e "${BLUE}cd ${TARGET_DIR} && npm run dev${NC}"
