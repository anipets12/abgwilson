import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import auth from '../../utils/auth';

/**
 * Cabecera del panel administrativo
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario administrador
 * @param {Array} props.notifications - Notificaciones del sistema
 * @param {Function} props.toggleSidebar - Función para abrir/cerrar el sidebar
 */
const AdminHeader = ({ user, notifications = [], toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, notificationsRef, searchRef]);

  // Realizar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    
    // Simulación de búsqueda para demostración
    setTimeout(() => {
      setSearchResults([
        { id: 1, type: 'usuario', title: 'María García', url: '/admin/users/1' },
        { id: 2, type: 'artículo', title: 'Reforma al Código Penal 2025', url: '/admin/content/articles/2' },
        { id: 3, type: 'consulta', title: 'Consulta #1089 - Caso de divorcio', url: '/admin/services/consultations/1089' },
        { id: 4, type: 'ebook', title: 'Guía Completa de Derecho Penal', url: '/admin/content/ebooks/4' }
      ]);
      setSearching(false);
    }, 500);
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await auth.logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

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
            
            {/* Título de la página */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <h1 className="text-lg font-medium text-gray-900">Panel Administrativo</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Búsqueda */}
            <div className="relative" ref={searchRef}>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="sr-only">Buscar</span>
              </button>
              
              {/* Campo de búsqueda */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 300 }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4"
                  >
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <input
                          type="text"
                          className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="Buscar usuarios, artículos, consultas..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        {searching && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </form>
                    
                    {/* Resultados de búsqueda */}
                    {searchResults.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Resultados</h3>
                        <ul className="divide-y divide-gray-200">
                          {searchResults.map((result) => (
                            <li key={result.id} className="py-2">
                              <Link 
                                to={result.url}
                                className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-gray-100"
                                onClick={() => setSearchOpen(false)}
                              >
                                <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full uppercase mr-2">
                                  {result.type}
                                </span>
                                <span className="text-gray-700">{result.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
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
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
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
                                  {notification.type === 'user' && (
                                    <div className="bg-blue-100 p-2 rounded-full">
                                      <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
                                  {notification.type === 'consultation' && (
                                    <div className="bg-purple-100 p-2 rounded-full">
                                      <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                      </svg>
                                    </div>
                                  )}
                                  {notification.type === 'comment' && (
                                    <div className="bg-yellow-100 p-2 rounded-full">
                                      <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                      </svg>
                                    </div>
                                  )}
                                  {notification.type === 'system' && (
                                    <div className="bg-gray-100 p-2 rounded-full">
                                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                        to="/admin/notifications"
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
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || 'A'}
                </div>
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
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'Administrador'}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'admin@abogadowilson.com'}</p>
                      </div>
                      <Link
                        to="/admin/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Mi perfil
                      </Link>
                      <Link
                        to="/admin/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Configuración
                      </Link>
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

export default AdminHeader;
