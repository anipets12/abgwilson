import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import ConsultasBase from './ConsultasBase';
const ConsultasTransito = () => {
    return (_jsx(ConsultasBase, { queryType: "transito", children: ({ handleQuery, queryCount, isLoading }) => (_jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [_jsx("h2", { className: "text-3xl font-bold text-blue-800 mb-6", children: "Consultas de Tr\u00E1nsito" }), !isLoading && (_jsxs("div", { className: "mb-6", children: [_jsxs("p", { className: "text-gray-600", children: ["Consultas restantes este mes: ", 5 - queryCount] }), queryCount >= 5 && (_jsx("p", { className: "text-red-600 font-medium mt-2", children: "Has alcanzado el l\u00EDmite de consultas. \u00A1Af\u00EDliate para consultas ilimitadas!" }))] })), _jsxs("div", { className: "bg-white shadow-lg rounded-lg p-6", children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Soluciones para Multas y Citaciones" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "border-l-4 border-yellow-600 pl-4", children: [_jsx("h4", { className: "font-medium text-lg", children: "Multas por Exceso de Velocidad" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Las multas por exceso de velocidad pueden tener graves consecuencias:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Sanciones econ\u00F3micas elevadas" }), _jsx("li", { children: "P\u00E9rdida de puntos en la licencia" }), _jsx("li", { children: "Posible suspensi\u00F3n temporal del permiso de conducir" })] }), _jsx("p", { className: "text-gray-600 mt-2", children: "Te ayudamos con:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Verificaci\u00F3n de procedimientos y equipos de radar" }), _jsx("li", { children: "Impugnaci\u00F3n basada en errores de procedimiento" }), _jsx("li", { children: "Negociaci\u00F3n para reducir la sanciones" })] }), _jsx("button", { onClick: handleQuery, disabled: queryCount >= 5, className: "mt-4 inline-block bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: "Consultar sobre mi multa" })] }), _jsxs("div", { className: "border-l-4 border-orange-600 pl-4", children: [_jsx("h4", { className: "font-medium text-lg", children: "Citaciones por Infracciones" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Las citaciones por estacionamiento, sem\u00E1foros o infracciones menores pueden acumularse:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Generaci\u00F3n de intereses por pagos atrasados" }), _jsx("li", { children: "Bloqueo de tr\u00E1mites administrativos" }), _jsx("li", { children: "Impedimento para renovar documentos" })] }), _jsx("p", { className: "text-gray-600 mt-2", children: "Nuestras soluciones:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Revisi\u00F3n del estado actual de las citaciones" }), _jsx("li", { children: "Planeaci\u00F3n de pagos o impugnaciones" }), _jsx("li", { children: "Representaci\u00F3n legal ante autoridades de tr\u00E1nsito" })] }), _jsx("button", { onClick: handleQuery, disabled: queryCount >= 5, className: "mt-4 inline-block bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: "Verificar mis citaciones" })] }), _jsxs("div", { className: "border-l-4 border-purple-600 pl-4", children: [_jsx("h4", { className: "font-medium text-lg", children: "Estado de Licencia y Puntos" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Problemas relacionados con licencias de conducir pueden generar:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Inhabilitaci\u00F3n para conducir veh\u00EDculos" }), _jsx("li", { children: "Complicaciones legales por conducir sin licencia v\u00E1lida" }), _jsx("li", { children: "Dificultades para contrataci\u00F3n en ciertos empleos" })] }), _jsx("p", { className: "text-gray-600 mt-2", children: "Te asistimos con:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-600", children: [_jsx("li", { children: "Verificaci\u00F3n de estado actual de la licencia" }), _jsx("li", { children: "Procedimientos de recuperaci\u00F3n de puntos" }), _jsx("li", { children: "Gesti\u00F3n para renovaciones y tr\u00E1mites especiales" })] }), _jsx("button", { onClick: handleQuery, disabled: queryCount >= 5, className: "mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: "Consultar mi licencia" })] }), _jsxs("div", { className: "mt-8 p-4 bg-blue-50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-lg text-blue-800", children: "\u00BFNecesitas consultas ilimitadas?" }), _jsx("p", { className: "text-gray-700 mt-2", children: "\u00DAnete a nuestro programa de afiliados y obt\u00E9n beneficios exclusivos:" }), _jsxs("ul", { className: "list-disc pl-6 mt-2 text-gray-700", children: [_jsx("li", { children: "Consultas ilimitadas sobre temas de tr\u00E1nsito" }), _jsx("li", { children: "Prioridad en la atenci\u00F3n de casos" }), _jsx("li", { children: "Descuentos en representaci\u00F3n legal" })] }), _jsx(Link, { to: "/afiliados", className: "mt-4 inline-block bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors", children: "Conocer programa de afiliados" })] })] })] })] })) }));
};
export default ConsultasTransito;
