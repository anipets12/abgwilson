import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from 'react';
import PayPalButton from './PayPalButton';
import WhatsAppPayment from './WhatsAppPayment';
import BankTransfer from './BankTransfer';
const CheckoutForm = ({ serviceName, amount }) => {
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [_jsxs("h1", { className: "text-3xl font-bold text-blue-800 mb-8", children: ["Pagar por ", serviceName] }), _jsxs("div", { className: "bg-white shadow-lg rounded-lg p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Seleccione M\u00E9todo de Pago" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsxs("button", { onClick: () => setPaymentMethod('paypal'), className: `p-4 rounded-lg border ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'} transition-all`, children: [_jsx("img", { src: "/icons/paypal.svg", alt: "PayPal", className: "w-24 mx-auto mb-2" }), _jsx("span", { className: "text-sm font-medium", children: "Pagar con PayPal" })] }), _jsxs("button", { onClick: () => setPaymentMethod('whatsapp'), className: `p-4 rounded-lg border ${paymentMethod === 'whatsapp' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'} transition-all`, children: [_jsx("img", { src: "/icons/whatsapp.svg", alt: "WhatsApp", className: "w-24 mx-auto mb-2" }), _jsx("span", { className: "text-sm font-medium", children: "Transferencia por WhatsApp" })] }), _jsxs("button", { onClick: () => setPaymentMethod('bank'), className: `p-4 rounded-lg border ${paymentMethod === 'bank' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'} transition-all`, children: [_jsx("img", { src: "/icons/bank.svg", alt: "Banco", className: "w-24 mx-auto mb-2" }), _jsx("span", { className: "text-sm font-medium", children: "Dep\u00F3sito Bancario" })] })] }), _jsxs("div", { className: "mt-6", children: [paymentMethod === 'paypal' && _jsx(PayPalButton, { amount: amount }), paymentMethod === 'whatsapp' && _jsx(WhatsAppPayment, { amount: amount }), paymentMethod === 'bank' && _jsx(BankTransfer, { amount: amount })] })] })] }));
};
export default CheckoutForm;
