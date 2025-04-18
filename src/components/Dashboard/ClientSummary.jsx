import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Componente de resumen para el dashboard de cliente
 * Muestra estadísticas generales y acciones rápidas
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario
 */
const ClientSummary = ({ user }) => {
  // Mock de datos para demostración
  const summaryData = {
    cases: {
      active: 2,
      closed: 3,
      pending: 1
    },
    consultations: {
      scheduled: 1,
      completed: 5,
      tokens: 3
    },
    documents: {
      total: 15,
      pendingSigning: 2,
      recentlyAdded: 3
    },
    payments: {
      current: user?.subscription === 'premium',
      nextBilling: '2025-05-18',
      amount: 49.99
    }
  };

  // Definir animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="space-y-6">
      {/* Saludo al usuario */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          ¡Bienvenido, {user?.name || 'Cliente'}!
        </h2>
        <p className="mt-2 text-gray-600">
          Este es su portal personal donde puede gestionar sus casos, documentos y servicios legales.
        </p>
        
        {/* Sección de suscripción */}
        {user?.subscription !== 'premium' ? (
          <div className="mt-4 bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-lg border border-primary-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-md font-medium text-primary-800">¡Actualice a Premium!</h3>
                <p className="mt-1 text-sm text-primary-700">
                  Obtenga acceso ilimitado a consultas, documentos exclusivos y prioridad de atención.
                </p>
                <Link 
                  to="/upgrade"
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Ver planes premium
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-md font-medium text-green-800">¡Gracias por ser usuario Premium!</h3>
                <p className="mt-1 text-sm text-green-700">
                  Su próximo pago está programado para el {new Date(summaryData.payments.nextBilling).toLocaleDateString('es-ES')}.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tarjetas de resumen */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Casos */}
        <motion.div 
          className="bg-white rounded-lg shadow p-6" 
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Mis Casos</h3>
            <div className="p-2 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
              </svg>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summaryData.cases.active}</div>
              <div className="text-xs text-gray-500">Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summaryData.cases.pending}</div>
              <div className="text-xs text-gray-500">Pendientes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summaryData.cases.closed}</div>
              <div className="text-xs text-gray-500">Cerrados</div>
            </div>
          </div>
          
          <Link 
            to="/dashboard/cases"
            className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-800"
          >
            Ver todos mis casos
          </Link>
        </motion.div>
        
        {/* Consultas */}
        <motion.div 
          className="bg-white rounded-lg shadow p-6" 
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Consultas</h3>
            <div className="p-2 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{summaryData.consultations.scheduled}</div>
              <div className="text-xs text-gray-500">Programadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{summaryData.consultations.completed}</div>
              <div className="text-xs text-gray-500">Completadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{summaryData.consultations.tokens}</div>
              <div className="text-xs text-gray-500">Tokens</div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md"
            >
              Nueva consulta
            </motion.button>
            <Link 
              to="/dashboard/consultations"
              className="px-3 py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 text-sm rounded-md text-center"
            >
              Ver historial
            </Link>
          </div>
        </motion.div>
        
        {/* Documentos */}
        <motion.div 
          className="bg-white rounded-lg shadow p-6" 
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Documentos</h3>
            <div className="p-2 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total de documentos</span>
              <span className="text-sm font-semibold">{summaryData.documents.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Requieren firma</span>
              <span className="text-sm font-semibold text-orange-600">{summaryData.documents.pendingSigning}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Añadidos recientemente</span>
              <span className="text-sm font-semibold text-green-600">{summaryData.documents.recentlyAdded}</span>
            </div>
          </div>
          
          <Link 
            to="/dashboard/documents"
            className="mt-4 block text-center text-sm text-green-600 hover:text-green-800"
          >
            Administrar documentos
          </Link>
        </motion.div>
        
        {/* Suscripción y pagos */}
        <motion.div 
          className="bg-white rounded-lg shadow p-6" 
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Suscripción</h3>
            <div className="p-2 bg-yellow-100 rounded-full">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-3">
            <span className={`px-3 py-1 text-sm rounded-full ${
              user?.subscription === 'premium' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {user?.subscription === 'premium' ? 'Plan Premium' : 'Plan Gratuito'}
            </span>
          </div>
          
          {user?.subscription === 'premium' && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Próximo pago</span>
                <span className="text-sm font-semibold">{new Date(summaryData.payments.nextBilling).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Monto</span>
                <span className="text-sm font-semibold">${summaryData.payments.amount}</span>
              </div>
            </div>
          )}
          
          {user?.subscription === 'premium' ? (
            <Link 
              to="/dashboard/subscription"
              className="mt-2 block text-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-md"
            >
              Administrar suscripción
            </Link>
          ) : (
            <Link 
              to="/upgrade"
              className="mt-2 block text-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-md"
            >
              Actualizar a Premium
            </Link>
          )}
        </motion.div>
      </motion.div>
      
      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones rápidas</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-4 bg-blue-50 rounded-lg text-center cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-800">Agendar cita</h4>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-4 bg-purple-50 rounded-lg text-center cursor-pointer hover:bg-purple-100 transition-colors"
          >
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-800">Consulta rápida</h4>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-4 bg-green-50 rounded-lg text-center cursor-pointer hover:bg-green-100 transition-colors"
          >
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-800">Subir documento</h4>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-4 bg-yellow-50 rounded-lg text-center cursor-pointer hover:bg-yellow-100 transition-colors"
          >
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-800">Contacto directo</h4>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClientSummary;
