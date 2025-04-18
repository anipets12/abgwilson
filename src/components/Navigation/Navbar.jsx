import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline';
import { FaUsers, FaHandshake, FaComments, FaGavel, FaBook, FaShieldAlt, FaFileContract, FaFileAlt, FaUserTie, FaWhatsapp, FaPhone, FaEnvelope, FaUserPlus, FaSignInAlt, FaLock } from 'react-icons/fa';
import { authService, dataService } from '../../services/apiService';
const mainNavigation = [
    { name: 'Inicio', href: '/', current: false },
    { name: 'Servicios', href: '#', current: false, hasSubmenu: true, icon: _jsx(FaGavel, { className: "text-blue-600" }) },
    { name: 'Consultas', href: '#', current: false, hasSubmenu: true, icon: _jsx(FaFileAlt, { className: "text-blue-600" }) },
    { name: 'Blog', href: '/blog', current: false, icon: _jsx(FaBook, { className: "text-blue-600" }) },
    { name: 'Foro', href: '/foro', current: false, icon: _jsx(FaComments, { className: "text-blue-600" }) },
    { name: 'Comunidad', href: '#', current: false, hasSubmenu: true, icon: _jsx(FaUsers, { className: "text-blue-600" }) },
    { name: 'Contacto', href: '/contacto', current: false, icon: _jsx(FaEnvelope, { className: "text-blue-600" }) },
];
const serviceSubmenu = [
    { name: 'Derecho Penal', href: '/servicios/penal', current: false, icon: _jsx(FaGavel, { className: "text-red-500" }) },
    { name: 'Derecho Civil', href: '/servicios/civil', current: false, icon: _jsx(FaFileContract, { className: "text-blue-500" }) },
    { name: 'Derecho Comercial', href: '/servicios/comercial', current: false, icon: _jsx(FaFileAlt, { className: "text-green-500" }) },
    { name: 'Derecho de Tránsito', href: '/servicios/transito', current: false, icon: _jsx(FaFileAlt, { className: "text-yellow-500" }) },
    { name: 'Derecho Aduanero', href: '/servicios/aduanas', current: false, icon: _jsx(FaFileAlt, { className: "text-purple-500" }) },
];
const consultasSubmenu = [
    { name: 'Consulta General', href: '/consultas', current: false, icon: _jsx(FaFileAlt, { className: "text-blue-500" }) },
    { name: 'Consultas Civiles', href: '/consultas/civiles', current: false, icon: _jsx(FaFileContract, { className: "text-green-500" }) },
    { name: 'Consultas Penales', href: '/consultas/penales', current: false, icon: _jsx(FaGavel, { className: "text-red-500" }) },
    { name: 'Consultas de Tránsito', href: '/consultas/transito', current: false, icon: _jsx(FaFileAlt, { className: "text-yellow-500" }) },
    { name: 'Consulta con IA', href: '/consulta-ia', current: false, icon: _jsx(FaUserTie, { className: "text-purple-500" }) },
];
const comunidadSubmenu = [
    { name: 'Programa de Afiliados', href: '/afiliados', current: false, icon: _jsx(FaUsers, { className: "text-blue-500" }) },
    { name: 'Programa de Referidos', href: '/referidos', current: false, icon: _jsx(FaHandshake, { className: "text-green-500" }) },
    { name: 'Testimonios', href: '/testimonios', current: false, icon: _jsx(FaComments, { className: "text-yellow-500" }) },
    { name: 'Noticias', href: '/noticias', current: false, icon: _jsx(FaBook, { className: "text-purple-500" }) },
    { name: 'E-Books', href: '/ebooks', current: false, icon: _jsx(FaBook, { className: "text-indigo-500" }) },
];
// Nuevo submenú para Políticas y Seguridad
const policySubmenu = [
    { name: 'Política de Privacidad', href: '/privacidad', current: false, icon: _jsx(FaShieldAlt, { className: "text-gray-500" }) },
    { name: 'Términos y Condiciones', href: '/terminos', current: false, icon: _jsx(FaFileContract, { className: "text-gray-500" }) },
    { name: 'Seguridad', href: '/seguridad', current: false, icon: _jsx(FaLock, { className: "text-gray-500" }) },
];
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
function Navbar() {
    const [session, setSession] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        // Establecer la sesión inicial
        const setInitialSession = async () => {
            try {
                // Verificar si hay un token en localStorage
                const token = localStorage.getItem('authToken');
                if (token) {
                    const { user } = await authService.getCurrentUser();
                    setSession({ user });
                }
                else {
                    setSession(null);
                }
            }
            catch (error) {
                console.error('Error al obtener la sesión inicial:', error);
                setSession(null);
            }
        };
        setInitialSession();
        // Simplificamos la lógica de escucha de cambios de autenticación
        const handleAuthChange = () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                authService.getCurrentUser().then(({ user }) => {
                    if (user)
                        setSession({ user });
                });
            }
            else {
                setSession(null);
            }
        };
        // Comprobamos cada 5 segundos si el token cambió
        const interval = setInterval(handleAuthChange, 5000);
        // Limpiar el intervalo al desmontar
        return () => clearInterval(interval);
    }, []);
    const updatedNavigation = mainNavigation.map(item => ({
        ...item,
        current: location.pathname === item.href ||
            (item.href !== '#' && item.href !== '/' && location.pathname.includes(item.href))
    }));
    // Añadir entrada para Políticas y Seguridad
    const allNavigation = [...updatedNavigation, {
            name: 'Políticas',
            href: '#',
            current: location.pathname === '/privacidad' || location.pathname === '/terminos' || location.pathname === '/seguridad',
            hasSubmenu: true,
            icon: _jsx(FaShieldAlt, { className: "text-blue-600" })
        }];
    return (_jsx(Disclosure, { as: "nav", className: "bg-white shadow-lg sticky top-0 z-50", children: ({ open }) => (_jsxs(_Fragment, { children: [_jsx("div", { className: "mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl", children: _jsxs("div", { className: "relative flex h-16 items-center justify-between", children: [_jsx("div", { className: "absolute inset-y-0 left-0 flex items-center sm:hidden z-50", children: _jsxs(Disclosure.Button, { className: "relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), children: [_jsx("span", { className: "absolute -inset-0.5" }), _jsx("span", { className: "sr-only", children: "Abrir men\u00FA principal" }), open ? (_jsx(XMarkIcon, { className: "block h-6 w-6", "aria-hidden": "true" })) : (_jsx(Bars3Icon, { className: "block h-6 w-6", "aria-hidden": "true" }))] }) }), _jsx("div", { className: "flex flex-1 items-center justify-center sm:justify-start", children: _jsx("div", { className: "hidden sm:ml-6 sm:flex sm:space-x-2 md:space-x-4", children: allNavigation.map((item) => item.hasSubmenu ? (_jsx(Popover, { className: "relative", children: ({ open }) => (_jsxs(_Fragment, { children: [_jsxs(Popover.Button, { className: classNames(item.current ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700', 'rounded-md px-3 py-2 text-sm font-medium flex items-center group transition-colors'), children: [_jsx("span", { className: "mr-1", children: item.icon }), _jsx("span", { children: item.name }), _jsx(ChevronDownIcon, { className: classNames('ml-1 h-4 w-4 transition-transform', open ? 'rotate-180 transform' : '') })] }), _jsx(Transition, { as: Fragment, enter: "transition ease-out duration-200", enterFrom: "opacity-0 translate-y-1", enterTo: "opacity-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "opacity-100 translate-y-0", leaveTo: "opacity-0 translate-y-1", children: _jsx(Popover.Panel, { className: "absolute left-1/2 z-50 mt-1 w-56 -translate-x-1/2 transform", children: _jsx("div", { className: "rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden", children: _jsx("div", { className: "relative grid gap-1 p-2", children: (item.name === 'Servicios' ? serviceSubmenu :
                                                                    item.name === 'Consultas' ? consultasSubmenu :
                                                                        item.name === 'Comunidad' ? comunidadSubmenu :
                                                                            item.name === 'Políticas' ? policySubmenu : []).map((subItem) => (_jsxs(Link, { to: subItem.href, className: classNames(subItem.current ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700', 'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors'), children: [_jsx("span", { className: "mr-2", children: subItem.icon }), _jsx("span", { children: subItem.name })] }, subItem.name))) }) }) }) })] })) }, item.name)) : (_jsxs(Link, { to: item.href, className: classNames(item.current ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700', 'rounded-md px-3 py-2 text-sm font-medium flex items-center transition-colors'), children: [_jsx("span", { className: "mr-1", children: item.icon }), _jsx("span", { children: item.name })] }, item.name))) }) }), _jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center space-x-1 sm:static sm:space-x-2", children: [session ? (_jsxs(Menu, { as: "div", className: "relative ml-3", children: [_jsx("div", { children: _jsxs(Menu.Button, { className: "relative flex rounded-full bg-blue-100 p-1 text-blue-600 hover:bg-blue-200 focus:outline-none", children: [_jsx("span", { className: "absolute -inset-1.5" }), _jsx("span", { className: "sr-only", children: "Abrir men\u00FA de usuario" }), _jsx(UserIcon, { className: "h-6 w-6", "aria-hidden": "true" })] }) }), _jsx(Transition, { as: Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95", children: _jsxs(Menu.Items, { className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", children: [_jsx(Menu.Item, { children: ({ active }) => (_jsx(Link, { to: "/dashboard", className: classNames(active ? 'bg-blue-50' : '', 'block px-4 py-2 text-sm text-gray-700'), children: "Mi Dashboard" })) }), _jsx(Menu.Item, { children: ({ active }) => (_jsx("button", { onClick: async () => {
                                                                    await authService.signOut();
                                                                }, className: classNames(active ? 'bg-blue-50' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700'), children: "Cerrar Sesi\u00F3n" })) })] }) })] })) : (_jsxs("div", { className: "flex space-x-1", children: [_jsxs(Link, { to: "/registro", className: "inline-flex items-center p-1.5 text-xs font-medium rounded text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100", children: [_jsx(FaUserPlus, { className: "mr-1" }), " Registrarse"] }), _jsxs(Link, { to: "/login", className: "inline-flex items-center p-1.5 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700", children: [_jsx(FaSignInAlt, { className: "mr-1" }), " Iniciar Sesi\u00F3n"] })] })), _jsxs("div", { className: "hidden md:flex md:items-center space-x-1", children: [_jsxs("a", { href: "tel:+593988835269", className: "inline-flex items-center p-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200", children: [_jsx(FaPhone, { className: "mr-1" }), " Llamar"] }), _jsxs("a", { href: "https://wa.me/593988835269", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center p-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors duration-200", children: [_jsx(FaWhatsapp, { className: "mr-1" }), " WhatsApp"] }), _jsxs(Link, { to: "/contacto", className: "inline-flex items-center p-1.5 border border-transparent text-xs font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200", children: [_jsx(FaEnvelope, { className: "mr-1" }), " Consulta Gratis"] })] })] })] }) }), _jsx(Disclosure.Panel, { className: "sm:hidden bg-white border-t border-gray-100 shadow-lg", children: _jsxs("div", { className: "space-y-1 px-2 pb-3 pt-2", children: [allNavigation.map((item) => item.hasSubmenu ? (_jsx(Disclosure, { as: "div", className: "mt-1", children: ({ open }) => (_jsxs(_Fragment, { children: [_jsxs(Disclosure.Button, { className: classNames(item.current ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 hover:text-blue-700', 'group w-full flex items-center justify-between rounded-md px-2 py-2 text-left text-sm font-medium text-gray-700 focus:outline-none'), children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: item.icon }), _jsx("span", { children: item.name })] }), _jsx(ChevronDownIcon, { className: classNames('h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-transform', open ? 'rotate-180 transform' : '') })] }), _jsx(Disclosure.Panel, { className: "mt-1 space-y-1", children: (item.name === 'Servicios' ? serviceSubmenu :
                                                item.name === 'Consultas' ? consultasSubmenu :
                                                    item.name === 'Comunidad' ? comunidadSubmenu :
                                                        item.name === 'Políticas' ? policySubmenu : []).map((subItem) => (_jsxs(Link, { to: subItem.href, className: "group flex items-center rounded-md py-2 pl-4 pr-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700", children: [_jsx("span", { className: "mr-2", children: subItem.icon }), _jsx("span", { children: subItem.name })] }, subItem.name))) })] })) }, item.name)) : (_jsxs(Link, { to: item.href, className: classNames(item.current ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 hover:text-blue-700', 'flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-700'), children: [_jsx("span", { className: "mr-2", children: item.icon }), _jsx("span", { children: item.name })] }, item.name))), _jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200", children: [_jsx("h3", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2", children: "Contacto Directo" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("a", { href: "tel:+593988835269", className: "flex items-center justify-center p-2 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700", children: [_jsx(FaPhone, { className: "mr-1" }), " Llamar"] }), _jsxs("a", { href: "https://wa.me/593988835269", target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center p-2 border border-transparent text-xs font-medium rounded-md text-white bg-green-500 hover:bg-green-600", children: [_jsx(FaWhatsapp, { className: "mr-1" }), " WhatsApp"] }), _jsxs(Link, { to: "/contacto", className: "flex items-center justify-center p-2 border border-transparent text-xs font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 col-span-2 mt-1", children: [_jsx(FaEnvelope, { className: "mr-1" }), " Consulta Gratis"] })] })] }), !session && (_jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200", children: [_jsx("h3", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2", children: "Mi Cuenta" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs(Link, { to: "/login", className: "flex items-center justify-center p-2 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700", children: [_jsx(FaSignInAlt, { className: "mr-1" }), " Iniciar Sesi\u00F3n"] }), _jsxs(Link, { to: "/registro", className: "flex items-center justify-center p-2 text-xs font-medium rounded-md text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100", children: [_jsx(FaUserPlus, { className: "mr-1" }), " Registrarse"] })] })] }))] }) })] })) }));
}
export default Navbar;
