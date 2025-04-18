import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const toggleChat = () => {
        setIsOpen(!isOpen);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Aquí iría la lógica para enviar el mensaje
            console.log('Mensaje enviado:', message);
            setMessage('');
        }
    };
    return (_jsx("div", { className: "fixed right-4 bottom-4 z-50", children: isOpen ? (_jsxs("div", { className: "bg-white rounded-lg shadow-xl w-80 overflow-hidden flex flex-col transition-all transform scale-100", children: [_jsxs("div", { className: "bg-blue-600 text-white p-4 flex justify-between items-center", children: [_jsx("h3", { className: "font-medium", children: "Chat con Abg. Wilson" }), _jsx("button", { onClick: toggleChat, className: "text-white focus:outline-none", "aria-label": "Cerrar chat", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })] }), _jsxs("div", { className: "flex-grow p-4 bg-gray-50 overflow-y-auto max-h-80", children: [_jsx("div", { className: "mb-2 text-center text-sm text-gray-500", children: "Bienvenido al chat de asistencia legal" }), _jsx("div", { className: "bg-blue-100 text-blue-800 p-2 rounded-lg rounded-tl-none max-w-xs ml-auto mb-2", children: "\u00BFEn qu\u00E9 puedo ayudarle hoy?" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-3 border-t border-gray-200 flex", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Escriba su mensaje...", className: "flex-grow rounded-l-lg px-3 py-2 border-t border-l border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { d: "M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" }) }) })] })] })) : (_jsx("button", { onClick: toggleChat, className: "flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500", "aria-label": "Abrir chat", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) }) })) }));
};
export default LiveChat;
