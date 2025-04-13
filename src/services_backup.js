import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGavel, FaBalanceScale, FaCarCrash, FaShip, FaBuilding, FaHandshake, FaFileContract, FaUserTie, FaMoneyBillWave } from 'react-icons/fa';
// Paquetes de suscripciÃ³n
const packages = [
    {
        name: 'Normal',
        price: 29.99,
        description: 'Ideal para consultas bÃ¡sicas y asesorÃ­a legal inicial',
        features: [
            'Consultas BÃ¡sicas del Consejo de la Judicatura',
            'Consultas de servicios del SRI',
            'Sesiones bÃ¡sicas de asesorÃ­a legal (2 por mes)',
            'Acceso al Blog Legal con artÃ­culos actualizados',
            'Notificaciones de actualizaciones legales'
        ],
        color: 'bg-white',
        popular: false
    },
    {
        name: 'Intermedio',
        price: 49.99,
        description: 'Perfecto para necesidades legales mÃ¡s especÃ­ficas',
        features: [
            'Consultas de causas penales y civiles',
            'Consultas de multas de trÃ¡nsito',
            'Sesiones avanzadas de asesorÃ­a legal (4 por mes)',
            'Acceso a cursos y eBooks legales premium',
            'Descuentos en servicios adicionales',
            'Acceso al Blog Legal con contenido exclusivo'
        ],
        color: 'bg-primary-50',
        popular: true
    },
    {
        name: 'Premium',
        price: 99.99,
        description: 'Servicio legal completo y personalizado',
        features: [
            'Acceso ilimitado a todas las consultas disponibles',
            'Sesiones premium de asesorÃ­a legal (8 por mes)',
            'Acceso completo a biblioteca de cursos y eBooks',
            'NFTs y servicios Blockchain exclusivos',
            'RedacciÃ³n ilimitada de certificados y documentos',
            'Prioridad en atenciÃ³n al cliente 24/7',
            'Acceso VIP al Blog Legal'
        ],
        color: 'bg-primary-100',
        popular: false
    }
];
// Servicios de patrocinio legal
const legalServices = [
    {
        id: 'penal',
        title: 'Patrocinio en Causas Penales',
        description: 'Defensa integral en procesos penales, audiencias y recursos',
        price: 'Desde $500',
        icon: _jsx(FaGavel, { className: "text-red-600 text-3xl mb-4" }),
        features: [
            'Defensa en delitos contra la propiedad',
            'RepresentaciÃ³n en delitos de trÃ¡nsito',
            'Defensa en delitos contra la integridad personal',
            'Recursos de apelaciÃ³n y casaciÃ³n',
            'Medidas alternativas a la prisiÃ³n preventiva'
        ]
    },
    {
        id: 'civil',
        title: 'Patrocinio en Causas Civiles',
        description: 'RepresentaciÃ³n en litigios civiles, contratos y reclamaciones',
        price: 'Desde $500',
        icon: _jsx(FaBalanceScale, { className: "text-blue-600 text-3xl mb-4" }),
        features: [
            'Juicios de cobro de deudas',
            'Litigios por incumplimiento de contratos',
            'Procesos de prescripciÃ³n adquisitiva',
            'Reclamaciones por daÃ±os y perjuicios',
            'Cobro de pensiones alimenticias'
        ]
    },
    {
        id: 'constitucional',
        title: 'Acciones Constitucionales',
        description: 'ProtecciÃ³n de derechos fundamentales mediante garantÃ­as constitucionales',
        price: 'Desde $600',
        icon: _jsx(FaFileContract, { className: "text-yellow-600 text-3xl mb-4" }),
        features: [
            'Acciones de protecciÃ³n',
            'Habeas corpus',
            'Habeas data',
            'Acciones de acceso a la informaciÃ³n',
            'Medidas cautelares constitucionales'
        ]
    },
    {
        id: 'transito',
        title: 'Derecho de TrÃ¡nsito',
        description: 'AsesorÃ­a y defensa en infracciones y accidentes de trÃ¡nsito',
        price: 'Desde $400',
        icon: _jsx(FaCarCrash, { className: "text-green-600 text-3xl mb-4" }),
        features: [
            'ImpugnaciÃ³n de multas',
            'Defensa en contravenciones',
            'RepresentaciÃ³n en accidentes de trÃ¡nsito',
            'RecuperaciÃ³n de licencias',
            'Reclamaciones a aseguradoras'
        ]
    },
    {
        id: 'comercial',
        title: 'Derecho Comercial',
        description: 'AsesorÃ­a legal para empresas, contratos y operaciones mercantiles',
        price: 'Desde $550',
        icon: _jsx(FaBuilding, { className: "text-indigo-600 text-3xl mb-4" }),
        features: [
            'ConstituciÃ³n de compaÃ±Ã­as',
            'Contratos mercantiles',
            'ProtecciÃ³n de propiedad intelectual',
            'Litigios comerciales',
            'AsesorÃ­a societaria permanente'
        ]
    },
    {
        id: 'aduanas',
        title: 'Derecho Aduanero',
        description: 'RepresentaciÃ³n en trÃ¡mites y litigios aduaneros',
        price: 'Desde $450',
        icon: _jsx(FaShip, { className: "text-cyan-600 text-3xl mb-4" }),
        features: [
            'LiberaciÃ³n de mercancÃ­as retenidas',
            'Recursos administrativos aduaneros',
            'ClasificaciÃ³n arancelaria',
            'RegÃ­menes aduaneros especiales',
            'Litigios por infracciones aduaneras'
        ]
    },
    {
        id: 'laboral',
        title: 'Derecho Laboral',
        description: 'AsesorÃ­a en relaciones laborales para empleadores y trabajadores',
        price: 'Desde $450',
        icon: _jsx(FaUserTie, { className: "text-orange-600 text-3xl mb-4" }),
        features: [
            'Demandas por despido intempestivo',
            'ReclamaciÃ³n de beneficios sociales',
            'Visto bueno y desahucio',
            'Contratos laborales',
            'Conflictos colectivos'
        ]
    },
    {
        id: 'cobros',
        title: 'Cobro de Deudas',
        description: 'GestiÃ³n efectiva para recuperaciÃ³n de valores adeudados',
        price: 'Desde $350',
        icon: _jsx(FaMoneyBillWave, { className: "text-emerald-600 text-3xl mb-4" }),
        features: [
            'Juicios ejecutivos',
            'Cobro de letras de cambio y pagarÃ©s',
            'Procedimientos monitorios',
            'Cobro de pensiones alimenticias',
            'NegociaciÃ³n de acuerdos de pago'
        ]
    }
];
export default function Services() {
    const [hoveredPackage, setHoveredPackage] = useState(null);
    const [hoveredService, setHoveredService] = useState(null);
    return (_jsx("div", { className: "py-12 bg-secondary-50", children: _jsxs("div", { className: "container-custom", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "section-title", children: "Nuestros Servicios" }), _jsx("p", { className: "text-xl text-secondary-600 mb-6", children: "Soluciones legales profesionales para todas sus necesidades" })] }), _jsxs("div", { className: "mb-16", children: [_jsxs("h3", { className: "text-2xl font-bold text-secondary-900 mb-8 flex items-center", children: [_jsx(FaGavel, { className: "mr-2 text-primary-600" }), " Servicios de Patrocinio Legal"] }), _jsx("p", { className: "text-lg text-secondary-600 mb-8", children: "Representaci\u00C3\u00B3n legal profesional en todas las \u00C3\u00A1reas del derecho. Nuestros servicios de patrocinio incluyen asesor\u00C3\u00ADa completa, representaci\u00C3\u00B3n en audiencias y seguimiento de su caso hasta su resoluci\u00C3\u00B3n." }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12", children: legalServices.map((service, index) => (_jsx(motion.div, { className: "bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-primary-200 transition-all duration-300", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, onHoverStart: () => setHoveredService(service.id), onHoverEnd: () => setHoveredService(null), children: _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "flex justify-center", children: service.icon }), _jsx("h4", { className: "text-xl font-bold text-secondary-900 mb-2 text-center", children: service.title }), _jsx("p", { className: "text-secondary-600 mb-4 text-center", children: service.description }), _jsx("div", { className: "text-xl font-bold text-primary-600 mb-4 text-center", children: service.price }), _jsx("ul", { className: "space-y-2 mb-6", children: service.features.map((feature, idx) => (_jsxs(motion.li, { className: "flex items-start text-secondary-700 text-sm", initial: { opacity: 0, x: -5 }, animate: {
                                                    opacity: 1,
                                                    x: 0,
                                                    scale: hoveredService === service.id ? 1.02 : 1
                                                }, transition: { duration: 0.2, delay: idx * 0.05 }, children: [_jsx("svg", { className: "w-4 h-4 text-primary-600 mr-2 mt-1 flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }), feature] }, idx))) }), _jsx(Link, { to: `/servicios/${service.id}`, children: _jsxs(motion.button, { className: "w-full btn-secondary flex items-center justify-center space-x-2", whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, children: [_jsx("span", { children: "M\u00C3\u00A1s Informaci\u00C3\u00B3n" }), _jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })] }) })] }) }, service.id))) })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-2xl font-bold text-secondary-900 mb-8 flex items-center", children: [_jsx(FaHandshake, { className: "mr-2 text-primary-600" }), " Planes de Suscripci\u00C3\u00B3n"] }), _jsx("p", { className: "text-lg text-secondary-600 mb-8", children: "Elija el plan que mejor se adapte a sus necesidades legales y obtenga acceso a nuestros servicios de consultor\u00C3\u00ADa y asesor\u00C3\u00ADa continua." }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: packages.map((pkg, index) => (_jsxs(motion.div, { className: `${pkg.color} rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105 ${pkg.popular ? 'border-2 border-primary-400 relative' : 'border border-gray-100'}`, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.2 }, onHoverStart: () => setHoveredPackage(pkg.name), onHoverEnd: () => setHoveredPackage(null), children: [pkg.popular && (_jsx("div", { className: "absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold", children: "M\u00C3\u00A1s Popular" })), _jsxs("div", { className: "text-center mb-8", children: [_jsx("h3", { className: "text-2xl font-bold text-secondary-900 mb-4", children: pkg.name }), _jsxs("div", { className: "text-4xl font-bold text-primary-600 mb-4", children: ["$", pkg.price, _jsx("span", { className: "text-base font-normal text-secondary-600", children: "/mes" })] })] }), _jsx("ul", { className: "space-y-4 mb-8", children: pkg.features.map((feature) => (_jsxs(motion.li, { className: "flex items-center text-secondary-700", initial: { opacity: 0, x: -10 }, animate: {
                                                opacity: 1,
                                                x: 0,
                                                scale: hoveredPackage === pkg.name ? 1.05 : 1
                                            }, transition: { duration: 0.2 }, children: [_jsx("svg", { className: "w-5 h-5 text-primary-600 mr-3 flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }), feature] }, feature))) }), _jsxs(motion.button, { className: "w-full btn-primary flex items-center justify-center space-x-2", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => window.location.href = '/contacto', children: [_jsx("span", { children: "Comenzar Ahora" }), _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })] })] }, pkg.name))) })] })] }) }));
}
