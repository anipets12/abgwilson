import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';

import { FaEnvelope, FaPaperPlane, FaBell, FaCheck } from 'react-icons/fa';
const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email)
            return;
        setLoading(true);
        // Simulación de envío a API (en implementación real conectaría con backend)
        setTimeout(() => {
            setSubscribed(true);
            setLoading(false);
        }, 1500);
    };
    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            alert("Este navegador no soporta notificaciones push");
            return;
        }
        try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                setNotificationsEnabled(true);
                // Aquí se registraría el service worker y se enviaría el token al servidor
                new Notification("Notificaciones Activadas", {
                    body: "Recibirá alertas sobre nuevos servicios y promociones legales",
                    icon: "/logo.png"
                });
            }
        }
        catch (error) {
            console.error("Error al solicitar permisos:", error);
        }
    };
    return (_jsx("section", { className: "bg-gray-50 py-16", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx("div", { className: "max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden", children: _jsxs("div", { className: "grid md:grid-cols-2", children: [_jsx("div", { className: "bg-blue-600 p-8 text-white", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, viewport: { once: true }, children: [_jsx("h3", { className: "text-2xl font-bold mb-4", children: "Mant\u00E9ngase Informado" }), _jsx("p", { className: "mb-6", children: "Suscr\u00EDbase a nuestro bolet\u00EDn legal para recibir:" }), _jsxs("ul", { className: "space-y-3 mb-6", children: [_jsxs("li", { className: "flex items-start", children: [_jsx(FaCheck, { className: "mt-1 mr-2 flex-shrink-0" }), _jsx("span", { children: "Cambios importantes en la legislaci\u00F3n ecuatoriana" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx(FaCheck, { className: "mt-1 mr-2 flex-shrink-0" }), _jsx("span", { children: "Consejos legales gratuitos para negocios y personas" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx(FaCheck, { className: "mt-1 mr-2 flex-shrink-0" }), _jsx("span", { children: "Ofertas exclusivas en servicios legales" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx(FaCheck, { className: "mt-1 mr-2 flex-shrink-0" }), _jsx("span", { children: "Invitaciones a eventos y seminarios" })] })] }), _jsx("div", { className: "border-t border-blue-400 pt-4", children: _jsx("p", { className: "text-sm opacity-80", children: "Sus datos est\u00E1n seguros con nosotros. Consulte nuestra pol\u00EDtica de privacidad para m\u00E1s informaci\u00F3n." }) })] }) }), _jsx("div", { className: "p-8", children: !subscribed ? (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, viewport: { once: true }, children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(FaEnvelope, { className: "text-blue-600 text-xl mr-3" }), _jsx("h3", { className: "text-xl font-bold", children: "Suscr\u00EDbase a nuestro bolet\u00EDn" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", htmlFor: "email", children: "Correo Electr\u00F3nico" }), _jsx("input", { type: "email", id: "email", value: email, onChange: handleEmailChange, className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "ejemplo@correo.com", required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center", children: loading ? ('Procesando...') : (_jsxs(_Fragment, { children: ["Suscribirse ", _jsx(FaPaperPlane, { className: "ml-2" })] })) })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(FaBell, { className: "text-blue-600 text-xl mr-3" }), _jsx("h4", { className: "font-medium", children: "Notificaciones Push" })] }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Active las notificaciones para recibir alertas sobre nuevos contenidos y promociones." }), _jsx("button", { onClick: requestNotificationPermission, disabled: notificationsEnabled, className: `w-full py-2 px-4 rounded-lg border border-blue-600 flex items-center justify-center transition-colors ${notificationsEnabled
                                                    ? 'bg-green-50 text-green-700 border-green-600'
                                                    : 'bg-white text-blue-600 hover:bg-blue-50'}`, children: notificationsEnabled ? (_jsxs(_Fragment, { children: [_jsx(FaCheck, { className: "mr-2" }), " Notificaciones Activadas"] })) : (_jsxs(_Fragment, { children: [_jsx(FaBell, { className: "mr-2" }), " Activar Notificaciones"] })) })] })] })) : (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, className: "h-full flex flex-col items-center justify-center text-center", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4", children: _jsx(FaCheck, { className: "text-green-600 text-2xl" }) }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "\u00A1Gracias por suscribirse!" }), _jsxs("p", { className: "text-gray-600 mb-6", children: ["Hemos enviado un correo de confirmaci\u00F3n a ", _jsx("span", { className: "font-medium", children: email }), ". Por favor revise su bandeja de entrada para completar la suscripci\u00F3n."] }), !notificationsEnabled && (_jsxs("button", { onClick: requestNotificationPermission, className: "text-blue-600 hover:underline flex items-center", children: [_jsx(FaBell, { className: "mr-2" }), " Activar notificaciones push"] }))] })) })] }) }) }) }));
};
export default Newsletter;
