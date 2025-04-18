import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const BankTransfer = ({ amount }) => {
    const bankAccount = '2203728320'; // Número de cuenta de Pichincha actualizado
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleConfirm = () => {
        // Aquí se podría implementar un envío de notificación al administrador
        navigate('/gracias', {
            state: {
                paymentMethod: 'bank',
                amount: amount,
                status: 'pending'
            }
        });
    };
    return (_jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Datos para Transferencia Bancaria" }), _jsxs("div", { className: "space-y-3 text-gray-700", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Banco:" }), " Banco del Pichincha"] }), _jsx("button", { onClick: () => handleCopy('Banco del Pichincha'), className: "text-blue-500 hover:text-blue-700", children: copied ? _jsx(FaCheck, {}) : _jsx(FaCopy, {}) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Tipo de Cuenta:" }), " Corriente"] }), _jsx("button", { onClick: () => handleCopy('Corriente'), className: "text-blue-500 hover:text-blue-700", children: copied ? _jsx(FaCheck, {}) : _jsx(FaCopy, {}) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "N\u00FAmero de Cuenta:" }), " ", bankAccount] }), _jsx("button", { onClick: () => handleCopy(bankAccount), className: "text-blue-500 hover:text-blue-700", children: copied ? _jsx(FaCheck, {}) : _jsx(FaCopy, {}) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Beneficiario:" }), " Wilson Alexander Ipiales Guerron"] }), _jsx("button", { onClick: () => handleCopy('Wilson Alexander Ipiales Guerron'), className: "text-blue-500 hover:text-blue-700", children: copied ? _jsx(FaCheck, {}) : _jsx(FaCopy, {}) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Email:" }), " alexip2@hotmail.com"] }), _jsx("button", { onClick: () => handleCopy('alexip2@hotmail.com'), className: "text-blue-500 hover:text-blue-700", children: copied ? _jsx(FaCheck, {}) : _jsx(FaCopy, {}) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Monto a Transferir:" }), " $", amount] }), _jsx("button", { onClick: () => handleCopy(`$${amount}`), className: "text-blue-500 hover:text-blue-700", children: copied ? _jsx(FaCheck, {}) : _jsx(FaCopy, {}) })] })] }), _jsx("div", { className: "mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200", children: _jsx("p", { className: "text-yellow-700 text-sm", children: "Importante: Despu\u00E9s de realizar la transferencia, por favor env\u00EDe el comprobante al WhatsApp +593 988835269 o al correo alexip2@hotmail.com para confirmar su pago." }) }), _jsx("button", { onClick: handleConfirm, className: "w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors", children: "He realizado la transferencia" })] }));
};
export default BankTransfer;
