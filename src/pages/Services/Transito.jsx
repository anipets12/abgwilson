import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Página de Derecho de Tránsito
 * Detalla los servicios específicos relacionados con derecho de tránsito
 */
const DerechoTransito = () => {
  // Servicios específicos de derecho de tránsito
  const servicios = [
    {
      titulo: "Defensa en Infracciones",
      descripcion: "Representación legal en impugnaciones de multas y sanciones por infracciones de tránsito, buscando su anulación o reducción.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      titulo: "Accidentes de Tránsito",
      descripcion: "Asesoramiento integral en casos de accidentes de tránsito, determinación de responsabilidades y reclamación de indemnizaciones por daños y lesiones.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      titulo: "Recuperación de Puntos",
      descripcion: "Gestión de procedimientos para la recuperación de puntos del permiso de conducir y asesoramiento para evitar la pérdida de la licencia.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      titulo: "Delitos Contra la Seguridad Vial",
      descripcion: "Defensa especializada en casos de delitos de tráfico como conducción bajo influencia de alcohol/drogas, temeraria o sin licencia.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      titulo: "Trámites Administrativos",
      descripcion: "Gestión de todo tipo de trámites relacionados con vehículos: transferencias, bajas, matriculaciones, cambios de titularidad y recursos administrativos.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      titulo: "Seguro Obligatorio",
      descripcion: "Asesoramiento y reclamación frente a aseguradoras en casos de incumplimiento, liquidaciones insuficientes o negativas de cobertura.",
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
      titulo: "Anulación de multa por radar",
      descripcion: "Conseguimos la anulación de una multa de alto importe por exceso de velocidad, demostrando errores de calibración en el radar y defectos en el procedimiento sancionador.",
    },
    {
      titulo: "Indemnización máxima tras accidente",
      descripcion: "Obtuvimos una indemnización de $45,000 para un cliente que sufrió lesiones en un accidente, superando en un 35% la oferta inicial de la aseguradora gracias a informes periciales especializados."
    },
    {
      titulo: "Defensa exitosa en caso de alcoholemia",
      descripcion: "Logramos la absolución de un cliente acusado de conducción bajo influencia del alcohol, demostrando irregularidades en la prueba de alcoholemia y el procedimiento policial."
    }
  ];

  // Preguntas frecuentes
  const faqs = [
    {
      pregunta: "¿Qué debo hacer si recibo una multa de tránsito?",
      respuesta: "Lo primero es revisar cuidadosamente la boleta para verificar que todos los datos sean correctos (matrícula, fecha, hora, lugar). Asegúrese de que el plazo para pagar con descuento o para presentar alegaciones no haya vencido. Si considera que la multa es injusta o incorrecta, puede presentar un escrito de alegaciones o recurrir la sanción. Es recomendable buscar asesoramiento legal para evaluar las posibilidades de éxito y preparar la mejor defensa posible."
    },
    {
      pregunta: "¿Cómo puedo recuperar puntos de mi licencia de conducir?",
      respuesta: "En Ecuador, puede recuperar puntos realizando cursos de educación vial en centros autorizados por la Agencia Nacional de Tránsito. Si ha perdido todos los puntos, tendrá que esperar el tiempo establecido por la ley antes de poder solicitar una nueva licencia. El sistema de recuperación varía según el tipo de licencia y la gravedad de las infracciones cometidas. Nuestro despacho puede asesorarle sobre el procedimiento específico aplicable a su caso."
    },
    {
      pregunta: "¿Qué indemnización me corresponde tras un accidente de tránsito?",
      respuesta: "La indemnización depende de diversos factores como la gravedad de las lesiones, secuelas permanentes, tiempo de curación, gastos médicos, daños materiales, lucro cesante (ingresos dejados de percibir) y daño moral. En Ecuador, el seguro obligatorio SOAT cubre hasta ciertos límites, pero es posible reclamar cantidades adicionales si los daños superan esa cobertura. Es fundamental contar con informes médicos detallados y valoraciones periciales para maximizar la indemnización."
    },
    {
      pregunta: "¿Qué consecuencias tiene conducir sin licencia o con la licencia caducada?",
      respuesta: "Conducir sin licencia o con la licencia caducada constituye una infracción de tránsito que conlleva multas económicas significativas, reducción de puntos y potencialmente la inmovilización del vehículo. Además, en caso de accidente, el seguro podría negarse a cubrir los daños, quedando el conductor personalmente responsable de indemnizar a los afectados. Si la conducta es reiterada, las sanciones pueden incrementarse y, en ciertos casos, constituir un delito contra la seguridad vial."
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
              Derecho de Tránsito
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Soluciones legales especializadas en infracciones, accidentes y trámites de tránsito
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
            Expertos en Derecho de Tránsito
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            El Derecho de Tránsito abarca todas las normativas que regulan la circulación de vehículos y las consecuencias legales derivadas de infracciones y accidentes de tráfico. En nuestro despacho contamos con especialistas que le asesorarán para proteger sus derechos como conductor, impugnar multas injustas y obtener la máxima indemnización en caso de accidente.
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
            Nuestros Servicios de Derecho de Tránsito
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

      {/* Procedimiento en accidentes */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Qué hacer en caso de accidente?
            </h2>
            <p className="text-lg text-gray-600">
              Guía práctica para proteger sus derechos tras un accidente de tránsito
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600 font-semibold text-lg">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Mantenga la calma y evalúe la situación</h3>
                    <p className="mt-2 text-gray-600">
                      Verifique si hay heridos y llame inmediatamente a emergencias (911). No mueva a los heridos a menos que sea absolutamente necesario.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600 font-semibold text-lg">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Documente el accidente</h3>
                    <p className="mt-2 text-gray-600">
                      Tome fotografías de los vehículos, de la escena del accidente, señales de tráfico y condiciones de la vía. Recoja datos de testigos si los hay.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600 font-semibold text-lg">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Intercambie información</h3>
                    <p className="mt-2 text-gray-600">
                      Obtenga los datos del otro conductor: nombre, contacto, datos del vehículo, matrícula, aseguradora y número de póliza.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600 font-semibold text-lg">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Reporte el accidente a las autoridades</h3>
                    <p className="mt-2 text-gray-600">
                      Contacte a la policía para que elaboren el parte de accidente, especialmente si hay heridos o daños significativos.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600 font-semibold text-lg">
                      5
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Busque atención médica</h3>
                    <p className="mt-2 text-gray-600">
                      Acuda a un centro médico aunque sus lesiones parezcan leves. Algunas lesiones pueden manifestarse días después del accidente.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600 font-semibold text-lg">
                      6
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Contacte a un abogado especialista</h3>
                    <p className="mt-2 text-gray-600">
                      Consulte con nuestros especialistas antes de firmar cualquier documento o aceptar ofertas de la aseguradora para proteger sus derechos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link
                to="/contacto"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                Solicitar asesoramiento
              </Link>
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
                ¿Tiene más preguntas sobre infracciones o accidentes de tránsito?
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
              ¿Problemas con multas o accidentes de tránsito?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contáctenos hoy para una asesoría especializada en derecho de tránsito
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

export default DerechoTransito;
