import React from 'react';
import { motion } from 'framer-motion';
import { FaChild, FaHome, FaBalanceScale, FaHeartbeat, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DerechoFamiliar = () => {
  // Animaciones para elementos
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Lista de servicios de derecho familiar
  const servicios = [
    {
      id: 1,
      titulo: 'Divorcio y Separación',
      descripcion: 'Asesoría completa en procesos de divorcio, tanto contenciosos como por mutuo acuerdo.',
      icon: <FaHeartbeat className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $500',
      caracteristicas: [
        'Divorcio por mutuo consentimiento',
        'Divorcio contencioso',
        'Separación de bienes',
        'Acuerdos de división patrimonial',
        'Liquidación de sociedad conyugal'
      ]
    },
    {
      id: 2,
      titulo: 'Pensiones Alimenticias',
      descripcion: 'Representación en juicios de alimentos y modificaciones de pensiones.',
      icon: <FaChild className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $350',
      caracteristicas: [
        'Fijación de pensiones alimenticias',
        'Aumento o disminución de pensiones',
        'Incidentes de incumplimiento',
        'Acumulación de pensiones',
        'Acuerdos extrajudiciales'
      ]
    },
    {
      id: 3,
      titulo: 'Patria Potestad y Custodia',
      descripcion: 'Asesoramiento en conflictos de tenencia, régimen de visitas y patria potestad.',
      icon: <FaUsers className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $450',
      caracteristicas: [
        'Tenencia de hijos menores',
        'Régimen de visitas',
        'Suspensión o privación de patria potestad',
        'Modificación de regímenes establecidos',
        'Custodia compartida'
      ]
    },
    {
      id: 4,
      titulo: 'Reconocimiento de Paternidad',
      descripcion: 'Tramitación de procesos de investigación y declaración de paternidad o maternidad.',
      icon: <FaBalanceScale className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $400',
      caracteristicas: [
        'Impugnación de paternidad',
        'Reconocimiento voluntario',
        'Investigación de paternidad',
        'Gestión de pruebas de ADN',
        'Trámites de inscripción'
      ]
    },
    {
      id: 5,
      titulo: 'Bienes Familiares',
      descripcion: 'Asesoría en protección de patrimonio familiar, herencias y trámites sucesorios.',
      icon: <FaHome className="text-4xl text-primary-600 mb-4" />,
      precio: 'Desde $500',
      caracteristicas: [
        'Constitución de patrimonio familiar',
        'Juicios de partición',
        'Protección de bienes heredados',
        'Planificación patrimonial familiar',
        'Testamentos y sucesiones'
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
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Derecho Familiar</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Protegemos los derechos e intereses de su familia con empatía, profesionalismo y eficacia legal.
            Soluciones integrales para todos los asuntos familiares.
          </p>
        </motion.div>

        {/* Introducción */}
        <motion.div 
          {...fadeIn}
          className="bg-white rounded-lg shadow-md p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Expertos en Derecho de Familia</h2>
              <p className="text-secondary-700 mb-4">
                El Derecho de Familia requiere no solo conocimiento jurídico especializado, sino también sensibilidad y empatía para manejar situaciones emocionalmente complejas. En el bufete del Abg. Wilson Alexander Ipiales Guerron contamos con un equipo de profesionales dedicados exclusivamente a esta área.
              </p>
              <p className="text-secondary-700 mb-4">
                Nuestro enfoque se basa en resolver los conflictos familiares de manera efectiva, priorizando siempre el bienestar de los menores involucrados y buscando preservar las relaciones familiares en la medida de lo posible.
              </p>
              <p className="text-secondary-700">
                Entendemos que cada familia es única, por lo que diseñamos estrategias personalizadas que se adaptan a las necesidades específicas de cada caso, ofreciendo siempre un trato cercano y accesible.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/services/family-law.jpg" 
                alt="Servicio de Derecho Familiar"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=Derecho+Familiar";
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Servicios */}
        <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">Nuestros Servicios de Derecho Familiar</h2>
        
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
                    to="/contacto?servicio=familiar"
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
          <h2 className="text-3xl font-bold mb-4">¿Enfrenta un problema familiar legal?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contamos con amplia experiencia en derecho familiar ecuatoriano. Permítanos ayudarle a encontrar la mejor solución para su situación. Primera consulta sin costo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contacto"
              className="px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Agendar Consulta
            </Link>
            <a 
              href="https://wa.me/593988835269?text=Hola,%20necesito%20asesoría%20en%20derecho%20familiar"
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
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-8">Preguntas Frecuentes - Derecho Familiar</h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Cómo se calcula la pensión alimenticia en Ecuador?</h3>
              <p className="text-secondary-700">
                En Ecuador, las pensiones alimenticias se calculan según tablas establecidas por el Ministerio de Inclusión Económica y Social (MIES), considerando los ingresos del alimentante, el número de hijos y sus edades. Se establecen niveles mínimos basados en el Salario Básico Unificado, pero el juez puede modificar estos montos según las necesidades del menor y la capacidad económica del alimentante.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿Cuánto tiempo toma un proceso de divorcio?</h3>
              <p className="text-secondary-700">
                El tiempo varía según el tipo de divorcio. Por mutuo acuerdo, el proceso puede resolverse en aproximadamente 2-3 meses desde la presentación de la demanda. Si es contencioso (por causales), puede extenderse de 6 meses a 1 año, dependiendo de la complejidad, las pruebas requeridas y la carga de trabajo del juzgado. Mediante acuerdos notariales, algunos divorcios voluntarios pueden resolverse en pocas semanas.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-secondary-900 mb-2">¿En qué consiste el régimen de visitas?</h3>
              <p className="text-secondary-700">
                El régimen de visitas establece los días y horarios en que el padre/madre que no tiene la custodia puede compartir tiempo con sus hijos. Puede establecerse por acuerdo entre las partes o fijarse judicialmente. Generalmente incluye fines de semana alternos, parte de las vacaciones escolares y fechas especiales como cumpleaños y feriados. El régimen debe respetar siempre el interés superior del niño y puede modificarse si las circunstancias cambian significativamente.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerechoFamiliar;
