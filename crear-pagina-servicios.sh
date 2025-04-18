#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 CREACIÓN DE PÁGINA SERVICIOS - ABOGADO WILSON WEBSITE           ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# Crear componente Services
echo -e "${YELLOW}[1/1]${NC} Creando componente Services..."

mkdir -p src/components

# src/components/Services.jsx
cat > src/components/Services.jsx << 'EOL'
import React from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Derecho Civil',
      description: 'Asesoramiento en contratos, obligaciones, propiedad, sucesiones, y otros asuntos civiles.',
      details: [
        'Contratos civiles y mercantiles',
        'Derechos reales y propiedad',
        'Derecho de sucesiones y herencias',
        'Reclamaciones por daños y perjuicios',
        'Arrendamientos y propiedad horizontal'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Derecho Penal',
      description: 'Defensa en procesos penales, representación legal ante autoridades judiciales y protección de sus derechos.',
      details: [
        'Defensa penal en todas las etapas procesales',
        'Recursos y apelaciones',
        'Asistencia en audiencias y juicios',
        'Medidas alternativas a la prisión',
        'Defensa en delitos de tránsito'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Derecho Laboral',
      description: 'Asesoría en relaciones laborales, contratos de trabajo, despidos y reclamaciones laborales.',
      details: [
        'Contratos de trabajo y negociación',
        'Despidos improcedentes y nulos',
        'Reclamaciones de derechos laborales',
        'Acoso laboral y discriminación',
        'Seguridad social y prestaciones'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Derecho Administrativo',
      description: 'Representación ante entidades públicas, recursos administrativos y procedimientos contenciosos.',
      details: [
        'Recursos administrativos',
        'Procedimientos sancionadores',
        'Responsabilidad patrimonial',
        'Contratación pública',
        'Autorizaciones y licencias administrativas'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Derecho de Familia',
      description: 'Asesoramiento en divorcios, custodia de hijos, pensiones alimenticias y otros asuntos familiares.',
      details: [
        'Divorcios y separaciones',
        'Custodia de hijos y régimen de visitas',
        'Pensiones alimenticias',
        'Modificaciones de medidas',
        'Violencia intrafamiliar'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Asesoría Jurídica Continua',
      description: 'Servicio de asesoramiento legal permanente para particulares y empresas.',
      details: [
        'Asesoramiento legal preventivo',
        'Consultas ilimitadas',
        'Revisión de documentos',
        'Acompañamiento en negociaciones',
        'Planes personalizados para empresas'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white">
      {/* Cabecera de página */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Nuestros Servicios Legales</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios legales para satisfacer sus necesidades con la máxima profesionalidad y dedicación.
          </p>
        </div>
      </div>

      {/* Listado de servicios */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-105">
                <div className="p-6">
                  <div className="flex justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-center">
                    {service.description}
                  </p>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Servicios incluidos:</h4>
                    <ul className="space-y-2">
                      {service.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección CTA */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Necesita asesoría legal especializada?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contáctenos hoy mismo para una consulta inicial gratuita y descubra cómo podemos ayudarle con su caso.
          </p>
          <Link 
            to="/contacto" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Solicitar Consulta
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Services
EOL

echo -e "${GREEN}✓${NC} Componente Services creado exitosamente"

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ PÁGINA DE SERVICIOS CREADA                                      ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Ahora ejecuta: ${BLUE}./crear-pagina-contacto.sh${NC}"
echo "para crear la página de contacto de la aplicación."
echo ""
