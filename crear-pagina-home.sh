#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 CREACIÓN DE PÁGINA PRINCIPAL - ABOGADO WILSON WEBSITE            ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# Crear componente Home
echo -e "${YELLOW}[1/1]${NC} Creando componente Home..."

mkdir -p src/components

# src/components/Home.jsx
cat > src/components/Home.jsx << 'EOL'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-[600px] flex items-center">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Abg. Wilson Alexander Ipiales Guerron
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Servicios legales profesionales en Ibarra, Ecuador.
            Asesoría especializada en derecho civil, penal, laboral y administrativo.
          </p>
          <div className="mt-10">
            <Link 
              to="/contacto" 
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg inline-flex items-center transition-all duration-300"
            >
              Contactar Ahora
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Servicios Destacados */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nuestros Servicios Legales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Derecho Civil</h3>
                <p className="text-gray-600 mb-4">
                  Resolución de conflictos en materia civil, contratos, sucesiones, obligaciones y derechos reales.
                </p>
                <Link to="/servicios" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  Más información
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Servicio 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Derecho Penal</h3>
                <p className="text-gray-600 mb-4">
                  Defensa legal en procesos penales, acusaciones y recursos en materia criminal.
                </p>
                <Link to="/servicios" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  Más información
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Servicio 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Derecho Laboral</h3>
                <p className="text-gray-600 mb-4">
                  Asesoría en asuntos laborales, contratos de trabajo, despidos y reclamaciones.
                </p>
                <Link to="/servicios" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  Más información
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección CTA */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Necesita asesoría legal?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Primera consulta gratuita. Conozca sus derechos y las opciones legales para su caso particular.
          </p>
          <Link 
            to="/contacto" 
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Contacte Ahora
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
EOL

echo -e "${GREEN}✓${NC} Componente Home creado exitosamente"

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ PÁGINA PRINCIPAL CREADA                                         ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Ahora ejecuta: ${BLUE}./crear-pagina-servicios.sh${NC}"
echo "para crear la página de servicios de la aplicación."
echo ""
