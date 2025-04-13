import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const WhatsAppPayment = ({ amount }) => {
    const navigate = useNavigate();
    const handleWhatsAppPayment = () => {
        const message = encodeURIComponent(`Hola Abg. Wilson Ipiales, deseo realizar un pago de $${amount} por sus servicios legales.\n\nPor favor, indíqueme los pasos a seguir para completar el pago.`);
        window.open(`https://wa.me/593988835269?text=${message}`, '_blank');
        // Opcionalmente, redirigimos al usuario a la página de gracias después de abrir WhatsApp
        setTimeout(() => {
            navigate('/gracias', {
                state: {
                    paymentMethod: 'whatsapp',
                    amount: amount,
                    status: 'pending'
                }
            });
        }, 2000);
    };
    return (_jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Pago v\u00EDa WhatsApp" }), _jsx("p", { className: "text-gray-700 mb-4", children: "Al hacer clic en el bot\u00F3n, se abrir\u00E1 una conversaci\u00F3n de WhatsApp con el Abg. Wilson Ipiales donde podr\u00E1 coordinar su pago de manera segura." }), _jsx("div", { className: "bg-green-50 p-4 rounded-lg border border-green-200 mb-6", children: _jsxs("p", { className: "text-green-800 text-sm", children: [_jsx("strong", { children: "Ventajas:" }), " Asistencia personalizada, confirmaci\u00F3n inmediata y aclaraci\u00F3n de cualquier duda sobre su consulta legal."] }) }), _jsx("p", { className: "text-gray-600 text-sm mb-6", children: "N\u00FAmero de contacto: +593 988 835 269" }), _jsxs("button", { onClick: handleWhatsAppPayment, className: "w-full flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors", children: [_jsx(FaWhatsapp, { className: "mr-2 text-xl" }), "Contactar para pagar $", amount] })] }));
};
export default WhatsAppPayment;
