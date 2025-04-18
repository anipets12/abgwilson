import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaHandshake, FaFileContract, FaHome, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DerechoCivil = () => {
  // Animaciones para elementos
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Lista de servicios de derecho civil
  const servicios = [
    {
      id: 1,
      titulo: 'Juicios de Cobro de Deudas',
      descripcion: 'Recuperación efectiva de valores pendientes mediante procesos judiciales ejecutivos y ordinarios.',
      icon: <FaMoneyBillWave className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $450',
      caracteristicas: [
        'Análisis previo de documentación',
        'Estrategia de cobro personalizada',
        'Representación en audiencias',
        'Ejecución de sentencias',
        'Seguimiento hasta recuperación total'
      ]
    },
    {
      id: 2,
      titulo: 'Contratos Civiles y Mercantiles',
      descripcion: 'Elaboración, revisión y negociación de todo tipo de contratos con garantías jurídicas completas.',
      icon: <FaFileContract className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $300',
      caracteristicas: [
        'Redacción personalizada según necesidades',
        'Revisión de cláusulas y condiciones',
        'Asesoría en negociación',
        'Protección de intereses',
        'Registro en entidades correspondientes'
      ]
    },
    {
      id: 3,
      titulo: 'Casos de Prescripción Adquisitiva',
      descripcion: 'Tramitación completa para obtener la propiedad mediante prescripción por posesión prolongada.',
      icon: <FaHome className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $700',
      caracteristicas: [
        'Estudio de títulos y antecedentes',
        'Recolección de pruebas de posesión',
        'Representación en juicio ordinario',
        'Inscripción de sentencia',
        'Gestión catastral completa'
      ]
    },
    {
      id: 4,
      titulo: 'Reclamaciones por Daños y Perjuicios',
      descripcion: 'Representación especializada en procesos de indemnización por daños materiales y morales.',
      icon: <FaBalanceScale className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $500',
      caracteristicas: [
        'Evaluación del daño y cuantificación',
        'Recopilación de evidencia',
        'Preparación de demanda especializada',
        'Asistencia en peritajes',
        'Representación en todas las instancias'
      ]
    },
    {
      id: 5,
      titulo: 'Mediación y Resolución Alternativa',
      descripcion: 'Soluciones extrajudiciales eficientes para conflictos civiles mediante acuerdos beneficiosos.',
      icon: <FaHandshake className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $350',
      caracteristicas: [
        'Preparación para mediación',
        'Representación en centros autorizados',
        'Negociación de acuerdos ventajosos',
        'Redacción de actas transaccionales',
        'Legalización de acuerdos extrajudiciales'
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
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Derecho Civil</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Soluciones jurídicas completas para asuntos civiles, patrimoniales y contractuales. 
            Protegemos sus intereses con experiencia y profesionalismo.
          </p>
        </motion.div>

        {/* Introducción */}
        <motion.div 
          {...fadeIn}
          className="bg-white rounded-lg shadow-md p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Experiencia en Derecho Civil</h2>
              <p className="text-secondary-700 mb-4">
                El área de Derecho Civil del bufete Abg. Wilson Alexander Ipiales Guerron se especializa en representar a personas y empresas en todas las facetas de asuntos civiles en Ecuador.
              </p>
              <p className="text-secondary-700 mb-4">
                Nuestros abogados expertos cuentan con amplia experiencia en litigios civiles, elaboración de contratos, casos de propiedad, reclamaciones patrimoniales y soluciones alternativas de conflictos.
              </p>
              <p className="text-secondary-700">
                Nos distinguimos por ofrecer un servicio personalizado, eficiente y orientado a resultados, con tarifas transparentes y comunicación constante durante todo el proceso.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/services/civil-law.jpg" 
                alt="Servicio de Derecho Civil"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=Derecho+Civil";
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Servicios */}
        <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">Nuestros Servicios de Derecho Civil</h2>
        
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
                    to="/contacto?servicio=civil"
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
          <h2 className="text-3xl font-bold mb-4">¿Necesita asesoría en Derecho Civil?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contáctenos hoy mismo para una consulta inicial gratuita. Evaluaremos su caso y le ofreceremos soluciones efectivas para sus asuntos civiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contacto"
              className="px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Agendar Consulta
            </Link>
            <a 
              href="https://wa.me/593988835269?text=Hola,%20necesito%20asesoría%20en%20derecho%20civil"
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
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Qué abarca el Derecho Civil en Ecuador?</h3>
              <p className="text-secondary-700">
                El Derecho Civil en Ecuador regula las relaciones privadas entre personas naturales y jurídicas. Abarca materias como contratos, obligaciones, bienes, derecho de propiedad, sucesiones, responsabilidad civil, entre otros aspectos fundamentales para las relaciones jurídicas entre particulares.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Cuánto tiempo demora un juicio civil ordinario?</h3>
              <p className="text-secondary-700">
                Los tiempos procesales varían según la complejidad del caso, la carga de trabajo de los juzgados y las actuaciones de las partes. En promedio, un juicio civil ordinario puede demorar entre 1 y 3 años. Sin embargo, con una estrategia adecuada, algunos casos pueden resolverse antes mediante acuerdos extrajudiciales o mecanismos alternativos de solución de conflictos.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Qué documentos necesito para iniciar un juicio de cobro?</h3>
              <p className="text-secondary-700">
                Para iniciar un juicio de cobro necesitará principalmente: el documento que respalde la obligación (pagaré, letra de cambio, factura, contrato, etc.), documentos de identidad del acreedor, datos de ubicación del deudor y cualquier comunicación previa relacionada con el cobro. Durante nuestra consulta inicial, evaluaremos su documentación específica y le indicaremos si requiere elementos adicionales.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerechoCivil;
