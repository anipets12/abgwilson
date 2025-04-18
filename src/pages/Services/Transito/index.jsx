import React from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaBalanceScale, FaFileAlt, FaIdCard, FaHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DerechoTransito = () => {
  // Animaciones para elementos
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Lista de servicios de derecho de tránsito
  const servicios = [
    {
      id: 1,
      titulo: 'Impugnación de Multas',
      descripcion: 'Asesoría para impugnar multas de tránsito mediante procedimientos administrativos y judiciales.',
      icon: <FaFileAlt className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $200',
      caracteristicas: [
        'Revisión de la infracción',
        'Recopilación de pruebas',
        'Presentación de recursos',
        'Representación en audiencias',
        'Seguimiento hasta resolución'
      ]
    },
    {
      id: 2,
      titulo: 'Defensa en Contravenciones',
      descripcion: 'Representación legal en casos de contravenciones y delitos menores de tránsito.',
      icon: <FaBalanceScale className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $250',
      caracteristicas: [
        'Análisis del caso y pruebas',
        'Elaboración de estrategia defensiva',
        'Defensa en audiencias',
        'Negociación de reducción de sanciones',
        'Recursos de apelación si necesario'
      ]
    },
    {
      id: 3,
      titulo: 'Accidentes de Tránsito',
      descripcion: 'Representación integral para víctimas y conductores involucrados en accidentes viales.',
      icon: <FaCar className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $400',
      caracteristicas: [
        'Peritajes y recolección de evidencia',
        'Determinación de responsabilidades',
        'Representación judicial completa',
        'Negociación con aseguradoras',
        'Reclamación de indemnizaciones'
      ]
    },
    {
      id: 4,
      titulo: 'Recuperación de Licencias',
      descripcion: 'Asistencia legal para recuperar licencias suspendidas o retenidas por infracciones.',
      icon: <FaIdCard className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $300',
      caracteristicas: [
        'Revisión del expediente administrativo',
        'Preparación de documentación',
        'Recursos de revisión y apelación',
        'Trámites ante la ANT',
        'Seguimiento hasta recuperación'
      ]
    },
    {
      id: 5,
      titulo: 'Reclamaciones a Aseguradoras',
      descripcion: 'Gestión de reclamos contra compañías de seguros por daños en accidentes de tránsito.',
      icon: <FaHandshake className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $350',
      caracteristicas: [
        'Evaluación de daños',
        'Preparación de documentación',
        'Presentación de reclamaciones',
        'Negociación con aseguradoras',
        'Acciones legales si es necesario'
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
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Derecho de Tránsito</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Asesoría legal especializada en infracciones, accidentes y todo lo relacionado con el tránsito vehicular. Defendemos sus derechos en la vía.
          </p>
        </motion.div>

        {/* Introducción */}
        <motion.div 
          {...fadeIn}
          className="bg-white rounded-lg shadow-md p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Experiencia en Derecho de Tránsito</h2>
              <p className="text-secondary-700 mb-4">
                En el bufete del Abg. Wilson Alexander Ipiales Guerron nos especializamos en todos los aspectos del Derecho de Tránsito ecuatoriano, desde infracciones menores hasta accidentes graves con consecuencias penales.
              </p>
              <p className="text-secondary-700 mb-4">
                Nuestro equipo de abogados cuenta con amplia experiencia en la Ley Orgánica de Transporte Terrestre, Tránsito y Seguridad Vial, así como en el manejo de procedimientos ante la Agencia Nacional de Tránsito y los juzgados especializados.
              </p>
              <p className="text-secondary-700">
                Entendemos que las situaciones de tránsito pueden ser estresantes y tener graves consecuencias en su vida diaria, licencia de conducir y situación económica. Por eso, ofrecemos un servicio ágil, efectivo y comprensivo para resolver su problema de la mejor manera posible.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/services/traffic-law.jpg" 
                alt="Servicio de Derecho de Tránsito"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=Derecho+de+Tránsito";
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Servicios */}
        <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">Nuestros Servicios de Derecho de Tránsito</h2>
        
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
                    to="/contacto?servicio=transito"
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
          <h2 className="text-3xl font-bold mb-4">¿Tiene problemas de tránsito?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contáctenos hoy mismo para una evaluación gratuita de su caso. No enfrente multas, accidentes o problemas con su licencia sin asesoría profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contacto"
              className="px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Agendar Consulta
            </Link>
            <a 
              href="https://wa.me/593988835269?text=Hola,%20necesito%20asesoría%20en%20derecho%20de%20tránsito"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary-700 transition-colors duration-300"
            >
              WhatsApp Directo
            </a>
          </div>
        </motion.div>

        {/* Consulta de Infracciones */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-8">Consulta de Infracciones</h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-secondary-700 mb-8 text-center">
              Utilice nuestro sistema de consulta para verificar multas e infracciones de tránsito. Simplemente ingrese su número de cédula o placa vehicular.
            </p>

            <Link
              to="/consultas/transito"
              className="w-full py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
            >
              <FaCar className="mr-2" /> Ir a Consulta de Infracciones
            </Link>
          </div>
        </div>

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
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Qué debo hacer si recibo una multa de tránsito?</h3>
              <p className="text-secondary-700">
                Si recibe una multa, verifique primero los datos de la citación (fecha, lugar, tipo de infracción). Tiene tres días hábiles para impugnarla presentando un escrito de impugnación ante el juez competente. Es recomendable buscar asesoría legal inmediatamente, especialmente si considera que la multa es injusta o existen irregularidades en el procedimiento. Recuerde que no impugnar a tiempo implica aceptar la sanción y la obligación de pago.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Puedo recuperar puntos perdidos en mi licencia?</h3>
              <p className="text-secondary-700">
                Sí, existen mecanismos para recuperar puntos perdidos en su licencia. La legislación ecuatoriana permite recuperar el 50% de los puntos perdidos mediante cursos de conducción en escuelas autorizadas por la ANT, siempre que no haya perdido la totalidad de puntos. Para recuperar todos los puntos después de una suspensión, deberá cumplir el tiempo de suspensión, pagar las multas pendientes y aprobar un curso especial. Nuestro despacho puede asesorarle sobre el procedimiento específico según su caso.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Qué consecuencias tiene un accidente de tránsito?</h3>
              <p className="text-secondary-700">
                Las consecuencias de un accidente de tránsito varían según su gravedad y responsabilidad. Pueden incluir: multas económicas, reducción de puntos en la licencia, suspensión temporal o definitiva del permiso de conducir, obligación de indemnizar daños materiales y personales, y en casos graves con lesiones o fallecimientos, responsabilidad penal con posibles penas privativas de libertad. Es crucial contar con asesoría legal inmediata tras un accidente para proteger sus derechos y minimizar las consecuencias legales.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerechoTransito;
