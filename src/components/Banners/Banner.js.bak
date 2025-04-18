import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
const Banner = ({ title, description, image, link, buttonText = 'Ver Más', type = 'primary', countdown = null, discount = null }) => {
    // Configuraciones para diferentes tipos de banners
    const bannerStyles = {
        primary: 'bg-gradient-to-r from-blue-900 to-indigo-800',
        offer: 'bg-gradient-to-r from-orange-600 to-red-600',
        info: 'bg-gradient-to-r from-gray-700 to-gray-900'
    };
    // Calcular tiempo restante para ofertas con countdown
    const getTimeRemaining = () => {
        if (!countdown)
            return null;
        const currentTime = new Date();
        const endTime = new Date(countdown);
        const timeRemaining = endTime - currentTime;
        if (timeRemaining <= 0)
            return null;
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        return { days, hours, minutes };
    };
    const timeRemaining = getTimeRemaining();
    return (_jsxs("div", { className: `relative overflow-hidden rounded-xl shadow-xl ${bannerStyles[type]} my-8`, children: [_jsx("div", { className: "absolute inset-0 overflow-hidden", children: _jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-20 transition-transform duration-700 hover:scale-110", style: { backgroundImage: `url(${image})` } }) }), _jsxs("div", { className: "relative z-10 px-6 py-10 md:px-12 md:py-16 flex flex-col md:flex-row items-center", children: [_jsxs("div", { className: "md:w-2/3", children: [_jsx(motion.h2, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-3xl md:text-4xl font-bold text-white mb-4", children: title }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1 }, className: "text-lg text-gray-100 mb-6 max-w-2xl", children: description }), timeRemaining && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2 }, className: "flex space-x-4 mb-6", children: [_jsxs("div", { className: "bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 text-center", children: [_jsx("span", { className: "block text-2xl font-bold text-white", children: timeRemaining.days }), _jsx("span", { className: "text-xs text-gray-200", children: "D\u00CDAS" })] }), _jsxs("div", { className: "bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 text-center", children: [_jsx("span", { className: "block text-2xl font-bold text-white", children: timeRemaining.hours }), _jsx("span", { className: "text-xs text-gray-200", children: "HORAS" })] }), _jsxs("div", { className: "bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 text-center", children: [_jsx("span", { className: "block text-2xl font-bold text-white", children: timeRemaining.minutes }), _jsx("span", { className: "text-xs text-gray-200", children: "MINUTOS" })] })] })), discount && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 0.3 }, className: "inline-block bg-yellow-500 text-yellow-900 font-bold px-4 py-2 rounded-full mb-6", children: ["\u00A1", discount, "% DE DESCUENTO!"] })), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3 }, children: _jsxs(Link, { to: link, className: "inline-flex items-center px-6 py-3 bg-white text-blue-800 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300", children: [buttonText, _jsx(FaArrowRight, { className: "ml-2" })] }) })] }), type === 'offer' && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8, rotate: -5 }, whileInView: { opacity: 1, scale: 1, rotate: 0 }, transition: { duration: 0.6, delay: 0.4 }, className: "hidden md:block md:w-1/3 mt-8 md:mt-0", children: _jsxs("div", { className: "bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20 transform rotate-3 hover:rotate-0 transition-transform duration-300", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Oferta Especial" }), _jsx("p", { className: "text-gray-200 mb-4", children: "\u00A1No pierdas esta oportunidad \u00FAnica! Tiempo limitado." }), _jsx("div", { className: "text-3xl font-bold text-yellow-300", children: discount && `${discount}% OFF` })] }) }))] })] }));
};
export default Banner;
