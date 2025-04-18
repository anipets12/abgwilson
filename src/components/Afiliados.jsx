import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';

import { Link } from 'react-router-dom';
import { FaUsers, FaMoneyBillWave, FaLink, FaUserFriends, FaCheckCircle, FaRocket, FaQuestion } from 'react-icons/fa';
const Afiliados = () => {
    const features = [
        {
            icon: _jsx(FaMoneyBillWave, { className: "text-green-500 text-3xl" }),
            title: 'Comisiones Atractivas',
            description: 'Gana hasta un 25% de comisión por cada cliente que refieras a nuestros servicios legales.'
        },
        {
            icon: _jsx(FaLink, { className: "text-blue-500 text-3xl" }),
            title: 'Enlaces Personalizados',
            description: 'Recibe tu propio enlace de referido para compartir en tus redes sociales o sitio web.'
        },
        {
            icon: _jsx(FaUserFriends, { className: "text-purple-500 text-3xl" }),
            title: 'Sin Límite de Referidos',
            description: 'Puedes referir a tantos clientes como desees, sin restricciones ni límites mensuales.'
        },
        {
            icon: _jsx(FaRocket, { className: "text-red-500 text-3xl" }),
            title: 'Pagos Rápidos',
            description: 'Recibe tus comisiones directamente en tu cuenta bancaria o PayPal cada mes.'
        }
    ];
    const steps = [
        {
            number: 1,
            title: 'Regístrate en nuestro programa',
            description: 'Completa el formulario de registro para obtener acceso a tus herramientas de afiliado.'
        },
        {
            number: 2,
            title: 'Obtiene tu enlace único',
            description: 'Dentro de tu panel de afiliado, encontrarás tu enlace personalizado.'
        },
        {
            number: 3,
            title: 'Comparte con tu audiencia',
            description: 'Promociona nuestros servicios legales a través de tu página web, redes sociales o correo.'
        },
        {
            number: 4,
            title: 'Recibe comisiones',
            description: 'Gana dinero por cada cliente que contrate nuestros servicios a través de tu enlace.'
        }
    ];
    const faqs = [
        {
            question: '¿Quién puede participar en el programa de afiliados?',
            answer: 'Cualquier persona mayor de edad puede participar. Es especialmente adecuado para abogados, consultores, creadores de contenido legal, influencers y profesionales con audiencia interesada en servicios legales.'
        },
        {
            question: '¿Cuánto puedo ganar como afiliado?',
            answer: 'Ofrecemos una comisión del 25% sobre el primer pago de cualquier servicio contratado a través de tu enlace. Por ejemplo, si refieres a un cliente que contrata un servicio de $200, recibirás $50.'
        },
        {
            question: '¿Cuánto tiempo permanece activo mi enlace de referido?',
            answer: 'Nuestras cookies de seguimiento tienen una duración de 30 días, lo que significa que si alguien hace clic en tu enlace, tienes hasta 30 días para recibir comisiones por cualquier compra que realicen.'
        },
        {
            question: '¿Cómo y cuándo recibo mis pagos?',
            answer: 'Los pagos se procesan mensualmente para todas las comisiones acumuladas que superen los $50. Puedes elegir recibir tus pagos por transferencia bancaria o PayPal.'
        }
    ];
    return (_jsxs("div", { className: "bg-white", children: [_jsx("div", { className: "bg-gradient-to-r from-blue-800 to-indigo-900 py-20 px-4", children: _jsxs("div", { className: "container-custom text-center", children: [_jsx(motion.h1, { className: "text-4xl md:text-5xl font-bold text-white mb-6", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: "Programa de Afiliados" }), _jsx(motion.p, { className: "text-xl text-blue-200 mb-8 max-w-3xl mx-auto", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 }, children: "Gana dinero recomendando nuestros servicios legales de calidad a tus conocidos, amigos o seguidores" }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, children: _jsxs(Link, { to: "/afiliados/registro", className: "bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg inline-flex items-center transition-colors duration-300 shadow-lg", children: ["Unirme al Programa", _jsx(FaUsers, { className: "ml-2" })] }) })] }) }), _jsx("div", { className: "py-16 bg-gray-50", children: _jsxs("div", { className: "container-custom", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Beneficios de Nuestro Programa" }), _jsx("p", { className: "text-lg text-gray-600 max-w-3xl mx-auto", children: "Descubre por qu\u00E9 nuestro programa de afiliados es una excelente oportunidad para generar ingresos adicionales" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature, index) => (_jsxs(motion.div, { className: "bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 * index }, whileHover: { y: -5, transition: { duration: 0.2 } }, children: [_jsx("div", { className: "mb-4 flex justify-center", children: feature.icon }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: feature.title }), _jsx("p", { className: "text-gray-600", children: feature.description })] }, index))) })] }) }), _jsx("div", { className: "py-16", children: _jsxs("div", { className: "container-custom", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "C\u00F3mo Funciona" }), _jsx("p", { className: "text-lg text-gray-600 max-w-3xl mx-auto", children: "Comienza a generar ingresos con estos simples pasos" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: steps.map((step, index) => (_jsxs(motion.div, { className: "relative", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3 * index }, children: [_jsx("div", { className: "bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-800 font-bold text-xl mb-4 mx-auto", children: step.number }), index < steps.length - 1 && (_jsx("div", { className: "hidden lg:block absolute top-6 left-1/2 w-full h-0.5 bg-blue-200" })), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2 text-center", children: step.title }), _jsx("p", { className: "text-gray-600 text-center", children: step.description })] }, index))) })] }) }), _jsx("div", { className: "bg-blue-700 py-16", children: _jsxs("div", { className: "container-custom text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Comienza a Ganar Hoy Mismo" }), _jsx("p", { className: "text-xl text-blue-200 mb-8 max-w-3xl mx-auto", children: "Nuestro programa de afiliados es completamente gratuito y f\u00E1cil de usar" }), _jsx(Link, { to: "/afiliados/registro", className: "bg-white hover:bg-blue-50 text-blue-700 font-bold py-3 px-8 rounded-lg text-lg inline-flex items-center transition-all duration-300 shadow-lg", children: "Registrarme como Afiliado" })] }) }), _jsx("div", { className: "py-16 bg-gray-50", children: _jsxs("div", { className: "container-custom", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: [_jsx(FaQuestion, { className: "inline-block mr-2 text-blue-600" }), "Preguntas Frecuentes"] }), _jsx("p", { className: "text-lg text-gray-600 max-w-3xl mx-auto", children: "Resolvemos tus dudas sobre nuestro programa de afiliados" })] }), _jsx("div", { className: "max-w-4xl mx-auto space-y-6", children: faqs.map((faq, index) => (_jsx(motion.div, { className: "bg-white rounded-lg shadow-md overflow-hidden", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 * index }, children: _jsxs("div", { className: "p-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-gray-900 mb-2 flex items-start", children: [_jsx(FaCheckCircle, { className: "text-green-500 mr-2 mt-1 flex-shrink-0" }), _jsx("span", { children: faq.question })] }), _jsx("p", { className: "text-gray-600 pl-7", children: faq.answer })] }) }, index))) })] }) }), _jsx("div", { className: "bg-gray-100 py-8 border-t border-gray-200", children: _jsx("div", { className: "container-custom text-center", children: _jsxs("p", { className: "text-gray-600", children: ["\u00BFTienes m\u00E1s preguntas sobre nuestro programa de afiliados? ", _jsx(Link, { to: "/contacto", className: "text-blue-600 hover:underline", children: "Cont\u00E1ctanos" })] }) }) })] }));
};
export default Afiliados;
