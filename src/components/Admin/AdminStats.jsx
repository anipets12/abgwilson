import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente de estadísticas para el panel administrativo
 * Muestra métricas clave del sistema de forma visual y atractiva
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.stats - Estadísticas a mostrar
 */
const AdminStats = ({ stats }) => {
  // Configuración de animación para los elementos
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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
    >
      {/* Estadísticas de usuarios */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Usuarios</h2>
          <div className="p-2 bg-blue-100 rounded-full">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.users.total}</div>
            <div className="text-xs text-gray-500">Totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.users.new}</div>
            <div className="text-xs text-gray-500">Nuevos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.users.premium}</div>
            <div className="text-xs text-gray-500">Premium</div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 text-sm hover:underline flex items-center"
            onClick={() => window.location.href = '/admin/users'}
          >
            Ver detalles
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Estadísticas de contenido */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Contenido</h2>
          <div className="p-2 bg-green-100 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.content.articles}</div>
            <div className="text-xs text-gray-500">Artículos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.content.ebooks}</div>
            <div className="text-xs text-gray-500">eBooks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.content.resources}</div>
            <div className="text-xs text-gray-500">Recursos</div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-green-600 text-sm hover:underline flex items-center"
            onClick={() => window.location.href = '/admin/content'}
          >
            Ver detalles
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Estadísticas de ingresos */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Ingresos</h2>
          <div className="p-2 bg-yellow-100 rounded-full">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">${stats.revenue.today.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Hoy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">${stats.revenue.week.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Semana</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">${stats.revenue.month.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Mes</div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-yellow-600 text-sm hover:underline flex items-center"
            onClick={() => window.location.href = '/admin/payments'}
          >
            Ver detalles
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Estadísticas de consultas */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Consultas</h2>
          <div className="p-2 bg-purple-100 rounded-full">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.consultations.pending}</div>
            <div className="text-xs text-gray-500">Pendientes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.consultations.completed}</div>
            <div className="text-xs text-gray-500">Completadas</div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-purple-600 text-sm hover:underline flex items-center"
            onClick={() => window.location.href = '/admin/services/consultations'}
          >
            Ver detalles
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Estadísticas de referidos */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Referidos</h2>
          <div className="p-2 bg-red-100 rounded-full">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.referrals.total}</div>
            <div className="text-xs text-gray-500">Totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.referrals.converted}</div>
            <div className="text-xs text-gray-500">Convertidos</div>
          </div>
        </div>
        <div className="text-center mt-2">
          <div className="text-xs text-gray-500">Tasa de conversión</div>
          <div className="text-lg font-bold text-red-600">
            {stats.referrals.total > 0 ? ((stats.referrals.converted / stats.referrals.total) * 100).toFixed(1) : 0}%
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-red-600 text-sm hover:underline flex items-center"
            onClick={() => window.location.href = '/admin/marketing/affiliates'}
          >
            Ver detalles
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminStats;
