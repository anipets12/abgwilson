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
