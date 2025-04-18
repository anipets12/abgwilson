import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
const ThankYou = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: 'min-h-screen flex flex-col items-center justify-center bg-gray-100', children: [_jsx("h1", { className: 'text-4xl font-bold text-green-600 mb-4', children: "\u00A1Gracias por tu compra!" }), _jsx("p", { className: 'text-lg text-gray-700', children: "Tu pago ha sido procesado exitosamente. Pronto recibir\u00E1s un correo con los detalles de tu compra." }), _jsx("button", { onClick: () => navigate('/dashboard'), className: 'mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700', children: "Ir a mi dashboard" })] }));
};
export default ThankYou;
