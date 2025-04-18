import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../utils/auth';
import LoadingSpinner from './LoadingSpinner';

/**
 * Componente para proteger rutas que requieren autenticación
 * Solo permite acceso a usuarios autenticados
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si el usuario está autenticado
 * @param {boolean} props.premiumRequired - Si la ruta requiere suscripción premium
 */
const ProtectedRoute = ({ children, premiumRequired = false }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        
        // Verificar si el usuario está autenticado
        const authenticated = await auth.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        if (authenticated && premiumRequired) {
          // Obtener datos del usuario
          const userData = auth.getUser();
          
          // Verificar si tiene suscripción premium
          setIsPremium(userData?.subscription === 'premium');
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, [premiumRequired]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si requiere premium pero no lo tiene, redirigir a la página de actualización
  if (premiumRequired && !isPremium) {
    return <Navigate to="/suscripcion/premium" state={{ from: location, message: 'Se requiere suscripción premium para acceder a este contenido.' }} replace />;
  }

  // Si está autenticado (y es premium si se requiere), mostrar la ruta protegida
  return children;
};

export default ProtectedRoute;
