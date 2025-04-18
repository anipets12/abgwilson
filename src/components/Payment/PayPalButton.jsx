import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const PayPalButton = ({ amount }) => {
    const paypalRef = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        // Cargar el script de PayPal
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AYgjCNgWXLjGXcZAw2ht7V40l7cqF6JEqPzZgP9QoKQJBNB53cEZKGkPJHoZi5diyYP_OTmPbyvKQxDg&currency=USD`;
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [amount]);
    const setLoaded = () => {
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: 'Servicios legales - Abg. Wilson Ipiales',
                                amount: {
                                    currency_code: 'USD',
                                    value: amount
                                }
                            }
                        ],
                        application_context: {
                            shipping_preference: 'NO_SHIPPING'
                        }
                    });
                },
                onApprove: async (data, actions) => {
                    try {
                        const order = await actions.order.capture();
                        console.log('Pago completado', order);
                        // Aquí puedes guardar la información del pago en tu base de datos
                        // usando Supabase antes de redirigir
                        // Redirigir a página de agradecimiento
                        navigate('/gracias', {
                            state: {
                                paymentId: order.id,
                                amount: amount,
                                status: 'completed'
                            }
                        });
                    }
                    catch (error) {
                        console.error('Error al procesar el pago:', error);
                        alert('Hubo un problema al procesar su pago. Por favor, inténtelo de nuevo.');
                    }
                },
                onError: (err) => {
                    console.error('Error PayPal:', err);
                    alert('Ocurrió un error con PayPal. Por favor, inténtelo más tarde.');
                }
            }).render(paypalRef.current);
        }
    };
    return (_jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg mb-4", children: [_jsx("p", { className: "text-sm text-gray-700 mb-2", children: "Detalles del pago:" }), _jsxs("p", { className: "text-lg font-semibold", children: ["$", amount, " USD"] }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Pagos seguros procesados por PayPal" })] }), _jsx("div", { ref: paypalRef, className: "mt-4" }), _jsx("p", { className: "text-xs text-gray-500 mt-4 text-center", children: "Al completar el pago, usted acepta nuestros t\u00E9rminos y condiciones." })] }));
};
export default PayPalButton;
