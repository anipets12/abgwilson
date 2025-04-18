import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SuscripcionExitosa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, price, benefits } = location.state || { 
    plan: 'mensual', 
    price: 29.99,
    benefits: [
      'Acceso ilimitado a consultas con abogados especializados',
      'Respuestas prioritarias en menos de 24 horas',
      'Acceso a biblioteca exclusiva de documentos legales',
      'Asesoramiento exclusivo sobre estrategias legales avanzadas',
      'Acceso a seminarios y webinars exclusivos'
    ]
  };

  useEffect(() => {
    // Si el usuario llega directamente a esta página sin pasar por el proceso de suscripción,
    // redirigir a la página de suscripción después de 5 segundos
    if (!location.state) {
      const timer = setTimeout(() => {
        navigate('/suscripcion/premium');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-primary-600 p-6 sm:p-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-white">
                <svg className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold text-white">
                ¡Suscripción Exitosa!
              </h1>
              <p className="mt-2 text-xl text-primary-100">
                Bienvenido al Plan Premium de Abogado Wilson
              </p>
            </motion.div>
          </div>
          
          <div className="p-6 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                Detalles de su suscripción
              </h2>
              <p className="text-secondary-600">
                Plan {plan.charAt(0).toUpperCase() + plan.slice(1)} - ${price}{' '}
                {plan === 'mensual' ? '/ mes' : plan === 'trimestral' ? '/ trimestre' : '/ año'}
              </p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">
                    Su pago ha sido procesado correctamente y su suscripción ya está activa.
                    <br />
                    Le hemos enviado un correo con los detalles de su compra.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Ahora usted tiene acceso a:
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <svg className="flex-shrink-0 h-6 w-6 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-3 text-secondary-600">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-secondary-50 p-5 rounded-lg border border-secondary-100"
              >
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Acceso Inmediato
                </h3>
                <p className="text-secondary-600 mb-4">
                  Puede comenzar a disfrutar de todos los recursos exclusivos de inmediato.
                </p>
                <Link 
                  to="/exclusivo" 
                  className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                >
                  Ver contenido exclusivo
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-secondary-50 p-5 rounded-lg border border-secondary-100"
              >
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Plantillas y Documentos
                </h3>
                <p className="text-secondary-600 mb-4">
                  Acceda a nuestra biblioteca completa de documentos legales profesionales.
                </p>
                <Link 
                  to="/recursos-legales" 
                  className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                >
                  Explorar recursos legales
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
            
            <div className="text-center border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                ¿Necesita ayuda?
              </h3>
              <p className="text-secondary-600 mb-6">
                Nuestro equipo de atención al cliente está disponible para ayudarle con cualquier pregunta.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.a
                  href="/contacto"
                  className="px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contactar soporte
                </motion.a>
                <motion.a
                  href="/dashboard"
                  className="px-6 py-3 rounded-lg bg-white border border-secondary-300 hover:bg-secondary-50 text-secondary-700 font-medium transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ir a mi dashboard
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SuscripcionExitosa;
