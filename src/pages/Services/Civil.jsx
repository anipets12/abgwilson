import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Página de Derecho Civil
 * Detalla los servicios específicos de derecho civil
 */
const DerechoCivil = () => {
  // Servicios específicos de derecho civil
  const servicios = [
    {
      titulo: "Contratos Civiles",
      descripcion: "Redacción, revisión y negociación de todo tipo de contratos civiles, incluyendo compraventas, arrendamientos, préstamos y acuerdos de servicios.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      titulo: "Litigios Civiles",
      descripcion: "Representación legal en todo tipo de litigios civiles, incluyendo reclamaciones por daños, incumplimientos contractuales, responsabilidad civil y más.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      titulo: "Derecho Inmobiliario",
      descripcion: "Asesoramiento en compraventa de inmuebles, arrendamientos, desahucios, urbanismo, regularización de propiedades y gestiones registrales.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      titulo: "Herencias y Sucesiones",
      descripcion: "Planificación sucesoria, testamentos, partición de herencias, tramitación de la sucesión y resolución de conflictos hereditarios.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      titulo: "Protección de Derechos",
      descripcion: "Defensa legal en casos de vulneración de derechos civiles, incluyendo honor, intimidad, imagen y protección de datos personales.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      titulo: "Reclamaciones por Daños",
      descripcion: "Representación en reclamaciones por daños y perjuicios en casos de negligencia, accidentes, productos defectuosos, etc.",
      icono: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  // Casos de éxito
  const casosExito = [
    {
      titulo: "Resolución favorable en disputa de propiedad",
      descripcion: "Conseguimos que nuestro cliente recuperara un inmueble valorado en $150,000 después de una compleja disputa sobre los límites de la propiedad que llevaba años sin resolverse.",
    },
    {
      titulo: "Indemnización por daños estructurales",
      descripcion: "Obtuvimos una indemnización de $75,000 para un cliente cuya vivienda sufrió daños estructurales debido a obras realizadas en un edificio colindante."
    },
    {
      titulo: "Recuperación de herencia",
      descripcion: "Logramos que nuestro cliente recibiera la parte de herencia que legítimamente le correspondía, después de que hubiera sido excluido del testamento de manera fraudulenta."
    }
  ];

  // Preguntas frecuentes
  const faqs = [
    {
      pregunta: "¿Qué documentos necesito para iniciar un proceso civil?",
      respuesta: "Los documentos necesarios varían según el tipo de proceso, pero generalmente se requiere: identificación personal, documentos que sustenten la reclamación (contratos, facturas, correspondencia), y en algunos casos, un poder notarial para la representación legal."
    },
    {
      pregunta: "¿Cuánto tiempo puede durar un proceso civil?",
      respuesta: "La duración de un proceso civil en Ecuador puede variar significativamente dependiendo de la complejidad del caso, la carga de trabajo de los juzgados y las posibles apelaciones. En promedio, puede oscilar entre 6 meses y 2 años."
    },
    {
      pregunta: "¿Es posible llegar a un acuerdo antes de ir a juicio?",
      respuesta: "Sí, siempre intentamos resolver los conflictos mediante negociación o mediación antes de iniciar un juicio. Esto puede ahorrar tiempo, costos y estrés. En muchos casos, logramos acuerdos satisfactorios sin necesidad de un proceso judicial completo."
    },
    {
      pregunta: "¿Cuáles son los plazos de prescripción para reclamaciones civiles?",
      respuesta: "Los plazos varían según el tipo de reclamación. Por ejemplo, las acciones por responsabilidad civil extracontractual prescriben en 4 años, mientras que para reclamar obligaciones contractuales el plazo es generalmente de 10 años, aunque existen excepciones."
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
              Derecho Civil
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Soluciones legales integrales para proteger sus derechos e intereses en todos los asuntos civiles
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
            Expertos en Derecho Civil
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            El Derecho Civil regula las relaciones entre particulares, abarcando desde contratos y propiedades hasta herencias y responsabilidades. Nuestro equipo cuenta con amplia experiencia en todas las áreas del derecho civil, ofreciendo un asesoramiento personalizado y efectivo para cada caso.
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
            Nuestros Servicios de Derecho Civil
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
              Abordamos cada caso con un enfoque metodológico y personalizado para obtener los mejores resultados
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
                        Evaluamos su caso en detalle, analizando documentación, hechos y circunstancias para ofrecer una valoración jurídica precisa.
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Estrategia Legal</h3>
                      <p className="text-gray-600">
                        Desarrollamos una estrategia legal personalizada considerando las particularidades de su caso, objetivos y el marco jurídico aplicable.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Paso 3 */}
                <div className="relative md:flex">
                  <div className="md:w-1/2 md:pr-8 md:text-right mb-8 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm ml-auto md:ml-0 md:mr-0 max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Gestión Extrajudicial</h3>
                      <p className="text-gray-600">
                        Siempre que sea posible, buscamos resoluciones extrajudiciales a través de negociaciones, mediación o conciliación para ahorrar tiempo y costos.
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Resolución Judicial</h3>
                      <p className="text-gray-600">
                        Si es necesario, representamos sus intereses ante los tribunales con determinación y experiencia para lograr la mejor resolución posible.
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
                ¿Tiene más preguntas sobre servicios de derecho civil?
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
              ¿Necesita asesoramiento en Derecho Civil?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contáctenos hoy para una consulta gratuita y descubra cómo podemos ayudarle
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

export default DerechoCivil;
