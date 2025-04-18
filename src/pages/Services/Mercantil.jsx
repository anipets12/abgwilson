import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Página de Derecho Mercantil
 * Detalla los servicios específicos de derecho mercantil y empresarial
 */
const DerechoMercantil = () => {
  // Servicios específicos de derecho mercantil
  const servicios = [
    {
      titulo: "Constitución de Empresas",
      descripcion: "Asesoramiento y gestión en la constitución de sociedades, empresas unipersonales y otras formas jurídicas para su negocio.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      titulo: "Contratos Mercantiles",
      descripcion: "Elaboración, revisión y negociación de todo tipo de contratos comerciales, de distribución, franquicia, agencia y más.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      titulo: "Asesoría Empresarial",
      descripcion: "Consultoría legal continua para empresas, asesoramiento en toma de decisiones y cumplimiento normativo.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      titulo: "Propiedad Intelectual",
      descripcion: "Protección de marcas, patentes, derechos de autor y secretos comerciales, incluyendo registro y defensa.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      titulo: "Derecho de Competencia",
      descripcion: "Asesoramiento en normativa de libre competencia, prácticas restrictivas, competencia desleal y concentraciones empresariales.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      titulo: "Restructuraciones y Fusiones",
      descripcion: "Asistencia legal en procesos de fusión, adquisición, escisión, transformación y restructuración empresarial.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    }
  ];

  // Casos de éxito
  const casosExito = [
    {
      titulo: "Restructuración exitosa de grupo empresarial",
      descripcion: "Gestionamos la reorganización de un grupo de empresas familiares, optimizando su estructura fiscal y operativa, logrando una reducción de costos del 25% y mejorando la eficiencia administrativa.",
    },
    {
      titulo: "Protección de marca internacional",
      descripcion: "Aseguramos la protección internacional de la marca de un cliente en el sector tecnológico, implementando una estrategia de registro en más de 15 países y resolviendo un conflicto de propiedad intelectual en dos jurisdicciones."
    },
    {
      titulo: "Negociación de contrato de distribución",
      descripcion: "Asesoramos en la negociación de un contrato de distribución exclusiva que permitió a nuestro cliente expandir su mercado a tres países de Latinoamérica, asegurando condiciones favorables y minimizando riesgos legales."
    }
  ];

  // Preguntas frecuentes
  const faqs = [
    {
      pregunta: "¿Qué tipos de empresas puedo constituir en Ecuador?",
      respuesta: "En Ecuador, las principales formas jurídicas son: Compañía Limitada, Sociedad Anónima, Empresa Unipersonal de Responsabilidad Limitada, Compañía de Economía Mixta y Sucursal de Compañía Extranjera. Cada una tiene diferentes requisitos de capital, número de socios y responsabilidades que analizamos según sus necesidades específicas."
    },
    {
      pregunta: "¿Cuánto tiempo toma constituir una empresa en Ecuador?",
      respuesta: "El proceso completo de constitución puede tomar entre 3 y 6 semanas aproximadamente. Esto incluye la reserva de denominación, elaboración de estatutos, otorgamiento de escritura pública, aprobación de la Superintendencia de Compañías, publicación del extracto, inscripción en el Registro Mercantil, obtención del RUC y permisos municipales."
    },
    {
      pregunta: "¿Qué implica el cumplimiento corporativo para mi empresa?",
      respuesta: "El cumplimiento corporativo implica asegurar que su empresa opere dentro del marco legal, lo que incluye: mantener actualizados los libros societarios, realizar juntas ordinarias anuales, presentar información financiera a los organismos de control, cumplir con obligaciones tributarias y laborales, y mantener los permisos operativos vigentes."
    },
    {
      pregunta: "¿Cómo puedo proteger mi marca comercial?",
      respuesta: "La protección de una marca en Ecuador se realiza principalmente mediante su registro en el Servicio Nacional de Derechos Intelectuales (SENADI). El proceso incluye una búsqueda previa para verificar disponibilidad, presentación de la solicitud, publicación en la Gaceta de Propiedad Intelectual, y obtención del título de registro con validez de 10 años renovables."
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
              Derecho Mercantil
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Soluciones legales integrales para empresas, negocios y emprendedores
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
            Expertos en Derecho Mercantil y Empresarial
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            El Derecho Mercantil regula las relaciones comerciales y la actividad empresarial. Nuestro equipo de especialistas ofrece asesoramiento integral a empresas de todos los tamaños, desde emprendedores y pequeños negocios hasta grandes corporaciones, en todas las etapas de su desarrollo y en todos los aspectos legales de su actividad comercial.
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
            Nuestros Servicios de Derecho Mercantil
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

      {/* Por qué elegir nuestros servicios mercantiles */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestros servicios mercantiles?
            </h2>
            <p className="text-lg text-gray-600">
              Aportamos valor a su empresa con soluciones legales especializadas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Experiencia en negocios</h3>
                  <p className="mt-2 text-gray-600">
                    Nuestros abogados combinan un sólido conocimiento jurídico con una comprensión real del mundo empresarial y sus desafíos.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Enfoque preventivo</h3>
                  <p className="mt-2 text-gray-600">
                    Identificamos y prevenimos posibles problemas legales antes de que ocurran, protegiendo su inversión y evitando litigios costosos.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Asesoría personalizada</h3>
                  <p className="mt-2 text-gray-600">
                    Ofrecemos soluciones adaptadas a las necesidades específicas de su empresa, considerando su sector, tamaño y objetivos de negocio.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Actualización constante</h3>
                  <p className="mt-2 text-gray-600">
                    Nos mantenemos al día con los cambios legislativos y regulatorios que puedan afectar a su empresa, garantizando un cumplimiento normativo continuo.
                  </p>
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
                ¿Tiene más preguntas sobre asuntos mercantiles o empresariales?
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
              Impulse su negocio con el respaldo legal adecuado
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contáctenos hoy para una consulta especializada en derecho mercantil y empresarial
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

export default DerechoMercantil;
