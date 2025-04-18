import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../utils/auth';
import LoadingSpinner from './LoadingSpinner';

/**
 * Componente para proteger rutas de administrador
 * Solo permite acceso a usuarios con rol de admin
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si el usuario es admin
 */
const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true);
        
        // Verificar si el usuario está autenticado
        const authenticated = await auth.isAuthenticated();
        
        if (!authenticated) {
          setIsAdmin(false);
          return;
        }
        
        // Obtener datos del usuario
        const userData = auth.getUser();
        
        // Verificar si tiene rol de administrador
        if (userData?.isAdmin || userData?.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          console.warn('Acceso denegado: Se requieren privilegios de administrador');
        }
      } catch (error) {
        console.error('Error al verificar permisos de administrador:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Si no es administrador, redirigir al login con mensaje
  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location, message: 'Acceso denegado. Se requieren privilegios de administrador.' }} replace />;
  }

  // Si es administrador, mostrar la ruta protegida
  return children;
};

export default AdminRoute;
