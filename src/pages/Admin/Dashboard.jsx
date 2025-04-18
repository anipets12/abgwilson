import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import auth from '../../utils/auth';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminStats from '../../components/Admin/AdminStats';
import AdminNotifications from '../../components/Admin/AdminNotifications';

/**
 * Dashboard administrativo principal
 * Panel de control completo inspirado en WordPress para gestionar todos los aspectos del sistema
 */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: { total: 0, new: 0, premium: 0 },
    content: { articles: 0, ebooks: 0, resources: 0 },
    revenue: { today: 0, week: 0, month: 0 },
    consultations: { pending: 0, completed: 0 },
    referrals: { total: 0, converted: 0 }
  });
  const [notifications, setNotifications] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Verificar autenticación y permisos de administrador
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const currentUser = auth.getUser();
        
        if (!currentUser) {
          navigate('/login', { state: { from: location.pathname, message: 'Debe iniciar sesión para acceder al panel administrativo' } });
          return;
        }
        
        if (currentUser.role !== 'admin' && currentUser.role !== 'superadmin') {
          navigate('/dashboard', { state: { message: 'No tiene permisos para acceder al panel administrativo' } });
          return;
        }
        
        setUser(currentUser);
        
        // Cargar estadísticas del sistema
        await loadDashboardStats();
        
        // Cargar notificaciones
        await loadNotifications();
        
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, location.pathname]);

  // Cargar estadísticas del dashboard
  const loadDashboardStats = async () => {
    try {
      // En una implementación real, aquí se conectaría con la API
      // Simulamos una carga de datos para desarrollo
      setTimeout(() => {
        setStats({
          users: { total: 238, new: 14, premium: 43 },
          content: { articles: 56, ebooks: 12, resources: 78 },
          revenue: { today: 349.99, week: 2189.50, month: 8745.75 },
          consultations: { pending: 8, completed: 142 },
          referrals: { total: 87, converted: 29 }
        });
      }, 800);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  // Cargar notificaciones
  const loadNotifications = async () => {
    try {
      // En una implementación real, aquí se conectaría con la API
      // Simulamos notificaciones para desarrollo
      setTimeout(() => {
        setNotifications([
          { id: 1, type: 'user', message: 'Nuevo usuario registrado: María García', time: '2 minutos', read: false },
          { id: 2, type: 'payment', message: 'Nueva suscripción premium adquirida', time: '15 minutos', read: false },
          { id: 3, type: 'consultation', message: 'Nueva solicitud de consulta pendiente', time: '1 hora', read: false },
          { id: 4, type: 'comment', message: 'Nuevo comentario en artículo "Reforma al COIP"', time: '3 horas', read: true },
          { id: 5, type: 'system', message: 'Actualización del sistema completada', time: '1 día', read: true }
        ]);
      }, 1000);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  };

  // Si está cargando, mostrar indicador
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} user={user} />
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader 
          user={user} 
          notifications={notifications} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
          {location.pathname === '/admin' ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Bienvenido, {user?.name || 'Administrador'}. Aquí tiene un resumen de la actividad reciente.
                </p>
              </div>
              
              {/* Estadísticas */}
              <AdminStats stats={stats} />
              
              {/* Notificaciones recientes */}
              <AdminNotifications notifications={notifications.slice(0, 5)} />
              
              {/* Enlaces rápidos */}
              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                  >
                    <Link to="/admin/content/new" className="text-blue-700 font-medium hover:underline flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Crear nuevo artículo
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-green-50 p-4 rounded-lg border border-green-200"
                  >
                    <Link to="/admin/ebooks/upload" className="text-green-700 font-medium hover:underline flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Subir nuevo eBook
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-purple-50 p-4 rounded-lg border border-purple-200"
                  >
                    <Link to="/admin/consultations/pending" className="text-purple-700 font-medium hover:underline flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Ver consultas pendientes ({stats.consultations.pending})
                    </Link>
                  </motion.div>
                </div>
              </div>
            </>
          ) : (
            <Outlet /> // Renderiza las subrutas del admin
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
