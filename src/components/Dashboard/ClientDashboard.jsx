import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaFileAlt, FaCreditCard, FaUser, FaBell, FaSignOutAlt, FaArrowRight } from 'react-icons/fa';
const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState('inicio');
    const [userData, setUserData] = useState({
        nombre: 'Usuario',
        apellido: 'Ejemplo',
        creditos: 3,
        consultas: [
            { id: 1, fecha: '2025-03-05', tipo: 'Derecho Penal', estado: 'Completada' },
            { id: 2, fecha: '2025-03-10', tipo: 'Derecho Civil', estado: 'Pendiente' }
        ],
        citas: [
            { id: 1, fecha: '2025-03-15T14:00:00', tipo: 'Consulta Inicial', abogado: 'Wilson Ipiales' }
        ]
    });
    // En una implementación real, esto se conectaría con Supabase
    useEffect(() => {
        // Simulación de carga de datos del usuario
        // En implementación real: 
        // const fetchUserData = async () => {
        //   const { data, error } = await supabase
        //     .from('users')
        //     .select('*')
        //     .eq('id', userId)
        //     .single();
        //   if (data) setUserData(data);
        // };
        // fetchUserData();
    }, []);
    // Componente para la sección de inicio
    const InicioTab = () => (_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-bold mb-6", children: ["Bienvenido, ", userData.nombre] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-md p-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "font-bold text-lg", children: "Cr\u00E9ditos Disponibles" }), _jsx("span", { className: "text-3xl font-bold text-blue-600", children: userData.creditos })] }), _jsx("p", { className: "text-gray-600 mt-2", children: "Utilice sus cr\u00E9ditos para consultas y servicios" }), _jsxs(Link, { to: "/comprar-creditos", className: "mt-4 text-blue-600 flex items-center hover:underline", children: ["Comprar m\u00E1s cr\u00E9ditos ", _jsx(FaArrowRight, { className: "ml-2" })] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-md p-6", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsx("h3", { className: "font-bold text-lg", children: "Pr\u00F3xima Cita" }) }), userData.citas.length > 0 ? (_jsxs("div", { className: "mt-2", children: [_jsx("p", { className: "font-medium", children: new Date(userData.citas[0].fecha).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) }), _jsx("p", { className: "text-gray-600", children: userData.citas[0].tipo }), _jsxs(Link, { to: "/calendario", className: "mt-2 text-blue-600 flex items-center hover:underline", children: ["Ver agenda completa ", _jsx(FaArrowRight, { className: "ml-2" })] })] })) : (_jsxs("div", { className: "mt-2", children: [_jsx("p", { className: "text-gray-600", children: "No tiene citas programadas" }), _jsxs(Link, { to: "/calendario", className: "mt-2 text-blue-600 flex items-center hover:underline", children: ["Agendar una cita ", _jsx(FaArrowRight, { className: "ml-2" })] })] }))] }), _jsxs("div", { className: "bg-white rounded-xl shadow-md p-6", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsx("h3", { className: "font-bold text-lg", children: "Consultas Recientes" }) }), userData.consultas.length > 0 ? (_jsxs("div", { className: "mt-2", children: [_jsx("p", { className: "font-medium", children: userData.consultas[0].tipo }), _jsxs("p", { className: "text-gray-600", children: ["Estado: ", userData.consultas[0].estado] }), _jsxs(Link, { to: "/consultas", className: "mt-2 text-blue-600 flex items-center hover:underline", children: ["Ver todas las consultas ", _jsx(FaArrowRight, { className: "ml-2" })] })] })) : (_jsxs("div", { className: "mt-2", children: [_jsx("p", { className: "text-gray-600", children: "No tiene consultas recientes" }), _jsxs(Link, { to: "/servicios", className: "mt-2 text-blue-600 flex items-center hover:underline", children: ["Solicitar una consulta ", _jsx(FaArrowRight, { className: "ml-2" })] })] }))] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-md p-6 mb-8", children: [_jsx("h3", { className: "font-bold text-lg mb-4", children: "Servicios Recomendados" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
                            { title: 'Consulta Legal', description: 'Obtenga asesoría legal personalizada para su caso', url: '/servicios/consulta' },
                            { title: 'Patrocinio Legal', description: 'Representación completa en su caso desde $500', url: '/servicios/patrocinio' },
                            { title: 'Certificados Digitales', description: 'Genere certificados legales mediante IA', url: '/servicios/certificados' }
                        ].map((servicio, index) => (_jsxs("div", { className: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow", children: [_jsx("h4", { className: "font-bold mb-2", children: servicio.title }), _jsx("p", { className: "text-gray-600 text-sm mb-3", children: servicio.description }), _jsxs(Link, { to: servicio.url, className: "text-blue-600 text-sm flex items-center hover:underline", children: ["Saber m\u00E1s ", _jsx(FaArrowRight, { className: "ml-1 text-xs" })] })] }, index))) })] })] }));
    // Componente para la sección de citas
    const CitasTab = () => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Mis Citas" }), _jsxs(Link, { to: "/calendario", className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center", children: [_jsx(FaCalendarAlt, { className: "mr-2" }), " Agendar Nueva Cita"] })] }), userData.citas.length > 0 ? (_jsx("div", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fecha" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tipo" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Abogado" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: userData.citas.map(cita => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: new Date(cita.fecha).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: cita.tipo }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: cita.abogado }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [_jsx("button", { className: "text-blue-600 hover:text-blue-800", children: "Reprogramar" }), _jsx("button", { className: "text-red-600 hover:text-red-800 ml-4", children: "Cancelar" })] })] }, cita.id))) })] }) })) : (_jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 text-center", children: [_jsx("p", { className: "text-gray-600 mb-4", children: "No tiene citas programadas" }), _jsxs(Link, { to: "/calendario", className: "bg-blue-600 text-white px-6 py-2 rounded-lg inline-flex items-center hover:bg-blue-700 transition-colors", children: [_jsx(FaCalendarAlt, { className: "mr-2" }), " Agendar Ahora"] })] }))] }));
    // Componente para la sección de consultas
    const ConsultasTab = () => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Mis Consultas" }), _jsxs(Link, { to: "/servicios", className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center", children: [_jsx(FaFileAlt, { className: "mr-2" }), " Nueva Consulta"] })] }), userData.consultas.length > 0 ? (_jsx("div", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fecha" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tipo" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Estado" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: userData.consultas.map(consulta => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: new Date(consulta.fecha).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: consulta.tipo }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${consulta.estado === 'Completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`, children: consulta.estado }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("button", { className: "text-blue-600 hover:text-blue-800", children: "Ver detalles" }) })] }, consulta.id))) })] }) })) : (_jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 text-center", children: [_jsx("p", { className: "text-gray-600 mb-4", children: "No tiene consultas realizadas" }), _jsxs(Link, { to: "/servicios", className: "bg-blue-600 text-white px-6 py-2 rounded-lg inline-flex items-center hover:bg-blue-700 transition-colors", children: [_jsx(FaFileAlt, { className: "mr-2" }), " Solicitar Consulta"] })] }))] }));
    // Componente para la sección de perfil
    const PerfilTab = () => (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Mi Perfil" }), _jsxs("div", { className: "bg-white rounded-xl shadow-md p-6 mb-8", children: [_jsx("h3", { className: "font-bold text-lg mb-4", children: "Informaci\u00F3n Personal" }), _jsxs("form", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre" }), _jsx("input", { type: "text", className: "w-full p-2 border border-gray-300 rounded-md", value: userData.nombre, onChange: (e) => setUserData({ ...userData, nombre: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Apellido" }), _jsx("input", { type: "text", className: "w-full p-2 border border-gray-300 rounded-md", value: userData.apellido, onChange: (e) => setUserData({ ...userData, apellido: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Correo Electr\u00F3nico" }), _jsx("input", { type: "email", className: "w-full p-2 border border-gray-300 rounded-md", value: "usuario@ejemplo.com", readOnly: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tel\u00E9fono" }), _jsx("input", { type: "tel", className: "w-full p-2 border border-gray-300 rounded-md", placeholder: "+593 XXXXXXXXX" })] }), _jsx("div", { className: "col-span-2 mt-4", children: _jsx("button", { className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors", children: "Actualizar Informaci\u00F3n" }) })] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-md p-6 mb-8", children: [_jsx("h3", { className: "font-bold text-lg mb-4", children: "Cambiar Contrase\u00F1a" }), _jsxs("form", { className: "grid grid-cols-1 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Contrase\u00F1a Actual" }), _jsx("input", { type: "password", className: "w-full p-2 border border-gray-300 rounded-md", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nueva Contrase\u00F1a" }), _jsx("input", { type: "password", className: "w-full p-2 border border-gray-300 rounded-md", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirmar Nueva Contrase\u00F1a" }), _jsx("input", { type: "password", className: "w-full p-2 border border-gray-300 rounded-md", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsx("div", { className: "mt-4", children: _jsx("button", { className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors", children: "Cambiar Contrase\u00F1a" }) })] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-md p-6", children: [_jsx("h3", { className: "font-bold text-lg mb-4", children: "Notificaciones" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Actualizaciones por correo" }), _jsx("p", { className: "text-sm text-gray-600", children: "Recibir novedades sobre servicios y promociones" })] }), _jsxs("label", { className: "switch", children: [_jsx("input", { type: "checkbox", defaultChecked: true }), _jsx("span", { className: "slider round" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Recordatorios de citas" }), _jsx("p", { className: "text-sm text-gray-600", children: "Recibir notificaciones sobre citas pr\u00F3ximas" })] }), _jsxs("label", { className: "switch", children: [_jsx("input", { type: "checkbox", defaultChecked: true }), _jsx("span", { className: "slider round" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Alertas de SMS" }), _jsx("p", { className: "text-sm text-gray-600", children: "Recibir notificaciones importantes por SMS" })] }), _jsxs("label", { className: "switch", children: [_jsx("input", { type: "checkbox" }), _jsx("span", { className: "slider round" })] })] })] })] })] }));
    return (_jsxs("div", { className: "bg-gray-100 py-12", children: [_jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [_jsxs("div", { className: "md:col-span-1", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-md p-6 mb-6", children: [_jsxs("div", { className: "mb-6 text-center", children: [_jsx("div", { className: "w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(FaUser, { className: "text-blue-600 text-4xl" }) }), _jsxs("h3", { className: "font-bold text-lg", children: [userData.nombre, " ", userData.apellido] })] }), _jsxs("ul", { className: "space-y-2", children: [_jsx("li", { children: _jsxs("button", { onClick: () => setActiveTab('inicio'), className: `w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${activeTab === 'inicio' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`, children: [_jsx(FaUser, { className: "mr-3" }), " Inicio"] }) }), _jsx("li", { children: _jsxs("button", { onClick: () => setActiveTab('citas'), className: `w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${activeTab === 'citas' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`, children: [_jsx(FaCalendarAlt, { className: "mr-3" }), " Mis Citas"] }) }), _jsx("li", { children: _jsxs("button", { onClick: () => setActiveTab('consultas'), className: `w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${activeTab === 'consultas' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`, children: [_jsx(FaFileAlt, { className: "mr-3" }), " Mis Consultas"] }) }), _jsx("li", { children: _jsxs("button", { onClick: () => setActiveTab('perfil'), className: `w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${activeTab === 'perfil' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`, children: [_jsx(FaUser, { className: "mr-3" }), " Mi Perfil"] }) }), _jsx("li", { children: _jsxs(Link, { to: "/logout", className: "w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center text-red-600 hover:bg-red-50", children: [_jsx(FaSignOutAlt, { className: "mr-3" }), " Cerrar Sesi\u00F3n"] }) })] })] }), _jsxs("div", { className: "bg-blue-600 text-white rounded-xl shadow-md p-6", children: [_jsx("h3", { className: "font-bold text-lg mb-3", children: "\u00BFNecesita ayuda?" }), _jsx("p", { className: "text-blue-100 mb-4", children: "Nuestro equipo est\u00E1 disponible para asistirle con cualquier duda o problema." }), _jsx("a", { href: "tel:+593988835269", className: "bg-white text-blue-600 hover:bg-blue-50 block text-center py-2 rounded-lg font-bold transition-colors", children: "Cont\u00E1ctenos" })] })] }), _jsxs("div", { className: "md:col-span-3", children: [activeTab === 'inicio' && _jsx(InicioTab, {}), activeTab === 'citas' && _jsx(CitasTab, {}), activeTab === 'consultas' && _jsx(ConsultasTab, {}), activeTab === 'perfil' && _jsx(PerfilTab, {})] })] }) }), _jsx("style", { jsx: true, children: `
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }
        
        input:checked + .slider {
          background-color: #2563EB;
        }
        
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        
        .slider.round {
          border-radius: 24px;
        }
        
        .slider.round:before {
          border-radius: 50%;
        }
      ` })] }));
};
export default ClientDashboard;
