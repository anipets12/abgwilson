import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaGavel, FaSearch, FaBook, FaNewspaper, FaUsers, FaCalendarAlt } from 'react-icons/fa';
const Navigation = () => {
    const services = [
        { name: 'Derecho Penal', path: '/servicios/penal' },
        { name: 'Derecho Civil', path: '/servicios/civil' },
        { name: 'Derecho Comercial', path: '/servicios/comercial' },
        { name: 'Derecho de Tránsito', path: '/servicios/transito' },
        { name: 'Derecho Aduanero', path: '/servicios/aduanas' },
        { name: 'Patrocinio de Causas', path: '/servicios/patrocinio', price: 'Desde $500' },
        { name: 'Cobro de Pensiones', path: '/servicios/pensiones' },
        { name: 'Cobro de Deudas', path: '/servicios/deudas' },
        { name: 'Consultas Legales', path: '/consultas' }
    ];
    const mainLinks = [
        { name: 'Inicio', path: '/', icon: _jsx(FaGavel, {}) },
        { name: 'Servicios', path: '/servicios', icon: _jsx(FaGavel, {}), submenu: services },
        { name: 'Consulta de Procesos', path: '/consultas', icon: _jsx(FaSearch, {}) },
        { name: 'E-books', path: '/ebooks', icon: _jsx(FaBook, {}) },
        { name: 'Noticias', path: '/noticias', icon: _jsx(FaNewspaper, {}) },
        { name: 'Testimonios', path: '/testimonios', icon: _jsx(FaUsers, {}) },
        { name: 'Agendar Cita', path: '/calendario', icon: _jsx(FaCalendarAlt, {}) }
    ];
    return (_jsx("nav", { className: "bg-white shadow-lg", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "flex justify-between items-center py-4", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx(FaGavel, { className: "text-2xl text-primary-600" }), _jsx("span", { className: "text-xl font-bold", children: "Abg. Wilson Ipiales" })] }), _jsx("div", { className: "hidden lg:flex space-x-8", children: mainLinks.map((link) => (_jsxs("div", { className: "relative group", children: [_jsxs(Link, { to: link.path, className: "flex items-center space-x-1 text-gray-700 hover:text-primary-600", children: [link.icon, _jsx("span", { children: link.name })] }), link.submenu && (_jsx("div", { className: "absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-50", children: link.submenu.map((subItem) => (_jsxs(Link, { to: subItem.path, className: "block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600", children: [subItem.name, subItem.price && (_jsx("span", { className: "text-primary-600 ml-2", children: subItem.price }))] }, subItem.path))) }))] }, link.path))) }), _jsxs("div", { className: "hidden lg:flex items-center space-x-4", children: [_jsxs("a", { href: "tel:+593988835269", className: "flex items-center space-x-1 text-gray-700 hover:text-primary-600", children: [_jsx(FaPhone, {}), _jsx("span", { children: "+593 988835269" })] }), _jsxs("a", { href: "https://wa.me/593988835269", target: "_blank", rel: "noopener noreferrer", className: "flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600", children: [_jsx(FaWhatsapp, {}), _jsx("span", { children: "WhatsApp" })] })] })] }) }) }));
};
export default Navigation;
