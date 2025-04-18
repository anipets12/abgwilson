import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Página de Derecho Penal
 * Detalla los servicios específicos de derecho penal
 */
const DerechoPenal = () => {
  // Servicios específicos de derecho penal
  const servicios = [
    {
      titulo: "Defensa Penal",
      descripcion: "Representación y defensa técnica de los derechos e intereses en procedimientos penales, tanto en la fase de investigación como durante el juicio.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      titulo: "Delitos Económicos",
      descripcion: "Defensa especializada en delitos económicos y financieros, como fraude, estafa, blanqueo de capitales, delitos fiscales y corrupción.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      titulo: "Delitos contra las Personas",
      descripcion: "Especialistas en casos de homicidio, lesiones, amenazas, coacciones y otros delitos contra la integridad física y moral de las personas.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      titulo: "Delitos Sexuales",
      descripcion: "Asistencia legal especializada para víctimas de agresiones sexuales, así como defensa técnica para acusados, garantizando un proceso justo.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      titulo: "Tráfico de Drogas",
      descripcion: "Defensa en casos de posesión, tráfico y cultivo de sustancias ilegales, analizando cada caso para establecer la mejor estrategia legal.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      titulo: "Recursos y Apelaciones",
      descripcion: "Preparación y presentación de recursos contra resoluciones judiciales desfavorables, tanto en primera instancia como en apelación y casación.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  // Casos de éxito
  const casosExito = [
    {
      titulo: "Absolución en caso de presunto fraude",
      descripcion: "Conseguimos la absolución completa de un cliente acusado de fraude fiscal por un supuesto delito de más de $200,000, demostrando errores en la investigación inicial.",
    },
    {
      titulo: "Reducción significativa de pena",
      descripcion: "Logramos reducir la pena solicitada por fiscalía de 8 años a 2 años y medio, con suspensión de condena, para un cliente acusado de tráfico de drogas."
    },
    {
      titulo: "Sobreseimiento por prescripción",
      descripcion: "Obtuvimos el sobreseimiento libre de una causa por prescripción del delito, tras demostrar que había transcurrido el plazo legal sin que se hubiera dictado sentencia firme."
    }
  ];

  // Preguntas frecuentes
  const faqs = [
    {
      pregunta: "¿Qué debo hacer si soy detenido?",
      respuesta: "Si es detenido, tiene derecho a: guardar silencio, ser informado del motivo de su detención, contactar a un abogado de su elección, no declarar contra sí mismo, y ser presentado ante un juez en un plazo máximo de 24 horas. Le recomendamos no hacer declaraciones hasta contar con asesoramiento legal."
    },
    {
      pregunta: "¿Cuál es la diferencia entre delito y contravención en Ecuador?",
      respuesta: "En Ecuador, la principal diferencia radica en la gravedad: los delitos son infracciones penales más graves, con penas que pueden incluir privación de libertad por períodos largos. Las contravenciones son infracciones menores, con sanciones más leves como multas o privación de libertad por períodos muy cortos (generalmente menos de 30 días)."
    },
    {
      pregunta: "¿Es posible evitar ir a prisión tras una condena penal?",
      respuesta: "Sí, existen varias posibilidades dependiendo del caso. Para penas menores a 5 años y sin antecedentes penales, puede solicitarse la suspensión condicional de la pena. También existen medidas alternativas como la libertad controlada, régimen semiabierto o arresto domiciliario. Cada caso requiere un análisis específico."
    },
    {
      pregunta: "¿Cuánto tiempo puede durar un proceso penal?",
      respuesta: "La duración de un proceso penal varía según la complejidad del caso y el tipo de procedimiento. En procedimientos directos puede resolverse en semanas, mientras que en procedimientos ordinarios por delitos graves puede durar entre 1 y 2 años o más, especialmente si hay recursos de apelación o casación."
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
              Derecho Penal
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Defensa legal especializada y estratégica en todos los procedimientos penales
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
            Especialistas en Derecho Penal
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            El Derecho Penal es una de las ramas más complejas y técnicas del ordenamiento jurídico, donde se dirimen asuntos que pueden afectar gravemente a la libertad y el futuro de las personas. Nuestro equipo de abogados penalistas cuenta con una sólida formación académica y una amplia experiencia práctica, permitiéndonos ofrecer la mejor defensa posible ante cualquier acusación penal o representación como acusación particular.
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
            Nuestros Servicios de Derecho Penal
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

      {/* Proceso de defensa */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Proceso de Defensa Penal
            </h2>
            <p className="text-lg text-gray-600">
              Una estrategia meticulosa y profesional para cada etapa del procedimiento penal
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Línea conectora */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform -translate-x-1/2"></div>
              
              {/* Etapas */}
              <div className="space-y-12 md:space-y-0">
                {/* Etapa 1 */}
                <div className="relative md:flex">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-8 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm ml-auto md:ml-0 md:mr-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Análisis Inicial del Caso</h3>
                      <p className="text-gray-600">
                        Estudio detallado de los hechos, pruebas existentes y calificación jurídica para establecer las fortalezas y debilidades del caso.
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
                
                {/* Etapa 2 */}
                <div className="relative md:flex">
                  <div className="md:w-1/2 md:pr-8"></div>
                  <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold z-10">
                      2
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left mb-8 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm mr-auto md:mr-0 md:ml-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Diseño de Estrategia Defensiva</h3>
                      <p className="text-gray-600">
                        Desarrollo de una estrategia jurídica personalizada en función de las particularidades del caso y del perfil del cliente.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Etapa 3 */}
                <div className="relative md:flex">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-8 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm ml-auto md:ml-0 md:mr-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Fase de Instrucción</h3>
                      <p className="text-gray-600">
                        Participación activa en la fase de investigación, proponiendo diligencias, cuestionando pruebas y preparando la defensa técnica.
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
                
                {/* Etapa 4 */}
                <div className="relative md:flex">
                  <div className="md:w-1/2 md:pr-8"></div>
                  <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold z-10">
                      4
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-sm mr-auto md:mr-0 md:ml-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Juicio Oral y Sentencia</h3>
                      <p className="text-gray-600">
                        Representación técnica durante el juicio oral, con interrogatorios estratégicos, argumentaciones sólidas y gestión procesal para obtener el mejor resultado posible.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Etapa 5 */}
                <div className="relative md:flex mt-12">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-lg shadow-sm ml-auto md:ml-0 md:mr-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">5. Recursos y Apelaciones</h3>
                      <p className="text-gray-600">
                        Preparación y presentación de recursos contra resoluciones desfavorables, explorando todas las vías legales disponibles.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold z-10">
                      5
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8"></div>
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
                ¿Tiene más preguntas sobre procesos penales?
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
              ¿Necesita defensa penal especializada?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              No arriesgue su libertad ni su futuro. Contáctenos hoy para una consulta confidencial
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contacto"
                className="px-6 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100 transition"
              >
                Solicitar Consulta Urgente
              </Link>
              <a
                href="tel:+593000000000"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-primary-800 transition"
              >
                Línea de Emergencia
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerechoPenal;
