import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { dataService } from '../../services/apiService';
const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        // Validar los datos de la tarjeta
        if (!cardNumber || !expiryDate || !cvv || !name) {
            setError('Por favor, complete todos los campos.');
            return;
        }
        // Simular el procesamiento del pago
        try {
            // Aquí iría la lógica real de procesamiento de pago
            setSuccess(true);
        }
        catch (err) {
            setError('Hubo un error al procesar el pago. Inténtelo de nuevo.');
        }
    };
    return (_jsxs("div", { className: "max-w-md mx-auto p-6 bg-white shadow-md rounded-lg", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Formulario de Pago" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "cardNumber", children: "N\u00FAmero de Tarjeta" }), _jsx("input", { type: "text", id: "cardNumber", value: cardNumber, onChange: (e) => setCardNumber(e.target.value), className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", placeholder: "1234 5678 9012 3456" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "expiryDate", children: "Fecha de Expiraci\u00F3n" }), _jsx("input", { type: "text", id: "expiryDate", value: expiryDate, onChange: (e) => setExpiryDate(e.target.value), className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", placeholder: "MM/AA" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "cvv", children: "CVV" }), _jsx("input", { type: "text", id: "cvv", value: cvv, onChange: (e) => setCvv(e.target.value), className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", placeholder: "123" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "name", children: "Nombre en la Tarjeta" }), _jsx("input", { type: "text", id: "name", value: name, onChange: (e) => setName(e.target.value), className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", placeholder: "Juan P\u00E9rez" })] }), error && _jsx("p", { className: "text-red-500 text-xs italic mb-4", children: error }), success && _jsx("p", { className: "text-green-500 text-xs italic mb-4", children: "Pago procesado con \u00E9xito." }), _jsx("button", { type: "submit", className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", children: "Pagar" })] })] }));
};
export default PaymentForm;
