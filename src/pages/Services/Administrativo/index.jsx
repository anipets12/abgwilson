import React from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaUniversity, FaFileAlt, FaExchangeAlt, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DerechoAdministrativo = () => {
  // Animaciones para elementos
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Lista de servicios de derecho administrativo
  const servicios = [
    {
      id: 1,
      titulo: 'Trámites Administrativos',
      descripcion: 'Gestión de todo tipo de procesos ante la administración pública ecuatoriana.',
      icon: <FaFileAlt className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $400',
      caracteristicas: [
        'Peticiones administrativas',
        'Recursos de reposición',
        'Apelaciones y recursos extraordinarios',
        'Permisos y licencias',
        'Expedientes administrativos'
      ]
    },
    {
      id: 2,
      titulo: 'Contratación Pública',
      descripcion: 'Asesoría integral en licitaciones y contrataciones con el Estado ecuatoriano.',
      icon: <FaExchangeAlt className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $600',
      caracteristicas: [
        'Preparación de ofertas',
        'Impugnaciones',
        'Ejecución de contratos públicos',
        'Liquidaciones',
        'Resolución de controversias'
      ]
    },
    {
      id: 3,
      titulo: 'Derecho Regulatorio',
      descripcion: 'Asesoramiento sobre normativas sectoriales y regulación económica.',
      icon: <FaShieldAlt className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $500',
      caracteristicas: [
        'Compliance regulatorio',
        'Autorizaciones sectoriales',
        'Supervisión y fiscalización',
        'Sanciones administrativas',
        'Normativa de mercados regulados'
      ]
    },
    {
      id: 4,
      titulo: 'Litigio Administrativo',
      descripcion: 'Representación en procedimientos contenciosos contra la administración pública.',
      icon: <FaGavel className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $750',
      caracteristicas: [
        'Demandas contra el Estado',
        'Acciones de nulidad',
        'Impugnación de actos administrativos',
        'Responsabilidad patrimonial',
        'Ejecución de sentencias'
      ]
    },
    {
      id: 5,
      titulo: 'Asesoría a Entidades Públicas',
      descripcion: 'Consultoría legal especializada para organismos gubernamentales y municipios.',
      icon: <FaUniversity className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $800',
      caracteristicas: [
        'Dictámenes jurídicos',
        'Elaboración de ordenanzas',
        'Procedimientos administrativos',
        'Convenios interinstitucionales',
        'Asesoría en reformas normativas'
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
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Derecho Administrativo</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Asesoría especializada en relaciones con la administración pública. Defendemos sus derechos frente al Estado con experiencia y eficacia.
          </p>
        </motion.div>

        {/* Introducción */}
        <motion.div 
          {...fadeIn}
          className="bg-white rounded-lg shadow-md p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Expertos en Derecho Administrativo</h2>
              <p className="text-secondary-700 mb-4">
                En el bufete del Abg. Wilson Alexander Ipiales Guerron contamos con un equipo especializado en Derecho Administrativo, con amplia experiencia en la relación entre ciudadanos, empresas y administraciones públicas.
              </p>
              <p className="text-secondary-700 mb-4">
                Nuestra práctica abarca desde la representación en trámites administrativos rutinarios hasta complejos litigios contencioso-administrativos, brindando siempre un enfoque práctico y orientado a resultados.
              </p>
              <p className="text-secondary-700">
                Entendemos los procedimientos y plazos específicos del derecho administrativo ecuatoriano, lo que nos permite ofrecer un servicio eficiente que maximiza las probabilidades de éxito de nuestros clientes frente a la administración.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/services/administrative-law.jpg" 
                alt="Servicio de Derecho Administrativo"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=Derecho+Administrativo";
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Servicios */}
        <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">Nuestros Servicios de Derecho Administrativo</h2>
        
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
                    to="/contacto?servicio=administrativo"
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
          <h2 className="text-3xl font-bold mb-4">¿Enfrenta problemas con la administración pública?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contáctenos hoy mismo para una evaluación de su caso. Nuestros especialistas en derecho administrativo le ofrecerán la mejor estrategia para defender sus intereses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contacto"
              className="px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Agendar Consulta
            </Link>
            <a 
              href="https://wa.me/593988835269?text=Hola,%20necesito%20asesoría%20en%20derecho%20administrativo"
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
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Qué plazo tengo para impugnar un acto administrativo?</h3>
              <p className="text-secondary-700">
                En Ecuador, los plazos para impugnar actos administrativos varían según el tipo de recurso. Para recursos en vía administrativa, generalmente son 10 días para recurso de reposición y 15 días para recurso de apelación, contados desde la notificación del acto. Para la vía judicial (contencioso-administrativa), el plazo general es de 90 días para actos expresos y hasta 5 años para actos presuntos. Es crucial actuar rápidamente, ya que estos plazos son de caducidad.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Cómo funciona el sistema de contratación pública en Ecuador?</h3>
              <p className="text-secondary-700">
                La contratación pública en Ecuador se rige por la Ley Orgánica del Sistema Nacional de Contratación Pública y se gestiona a través del portal de compras públicas SERCOP. Los procedimientos varían según el monto y objeto (licitación, cotización, menor cuantía, subasta inversa, etc.). Para participar, los proveedores deben registrarse en el RUP (Registro Único de Proveedores) y presentar ofertas técnicas y económicas que cumplan con los pliegos. El proceso incluye fases de preguntas, respuestas, evaluación, adjudicación y firma de contrato.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Qué es el silencio administrativo y cómo me afecta?</h3>
              <p className="text-secondary-700">
                El silencio administrativo en Ecuador es una figura jurídica que opera cuando la administración no responde a una petición en el plazo establecido. Según el artículo 207 del COA (Código Orgánico Administrativo), transcurrido el plazo de 30 días sin respuesta, se entiende como una respuesta positiva (silencio administrativo positivo). Esto significa que su solicitud se considera aceptada. Sin embargo, este efecto no aplica en casos tributarios, aduaneros o expropiaciones, donde opera el silencio negativo. Para hacer valer el silencio positivo, es recomendable solicitar una certificación o acudir a vía judicial si es necesario.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerechoAdministrativo;
