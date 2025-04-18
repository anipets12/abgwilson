import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';

import { FaCookieBite, FaTimes } from 'react-icons/fa';
const CookieConsent = () => {
    const [showConsent, setShowConsent] = useState(false);
    useEffect(() => {
        // Verificar si el usuario ya aceptó las cookies
        const consentAccepted = localStorage.getItem('cookieConsentAccepted');
        if (!consentAccepted) {
            // Mostrar el banner después de 2 segundos de carga de la página
            const timer = setTimeout(() => {
                setShowConsent(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);
    const handleAccept = () => {
        localStorage.setItem('cookieConsentAccepted', 'true');
        setShowConsent(false);
    };
    const handleClose = () => {
        setShowConsent(false);
        // Volverá a aparecer en la próxima sesión si no se acepta
    };
    return (_jsx(AnimatePresence, { children: showConsent && (_jsx(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 50 }, transition: { duration: 0.5 }, className: "fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg border-t border-gray-200", children: _jsx("div", { className: "container mx-auto max-w-6xl", children: _jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between", children: [_jsxs("div", { className: "flex items-start mb-4 md:mb-0 md:mr-8", children: [_jsx("div", { className: "text-primary-600 mr-4", children: _jsx(FaCookieBite, { className: "text-2xl text-blue-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold mb-2", children: "Valoramos su privacidad" }), _jsx("p", { className: "text-sm text-gray-600", children: "Utilizamos cookies y tecnolog\u00EDas similares para mejorar su experiencia en nuestro sitio, personalizar el contenido y ofrecer una navegaci\u00F3n m\u00E1s segura. Al hacer clic en \"Aceptar\", consiente el uso de estas tecnolog\u00EDas para procesar sus datos." }), _jsx("a", { href: "/privacidad", className: "text-sm text-blue-600 hover:underline mt-1 inline-block", children: "M\u00E1s informaci\u00F3n sobre nuestra pol\u00EDtica de cookies" })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: handleAccept, className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors", children: "Aceptar" }), _jsx("button", { onClick: handleClose, className: "p-2 text-gray-500 hover:text-gray-700", children: _jsx(FaTimes, {}) })] })] }) }) })) }));
};
export default CookieConsent;
