import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import ConsultasBase from './ConsultasBase';
const ConsultasCiviles = () => {
    return (_jsx(ConsultasBase, { queryType: "civil", children: ({ handleQuery, queryCount, isLoading }) => (_jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [_jsx("h2", { className: "text-3xl font-bold text-blue-800 mb-6", children: "Consultas Civiles" }), !isLoading && (_jsxs("div", { className: "mb-6", children: [_jsxs("p", { className: "text-gray-600", children: ["Consultas restantes este mes: ", 5 - queryCount] }), queryCount >= 5 && (_jsx("p", { className: "text-red-600 font-medium mt-2", children: "Has alcanzado el l\u00EDmite de consultas. \u00A1Af\u00EDliate para consultas ilimitadas!" }))] })), _jsxs("div", { className: "bg-white shadow-lg rounded-lg p-6", children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Soluciones para Asuntos Civiles" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "border-l-4 border-blue-600 pl-4", children: [_jsx("h4", { className: "font-medium text-lg", children: "Contratos y Acuerdos" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Los problemas con contratos pueden generar graves consecuencias:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Incumplimientos de obligaciones contractuales" }), _jsx("li", { children: "Disputas sobre interpretaci\u00F3n de cl\u00E1usulas" }), _jsx("li", { children: "Responsabilidades y penalizaciones" })] }), _jsx("p", { className: "text-gray-600 mt-2", children: "Te asesoramos con:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Revisi\u00F3n de contratos antes de firmar" }), _jsx("li", { children: "An\u00E1lisis de incumplimientos contractuales" }), _jsx("li", { children: "Negociaci\u00F3n y resoluci\u00F3n de disputas" })] }), _jsx("button", { onClick: handleQuery, disabled: queryCount >= 5, className: "mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: "Consultar sobre mi contrato" })] }), _jsxs("div", { className: "border-l-4 border-teal-600 pl-4", children: [_jsx("h4", { className: "font-medium text-lg", children: "Propiedad y Bienes Ra\u00EDces" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Los asuntos inmobiliarios pueden resultar en complicaciones:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Disputas sobre t\u00EDtulos de propiedad" }), _jsx("li", { children: "Conflictos con arrendamientos" }), _jsx("li", { children: "Problemas de servidumbres y linderos" })] }), _jsx("p", { className: "text-gray-600 mt-2", children: "Nuestras soluciones:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Verificaci\u00F3n de estado legal de propiedades" }), _jsx("li", { children: "Asesor\u00EDa en compraventa de inmuebles" }), _jsx("li", { children: "Resoluci\u00F3n de conflictos entre propietarios" })] }), _jsx("button", { onClick: handleQuery, disabled: queryCount >= 5, className: "mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: "Consultar sobre mi propiedad" })] }), _jsxs("div", { className: "border-l-4 border-indigo-600 pl-4", children: [_jsx("h4", { className: "font-medium text-lg", children: "Herencias y Sucesiones" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Las herencias pueden generar situaciones complejas:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Disputas entre herederos" }), _jsx("li", { children: "Interpretaci\u00F3n de testamentos" }), _jsx("li", { children: "Procesos de sucesi\u00F3n intestada" })] }), _jsx("p", { className: "text-gray-600 mt-2", children: "Te asistimos con:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Orientaci\u00F3n sobre derechos hereditarios" }), _jsx("li", { children: "Elaboraci\u00F3n y revisi\u00F3n de testamentos" }), _jsx("li", { children: "Representaci\u00F3n en procesos sucesorios" })] }), _jsx("button", { onClick: handleQuery, disabled: queryCount >= 5, className: "mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: "Consultar sobre herencias" })] }), _jsxs("div", { className: "mt-8 p-4 bg-blue-50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-lg text-blue-800", children: "\u00BFNecesitas consultas ilimitadas?" }), _jsx("p", { className: "text-gray-700 mt-2", children: "\u00DAnete a nuestro programa de afiliados y obt\u00E9n beneficios exclusivos:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-700", children: [_jsx("li", { children: "Consultas ilimitadas sobre asuntos civiles" }), _jsx("li", { children: "Prioridad en la atenci\u00F3n de casos" }), _jsx("li", { children: "Descuentos en representaci\u00F3n legal" })] }), _jsx(Link, { to: "/afiliados", className: "mt-4 inline-block bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors", children: "Conocer programa de afiliados" })] })] })] })] })) }));
};
export default ConsultasCiviles;
