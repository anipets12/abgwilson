import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Página de Derecho Administrativo
 * Detalla los servicios específicos de derecho administrativo
 */
const DerechoAdministrativo = () => {
  // Servicios específicos de derecho administrativo
  const servicios = [
    {
      titulo: "Procedimientos Administrativos",
      descripcion: "Representación en todo tipo de procedimientos administrativos ante organismos públicos, incluyendo recursos y reclamaciones.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      titulo: "Contratación Pública",
      descripcion: "Asesoramiento en procesos de licitación, adjudicación, ejecución y resolución de contratos con entidades públicas.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      titulo: "Permisos y Licencias",
      descripcion: "Gestión y tramitación de autorizaciones, permisos, licencias y registros ante organismos oficiales.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      titulo: "Recursos Administrativos",
      descripcion: "Presentación y tramitación de recursos administrativos contra actos y resoluciones de las Administraciones Públicas.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
        </svg>
      )
    },
    {
      titulo: "Responsabilidad Patrimonial",
      descripcion: "Reclamaciones por daños causados por el funcionamiento de los servicios públicos o actuaciones administrativas.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      titulo: "Derecho Urbanístico",
      descripcion: "Asesoramiento en planificación urbana, licencias de construcción, disciplina urbanística y gestión del suelo.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  // Casos de éxito
  const casosExito = [
    {
      titulo: "Anulación de sanción administrativa",
      descripcion: "Conseguimos la anulación de una sanción impuesta a una empresa del sector alimentario por supuesta infracción de normativa sanitaria, demostrando defectos en el procedimiento administrativo.",
    },
    {
      titulo: "Adjudicación de contrato público",
      descripcion: "Asesoramos a una empresa tecnológica en un proceso de licitación pública, logrando la adjudicación de un contrato valorado en más de $500,000 y superando recursos de competidores."
    },
    {
      titulo: "Indemnización por responsabilidad patrimonial",
      descripcion: "Obtuvimos una indemnización de $85,000 para un cliente que sufrió daños en su propiedad debido a obras públicas defectuosas, tras un proceso de reclamación administrativa."
    }
  ];

  // Preguntas frecuentes
  const faqs = [
    {
      pregunta: "¿Qué es un recurso administrativo y cuándo debo presentarlo?",
      respuesta: "Un recurso administrativo es un medio de impugnación que permite al ciudadano solicitar a la Administración que revise un acto administrativo por considerarlo contrario a derecho. Debe presentarse cuando reciba una resolución administrativa desfavorable (como una sanción, denegación de permiso, etc.) dentro del plazo establecido, que generalmente es de 15 días (recurso de reposición) o un mes (recurso de alzada) desde la notificación."
    },
    {
      pregunta: "¿Qué diferencia hay entre la vía administrativa y la vía contencioso-administrativa?",
      respuesta: "La vía administrativa se desarrolla ante la propia Administración Pública que dictó el acto, mientras que la vía contencioso-administrativa se tramita ante los tribunales de justicia. Generalmente, es necesario agotar la vía administrativa (presentando los recursos administrativos correspondientes) antes de acudir a la vía judicial. La vía administrativa suele ser más rápida y menos costosa."
    },
    {
      pregunta: "¿Cómo puedo reclamar daños causados por la Administración Pública?",
      respuesta: "A través de un procedimiento de responsabilidad patrimonial de la Administración. Debe presentar una reclamación detallando los hechos, los daños sufridos, la relación causal entre la actuación administrativa y el daño, y la evaluación económica del mismo. Es importante aportar todas las pruebas posibles (informes, fotografías, testigos, etc.) y presentarla dentro del plazo de un año desde que se produjo el daño o desde que se manifestaron sus efectos."
    },
    {
      pregunta: "¿Qué requisitos debe cumplir mi empresa para participar en licitaciones públicas?",
      respuesta: "Principalmente, debe estar al corriente de sus obligaciones tributarias y con la Seguridad Social, no estar incursa en prohibiciones para contratar (como haber sido sancionada o condenada por determinados delitos), y acreditar la solvencia económica, financiera y técnica requerida en cada licitación. Dependiendo del tipo y cuantía del contrato, puede ser necesario contar con una clasificación específica como contratista."
    }
  ];
  
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
          </svg>
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0,0 L10,0 L10,10 L0,10 Z" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Derecho Administrativo
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Expertos en relaciones con la Administración Pública y defensa de sus derechos
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contacto"
                className="px-6 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100 transition"
              >
                Consulta Gratuita
              </Link>
              <a
                href="#servicios"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-primary-800 transition"
              >
                Ver Servicios
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Introducción */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Expertos en Derecho Administrativo
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            El Derecho Administrativo regula las relaciones entre los ciudadanos y la Administración Pública. Nuestro equipo de especialistas le asesora y representa en todo tipo de procedimientos administrativos, ayudándole a proteger sus derechos e intereses frente a los organismos públicos.
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-primary-600 rounded"></div>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div id="servicios" className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestros Servicios de Derecho Administrativo
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {servicios.map((servicio, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <div className="mb-4">
                  {servicio.icono}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {servicio.titulo}
                </h3>
                <p className="text-gray-600">
                  {servicio.descripcion}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Proceso de trabajo */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-lg text-gray-600">
              Metodología para resolver eficazmente sus asuntos administrativos
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Línea conectora */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform -translate-x-1/2"></div>
              
              {/* Pasos */}
              <div className="space-y-12 md:space-y-0">
                {/* Paso 1 */}
                <div className="relative md:flex">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-8 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm ml-auto md:ml-0 md:mr-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Análisis Inicial</h3>
                      <p className="text-gray-600">
                        Evaluamos su caso, revisando toda la documentación y analizando la actuación administrativa, los plazos y las vías de recurso disponibles.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold z-10">
                      1
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8"></div>
                </div>
                
                {/* Paso 2 */}
                <div className="relative md:flex">
                  <div className="md:w-1/2 md:pr-8"></div>
                  <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold z-10">
                      2
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left mb-8 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm mr-auto md:mr-0 md:ml-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Estrategia Jurídica</h3>
                      <p className="text-gray-600">
                        Diseñamos la estrategia más adecuada, valorando las opciones de recursos administrativos, negociación o acción contencioso-administrativa.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Paso 3 */}
                <div className="relative md:flex">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-8 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm ml-auto md:ml-0 md:mr-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Tramitación Administrativa</h3>
                      <p className="text-gray-600">
                        Preparamos y presentamos todos los escritos, recursos y documentación necesaria ante los organismos correspondientes, haciendo un seguimiento continuo.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold z-10">
                      3
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8"></div>
                </div>
                
                {/* Paso 4 */}
                <div className="relative md:flex">
                  <div className="md:w-1/2 md:pr-8"></div>
                  <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold z-10">
                      4
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-sm mr-auto md:mr-0 md:ml-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Resolución o Vía Judicial</h3>
                      <p className="text-gray-600">
                        Analizamos la resolución administrativa y, si es necesario, preparamos la demanda contencioso-administrativa para defender sus derechos ante los tribunales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Casos de éxito */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Casos de Éxito
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {casosExito.map((caso, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm border-t-4 border-primary-600">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {caso.titulo}
                </h3>
                <p className="text-gray-600">
                  {caso.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preguntas frecuentes */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.pregunta}
                  </h3>
                  <p className="text-gray-600">
                    {faq.respuesta}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                ¿Tiene más preguntas sobre procedimientos administrativos?
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                Contáctenos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-700 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              ¿Problemas con la Administración Pública?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contáctenos hoy para una asesoría especializada en derecho administrativo
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contacto"
                className="px-6 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100 transition"
              >
                Agendar Consulta
              </Link>
              <a
                href="tel:+593000000000"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-primary-800 transition"
              >
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerechoAdministrativo;
