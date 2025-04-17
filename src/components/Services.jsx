import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGavel, FaBalanceScale, FaCarCrash, FaShip, FaBuilding, FaHandshake, FaFileContract, FaUserTie, FaMoneyBillWave, FaArrowRight, FaCheck, FaStar } from 'react-icons/fa';

// Paquetes de suscripción
const packages = [
  {
    name: 'Normal',
    price: 29.99,
    description: 'Ideal para consultas básicas y asesoría legal inicial',
    features: [
      'Consultas Básicas del Consejo de la Judicatura',
      'Consultas de servicios del SRI',
      'Sesiones básicas de asesoría legal (2 por mes)',
      'Acceso al Blog Legal con artículos actualizados',
      'Notificaciones de actualizaciones legales'
    ],
    color: 'bg-gradient-to-br from-white to-blue-50',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    borderColor: 'border-blue-200',
    popular: false
  },
  {
    name: 'Intermedio',
    price: 49.99,
    description: 'Perfecto para necesidades legales más específicas',
    features: [
      'Consultas de causas penales y civiles',
      'Consultas de multas de tránsito',
      'Sesiones avanzadas de asesoría legal (4 por mes)',
      'Acceso a cursos y eBooks legales premium',
      'Descuentos en servicios adicionales',
      'Acceso al Blog Legal con contenido exclusivo'
    ],
    color: 'bg-gradient-to-br from-blue-50 to-blue-100',
    buttonColor: 'bg-blue-700 hover:bg-blue-800',
    borderColor: 'border-blue-300',
    popular: true
  },
  {
    name: 'Premium',
    price: 99.99,
    description: 'Servicio legal completo y personalizado',
    features: [
      'Acceso ilimitado a todas las consultas disponibles',
      'Sesiones premium de asesoría legal (8 por mes)',
      'Acceso completo a biblioteca de cursos y eBooks',
      'NFTs y servicios Blockchain exclusivos',
      'Redacción ilimitada de certificados y documentos',
      'Prioridad en atención al cliente 24/7',
      'Acceso VIP al Blog Legal'
    ],
    color: 'bg-gradient-to-br from-blue-100 to-blue-200',
    buttonColor: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
    borderColor: 'border-blue-400',
    popular: false
  }
];

// Servicios de patrocinio legal
const legalServices = [
  {
    id: 'penal',
    title: 'Patrocinio en Causas Penales',
    description: 'Defensa integral en procesos penales, audiencias y recursos',
    price: 'Desde $500',
    icon: <FaGavel className="text-red-600 text-4xl mb-4" />,
    features: [
      'Defensa en delitos contra la propiedad',
      'Representación en delitos de tránsito',
      'Defensa en delitos contra la integridad personal',
      'Recursos de apelación y casación',
      'Medidas alternativas a la prisión preventiva'
    ],
    bgColor: 'bg-gradient-to-br from-red-50 to-white'
  },
  {
    id: 'civil',
    title: 'Patrocinio en Causas Civiles',
    description: 'Representación en litigios civiles, contratos y reclamaciones',
    price: 'Desde $500',
    icon: <FaBalanceScale className="text-blue-600 text-4xl mb-4" />,
    features: [
      'Juicios de cobro de deudas',
      'Litigios por incumplimiento de contratos',
      'Procesos de prescripción adquisitiva',
      'Reclamaciones por daños y perjuicios',
      'Cobro de pensiones alimenticias'
    ],
    bgColor: 'bg-gradient-to-br from-blue-50 to-white'
  },
  {
    id: 'constitucional',
    title: 'Acciones Constitucionales',
    description: 'Protección de derechos fundamentales mediante garantías constitucionales',
    price: 'Desde $600',
    icon: <FaFileContract className="text-yellow-600 text-4xl mb-4" />,
    features: [
      'Acciones de protección',
      'Habeas corpus',
      'Habeas data',
      'Acciones de acceso a la información',
      'Medidas cautelares constitucionales'
    ],
    bgColor: 'bg-gradient-to-br from-yellow-50 to-white'
  },
  {
    id: 'transito',
    title: 'Derecho de Tránsito',
    description: 'Asesoría y defensa en infracciones y accidentes de tránsito',
    price: 'Desde $400',
    icon: <FaCarCrash className="text-green-600 text-4xl mb-4" />,
    features: [
      'Impugnación de multas',
      'Defensa en contravenciones',
      'Representación en accidentes de tránsito',
      'Recuperación de licencias',
      'Reclamaciones a aseguradoras'
    ],
    bgColor: 'bg-gradient-to-br from-green-50 to-white'
  },
  {
    id: 'comercial',
    title: 'Derecho Comercial',
    description: 'Asesoría legal para empresas, contratos y operaciones mercantiles',
    price: 'Desde $550',
    icon: <FaBuilding className="text-indigo-600 text-4xl mb-4" />,
    features: [
      'Constitución de compañías',
      'Contratos mercantiles',
      'Protección de propiedad intelectual',
      'Litigios comerciales',
      'Asesoría societaria permanente'
    ],
    bgColor: 'bg-gradient-to-br from-indigo-50 to-white'
  },
  {
    id: 'aduanas',
    title: 'Derecho Aduanero',
    description: 'Representación en trámites y litigios aduaneros',
    price: 'Desde $450',
    icon: <FaShip className="text-cyan-600 text-4xl mb-4" />,
    features: [
      'Liberación de mercancías retenidas',
      'Recursos administrativos aduaneros',
      'Clasificación arancelaria',
      'Regímenes aduaneros especiales',
      'Litigios por infracciones aduaneras'
    ],
    bgColor: 'bg-gradient-to-br from-cyan-50 to-white'
  },
  {
    id: 'laboral',
    title: 'Derecho Laboral',
    description: 'Asesoría en relaciones laborales para empleadores y trabajadores',
    price: 'Desde $450',
    icon: <FaUserTie className="text-orange-600 text-4xl mb-4" />,
    features: [
      'Demandas por despido intempestivo',
      'Reclamación de beneficios sociales',
      'Visto bueno y desahucio',
      'Contratos laborales',
      'Conflictos colectivos'
    ],
    bgColor: 'bg-gradient-to-br from-orange-50 to-white'
  },
  {
    id: 'cobros',
    title: 'Cobro de Deudas',
    description: 'Gestión efectiva para recuperación de valores adeudados',
    price: 'Desde $350',
    icon: <FaMoneyBillWave className="text-emerald-600 text-4xl mb-4" />,
    features: [
      'Juicios ejecutivos',
      'Cobro de letras de cambio y pagarés',
      'Procedimientos monitorios',
      'Cobro de pensiones alimenticias',
      'Negociación de acuerdos de pago'
    ],
    bgColor: 'bg-gradient-to-br from-emerald-50 to-white'
  }
];

const Services = () => {
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  
  // Referencias para detección de elementos en viewport
  const servicesRef = useRef(null);
  const packagesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: false, amount: 0.2 });
  const packagesInView = useInView(packagesRef, { once: false, amount: 0.2 });
  
  // Variantes de animación
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
            Nuestros Servicios Legales
          </h1>
          <p className="text-xl text-blue-600 mb-6 max-w-3xl mx-auto">
            Soluciones jurídicas profesionales para todas sus necesidades legales
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Servicios de Patrocinio Legal */}
        <motion.div 
          className="mb-24"
          ref={servicesRef}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center">
              <FaGavel className="mr-3 text-blue-600" /> Servicios de Patrocinio Legal
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Representación legal profesional en todas las áreas del derecho. Nuestros servicios de patrocinio incluyen asesoría completa, representación en audiencias y seguimiento de su caso hasta su resolución.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {legalServices.map((service, index) => (
              <motion.div
                key={service.id}
                className={`${service.bgColor} rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl`}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredService(service.id)}
                onHoverEnd={() => setHoveredService(null)}
              >
                <div className="p-6">
                  <div className="flex justify-center">
                    <motion.div
                      animate={{
                        scale: hoveredService === service.id ? 1.1 : 1,
                        rotate: hoveredService === service.id ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-center">{service.description}</p>
                  <div className="text-xl font-bold text-blue-600 mb-4 text-center">
                    {service.price}
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start text-gray-700 text-sm"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: hoveredService === service.id ? 1.02 : 1
                        }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                      >
                        <FaCheck className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Link to={`/servicios/${service.id}`}>
                    <motion.button
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md flex items-center justify-center space-x-2 transition-all duration-300"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>Más Información</span>
                      <FaArrowRight className="ml-2" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Planes de Suscripción */}
        <motion.div
          ref={packagesRef}
          initial="hidden"
          animate={packagesInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center">
              <FaHandshake className="mr-3 text-blue-600" /> Planes de Suscripción
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Elija el plan que mejor se adapte a sus necesidades legales y obtenga acceso a nuestros servicios de consultoría y asesoría continua.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className={`${pkg.color} rounded-2xl p-8 shadow-lg ${pkg.popular ? 'border-2 border-blue-400 relative transform scale-105 z-10' : `border ${pkg.borderColor}`}`}
                variants={fadeInRight}
                whileHover={{ 
                  scale: pkg.popular ? 1.08 : 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredPackage(pkg.name)}
                onHoverEnd={() => setHoveredPackage(null)}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold shadow-md">
                    Más Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <motion.h3 
                    className="text-2xl font-bold text-blue-900 mb-2"
                    animate={{
                      scale: hoveredPackage === pkg.name ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {pkg.name}
                    {pkg.popular && <FaStar className="inline-block ml-2 text-yellow-500" />}
                  </motion.h3>
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    ${pkg.price}
                    <span className="text-base font-normal text-gray-600">/mes</span>
                  </div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: hoveredPackage === pkg.name ? 1.02 : 1
                      }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <FaCheck className="text-blue-600 text-xs" />
                      </div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-3 px-4 ${pkg.buttonColor} text-white rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/planes'}
                >
                  <span className="font-bold">Comenzar Ahora</span>
                  <FaArrowRight className="ml-2" />
                </motion.button>
                
                {pkg.popular && (
                  <p className="text-center text-sm text-blue-600 mt-4 font-medium">
                    30 días de garantía de devolución
                  </p>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={packagesInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <Link 
              to="/contacto"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              ¿Necesita un plan personalizado? Contáctenos
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
