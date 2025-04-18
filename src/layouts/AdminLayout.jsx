import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import auth from '../utils/auth';

/**
 * Layout para el panel de administración
 * Estructura general con barra lateral, encabezado y contenido principal
 */
const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Título de la página basado en la ruta actual
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/admin') return 'Panel Principal';
    if (path.includes('/admin/usuarios')) return 'Gestión de Usuarios';
    if (path.includes('/admin/consultas')) return 'Gestión de Consultas';
    if (path.includes('/admin/pagos')) return 'Gestión de Pagos';
    if (path.includes('/admin/contenido')) return 'Gestión de Contenido';
    if (path.includes('/admin/ebooks')) return 'Gestión de E-Books';
    if (path.includes('/admin/afiliados')) return 'Programa de Afiliados';
    if (path.includes('/admin/configuracion')) return 'Configuración del Sistema';
    
    return 'Panel de Administración';
  };
  
  // Verificar si el usuario es administrador
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true);
        
        const authenticated = await auth.isAuthenticated();
        
        if (authenticated) {
          const userData = auth.getUser();
          setIsAdmin(userData?.isAdmin || userData?.role === 'admin');
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error al verificar estado de administrador:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, []);

  // Mostrar spinner durante la carga
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  // Redirigir si no es administrador
  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location, message: 'Acceso denegado. Se requieren privilegios de administrador.' }} replace />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Overlay para móvil cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}
      
      {/* Sidebar para móvil */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>
      
      {/* Sidebar para escritorio */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Contenido principal */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header
          title={getPageTitle()}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
