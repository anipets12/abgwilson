import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaCalendarAlt, FaArrowRight, FaUserTie, FaShieldAlt, FaFileContract, FaClock, FaBalanceScale, FaGavel, FaCheck } from 'react-icons/fa';

const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  const mainControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  // Fecha para la oferta de tiempo limitado (15 días desde hoy)
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 15);

  // Actualizar la cuenta regresiva
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = offerEndDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Servicios destacados
  const featuredServices = [
    {
      id: 1,
      title: 'Derecho Penal',
      description: 'Defensa especializada en casos penales con alta tasa de éxito',
      icon: <FaShieldAlt className="text-white text-2xl" />,
      color: 'from-red-600 to-red-700',
      link: '/servicios/penal'
    },
    {
      id: 2,
      title: 'Derecho Civil',
      description: 'Resolución efectiva de conflictos civiles y patrimoniales',
      icon: <FaFileContract className="text-white text-2xl" />,
      color: 'from-blue-600 to-blue-700',
      link: '/servicios/civil'
    },
    {
      id: 3,
      title: 'Derecho de Tránsito',
      description: 'Asistencia legal en accidentes e infracciones de tránsito',
      icon: <FaBalanceScale className="text-white text-2xl" />,
      color: 'from-green-600 to-green-700',
      link: '/servicios/transito'
    },
    {
      id: 4,
      title: 'Consulta Rápida',
      description: 'Respuestas inmediatas a sus dudas legales en 24 horas',
      icon: <FaClock className="text-white text-2xl" />,
      color: 'from-yellow-600 to-yellow-700',
      link: '/consultas'
    }
  ];
  
  // Ventajas de trabajar con nosotros
  const advantages = [
    { text: 'Profesionales especializados en cada área del derecho' },
    { text: 'Atención personalizada y seguimiento constante de su caso' },
    { text: 'Primera consulta gratis y evaluación detallada' },
    { text: 'Honorarios transparentes y planes flexibles de pago' }
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden min-h-screen flex items-center" ref={heroRef}>
      {/* Patrones de fondo */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)"/>
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 left-[15%] w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 right-[20%] w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Columna de texto principal */}
          <motion.div
            className="lg:col-span-6 z-10"
            initial="hidden"
            animate={mainControls}
            variants={containerVariants}
          >
            <motion.span 
              className="inline-block py-1 px-3 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-200 text-sm font-medium mb-6"
              variants={textVariants}
            >
              Abogado en Ibarra, Ecuador
            </motion.span>
            
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight"
              variants={textVariants}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Abg. Wilson Alexander</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Ipiales Guerron</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-blue-100 mb-8 leading-relaxed"
              variants={textVariants}
            >
              Con más de <span className="font-bold text-yellow-400">5 años de experiencia</span> y más de <span className="font-bold text-yellow-400">50 casos ganados</span> exitosamente, ofrecemos soluciones legales efectivas para proteger sus derechos e intereses.
            </motion.p>
            
            {/* Ventajas */}
            <motion.ul 
              className="mb-8 space-y-2"
              variants={containerVariants}
            >
              {advantages.map((advantage, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-blue-100"
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate={mainControls}
                  transition={{ delay: 0.1 * index }}
                >
                  <span className="flex-shrink-0 h-6 w-6 bg-blue-700 rounded-full flex items-center justify-center mr-3">
                    <FaCheck className="text-yellow-400 text-xs" />
                  </span>
                  {advantage.text}
                </motion.li>
              ))}
            </motion.ul>
            
            {/* Botones de acción */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/contacto"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg inline-flex items-center justify-center"
                >
                  Consulta Gratuita
                  <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <a 
                  href={`https://wa.me/593988835269?text=Hola%20Abg.%20Wilson,%20necesito%20asesoría%20legal.`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition-all shadow-lg"
                >
                  <FaWhatsapp className="mr-2 text-xl" />
                  Chatear Ahora
                </a>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/calendario" 
                  className="w-full bg-white hover:bg-blue-50 text-blue-700 font-bold py-4 px-6 rounded-lg flex items-center justify-center transition-all shadow-lg"
                >
                  <FaCalendarAlt className="mr-2 text-xl" />
                  Agendar Cita
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Testimonios rápidos */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-4">
                  <img src="/testimonial1.jpg" alt="Cliente" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="/testimonial2.jpg" alt="Cliente" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="/testimonial3.jpg" alt="Cliente" className="w-10 h-10 rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="text-sm text-blue-100">
                    <span className="font-bold">4.9/5</span> basado en <span className="font-bold">200+ reseñas</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Columna de tarjetas de servicios */}
          <div className="lg:col-span-6 lg:w-full">
            <motion.div 
              className="grid gap-4 md:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              animate={mainControls}
            >
              {featuredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all group shadow-xl"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Link to={service.link} className="flex flex-col h-full">
                    {/* Header con gradiente */}
                    <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                    
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color} mr-3 shadow-lg`}>
                          {service.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white">{service.title}</h3>
                      </div>
                      <p className="text-sm text-blue-100 mb-3">{service.description}</p>
                      <div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center">
                        <span className="text-sm text-blue-200 font-medium">Ver detalles</span>
                        <div className="bg-white/20 rounded-full p-2 group-hover:bg-blue-600 transition-all transform group-hover:translate-x-1">
                          <FaArrowRight className="text-white text-xs" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Oferta de tiempo limitado */}
            <motion.div 
              className="mt-6 bg-gradient-to-r from-blue-800/80 to-indigo-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-blue-500/30 shadow-2xl relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              {/* Forma decorativa */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full -mr-16 -mt-16 z-0"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full -ml-12 -mb-12 z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">OFERTA ESPECIAL</span>
                  <span className="ml-2 text-white font-medium">¡Tiempo Limitado!</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">
                  Primera Consulta Legal <span className="text-yellow-400">GRATUITA</span>
                </h3>
                <p className="text-sm text-blue-100 mb-4">
                  Reciba asesoramiento legal personalizado sin costo. Incluye evaluación de su caso, opciones legales y plan de acción. Oferta válida solo por:
                </p>
                
                {/* Contador regresivo */}
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-900/80 text-white rounded-lg px-4 py-2 font-mono text-2xl font-bold border border-blue-700 min-w-[60px] text-center">
                      {countdown.days}
                    </div>
                    <span className="text-xs text-blue-200 mt-1 font-medium">Días</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-900/80 text-white rounded-lg px-4 py-2 font-mono text-2xl font-bold border border-blue-700 min-w-[60px] text-center">
                      {countdown.hours}
                    </div>
                    <span className="text-xs text-blue-200 mt-1 font-medium">Horas</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-900/80 text-white rounded-lg px-4 py-2 font-mono text-2xl font-bold border border-blue-700 min-w-[60px] text-center">
                      {countdown.minutes}
                    </div>
                    <span className="text-xs text-blue-200 mt-1 font-medium">Min</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-900/80 text-white rounded-lg px-4 py-2 font-mono text-2xl font-bold border border-blue-700 min-w-[60px] text-center">
                      {countdown.seconds}
                    </div>
                    <span className="text-xs text-blue-200 mt-1 font-medium">Seg</span>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/contacto" 
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 font-bold py-4 px-6 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg"
                  >
                    Reservar Mi Consulta Gratuita
                    <FaArrowRight className="ml-2" />
                  </Link>
                </motion.div>
                
                <p className="text-center text-xs text-blue-200 mt-3">
                  Sin compromisos. Cancelación gratuita. Respuesta garantizada en 24h.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Barra inferior con estadísticas */}
      <div className="absolute bottom-0 left-0 right-0 bg-blue-950/80 backdrop-blur-md border-t border-blue-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center text-center md:text-left">
            <div className="flex items-center space-x-6 mx-auto md:mx-0">
              <div className="px-3">
                <div className="text-2xl font-bold text-yellow-400">5+</div>
                <div className="text-xs text-blue-200">Años de Experiencia</div>
              </div>
              <div className="px-3 border-l border-blue-700">
                <div className="text-2xl font-bold text-yellow-400">50+</div>
                <div className="text-xs text-blue-200">Casos Ganados</div>
              </div>
              <div className="px-3 border-l border-blue-700">
                <div className="text-2xl font-bold text-yellow-400">200+</div>
                <div className="text-xs text-blue-200">Clientes Satisfechos</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-end space-x-4 mt-4 md:mt-0 w-full md:w-auto">
              <FaUserTie className="text-blue-300 text-2xl" />
              <div className="text-white text-sm">
                <span className="block text-xs text-blue-300">Ubicación</span>
                Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
