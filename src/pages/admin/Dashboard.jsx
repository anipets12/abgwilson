import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';

/**
 * Dashboard principal para administradores
 * Muestra estadísticas, métricas y accesos rápidos
 */
const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [recentConsultations, setRecentConsultations] = useState([]);

  // Cargar datos del dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // En una implementación real, esto cargaría datos desde la API
        // Aquí simulamos datos para desarrollo
        
        // Esperar brevemente para simular carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Estadísticas simuladas
        setStats({
          users: 342,
          usersGrowth: 12.5,
          consultations: 87,
          consultationsGrowth: 23.4,
          payments: 68,
          paymentsGrowth: 8.2,
          revenue: 15250,
          revenueGrowth: 16.8
        });
        
        // Usuarios recientes simulados
        setRecentUsers([
          { id: 1, name: 'María Gómez', email: 'maria@example.com', date: '2024-04-28', status: 'activo' },
          { id: 2, name: 'Carlos Ruiz', email: 'carlos@example.com', date: '2024-04-27', status: 'activo' },
          { id: 3, name: 'Ana López', email: 'ana@example.com', date: '2024-04-25', status: 'pendiente' },
          { id: 4, name: 'Juan Torres', email: 'juan@example.com', date: '2024-04-23', status: 'activo' },
          { id: 5, name: 'Sofia Pérez', email: 'sofia@example.com', date: '2024-04-20', status: 'inactivo' }
        ]);
        
        // Pagos recientes simulados
        setRecentPayments([
          { id: 'P-12345', user: 'Carlos Ruiz', amount: 120, date: '2024-04-28', concept: 'E-Book: Guía de Derecho Familiar', status: 'completado' },
          { id: 'P-12344', user: 'María Gómez', amount: 150, date: '2024-04-27', concept: 'Consulta Legal', status: 'completado' },
          { id: 'P-12343', user: 'Juan Torres', amount: 89.99, date: '2024-04-26', concept: 'Suscripción Premium', status: 'completado' },
          { id: 'P-12342', user: 'Ana López', amount: 75, date: '2024-04-24', concept: 'E-Book: Derecho Laboral', status: 'pendiente' },
          { id: 'P-12341', user: 'Sofia Pérez', amount: 200, date: '2024-04-22', concept: 'Consulta Especializada', status: 'cancelado' }
        ]);
        
        // Consultas recientes simuladas
        setRecentConsultations([
          { id: 'C-5001', user: 'María Gómez', date: '2024-04-28', topic: 'Derecho Laboral', status: 'pendiente' },
          { id: 'C-5000', user: 'Juan Torres', date: '2024-04-27', topic: 'Divorcio', status: 'asignada' },
          { id: 'C-4999', user: 'Carlos Ruiz', date: '2024-04-25', topic: 'Contrato de Arrendamiento', status: 'completada' },
          { id: 'C-4998', user: 'Sofia Pérez', date: '2024-04-23', topic: 'Herencia', status: 'en proceso' }
        ]);
        
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 } 
    }
  };

  // Función auxiliar para formatear fechas
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Función auxiliar para formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Función para determinar el color de la insignia de estado
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'activo':
      case 'completado':
      case 'completada':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'asignada':
      case 'en proceso':
        return 'bg-blue-100 text-blue-800';
      case 'inactivo':
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Mostrar spinner durante la carga
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 truncate">Total Usuarios</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stats.users}</p>
                <p className={`ml-2 text-sm font-medium ${stats.usersGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.usersGrowth >= 0 ? '+' : ''}{stats.usersGrowth}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 truncate">Ingresos Totales</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.revenue)}</p>
                <p className={`ml-2 text-sm font-medium ${stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.revenueGrowth >= 0 ? '+' : ''}{stats.revenueGrowth}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 truncate">Consultas</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stats.consultations}</p>
                <p className={`ml-2 text-sm font-medium ${stats.consultationsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.consultationsGrowth >= 0 ? '+' : ''}{stats.consultationsGrowth}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 truncate">Pagos</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stats.payments}</p>
                <p className={`ml-2 text-sm font-medium ${stats.paymentsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.paymentsGrowth >= 0 ? '+' : ''}{stats.paymentsGrowth}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sección principal con tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Últimos usuarios registrados */}
        <motion.div variants={itemVariants} className="lg:col-span-1 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Usuarios Recientes</h3>
            <Link to="/admin/usuarios" className="text-sm font-medium text-primary-600 hover:text-primary-800">
              Ver todos
            </Link>
          </div>
          <div className="border-t border-gray-200 divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <div key={user.id} className="px-4 py-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Registro: {formatDate(user.date)}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
            <Link to="/admin/usuarios/nuevo" className="text-sm font-medium text-primary-600 hover:text-primary-800">
              Añadir nuevo usuario →
            </Link>
          </div>
        </motion.div>

        {/* Pagos recientes */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Pagos Recientes</h3>
            <Link to="/admin/pagos" className="text-sm font-medium text-primary-600 hover:text-primary-800">
              Ver todos
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Concepto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="truncate max-w-[150px]" title={payment.concept}>
                        {payment.concept}
                      </div>
                      <div className="text-xs text-gray-400">{formatDate(payment.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Consultas recientes y acciones rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Consultas recientes */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Consultas Recientes</h3>
            <Link to="/admin/consultas" className="text-sm font-medium text-primary-600 hover:text-primary-800">
              Ver todas
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tema
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentConsultations.map((consultation) => (
                  <tr key={consultation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {consultation.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {consultation.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {consultation.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(consultation.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(consultation.status)}`}>
                        {consultation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Acciones rápidas */}
        <motion.div variants={itemVariants} className="lg:col-span-1 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Acciones Rápidas</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <Link
                to="/admin/ebooks/nuevo"
                className="w-full flex items-center justify-between px-4 py-3 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 transition-colors"
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Crear nuevo E-Book</span>
                </div>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                to="/admin/contenido/blog/nuevo"
                className="w-full flex items-center justify-between px-4 py-3 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 transition-colors"
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Crear artículo de blog</span>
                </div>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                to="/admin/pagos/informe"
                className="w-full flex items-center justify-between px-4 py-3 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 transition-colors"
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Generar informe de pagos</span>
                </div>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                to="/admin/configuracion"
                className="w-full flex items-center justify-between px-4 py-3 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 transition-colors"
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Configuración del sitio</span>
                </div>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
