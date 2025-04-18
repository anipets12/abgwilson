import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaHandshake, FaFileContract, FaGavel, FaTrademark } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DerechoMercantil = () => {
  // Animaciones para elementos
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Lista de servicios de derecho mercantil
  const servicios = [
    {
      id: 1,
      titulo: 'Constitución de Compañías',
      descripcion: 'Asesoría completa para la creación y registro de empresas de cualquier tipo.',
      icon: <FaBuilding className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $650',
      caracteristicas: [
        'Análisis de tipo societario óptimo',
        'Elaboración de estatutos',
        'Trámites en Superintendencia de Compañías',
        'Registro Mercantil',
        'Obtención de RUC y permisos'
      ]
    },
    {
      id: 2,
      titulo: 'Contratos Mercantiles',
      descripcion: 'Elaboración y revisión de todo tipo de contratos comerciales con garantías legales completas.',
      icon: <FaFileContract className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $350',
      caracteristicas: [
        'Contratos de compraventa mercantil',
        'Contratos de distribución',
        'Franquicias',
        'Suministro',
        'Joint ventures y colaboración empresarial'
      ]
    },
    {
      id: 3,
      titulo: 'Propiedad Intelectual',
      descripcion: 'Protección legal de marcas, patentes, derechos de autor y otros activos intangibles.',
      icon: <FaTrademark className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $400',
      caracteristicas: [
        'Registro de marcas y nombres comerciales',
        'Protección de patentes',
        'Derechos de autor',
        'Secretos empresariales',
        'Litigios por infracciones'
      ]
    },
    {
      id: 4,
      titulo: 'Litigios Comerciales',
      descripcion: 'Representación especializada en disputas mercantiles y arbitraje comercial.',
      icon: <FaGavel className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $700',
      caracteristicas: [
        'Reclamaciones contractuales',
        'Disputas entre socios',
        'Competencia desleal',
        'Procedimientos concursales',
        'Arbitraje comercial'
      ]
    },
    {
      id: 5,
      titulo: 'Asesoría Societaria Permanente',
      descripcion: 'Servicio continuo de consultoría legal para empresas en operación.',
      icon: <FaHandshake className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $250/mes',
      caracteristicas: [
        'Juntas de accionistas',
        'Modificaciones estatutarias',
        'Actas y libros societarios',
        'Auditoría legal preventiva',
        'Consultas ilimitadas'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Derecho Mercantil</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Soluciones jurídicas integrales para empresas y emprendedores. Protegemos sus intereses comerciales con experiencia y profesionalismo.
          </p>
        </motion.div>

        {/* Introducción */}
        <motion.div 
          {...fadeIn}
          className="bg-white rounded-lg shadow-md p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Experiencia en Derecho Mercantil</h2>
              <p className="text-secondary-700 mb-4">
                En el bufete del Abg. Wilson Alexander Ipiales Guerron, nuestra área de Derecho Mercantil y Corporativo se especializa en brindar asesoría integral a empresas de todos los tamaños, desde startups hasta compañías consolidadas.
              </p>
              <p className="text-secondary-700 mb-4">
                Nuestro equipo de abogados cuenta con amplia experiencia en asuntos societarios, contratación mercantil, propiedad intelectual y resolución de conflictos comerciales, ofreciendo soluciones eficientes que se alinean con los objetivos de negocio de nuestros clientes.
              </p>
              <p className="text-secondary-700">
                Nos distinguimos por comprender no solo los aspectos legales, sino también las realidades del mercado ecuatoriano, lo que nos permite ofrecer un asesoramiento práctico y orientado a resultados.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/services/commercial-law.jpg" 
                alt="Servicio de Derecho Mercantil"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=Derecho+Mercantil";
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Servicios */}
        <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">Nuestros Servicios de Derecho Mercantil</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {servicios.map((servicio, index) => (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-center">
                  {servicio.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3 text-center">{servicio.titulo}</h3>
                <p className="text-secondary-600 mb-4 text-center">{servicio.descripcion}</p>
                <div className="text-2xl font-bold text-primary-700 mb-4 text-center">{servicio.precio}</div>
                <ul className="space-y-2 mb-6">
                  {servicio.caracteristicas.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-secondary-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <Link 
                    to="/contacto?servicio=mercantil"
                    className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-300 inline-block"
                  >
                    Solicitar Servicio
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-primary-700 rounded-lg shadow-xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">¿Necesita asesoría legal para su empresa?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contáctenos hoy mismo para una consulta inicial. Evaluaremos las necesidades legales de su negocio y le ofreceremos una estrategia personalizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contacto"
              className="px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Agendar Consulta
            </Link>
            <a 
              href="https://wa.me/593988835269?text=Hola,%20necesito%20asesoría%20legal%20para%20mi%20empresa"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary-700 transition-colors duration-300"
            >
              WhatsApp Directo
            </a>
          </div>
        </motion.div>

        {/* Preguntas Frecuentes */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-8">Preguntas Frecuentes</h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Cuál es el tipo de compañía más conveniente para mi negocio?</h3>
              <p className="text-secondary-700">
                La elección depende de varios factores como el número de socios, capital disponible, responsabilidad deseada y actividad económica. En Ecuador, las opciones más comunes son Compañía Limitada, Sociedad Anónima y Empresa Unipersonal de Responsabilidad Limitada. Durante nuestra consulta, analizaremos su situación particular para recomendar la estructura más adecuada.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Cuánto tiempo toma constituir una compañía en Ecuador?</h3>
              <p className="text-secondary-700">
                Con la implementación de procesos electrónicos, una constitución simplificada puede completarse en aproximadamente 2-3 semanas. Este plazo incluye la reserva de denominación, elaboración de estatutos, otorgamiento de escritura pública, aprobación de la Superintendencia de Compañías, publicación, inscripción en Registro Mercantil y obtención del RUC. Para compañías con estructuras complejas o actividades reguladas, el proceso puede extenderse.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Cómo puedo proteger mi marca comercial?</h3>
              <p className="text-secondary-700">
                La protección de marcas en Ecuador se realiza a través del Servicio Nacional de Derechos Intelectuales (SENADI). El proceso incluye una búsqueda fonética para verificar disponibilidad, presentación de solicitud de registro, publicación en la Gaceta de Propiedad Intelectual y examen de registrabilidad. Una vez aprobada, la marca queda protegida por 10 años renovables. Recomendamos iniciar este trámite antes de lanzar su producto o servicio al mercado.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerechoMercantil;
