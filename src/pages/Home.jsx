import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import auth from '../utils/auth';

/**
 * Página de inicio
 * Presentación principal del bufete de abogados con llamadas a la acción
 */
const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Verificar estado de autenticación
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authenticated = await auth.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          const userData = auth.getUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Animaciones
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Áreas de práctica
  const practiceAreas = [
    {
      title: 'Derecho Civil',
      icon: 'balance-scale',
      description: 'Contratos, responsabilidad civil, propiedad, sucesiones y todo tipo de litigios civiles.',
      path: '/servicios/civil'
    },
    {
      title: 'Derecho Familiar',
      icon: 'home',
      description: 'Divorcios, custodia, pensiones alimenticias, adopciones y violencia doméstica.',
      path: '/servicios/familiar'
    },
    {
      title: 'Derecho Mercantil',
      icon: 'briefcase',
      description: 'Constitución de empresas, contratos comerciales, propiedad intelectual y litigios mercantiles.',
      path: '/servicios/mercantil'
    },
    {
      title: 'Derecho Administrativo',
      icon: 'landmark',
      description: 'Trámites gubernamentales, licencias, permisos y recursos administrativos.',
      path: '/servicios/administrativo'
    }
  ];

  // Testimonios
  const testimonials = [
    {
      name: 'María G.',
      position: 'Empresaria',
      quote: 'El asesoramiento legal del abogado Wilson fue fundamental para resolver un complejo litigio comercial. Su profesionalismo y conocimientos destacan en todo momento.',
      image: '/images/testimonials/maria.jpg'
    },
    {
      name: 'Carlos P.',
      position: 'Comerciante',
      quote: 'Gracias a su asesoría, pude resolver mi caso de manera rápida y favorable. Recomiendo ampliamente sus servicios por su atención personalizada y resultados.',
      image: '/images/testimonials/carlos.jpg'
    },
    {
      name: 'Elena R.',
      position: 'Docente',
      quote: 'Mi proceso de divorcio fue manejado con gran sensibilidad y profesionalismo. Su apoyo y claridad en cada etapa hicieron que un momento difícil fuera más llevadero.',
      image: '/images/testimonials/elena.jpg'
    }
  ];

  // Renderizar icono basado en nombre
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'balance-scale':
        return (
          <svg className="h-12 w-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        );
      case 'home':
        return (
          <svg className="h-12 w-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'briefcase':
        return (
          <svg className="h-12 w-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'landmark':
        return (
          <svg className="h-12 w-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      default:
        return (
          <svg className="h-12 w-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white">
      {/* Sección Hero */}
      <motion.div 
        className="relative bg-gradient-to-r from-primary-800 to-primary-900 text-white overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center md:text-left md:max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6">
                <span className="block">Wilson Alexander Ipiales Guerron</span>
                <span className="block text-primary-200">Abogado Especializado</span>
              </h1>
              <p className="mt-3 text-base text-primary-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl md:mx-0">
                Ofrecemos soluciones legales integrales con un enfoque personalizado para proteger sus intereses y derechos en todas las áreas del derecho.
              </p>
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
                <Link
                  to="/contacto"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-800 bg-white hover:bg-gray-100 md:text-lg"
                >
                  Consulta Gratuita
                </Link>
                <Link
                  to="/servicios"
                  className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-primary-700 md:text-lg"
                >
                  Nuestros Servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2">
          <img
            className="h-full w-full object-cover"
            src="/images/hero-lawyer.jpg"
            alt="Abogado Wilson"
          />
          <div className="absolute inset-0 bg-primary-900 opacity-30"></div>
        </div>
      </motion.div>

      {/* Sección de áreas de práctica */}
      <motion.div 
        className="py-16 md:py-24 bg-gray-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Áreas de Práctica
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Ofrecemos servicios legales especializados en diversas áreas del derecho para atender cualquier necesidad legal que pueda tener.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-center mb-4">
                  {renderIcon(area.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {area.description}
                </p>
                <div className="text-center">
                  <Link
                    to={area.path}
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Más información →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sección de por qué elegirnos */}
      <motion.div 
        className="py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Por qué elegir nuestros servicios legales?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Con más de 15 años de experiencia, nuestro equipo legal está comprometido con brindar asesoramiento personalizado y efectivo para todos nuestros clientes.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Experiencia y Profesionalismo</h3>
                    <p className="mt-2 text-gray-600">
                      Nuestro equipo cuenta con amplia experiencia en litigios y asesoramiento legal en todas las áreas del derecho.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Enfoque en Resultados</h3>
                    <p className="mt-2 text-gray-600">
                      Nos centramos en conseguir los mejores resultados para nuestros clientes en el menor tiempo posible.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Comunicación Clara</h3>
                    <p className="mt-2 text-gray-600">
                      Mantenemos a nuestros clientes informados y explicamos los procesos legales en términos comprensibles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <img 
                  className="rounded-lg shadow-xl object-cover h-full"
                  src="/images/office.jpg"
                  alt="Oficina de Abogado Wilson"
                />
                <div className="absolute -bottom-8 -right-8 bg-primary-600 text-white p-6 rounded-lg shadow-lg hidden md:block">
                  <p className="text-lg font-bold">+500</p>
                  <p className="text-sm">Casos resueltos con éxito</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sección de testimonios */}
      <motion.div 
        className="py-16 md:py-24 bg-gray-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              La satisfacción de nuestros clientes es nuestro mejor testimonio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                variants={cardVariants}
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image || '/images/avatar-placeholder.jpg'} 
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <svg className="h-6 w-6 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sección de llamada a la acción */}
      <motion.div 
        className="bg-primary-700 py-12 md:py-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              ¿Necesita ayuda legal?
            </h2>
            <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
              Agende una consulta gratuita hoy mismo y permítanos ayudarle con su caso.
            </p>
            <div className="mt-8">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-100 md:text-lg"
              >
                Contactar Ahora
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sección de blog reciente o recursos */}
      <motion.div 
        className="py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Recursos Legales
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Manténgase informado con nuestros últimos artículos y recursos legales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img 
                src="/images/blog/derecho-familia.jpg" 
                alt="Derecho de familia"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nuevas leyes de familia en Ecuador: Lo que debe saber
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Conozca las recientes actualizaciones legislativas que afectan a los procedimientos de divorcio, custodia y manutención infantil.
                </p>
                <Link
                  to="/blog/nuevas-leyes-familia-ecuador"
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  Leer más →
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img 
                src="/images/blog/propiedad-intelectual.jpg" 
                alt="Propiedad intelectual"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Protegiendo su negocio: Guía de propiedad intelectual
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Descubra cómo proteger sus marcas, patentes y derechos de autor para salvaguardar los activos más valiosos de su empresa.
                </p>
                <Link
                  to="/blog/guia-propiedad-intelectual"
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  Leer más →
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img 
                src="/images/blog/contratos.jpg" 
                alt="Contratos legales"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Claves para redactar contratos seguros y efectivos
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Aprenda los elementos esenciales que debe incluir en sus contratos para evitar problemas legales futuros y proteger sus intereses.
                </p>
                <Link
                  to="/blog/redaccion-contratos-seguros"
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  Leer más →
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 md:text-lg"
            >
              Ver todos los artículos
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
