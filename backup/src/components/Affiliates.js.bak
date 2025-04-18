import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { insertData } from '../services/supabase';
import { FaGift, FaBookOpen, FaHandshake, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';
export default function Affiliates() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        profession: '',
        experience: '',
        motivation: '',
        acceptTerms: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            // Usar el servicio de Supabase para insertar datos
            await insertData('affiliates', formData);
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                profession: '',
                experience: '',
                motivation: '',
                acceptTerms: false
            });
        }
        catch (error) {
            setError('Error al enviar la solicitud. Por favor, inténtelo de nuevo.');
            console.error('Error:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const benefits = [
        {
            title: 'Comisiones Competitivas',
            description: 'Gane hasta un 25% de comisión por cada cliente referido que contrate nuestros servicios.',
            icon: _jsx(FaMoneyBillWave, { className: "w-12 h-12 text-primary-600" })
        },
        {
            title: 'Herramientas de Marketing',
            description: 'Acceso a materiales promocionales exclusivos, enlaces de seguimiento y panel de control personalizado.',
            icon: _jsx(FaFileAlt, { className: "w-12 h-12 text-primary-600" })
        },
        {
            title: 'Formación Continua',
            description: 'Capacitación regular sobre nuestros servicios y las mejores estrategias para promocionarlos.',
            icon: _jsx(FaBookOpen, { className: "w-12 h-12 text-primary-600" })
        },
        {
            title: 'Soporte Dedicado',
            description: 'Equipo de soporte exclusivo para afiliados, disponible para resolver cualquier consulta o problema.',
            icon: _jsx(FaHandshake, { className: "w-12 h-12 text-primary-600" })
        }
    ];
    const freeRewards = [
        {
            title: 'E-Book Legal Gratuito',
            description: 'Reciba inmediatamente un E-Book con consejos legales básicos al registrarse como afiliado',
            icon: _jsx(FaBookOpen, { className: "w-10 h-10 text-green-600" })
        },
        {
            title: 'Consulta Legal Gratuita',
            description: 'Por cada 3 clientes referidos, obtenga una consulta legal gratuita de 30 minutos',
            icon: _jsx(FaHandshake, { className: "w-10 h-10 text-green-600" })
        },
        {
            title: 'Capacitación Exclusiva',
            description: 'Acceso a webinars mensuales sobre temas legales de actualidad',
            icon: _jsx(FaGift, { className: "w-10 h-10 text-green-600" })
        }
    ];
    return (_jsx("div", { className: "py-12 bg-secondary-50", children: _jsxs("div", { className: "container-custom", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "section-title", children: "Programa de Afiliados" }), _jsx("p", { className: "text-xl text-secondary-600", children: "\u00DAnase a nuestro programa de afiliados y genere ingresos adicionales recomendando nuestros servicios legales" })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-16 mb-16", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 }, children: [_jsx("h3", { className: "text-2xl font-bold text-secondary-900 mb-6", children: "\u00BFPor qu\u00E9 unirse a nuestro programa?" }), _jsx("div", { className: "space-y-8", children: benefits.map((benefit, index) => (_jsxs(motion.div, { className: "flex items-start space-x-4", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.2 }, children: [_jsx("div", { className: "flex-shrink-0", children: benefit.icon }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold text-secondary-900 mb-1", children: benefit.title }), _jsx("p", { className: "text-secondary-600", children: benefit.description })] })] }, benefit.title))) }), _jsxs("div", { className: "mt-8 p-6 bg-primary-50 rounded-xl border border-primary-100", children: [_jsx("h4", { className: "text-lg font-semibold text-secondary-900 mb-4", children: "Estructura de Comisiones" }), _jsxs("ul", { className: "space-y-2 text-secondary-700", children: [_jsxs("li", { className: "flex items-center", children: [_jsx("svg", { className: "w-5 h-5 text-primary-600 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), _jsx("span", { children: "15% por servicios legales b\u00E1sicos" })] }), _jsxs("li", { className: "flex items-center", children: [_jsx("svg", { className: "w-5 h-5 text-primary-600 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), _jsx("span", { children: "20% por servicios legales intermedios" })] }), _jsxs("li", { className: "flex items-center", children: [_jsx("svg", { className: "w-5 h-5 text-primary-600 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), _jsx("span", { children: "25% por servicios legales premium" })] }), _jsxs("li", { className: "flex items-center", children: [_jsx("svg", { className: "w-5 h-5 text-primary-600 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }), _jsx("span", { children: "Bonificaciones adicionales por volumen de referidos" })] })] })] }), _jsxs("div", { className: "mt-8 p-6 bg-green-50 rounded-xl border border-green-100", children: [_jsxs("h4", { className: "text-lg font-semibold text-secondary-900 mb-4 flex items-center", children: [_jsx(FaGift, { className: "mr-2 text-green-600" }), " Recompensas Gratuitas"] }), _jsx("div", { className: "space-y-4", children: freeRewards.map((reward, index) => (_jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex-shrink-0 mr-3", children: reward.icon }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold text-secondary-800", children: reward.title }), _jsx("p", { className: "text-secondary-600 text-sm", children: reward.description })] })] }, index))) })] })] }), _jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 }, children: success ? (_jsxs("div", { className: "card text-center py-8", children: [_jsx("svg", { className: "w-16 h-16 text-green-500 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsx("h3", { className: "text-2xl font-bold text-secondary-900 mb-2", children: "\u00A1Solicitud Enviada!" }), _jsx("p", { className: "text-secondary-600 mb-6", children: "Gracias por su inter\u00E9s en nuestro programa de afiliados. Revisaremos su solicitud y nos pondremos en contacto con usted en breve." }), _jsx(motion.button, { onClick: () => setSuccess(false), className: "btn-primary", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "Enviar otra solicitud" })] })) : (_jsxs("div", { className: "card", children: [_jsx("h3", { className: "text-2xl font-bold text-secondary-900 mb-6", children: "Solicitud de Afiliaci\u00F3n" }), error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "form-label", children: "Nombre completo" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, className: "form-input", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "form-label", children: "Correo electr\u00F3nico" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "form-input", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "form-label", children: "Tel\u00E9fono" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, className: "form-input", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "profession", className: "form-label", children: "Profesi\u00F3n u ocupaci\u00F3n" }), _jsx("input", { type: "text", id: "profession", name: "profession", value: formData.profession, onChange: handleChange, className: "form-input", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "experience", className: "form-label", children: "Experiencia en marketing de afiliados" }), _jsxs("select", { id: "experience", name: "experience", value: formData.experience, onChange: handleChange, className: "form-select", required: true, children: [_jsx("option", { value: "", children: "Seleccionar" }), _jsx("option", { value: "Ninguna", children: "Ninguna" }), _jsx("option", { value: "Menos de 1 a\u00F1o", children: "Menos de 1 a\u00F1o" }), _jsx("option", { value: "1-3 a\u00F1os", children: "1-3 a\u00F1os" }), _jsx("option", { value: "M\u00E1s de 3 a\u00F1os", children: "M\u00E1s de 3 a\u00F1os" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "motivation", className: "form-label", children: "\u00BFPor qu\u00E9 desea ser parte de nuestro programa de afiliados?" }), _jsx("textarea", { id: "motivation", name: "motivation", value: formData.motivation, onChange: handleChange, rows: "4", className: "form-textarea", required: true })] }), _jsxs("div", { className: "flex items-start", children: [_jsx("input", { type: "checkbox", id: "acceptTerms", name: "acceptTerms", checked: formData.acceptTerms, onChange: handleChange, className: "form-checkbox mt-1", required: true }), _jsx("label", { htmlFor: "acceptTerms", className: "ml-2 text-secondary-600 text-sm", children: "Acepto los t\u00E9rminos y condiciones del programa de afiliados" })] }), _jsx(motion.button, { type: "submit", className: "btn-primary w-full", disabled: isSubmitting, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: isSubmitting ? 'Enviando...' : 'Enviar solicitud' })] })] })) })] })] }) }));
}
