import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import auth from '../../utils/auth';
import { supabaseAuth, exclusiveContentService } from '../../utils/supabase';

/**
 * Componente para proteger rutas que requieren autenticación
 * Si el usuario no está autenticado, redirige a la página de login
 * Opcionalmente puede requerir acceso premium para ciertas rutas
 */
const RequireAuth = ({ children, premiumRequired = false }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsChecking(true);

        // Verificar autenticación
        if (auth.isAuthenticated()) {
          setIsAuthenticated(true);
          
          // Si la ruta requiere acceso premium, verificarlo
          if (premiumRequired) {
            try {
              const hasPremium = await exclusiveContentService.checkPremiumAccess();
              setHasPremiumAccess(hasPremium);
            } catch (error) {
              console.error('Error al verificar acceso premium:', error);
              setHasPremiumAccess(false);
              setError('No se pudo verificar el acceso premium. Por favor intente nuevamente.');
            }
          } else {
            // Si no requiere premium, establecer como true para que no bloquee
            setHasPremiumAccess(true);
          }
        } else {
          setIsAuthenticated(false);
          setHasPremiumAccess(false);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsAuthenticated(false);
        setHasPremiumAccess(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [premiumRequired]);

  if (isChecking) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center p-8"
        >
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600 font-medium">Verificando acceso...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirigir a login si no está autenticado
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location.pathname,
          message: "Por favor inicie sesión para acceder a esta página"
        }} 
      />
    );
  }

  if (premiumRequired && !hasPremiumAccess) {
    // Mostrar página para actualizar a premium
    return (
      <motion.div 
        className="min-h-screen bg-gray-50 py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-800 mb-4">
                Contenido Exclusivo Premium
              </h1>
              <p className="text-secondary-600 text-lg">
                Esta sección está disponible únicamente para usuarios con plan Premium.
              </p>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Para acceder a este contenido exclusivo, necesita actualizar a nuestro 
                    <span className="font-medium"> Plan Premium</span>.
                  </p>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg p-6 shadow-inner border border-gray-200">
              <h2 className="text-xl font-bold text-secondary-800 mb-4">
                Beneficios del Plan Premium
              </h2>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-secondary-600">Acceso a todas las plantillas legales profesionales</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-secondary-600">Consultas prioritarias con abogados especializados</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-secondary-600">Análisis de jurisprudencia actualizada</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-secondary-600">Documentos y guías avanzadas para casos complejos</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-secondary-600">Webinars exclusivos con expertos en derecho</span>
                </li>
              </ul>
              
              <div className="text-center">
                <motion.a
                  href="/suscripcion/premium"
                  className="inline-block px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-bold transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Actualizar a Premium
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Si pasa todas las verificaciones, renderizar los hijos
  return children;
};

export default RequireAuth;
