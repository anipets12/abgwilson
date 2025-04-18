import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Página 404 Not Found
 * Se muestra cuando el usuario accede a una ruta que no existe
 */
const NotFound = () => {
  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="block text-9xl font-extrabold text-primary-600">404</span>
        </motion.div>
        
        <motion.h1 
          className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl"
          variants={itemVariants}
        >
          Página no encontrada
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-base text-gray-600"
          variants={itemVariants}
        >
          Lo sentimos, la página que está buscando no existe o ha sido movida.
        </motion.p>
        
        <motion.div 
          className="mt-10 flex justify-center space-x-4"
          variants={itemVariants}
        >
          <Link
            to="/"
            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Ir al inicio
          </Link>
          
          <Link
            to="/contacto"
            className="inline-flex items-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Contactarnos
          </Link>
        </motion.div>
        
        <motion.div 
          className="mt-16"
          variants={itemVariants}
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Enlaces útiles
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link to="/servicios" className="text-primary-600 hover:text-primary-800">
              Nuestros servicios
            </Link>
            <Link to="/blog" className="text-primary-600 hover:text-primary-800">
              Blog legal
            </Link>
            <Link to="/foro" className="text-primary-600 hover:text-primary-800">
              Foro de consultas
            </Link>
            <Link to="/ebooks" className="text-primary-600 hover:text-primary-800">
              E-Books legales
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
