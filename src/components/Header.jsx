import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp, FaPhone, FaUser, FaCalendarAlt, FaNewspaper, FaGavel, FaHome, FaEnvelope, FaBook, FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Inicio', href: '/', icon: <FaHome className="mr-1" /> },
  { name: 'Servicios', href: '/servicios', icon: <FaGavel className="mr-1" /> },
  { name: 'Consultas', href: '/consultas', icon: <FaUser className="mr-1" /> },
  { name: 'Blog', href: '/blog', icon: <FaNewspaper className="mr-1" /> },
  { name: 'Noticias', href: '/noticias', icon: <FaBook className="mr-1" /> },
  { name: 'E-Books', href: '/ebooks', icon: <FaBook className="mr-1" /> },
  { name: 'Contacto', href: '/contacto', icon: <FaEnvelope className="mr-1" /> },
  { name: 'Calendario', href: '/calendario', icon: <FaCalendarAlt className="mr-1" /> },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <Disclosure as="nav" className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white shadow-md'}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir menú principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <motion.div 
                  className="flex flex-shrink-0 items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to="/">
                    <img
                      className="h-10 w-auto transition-all duration-300 hover:scale-105"
                      src="/abogado.png"
                      alt="Abg. Wilson Ipiales"
                    />
                  </Link>
                  <Link to="/" className="ml-2 text-lg font-bold text-blue-800 hover:text-blue-600 transition-colors duration-200">
                    Abg. Wilson Ipiales
                  </Link>
                </motion.div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-2">
                    {navigation.map((item, index) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Link
                            to={item.href}
                            className={classNames(
                              isActive 
                                ? 'bg-blue-700 text-white shadow-md' 
                                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700',
                              'rounded-md px-3 py-2 text-sm font-medium flex items-center transition-all duration-200'
                            )}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex items-center space-x-2">
                  <motion.a
                    href="https://wa.me/593988835269?text=Hola%20Abg.%20Wilson,%20me%20gustaría%20consultar%20sobre%20sus%20servicios%20legales."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white hover:bg-green-700 rounded-md px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaWhatsapp className="mr-1" />
                    WhatsApp
                  </motion.a>
                  <motion.a
                    href="tel:+593988835269"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPhone className="mr-1" />
                    Llamar
                  </motion.a>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contacto"
                      className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Consulta Gratis
                    </Link>
                  </motion.div>
                </div>

                {/* Perfil */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md transition-all duration-200">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Abrir menú de usuario</span>
                      <motion.img
                        className="h-9 w-9 rounded-full border-2 border-blue-200 p-0.5"
                        src="/usuario.svg"
                        alt="Usuario"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={classNames(
                              active ? 'bg-blue-50 text-blue-700' : '', 
                              'block px-4 py-2 text-sm text-gray-700 transition-colors duration-150 flex items-center'
                            )}
                          >
                            <FaUser className="mr-2" /> Mi Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/calendario"
                            className={classNames(
                              active ? 'bg-blue-50 text-blue-700' : '', 
                              'block px-4 py-2 text-sm text-gray-700 transition-colors duration-150 flex items-center'
                            )}
                          >
                            <FaCalendarAlt className="mr-2" /> Agendar Cita
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/configuracion"
                            className={classNames(
                              active ? 'bg-blue-50 text-blue-700' : '', 
                              'block px-4 py-2 text-sm text-gray-700 transition-colors duration-150 flex items-center'
                            )}
                          >
                            <FaUserShield className="mr-2" /> Privacidad y Seguridad
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700',
                      'block rounded-md px-3 py-2 text-base font-medium flex items-center transition-all duration-200'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}