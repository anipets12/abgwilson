import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Sidebar del panel administrativo
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Si el sidebar está abierto o no
 * @param {Function} props.toggleSidebar - Función para abrir/cerrar el sidebar
 * @param {Object} props.user - Datos del usuario administrador
 */
const AdminSidebar = ({ isOpen, toggleSidebar, user }) => {
  const location = useLocation();
  
  // Definir los enlaces del menú
  const menuItems = [
    { title: 'Panel Principal', path: '/admin', icon: 'home' },
    { title: 'Usuarios', path: '/admin/users', icon: 'users' },
    { 
      title: 'Contenido', 
      path: '/admin/content', 
      icon: 'document-text',
      submenu: [
        { title: 'Artículos', path: '/admin/content/articles' },
        { title: 'Páginas', path: '/admin/content/pages' },
        { title: 'eBooks', path: '/admin/content/ebooks' },
        { title: 'Recursos Exclusivos', path: '/admin/content/resources' }
      ]
    },
    { 
      title: 'Servicios', 
      path: '/admin/services', 
      icon: 'briefcase',
      submenu: [
        { title: 'Consultas', path: '/admin/services/consultations' },
        { title: 'Citas', path: '/admin/services/appointments' },
        { title: 'Servicios Premium', path: '/admin/services/premium' }
      ]
    },
    { 
      title: 'Pagos', 
      path: '/admin/payments', 
      icon: 'credit-card',
      submenu: [
        { title: 'Suscripciones', path: '/admin/payments/subscriptions' },
        { title: 'Transacciones', path: '/admin/payments/transactions' },
        { title: 'Tokens', path: '/admin/payments/tokens' }
      ]
    },
    { 
      title: 'Marketing', 
      path: '/admin/marketing', 
      icon: 'chart-bar',
      submenu: [
        { title: 'Afiliados', path: '/admin/marketing/affiliates' },
        { title: 'Promociones', path: '/admin/marketing/promotions' },
        { title: 'Comunicaciones', path: '/admin/marketing/communications' }
      ]
    },
    { title: 'Configuración', path: '/admin/settings', icon: 'cog' }
  ];
  
  // Verificar si un item está activo
  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    
    if (path !== '/admin' && location.pathname.startsWith(path)) {
      return true;
    }
    
    return false;
  };
  
  // Renderizar icono según su nombre
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'document-text':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'briefcase':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'chart-bar':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'cog':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Variantes para animación del sidebar
  const sidebarVariants = {
    open: { 
      width: '280px',
      transition: { duration: 0.3 }
    },
    closed: { 
      width: '80px',
      transition: { duration: 0.3 }
    }
  };
  
  const textVariants = {
    open: { 
      opacity: 1,
      display: 'block',
      transition: { delay: 0.1, duration: 0.2 }
    },
    closed: { 
      opacity: 0,
      transitionEnd: { display: 'none' },
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="h-screen bg-primary-900 text-white shadow-lg z-20"
      initial={isOpen ? 'open' : 'closed'}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      {/* Logo y nombre del sitio */}
      <div className="flex items-center h-16 px-4 border-b border-primary-800">
        <div className="flex-shrink-0 flex items-center">
          <div className="bg-white p-2 rounded-md">
            <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
          <motion.div
            className="ml-3 font-bold text-lg"
            variants={textVariants}
          >
            Abogado Wilson
          </motion.div>
        </div>
      </div>
      
      {/* Enlaces de navegación */}
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              {/* Elemento principal */}
              <Link 
                to={item.path}
                className={`flex items-center py-3 px-3 rounded-lg transition duration-200 ${
                  isActive(item.path) 
                    ? 'bg-primary-700 text-white' 
                    : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                }`}
              >
                <div className="mr-3">{renderIcon(item.icon)}</div>
                <motion.span
                  className="font-medium"
                  variants={textVariants}
                >
                  {item.title}
                </motion.span>
                
                {item.submenu && isOpen && (
                  <motion.div
                    className="ml-auto"
                    variants={textVariants}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                )}
              </Link>
              
              {/* Submenú si existe y está abierto */}
              {item.submenu && isOpen && (
                <motion.ul 
                  className="ml-12 mt-2 space-y-1"
                  variants={textVariants}
                >
                  {item.submenu.map((subItem) => (
                    <li key={subItem.path}>
                      <Link
                        to={subItem.path}
                        className={`block py-2 px-3 rounded-md text-sm transition duration-200 ${
                          location.pathname === subItem.path
                            ? 'bg-primary-800 text-white'
                            : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Perfil de usuario */}
      {isOpen && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 border-t border-primary-800 p-4"
          variants={textVariants}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center">
                <span className="text-lg font-medium">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {user?.name || 'Administrador'}
              </p>
              <p className="text-xs text-primary-300">
                {user?.role === 'superadmin' ? 'Super Administrador' : 'Administrador'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminSidebar;
