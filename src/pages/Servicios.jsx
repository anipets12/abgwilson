import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Página de servicios legales
 * Muestra todos los servicios ofrecidos por el abogado
 */
const Servicios = () => {
  const [activeCategory, setActiveCategory] = useState('todos');

  // Categorías de servicios
  const categories = [
    { id: 'todos', name: 'Todos los Servicios' },
    { id: 'civil', name: 'Derecho Civil' },
    { id: 'familiar', name: 'Derecho Familiar' },
    { id: 'mercantil', name: 'Derecho Mercantil' },
    { id: 'administrativo', name: 'Derecho Administrativo' },
    { id: 'laboral', name: 'Derecho Laboral' },
    { id: 'penal', name: 'Derecho Penal' }
  ];

  // Lista de servicios
  const services = [
    {
      id: 1,
      title: 'Contratos Civiles',
      description: 'Redacción, revisión y negociación de todo tipo de contratos civiles para proteger sus intereses y derechos.',
      category: 'civil',
      icon: 'document',
      premium: false
    },
    {
      id: 2,
      title: 'Divorcios y Separaciones',
      description: 'Asesoramiento completo en procesos de divorcio, ya sea de mutuo acuerdo o contencioso, velando por sus derechos.',
      category: 'familiar',
      icon: 'home',
      premium: false
    },
    {
      id: 3,
      title: 'Constitución de Empresas',
      description: 'Creación de sociedades mercantiles y asesoramiento en todos los trámites legales para iniciar su negocio.',
      category: 'mercantil',
      icon: 'briefcase',
      premium: false
    },
    {
      id: 4,
      title: 'Litigios Civiles',
      description: 'Representación legal en todo tipo de litigios civiles, incluyendo reclamaciones por daños, incumplimientos contractuales y más.',
      category: 'civil',
      icon: 'scale',
      premium: false
    },
    {
      id: 5,
      title: 'Custodia y Pensiones',
      description: 'Asesoramiento especializado en casos de custodia de menores y pensiones alimenticias, priorizando el bienestar de los niños.',
      category: 'familiar',
      icon: 'home',
      premium: false
    },
    {
      id: 6,
      title: 'Propiedad Intelectual',
      description: 'Protección de marcas, patentes, derechos de autor y otros activos intangibles para su empresa o proyecto personal.',
      category: 'mercantil',
      icon: 'light-bulb',
      premium: true
    },
    {
      id: 7,
      title: 'Trámites Administrativos',
      description: 'Gestión de permisos, licencias y todo tipo de procedimientos ante entidades gubernamentales y administrativas.',
      category: 'administrativo',
      icon: 'document',
      premium: false
    },
    {
      id: 8,
      title: 'Herencias y Sucesiones',
      description: 'Planificación sucesoria, testamentos, partición de herencias y resolución de conflictos hereditarios.',
      category: 'civil',
      icon: 'document-text',
      premium: false
    },
    {
      id: 9,
      title: 'Contratos Laborales',
      description: 'Elaboración y revisión de contratos laborales, cumplimiento normativo y asesoramiento en legislación laboral.',
      category: 'laboral',
      icon: 'document',
      premium: false
    },
    {
      id: 10,
      title: 'Defensa Penal',
      description: 'Representación legal en procesos penales, defensa de sus derechos y garantías procesales en todas las etapas del procedimiento.',
      category: 'penal',
      icon: 'shield',
      premium: true
    },
    {
      id: 11,
      title: 'Reclamaciones Laborales',
      description: 'Asesoramiento y representación en reclamaciones por despidos, indemnizaciones, accidentes laborales y otros conflictos.',
      category: 'laboral',
      icon: 'document-text',
      premium: false
    },
    {
      id: 12,
      title: 'Derecho Inmobiliario',
      description: 'Asesoramiento en compraventa de inmuebles, arrendamientos, desahucios y otros asuntos relacionados con propiedades.',
      category: 'civil',
      icon: 'home',
      premium: false
    }
  ];

  // Filtrar servicios por categoría
  const filteredServices = activeCategory === 'todos' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  // Renderizar icono basado en nombre
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'document':
        return (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'document-text':
        return (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'home':
        return (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'briefcase':
        return (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'scale':
        return (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        );
      case 'light-bulb':
        return (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              Nuestros Servicios Legales
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Soluciones legales completas y personalizadas para todas sus necesidades jurídicas
            </p>
          </div>
        </div>
      </div>

      {/* Filtro de categorías */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Lista de servicios */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {renderIcon(service.icon)}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.title}
                      </h3>
                      {service.premium && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-600">
                      {service.description}
                    </p>
                    <div className="mt-4">
                      <Link
                        to={`/servicios/${service.category}/${service.id}`}
                        className="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        Más información →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Si no hay servicios en la categoría seleccionada */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No se encontraron servicios en esta categoría.
            </p>
          </div>
        )}
      </div>

      {/* Sección de consulta */}
      <div className="bg-primary-700 py-16 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              ¿No encuentra lo que busca?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contáctenos para una consulta personalizada. Estamos aquí para ayudarle con cualquier asunto legal.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-100"
            >
              Solicitar Consulta Gratuita
            </Link>
          </div>
        </div>
      </div>

      {/* Sección de proceso de trabajo */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestro Proceso de Trabajo
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Metodología clara y orientada a resultados para todos nuestros casos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Consulta Inicial
            </h3>
            <p className="text-gray-600">
              Evaluamos su caso y definimos una estrategia legal adaptada a sus necesidades específicas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Análisis Legal
            </h3>
            <p className="text-gray-600">
              Investigamos todos los aspectos relevantes y preparamos la documentación necesaria.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Representación
            </h3>
            <p className="text-gray-600">
              Defendemos sus intereses con firmeza y determinación en todas las instancias necesarias.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 text-xl font-bold mb-4">
              4
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Resolución
            </h3>
            <p className="text-gray-600">
              Trabajamos para obtener el mejor resultado posible y mantenerle informado en todo momento.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Respuestas a las dudas más comunes sobre nuestros servicios legales
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Cuáles son sus honorarios?
                </h3>
                <p className="text-gray-600">
                  Nuestros honorarios varían según el tipo de servicio y la complejidad del caso. Ofrecemos tarifas transparentes y competitivas, con opciones de pago flexibles. En la consulta inicial le proporcionaremos un presupuesto detallado.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Cuánto tiempo tomará resolver mi caso?
                </h3>
                <p className="text-gray-600">
                  Cada caso es único y los plazos pueden variar según su complejidad y la carga de trabajo de los juzgados. Durante nuestra primera reunión, le daremos una estimación realista basada en nuestra experiencia con casos similares.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Ofrecen consultas gratuitas?
                </h3>
                <p className="text-gray-600">
                  Sí, ofrecemos una primera consulta gratuita para evaluar su caso y explicarle cómo podemos ayudarle. Esta consulta no genera ningún compromiso por su parte.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Trabajan con casos fuera de Ibarra?
                </h3>
                <p className="text-gray-600">
                  Sí, atendemos casos en toda la provincia de Imbabura y también podemos representarle en asuntos a nivel nacional. Además, ofrecemos consultas virtuales para clientes de cualquier ubicación.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/contacto"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                ¿Tiene más preguntas? Contáctenos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
