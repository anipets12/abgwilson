import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../../utils/auth';
import ClientSidebar from '../../components/Dashboard/ClientSidebar';
import ClientHeader from '../../components/Dashboard/ClientHeader';
import ClientSummary from '../../components/Dashboard/ClientSummary';
import ClientCases from '../../components/Dashboard/ClientCases';
import ClientSubscription from '../../components/Dashboard/ClientSubscription';
import ClientDocuments from '../../components/Dashboard/ClientDocuments';
import LoadingSpinner from '../../components/LoadingSpinner';

/**
 * Dashboard principal para clientes
 * Muestra un resumen de la actividad del cliente y acceso a sus funciones principales
 */
const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('summary');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Cargar información del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = auth.getUser();
        
        if (!userData) {
          throw new Error('Usuario no autenticado');
        }
        
        // En producción, aquí se haría una llamada para obtener datos actualizados
        // const updatedUserData = await getUserDetails(userData.id);
        // setUser(updatedUserData);
        
        setUser(userData);
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  // Si el usuario no está autenticado, redirigir a login
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Si el usuario es admin, redirigir al dashboard de administración
  if (!loading && user?.isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // Toggle del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Renderizar sección activa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'summary':
        return <ClientSummary user={user} />;
      case 'cases':
        return <ClientCases user={user} />;
      case 'subscription':
        return <ClientSubscription user={user} />;
      case 'documents':
        return <ClientDocuments user={user} />;
      default:
        return <ClientSummary user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <ClientSidebar 
        user={user} 
        isOpen={isSidebarOpen} 
        activeSection={activeSection}
        onChangeSection={setActiveSection}
      />
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientHeader 
          user={user} 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100">
          <div className="container mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
