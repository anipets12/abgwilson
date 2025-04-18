import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaGavel } from 'react-icons/fa';
import AppointmentCalendar from '../Appointment/AppointmentCalendar';
import Newsletter from '../Newsletter/Newsletter';
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });
        // Simular envío (se implementará con Supabase)
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus({
                type: 'success',
                message: 'Su mensaje ha sido enviado con éxito. Nos pondremos en contacto pronto.'
            });
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        }, 1500);
    };
    const contactItems = [
        {
            icon: _jsx(FaMapMarkerAlt, { className: "text-blue-600" }),
            title: 'Dirección',
            content: 'Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador',
            action: null
        },
        {
            icon: _jsx(FaPhone, { className: "text-blue-600" }),
            title: 'Teléfono',
            content: '+593 988835269',
            action: {
                url: 'tel:+593988835269',
                text: 'Llamar ahora'
            }
        },
        {
            icon: _jsx(FaEnvelope, { className: "text-blue-600" }),
            title: 'Email',
            content: 'alexip2@hotmail.com',
            action: {
                url: 'mailto:alexip2@hotmail.com',
                text: 'Enviar email'
            }
        },
        {
            icon: _jsx(FaGavel, { className: "text-blue-600" }),
            title: 'Especialidades',
            content: 'Derecho penal, tránsito, civil, comercial, aduanas',
            action: null
        },
        {
            icon: _jsx(FaClock, { className: "text-blue-600" }),
            title: 'Horario de Atención',
            content: 'Lunes - Viernes: 8:00 AM - 6:00 PM | Sábado: 9:00 AM - 1:00 PM',
            action: null
        }
    ];
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: "min-h-screen bg-gradient-to-b from-white to-blue-50", children: [_jsx("div", { className: "bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4 md:px-8", children: _jsx("div", { className: "container mx-auto", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx("h1", { className: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4", children: "Cont\u00E1ctenos" }), _jsx("p", { className: "text-lg md:text-xl text-blue-100 max-w-2xl mx-auto", children: "Estamos aqu\u00ED para ayudarle con cualquier consulta legal. Programe una cita o env\u00EDenos un mensaje." }), _jsx("div", { className: "mt-8", children: _jsxs("a", { href: "https://wa.me/593988835269?text=Hola%20Abg.%20Wilson,%20necesito%20asesor\u00EDa%20legal.", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105", children: [_jsx(FaWhatsapp, { className: "mr-2 text-2xl" }), _jsx("span", { className: "text-lg", children: "Chatear por WhatsApp" })] }) })] }) }) }), _jsx("div", { className: "container mx-auto px-4 py-16", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx("div", { children: _jsxs("div", { className: "bg-white rounded-2xl shadow-xl overflow-hidden", children: [_jsxs("div", { className: "p-6 md:p-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-800", children: "Informaci\u00F3n de Contacto" }), _jsx("div", { className: "space-y-6", children: contactItems.map((item, index) => (_jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "mt-1 p-2 bg-blue-100 rounded-full", children: item.icon }), _jsxs("div", { className: "ml-4", children: [_jsxs("h3", { className: "font-semibold text-gray-800", children: [item.title, ":"] }), _jsx("p", { className: "text-gray-600", children: item.content }), item.action && (_jsxs("a", { href: item.action.url, className: "inline-block mt-1 text-sm text-blue-600 hover:text-blue-800 hover:underline", children: [item.action.text, " \u2192"] }))] })] }, index))) })] }), _jsx("div", { className: "h-80 w-full", children: _jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7600336027483!2d-78.12105048525697!3d0.3523379997509067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a3ca1785b375d%3A0x5f3c7e25c1a3f33d!2sJuan%20Jos%C3%A9%20Flores%20%26%20Vicente%20Rocafuerte%2C%20Ibarra!5e0!3m2!1ses!2sec!4v1650123456789!5m2!1ses!2sec", width: "100%", height: "100%", style: { border: 0 }, allowFullScreen: "", loading: "lazy", title: "Ubicaci\u00F3n de la oficina", className: "w-full h-full" }) })] }) }), _jsxs("div", { className: "bg-white rounded-2xl shadow-xl p-6 md:p-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-800", children: "Env\u00EDenos un mensaje" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-gray-700 font-medium mb-2", children: "Nombre completo *" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-gray-700 font-medium mb-2", children: "Correo electr\u00F3nico *" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-gray-700 font-medium mb-2", children: "Tel\u00E9fono" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "subject", className: "block text-gray-700 font-medium mb-2", children: "Asunto *" }), _jsx("input", { type: "text", id: "subject", name: "subject", value: formData.subject, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-gray-700 font-medium mb-2", children: "Mensaje *" }), _jsx("textarea", { id: "message", name: "message", value: formData.message, onChange: handleChange, rows: "5", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] }), submitStatus.message && (_jsx("div", { className: `p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`, children: submitStatus.message })), _jsx("button", { type: "submit", className: "w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 font-bold text-lg shadow-md", disabled: isSubmitting, children: isSubmitting ? 'Enviando...' : 'Enviar mensaje' })] })] })] }) }), _jsx("div", { className: "py-16 bg-gradient-to-b from-blue-50 to-white", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-4", children: "Agende una Cita" }), _jsx("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "Seleccione el d\u00EDa y la hora que mejor se adapte a su agenda para programar una consulta jur\u00EDdica personalizada." })] }), _jsx("div", { className: "bg-white rounded-2xl shadow-xl p-4 md:p-8", children: _jsx(AppointmentCalendar, {}) })] }) }) }), _jsx("div", { className: "py-16 bg-blue-900 text-white", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsx(Newsletter, {}) }) }) })] }));
};
export default ContactPage;
