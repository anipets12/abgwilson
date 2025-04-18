import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Página de Derecho Familiar
 * Detalla los servicios específicos de derecho familiar
 */
const DerechoFamiliar = () => {
  // Servicios específicos de derecho familiar
  const servicios = [
    {
      titulo: "Divorcios",
      descripcion: "Asesoramiento y representación en procesos de divorcio por mutuo acuerdo o contencioso, velando por sus intereses y derechos en todo momento.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      titulo: "Custodia de Menores",
      descripcion: "Representación en procesos de custodia, priorizando siempre el interés superior del menor y buscando los acuerdos más beneficiosos para todas las partes.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      titulo: "Pensiones Alimenticias",
      descripcion: "Gestión de pensiones alimenticias, considerando la capacidad económica del obligado y las necesidades del beneficiario, así como modificaciones cuando cambien las circunstancias.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      titulo: "Regímenes de Visitas",
      descripcion: "Establecimiento de regímenes de visitas equilibrados, que permitan mantener la relación paterno/materno-filial de manera adecuada y favorable para el desarrollo del menor.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      titulo: "Adopciones",
      descripcion: "Asesoramiento y gestión de procesos de adopción nacional e internacional, asegurando el cumplimiento de todos los requisitos legales y administrativos.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      titulo: "Violencia Doméstica",
      descripcion: "Medidas de protección, denuncias y representación legal en casos de violencia intrafamiliar, actuando con la urgencia y sensibilidad que estos casos requieren.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  // Casos de éxito
  const casosExito = [
    {
      titulo: "Acuerdo favorable de custodia compartida",
      descripcion: "Logramos un acuerdo de custodia compartida que permitió a ambos padres mantener una participación activa en la crianza de sus hijos, estableciendo un régimen equilibrado y beneficioso para los menores.",
    },
    {
      titulo: "Protección inmediata en caso de violencia",
      descripcion: "Obtuvimos medidas de protección en menos de 24 horas para una mujer y sus hijos víctimas de violencia doméstica, garantizando su seguridad y bienestar."
    },
    {
      titulo: "Proceso de adopción completado",
      descripcion: "Acompañamos a una familia durante todo el proceso de adopción, superando diversos obstáculos administrativos hasta lograr la integración legal del menor en su nuevo hogar."
    }
  ];

  // Preguntas frecuentes
  const faqs = [
    {
      pregunta: "¿Qué diferencia hay entre el divorcio por mutuo acuerdo y el contencioso?",
      respuesta: "El divorcio por mutuo acuerdo es cuando ambas partes están de acuerdo en divorciarse y en las condiciones del divorcio (división de bienes, custodia, pensiones, etc.). Es más rápido, económico y menos traumático. El divorcio contencioso ocurre cuando no hay acuerdo en la decisión de divorciarse o en las condiciones, requiriendo un proceso judicial más largo donde un juez tomará las decisiones finales."
    },
    {
      pregunta: "¿Cómo se determina el monto de las pensiones alimenticias?",
      respuesta: "En Ecuador, el monto de las pensiones alimenticias se determina considerando principalmente: los ingresos del alimentante, las necesidades del beneficiario, y aplicando tablas de pensiones mínimas según el número de hijos y el nivel de ingresos. También se consideran circunstancias especiales como discapacidades o enfermedades crónicas."
    },
    {
      pregunta: "¿Puedo modificar un régimen de visitas ya establecido?",
      respuesta: "Sí, es posible modificar un régimen de visitas cuando han cambiado sustancialmente las circunstancias que se consideraron al establecerlo. Por ejemplo, cambios en los horarios laborales, traslado de residencia, o cuando el régimen actual no está funcionando para el bienestar del menor."
    },
    {
      pregunta: "¿Cuánto tiempo tarda un proceso de adopción en Ecuador?",
      respuesta: "El tiempo varía según cada caso, pero en general un proceso de adopción nacional puede tomar entre 6 meses y 2 años desde el inicio hasta la resolución final. Este plazo incluye la fase administrativa (declaración de adoptabilidad del niño y evaluación de idoneidad de los adoptantes) y la fase judicial (sentencia de adopción)."
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
              Derecho Familiar
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Asesoramiento legal con sensibilidad y empatía en todos los asuntos relacionados con el derecho de familia
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
            Expertos en Derecho Familiar
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            El Derecho Familiar aborda las cuestiones legales que afectan a las relaciones familiares. En nuestro despacho entendemos la sensibilidad y complejidad emocional que estas situaciones conllevan, por lo que ofrecemos un enfoque comprensivo y empático, siempre priorizando el diálogo y las soluciones que minimicen el impacto en todos los miembros de la familia, especialmente en los menores.
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
            Nuestros Servicios de Derecho Familiar
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

      {/* Por qué elegirnos */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegirnos para su caso familiar?
            </h2>
            <p className="text-lg text-gray-600">
              Nos distinguimos por nuestro enfoque humano combinado con excelencia técnica
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
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
                  <h3 className="text-lg font-medium text-gray-900">Enfoque en soluciones pacíficas</h3>
                  <p className="mt-2 text-gray-600">
                    Promovemos la mediación y el acuerdo entre las partes siempre que sea posible, para reducir el desgaste emocional y económico del proceso judicial.
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
                  <h3 className="text-lg font-medium text-gray-900">Comunicación constante</h3>
                  <p className="mt-2 text-gray-600">
                    Mantenemos a nuestros clientes informados en cada etapa del proceso, explicando las implicaciones legales en términos comprensibles.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Soluciones personalizadas</h3>
                  <p className="mt-2 text-gray-600">
                    Cada familia es única, por lo que desarrollamos estrategias adaptadas a las circunstancias específicas de cada caso.
                  </p>
                </div>
              </div>
            </div>
            
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
                  <h3 className="text-lg font-medium text-gray-900">Prioridad en el bienestar de los menores</h3>
                  <p className="mt-2 text-gray-600">
                    Todas nuestras acciones y recomendaciones se guían por el principio del interés superior del menor, buscando siempre su protección y bienestar.
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
                ¿Tiene más preguntas sobre derecho familiar?
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
              ¿Necesita asesoramiento en asuntos familiares?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contáctenos hoy para una consulta gratuita con un especialista en derecho familiar
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

export default DerechoFamiliar;
