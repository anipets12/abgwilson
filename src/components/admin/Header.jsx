import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../utils/auth';

/**
 * Componente de encabezado para el panel de administración
 * Muestra título de la página, controles de barra lateral y menú de usuario
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la página actual
 * @param {boolean} props.sidebarOpen - Estado de apertura de la barra lateral
 * @param {Function} props.setSidebarOpen - Función para cambiar el estado de la barra lateral
 */
const Header = ({ title, sidebarOpen, setSidebarOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const user = auth.getUser();

  // Datos de notificaciones simulados
  const notifications = [
    {
      id: 1,
      title: 'Nueva consulta legal',
      message: 'Juan Pérez ha solicitado una consulta sobre derecho laboral',
      time: '10 min',
      read: false
    },
    {
      id: 2,
      title: 'Pago recibido',
      message: 'Se ha recibido un pago de $150 por el e-book "Guía de Derecho Familiar"',
      time: '30 min',
      read: false
    },
    {
      id: 3,
      title: 'Nuevo afiliado',
      message: 'María González se ha unido al programa de afiliados',
      time: '2 horas',
      read: true
    }
  ];

  // Número de notificaciones no leídas
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Manejar cierre de sesión
  const handleLogout = () => {
    auth.logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Botón de menú móvil y título */}
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Abrir menú</span>
              {sidebarOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <div className="ml-4 md:ml-0">
              <h1 className="text-xl font-medium text-gray-900">{title}</h1>
            </div>
          </div>

          {/* Controles del lado derecho */}
          <div className="flex items-center">
            {/* Botón Ver Sitio */}
            <Link
              to="/"
              className="ml-3 hidden sm:inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Sitio
              <svg className="ml-1 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            {/* Botón de notificaciones */}
            <div className="ml-3 relative">
              <button
                type="button"
                className="relative p-1 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="sr-only">Ver notificaciones</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
                )}
              </button>

              {/* Panel de notificaciones */}
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="notifications-menu">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-900">Notificaciones</h3>
                        {unreadCount > 0 ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                            {unreadCount} nuevas
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            No hay nuevas
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-2 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                            role="menuitem"
                          >
                            <div className="flex items-start">
                              <div className="ml-3 w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {notification.message}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                  Hace {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="ml-3 flex-shrink-0">
                                  <div className="h-2 w-2 rounded-full bg-primary-600"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                          No hay notificaciones
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-100 py-1">
                      <Link
                        to="/admin/notificaciones"
                        className="block px-4 py-2 text-center text-sm text-primary-600 hover:text-primary-800"
                        role="menuitem"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        Ver todas las notificaciones
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Menú de usuario */}
            <div className="ml-3 relative">
              <button
                type="button"
                className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <span className="sr-only">Abrir menú de usuario</span>
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  {user?.name ? user.name.charAt(0) : 'A'}
                </div>
              </button>

              {/* Panel de menú de usuario */}
              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user?.name || 'Administrador'}</p>
                      <p className="text-xs text-gray-500">Administrador</p>
                    </div>
                    <Link
                      to="/admin/perfil"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mi perfil
                    </Link>
                    <Link
                      to="/admin/configuracion"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Configuración
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
