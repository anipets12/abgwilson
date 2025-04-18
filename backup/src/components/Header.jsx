import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp, FaPhone, FaUser, FaCalendarAlt, FaNewspaper, FaGavel, FaHome, FaEnvelope, FaBook } from 'react-icons/fa';
import Navigation from './Navigation/Navigation';
const navigation = [
    { name: 'Inicio', href: '/', current: true, icon: _jsx(FaHome, { className: "mr-1" }) },
    { name: 'Servicios', href: '/servicios', current: false, icon: _jsx(FaGavel, { className: "mr-1" }) },
    { name: 'Consultas', href: '/consultas', current: false, icon: _jsx(FaUser, { className: "mr-1" }) },
    { name: 'Blog', href: '/blog', current: false, icon: _jsx(FaNewspaper, { className: "mr-1" }) },
    { name: 'Noticias', href: '/noticias', current: false, icon: _jsx(FaBook, { className: "mr-1" }) },
    { name: 'E-Books', href: '/ebooks', current: false, icon: _jsx(FaBook, { className: "mr-1" }) },
    { name: 'Contacto', href: '/contacto', current: false, icon: _jsx(FaEnvelope, { className: "mr-1" }) },
    { name: 'Calendario', href: '/calendario', current: false, icon: _jsx(FaCalendarAlt, { className: "mr-1" }) },
];
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
export default function Header() {
    return (_jsx(Disclosure, { as: "nav", className: "bg-white shadow-lg", children: ({ open }) => (_jsxs(_Fragment, { children: [_jsx("div", { className: "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8", children: _jsxs("div", { className: "relative flex h-16 items-center justify-between", children: [_jsx("div", { className: "absolute inset-y-0 left-0 flex items-center sm:hidden", children: _jsxs(Disclosure.Button, { className: "relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500", children: [_jsx("span", { className: "absolute -inset-0.5" }), _jsx("span", { className: "sr-only", children: "Abrir men\u00FA principal" }), open ? (_jsx(XMarkIcon, { className: "block h-6 w-6", "aria-hidden": "true" })) : (_jsx(Bars3Icon, { className: "block h-6 w-6", "aria-hidden": "true" }))] }) }), _jsxs("div", { className: "flex flex-1 items-center justify-center sm:items-stretch sm:justify-start", children: [_jsxs("div", { className: "flex flex-shrink-0 items-center", children: [_jsx("img", { className: "h-8 w-auto", src: "/abogado.png", alt: "Abg. Wilson Ipiales" }), _jsx("span", { className: "ml-2 text-lg font-bold text-blue-800", children: "Abg. Wilson Ipiales" })] }), _jsx("div", { className: "hidden sm:ml-6 sm:block", children: _jsx("div", { className: "flex space-x-4", children: navigation.map((item) => (_jsxs(Link, { to: item.href, className: classNames(item.current ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700', 'rounded-md px-3 py-2 text-sm font-medium flex items-center'), "aria-current": item.current ? 'page' : undefined, children: [item.icon, item.name] }, item.name))) }) })] }), _jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("a", { href: "https://wa.me/593988835269?text=Hola%20Abg.%20Wilson,%20me%20gustar\u00EDa%20consultar%20sobre%20sus%20servicios%20legales.", target: "_blank", rel: "noopener noreferrer", className: "bg-green-600 text-white hover:bg-green-700 rounded-md px-3 py-2 text-sm font-medium flex items-center", children: [_jsx(FaWhatsapp, { className: "mr-1" }), "WhatsApp"] }), _jsxs("a", { href: "tel:+593988835269", className: "bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md px-3 py-2 text-sm font-medium flex items-center", children: [_jsx(FaPhone, { className: "mr-1" }), "Llamar"] }), _jsx(Link, { to: "/contacto", className: "bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-2 text-sm font-medium", children: "Consulta Gratis" })] }), _jsxs(Menu, { as: "div", className: "relative ml-3", children: [_jsx("div", { children: _jsxs(Menu.Button, { className: "relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", children: [_jsx("span", { className: "absolute -inset-1.5" }), _jsx("span", { className: "sr-only", children: "Abrir men\u00FA de usuario" }), _jsx("img", { className: "h-8 w-8 rounded-full", src: "/usuario.svg", alt: "Usuario" })] }) }), _jsx(Transition, { as: Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95", children: _jsxs(Menu.Items, { className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", children: [_jsx(Menu.Item, { children: ({ active }) => (_jsx(Link, { to: "/dashboard", className: classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700'), children: "Mi Dashboard" })) }), _jsx(Menu.Item, { children: ({ active }) => (_jsx(Link, { to: "/calendario", className: classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700'), children: "Agendar Cita" })) })] }) })] })] })] }) }), _jsx(Disclosure.Panel, { className: "sm:hidden", children: _jsx("div", { className: "space-y-1 px-2 pb-3 pt-2", children: navigation.map((item) => (_jsxs(Link, { to: item.href, className: classNames(item.current ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700', 'block rounded-md px-3 py-2 text-base font-medium flex items-center'), "aria-current": item.current ? 'page' : undefined, children: [item.icon, item.name] }, item.name))) }) })] })) }));
}
