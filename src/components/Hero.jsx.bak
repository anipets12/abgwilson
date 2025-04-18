import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaCalendarAlt, FaArrowRight, FaUserTie, FaShieldAlt, FaFileContract, FaClock } from 'react-icons/fa';
const Hero = () => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    // Fecha para la oferta de tiempo limitado (15 días desde hoy)
    const offerEndDate = new Date();
    offerEndDate.setDate(offerEndDate.getDate() + 15);
    // Actualizar la cuenta regresiva
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const distance = offerEndDate - now;
            setCountdown({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    // Variantes de animación
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };
    // Servicios destacados
    const featuredServices = [
        {
            id: 1,
            title: 'Derecho Penal',
            description: 'Defensa especializada en casos penales',
            icon: _jsx(FaShieldAlt, { className: "text-white text-2xl" }),
            link: '/servicios/penal'
        },
        {
            id: 2,
            title: 'Derecho Civil',
            description: 'Resolución de conflictos civiles y patrimoniales',
            icon: _jsx(FaFileContract, { className: "text-white text-2xl" }),
            link: '/servicios/civil'
        },
        {
            id: 3,
            title: 'Consulta Rápida',
            description: 'Respuestas inmediatas a sus dudas legales',
            icon: _jsx(FaClock, { className: "text-white text-2xl" }),
            link: '/consultas'
        }
    ];
    return (_jsxs("div", { className: "relative bg-gradient-to-br from-primary-900 via-primary-800 to-blue-900 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-10", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", children: [_jsx("defs", { children: _jsx("pattern", { id: "grid", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: _jsx("path", { d: "M 0 10 L 40 10 M 10 0 L 10 40", stroke: "white", strokeWidth: "1", fill: "none" }) }) }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#grid)" })] }) }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 }, className: "z-10 text-center lg:text-left", children: [_jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6", children: "Abg. Wilson Alexander Ipiales Guerron" }), _jsx("p", { className: "text-xl sm:text-2xl text-blue-100 mb-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0", children: "Con m\u00E1s de 5 a\u00F1os de experiencia y m\u00E1s de 50 casos ganados exitosamente, ofrecemos soluciones legales efectivas y personalizadas. M\u00E1s de 200 clientes satisfechos conf\u00EDan en nuestra experiencia y dedicaci\u00F3n." }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4", children: [_jsxs(Link, { to: "/contacto", className: "bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 shadow-lg inline-flex items-center justify-center", children: ["Consulta Gratis", _jsx(FaArrowRight, { className: "ml-2" })] }), _jsxs("a", { href: `https://wa.me/593988835269?text=Hola%20Abg.%20Wilson,%20necesito%20asesoría%20legal.`, target: "_blank", rel: "noopener noreferrer", className: "flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all", children: [_jsx(FaWhatsapp, { className: "mr-2 text-xl" }), "Chatear Ahora"] }), _jsxs(Link, { to: "/calendario", className: "flex-1 bg-white hover:bg-blue-50 text-primary-700 font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all", children: [_jsx(FaCalendarAlt, { className: "mr-2 text-xl" }), "Agendar Cita"] })] })] }), _jsx("div", { className: "lg:w-full", children: _jsxs(motion.div, { className: "grid gap-4 md:grid-cols-2", variants: containerVariants, initial: "hidden", animate: "visible", children: [featuredServices.map((service, index) => (_jsx(motion.div, { className: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-white/20 transition-all group", variants: itemVariants, whileHover: { y: -5, transition: { duration: 0.2 } }, children: _jsxs(Link, { to: service.link, className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center mb-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-primary-700 mr-3", children: service.icon }), _jsx("h3", { className: "text-lg font-bold text-white", children: service.title })] }), _jsx("p", { className: "text-sm text-blue-100 mb-3", children: service.description }), _jsxs("div", { className: "mt-auto pt-3 border-t border-white/10 flex justify-between items-center", children: [_jsx("span", { className: "text-xs text-blue-200", children: "Ver detalles" }), _jsx("div", { className: "bg-white/20 rounded-full p-1 group-hover:bg-primary-700 transition-all", children: _jsx(FaArrowRight, { className: "text-white text-xs" }) })] })] }) }, service.id))), _jsxs(motion.div, { className: "md:col-span-2 bg-gradient-to-r from-primary-700 to-primary-800 border border-primary-600 rounded-xl p-5", variants: itemVariants, children: [_jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Resultados Probados" }), _jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-yellow-400", children: "5+" }), _jsx("div", { className: "text-xs text-blue-100", children: "A\u00F1os de Experiencia" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-yellow-400", children: "50+" }), _jsx("div", { className: "text-xs text-blue-100", children: "Casos Ganados" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-yellow-400", children: "200+" }), _jsx("div", { className: "text-xs text-blue-100", children: "Clientes Satisfechos" })] })] })] })] }) })] }), _jsxs(motion.div, { className: "bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20", variants: itemVariants, children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx("span", { className: "bg-red-500 text-white text-xs font-bold px-2 py-1 rounded", children: "OFERTA ESPECIAL" }), _jsx("span", { className: "ml-2 text-white font-medium", children: "\u00A1Tiempo Limitado!" })] }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Primera Consulta Legal GRATUITA" }), _jsx("p", { className: "text-sm text-blue-100 mb-3", children: "Reciba asesoramiento legal personalizado sin costo. Oferta v\u00E1lida solo por:" }), _jsxs("div", { className: "flex justify-center space-x-4 mb-3", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "bg-primary-700 text-white rounded-md px-3 py-2 font-mono text-xl font-bold", children: countdown.days }), _jsx("span", { className: "text-xs text-blue-200 mt-1", children: "D\u00EDas" })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "bg-primary-700 text-white rounded-md px-3 py-2 font-mono text-xl font-bold", children: countdown.hours }), _jsx("span", { className: "text-xs text-blue-200 mt-1", children: "Horas" })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "bg-primary-700 text-white rounded-md px-3 py-2 font-mono text-xl font-bold", children: countdown.minutes }), _jsx("span", { className: "text-xs text-blue-200 mt-1", children: "Min" })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "bg-primary-700 text-white rounded-md px-3 py-2 font-mono text-xl font-bold", children: countdown.seconds }), _jsx("span", { className: "text-xs text-blue-200 mt-1", children: "Seg" })] })] }), _jsxs(Link, { to: "/contacto", className: "w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-primary-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105", children: ["Reservar Mi Consulta Gratuita", _jsx(FaArrowRight, { className: "ml-2" })] })] })] }) })] }));
};
export default Hero;
