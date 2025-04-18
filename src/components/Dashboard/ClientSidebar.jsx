import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Barra lateral del dashboard de cliente
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario cliente
 * @param {boolean} props.isOpen - Si el sidebar está abierto o no
 * @param {string} props.activeSection - Sección activa
 * @param {Function} props.onChangeSection - Función para cambiar sección activa
 */
const ClientSidebar = ({ user, isOpen, activeSection, onChangeSection }) => {
  // Elementos del menú
  const menuItems = [
    { 
      id: 'summary', 
      title: 'Resumen', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      id: 'cases', 
      title: 'Mis Casos', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    { 
      id: 'consultation', 
      title: 'Consultas', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    { 
      id: 'documents', 
      title: 'Documentos', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'subscription', 
      title: 'Suscripción', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    { 
      id: 'profile', 
      title: 'Mi Perfil', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  // Variantes para animación
  const sidebarVariants = {
    open: { 
      width: '250px',
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
      className="h-screen bg-primary-700 text-white shadow-lg z-20"
      initial={isOpen ? 'open' : 'closed'}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      {/* Logo y nombre */}
      <div className="flex items-center h-16 px-4 border-b border-primary-600">
        <div className="flex-shrink-0 flex items-center">
          <div className="bg-white p-2 rounded-md">
            <svg className="w-8 h-8 text-primary-700" fill="currentColor" viewBox="0 0 20 20">
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
      
      {/* Menú de navegación */}
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onChangeSection(item.id)}
                className={`w-full flex items-center px-3 py-3 text-sm rounded-md transition duration-150 ease-in-out ${
                  activeSection === item.id 
                    ? 'bg-primary-800 text-white' 
                    : 'text-primary-200 hover:bg-primary-600 hover:text-white'
                }`}
              >
                <div className="mr-3">
                  {item.icon}
                </div>
                <motion.span
                  className="font-medium"
                  variants={textVariants}
                >
                  {item.title}
                </motion.span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Información del usuario */}
      {isOpen && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 border-t border-primary-600 p-4"
          variants={textVariants}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                  <span className="text-lg font-medium text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {user?.name || 'Usuario'}
              </p>
              <p className="text-xs text-primary-300">
                {user?.subscription === 'premium' ? 'Usuario Premium' : 'Usuario Free'}
              </p>
            </div>
          </div>
          
          {/* Botón de cerrar sesión */}
          <Link
            to="/logout"
            className="mt-3 block text-center px-4 py-2 text-sm text-primary-200 rounded-md bg-primary-800 hover:bg-primary-900 hover:text-white transition duration-150 ease-in-out"
          >
            Cerrar sesión
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ClientSidebar;
