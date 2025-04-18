import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente para gestionar notificaciones administrativas
 * Muestra y permite acciones sobre las notificaciones recientes del sistema
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.notifications - Lista de notificaciones
 * @param {Function} props.onMarkAsRead - Función para marcar notificación como leída
 * @param {Function} props.onMarkAllAsRead - Función para marcar todas como leídas
 * @param {Function} props.onDelete - Función para eliminar notificación
 */
const AdminNotifications = ({ 
  notifications = [], 
  onMarkAsRead = () => {}, 
  onMarkAllAsRead = () => {}, 
  onDelete = () => {} 
}) => {
  const [filter, setFilter] = useState('all');
  const [sortedNotifications, setSortedNotifications] = useState([]);
  
  // Ordenar y filtrar notificaciones
  useEffect(() => {
    let filtered = [...notifications];
    
    // Aplicar filtro
    if (filter === 'unread') {
      filtered = filtered.filter(notif => !notif.read);
    } else if (filter === 'read') {
      filtered = filtered.filter(notif => notif.read);
    }
    
    // Ordenar por fecha (más recientes primero)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setSortedNotifications(filtered);
  }, [notifications, filter]);
  
  // Calcular conteo de no leídas
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  // Formatear la fecha relativa
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'hace un momento';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
    } else {
      return date.toLocaleString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
  };
  
  // Obtener icono según tipo de notificación
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'user':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'consultation':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        );
      case 'alert':
        return (
          <div className="bg-red-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'system':
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };
  
  // Obtener etiqueta de prioridad
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Alta
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Media
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Baja
          </span>
        );
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Encabezado */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            Notificaciones 
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                {unreadCount} no leídas
              </span>
            )}
          </h2>
          
          <div className="flex space-x-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Marcar todas como leídas
            </button>
            <div className="relative inline-block text-left">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todas</option>
                <option value="unread">No leídas</option>
                <option value="read">Leídas</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de notificaciones */}
      <div className="max-h-96 overflow-y-auto">
        {sortedNotifications.length > 0 ? (
          <motion.ul 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-gray-200"
          >
            <AnimatePresence>
              {sortedNotifications.map((notification) => (
                <motion.li 
                  key={notification.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, height: 0 }}
                  className={`px-6 py-4 hover:bg-gray-50 transition duration-150 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <div className="flex space-x-2">
                          {notification.priority && getPriorityBadge(notification.priority)}
                          <span className="text-xs text-gray-500">
                            {formatRelativeTime(notification.date)}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{notification.message}</p>
                      
                      {/* Enlaces o acciones relacionadas */}
                      {notification.link && (
                        <a 
                          href={notification.link}
                          className="mt-1 block text-sm text-primary-600 hover:text-primary-800"
                        >
                          Ver detalles
                        </a>
                      )}
                      
                      <div className="mt-2 flex space-x-4">
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Marcar como leída
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(notification.id)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="mt-2 text-sm">No hay notificaciones para mostrar</p>
          </div>
        )}
      </div>
      
      {/* Botón para ver todas */}
      {sortedNotifications.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 text-center">
          <a 
            href="/admin/notifications"
            className="text-sm font-medium text-primary-600 hover:text-primary-800"
          >
            Ver todas las notificaciones
          </a>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
