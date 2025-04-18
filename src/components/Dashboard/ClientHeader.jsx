import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import auth from '../../utils/auth';

/**
 * Encabezado del dashboard de cliente
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario cliente
 * @param {Function} props.toggleSidebar - Función para abrir/cerrar el sidebar
 */
const ClientHeader = ({ user, toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  // Mock de notificaciones para demostración
  const notifications = [
    {
      id: 1,
      type: 'case',
      message: 'Su caso #12345 ha sido actualizado',
      time: '10 minutos',
      read: false
    },
    {
      id: 2,
      type: 'document',
      message: 'Nuevo documento disponible: Contrato de servicios',
      time: '2 horas',
      read: false
    },
    {
      id: 3,
      type: 'payment',
      message: 'Pago de suscripción procesado correctamente',
      time: '1 día',
      read: true
    }
  ];

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, notificationsRef]);

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await auth.logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Botón para toggle del sidebar */}
            <div className="flex-shrink-0 flex items-center">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={toggleSidebar}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Abrir menú</span>
              </button>
            </div>
            
            {/* Título */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <h1 className="text-lg font-medium text-gray-900">Mi Portal Cliente</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Notificaciones */}
            <div className="relative ml-3" ref={notificationsRef}>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
                <span className="sr-only">Ver notificaciones</span>
              </button>
              
              {/* Panel de notificaciones */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="p-4 bg-primary-600 text-white rounded-t-md">
                      <h3 className="text-lg font-medium">Notificaciones</h3>
                    </div>
                    <div className="py-1 max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                          {notifications.map((notification) => (
                            <li key={notification.id} className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  {notification.type === 'case' && (
                                    <div className="bg-blue-100 p-2 rounded-full">
                                      <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                      </svg>
                                    </div>
                                  )}
                                  {notification.type === 'document' && (
                                    <div className="bg-purple-100 p-2 rounded-full">
                                      <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                  )}
                                  {notification.type === 'payment' && (
                                    <div className="bg-green-100 p-2 rounded-full">
                                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm text-gray-800">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">Hace {notification.time}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-4 py-6 text-center text-gray-500">
                          No hay notificaciones
                        </div>
                      )}
                    </div>
                    <div className="border-t border-gray-100 p-2">
                      <Link
                        to="/notifications"
                        className="block w-full text-center px-4 py-2 text-sm text-primary-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        Ver todas las notificaciones
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Perfil de usuario */}
            <div className="relative ml-3" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 p-1"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Abrir menú de usuario</span>
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </button>
              
              {/* Menú desplegable de usuario */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      <div className="border-b border-gray-100 px-4 py-2">
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuario'}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'usuario@ejemplo.com'}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Mi perfil
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Configuración
                      </Link>
                      {user?.subscription !== 'premium' && (
                        <Link
                          to="/upgrade"
                          className="block px-4 py-2 text-sm text-primary-600 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Actualizar a Premium
                        </Link>
                      )}
                      <button
                        type="button"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
