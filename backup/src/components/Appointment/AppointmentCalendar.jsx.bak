import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaCommentAlt, FaCheck } from 'react-icons/fa';
const AppointmentCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedService, setSelectedService] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });
    const [bookingComplete, setBookingComplete] = useState(false);
    // Generar fechas disponibles (próximos 14 días)
    const generateAvailableDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 14; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            // Excluir fines de semana (6 = Sábado, 0 = Domingo)
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                dates.push(date);
            }
        }
        return dates;
    };
    // Horarios disponibles
    const availableTimes = [
        '09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00'
    ];
    // Servicios legales disponibles
    const legalServices = [
        { id: 'penal', name: 'Derecho Penal' },
        { id: 'civil', name: 'Derecho Civil' },
        { id: 'comercial', name: 'Derecho Comercial' },
        { id: 'transito', name: 'Derecho de Tránsito' },
        { id: 'aduanas', name: 'Derecho de Aduanas' },
        { id: 'consulta', name: 'Consulta General' }
    ];
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const nextStep = () => {
        if (step === 1 && !selectedDate) {
            alert('Por favor seleccione una fecha para su cita');
            return;
        }
        if (step === 2 && !selectedTime) {
            alert('Por favor seleccione una hora para su cita');
            return;
        }
        if (step === 3 && !selectedService) {
            alert('Por favor seleccione el tipo de servicio legal que necesita');
            return;
        }
        setStep(step + 1);
    };
    const prevStep = () => {
        setStep(step - 1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación básica
        if (!formData.nombre || !formData.email || !formData.telefono) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }
        setLoading(true);
        // Simulación de envío de datos (en implementación real conectaría con Supabase o API de calendario)
        setTimeout(() => {
            setLoading(false);
            setBookingComplete(true);
            // En implementación real:
            // 1. Guardar la cita en la base de datos
            // 2. Enviar confirmación por email
            // 3. Sincronizar con Google Calendar (opcional)
        }, 1500);
    };
    const formatDate = (date) => {
        if (!date)
            return '';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };
    return (_jsx("div", { className: "bg-gray-50 py-16", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Agende una Cita con el Abg. Wilson Ipiales" }), _jsx("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "Seleccione la fecha y hora que mejor se ajuste a su agenda para hablar con un profesional sobre su caso legal." })] }), !bookingComplete && (_jsxs("div", { className: "mb-10", children: [_jsx("div", { className: "flex justify-between mb-2", children: ['Fecha', 'Hora', 'Servicio', 'Información Personal'].map((label, index) => (_jsx("div", { className: `text-sm font-medium ${step > index + 1 ? 'text-blue-600' : 'text-gray-500'}`, children: label }, index))) }), _jsx("div", { className: "overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200", children: _jsx("div", { className: "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600", style: { width: `${(step / 4) * 100}%` } }) })] })), !bookingComplete ? (_jsxs("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden", children: [step === 1 && (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3 }, className: "p-6 md:p-8", children: [_jsxs("h3", { className: "text-xl font-bold mb-6 flex items-center", children: [_jsx(FaCalendarAlt, { className: "text-blue-600 mr-2" }), " Seleccione una fecha"] }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: generateAvailableDates().map((date, index) => (_jsxs("button", { onClick: () => handleDateSelect(date), className: `p-3 rounded-lg border text-center transition-colors ${selectedDate && selectedDate.toDateString() === date.toDateString()
                                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`, children: [_jsx("p", { className: "text-sm font-medium", children: date.toLocaleDateString('es-ES', { weekday: 'short' }) }), _jsx("p", { className: "text-lg font-bold", children: date.getDate() }), _jsx("p", { className: "text-xs", children: date.toLocaleDateString('es-ES', { month: 'short' }) })] }, index))) }), _jsx("div", { className: "flex justify-end mt-8", children: _jsx("button", { onClick: nextStep, className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors", children: "Continuar" }) })] })), step === 2 && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3 }, className: "p-6 md:p-8", children: [_jsxs("h3", { className: "text-xl font-bold mb-6 flex items-center", children: [_jsx(FaClock, { className: "text-blue-600 mr-2" }), " Seleccione una hora"] }), _jsxs("p", { className: "text-sm text-gray-600 mb-4", children: ["Fecha seleccionada: ", _jsx("span", { className: "font-semibold", children: formatDate(selectedDate) })] }), _jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-3", children: availableTimes.map((time, index) => (_jsx("button", { onClick: () => handleTimeSelect(time), className: `p-3 rounded-lg border text-center transition-colors ${selectedTime === time
                                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`, children: time }, index))) }), _jsxs("div", { className: "flex justify-between mt-8", children: [_jsx("button", { onClick: prevStep, className: "text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors", children: "Anterior" }), _jsx("button", { onClick: nextStep, className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors", children: "Continuar" })] })] })), step === 3 && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, className: "p-6 md:p-8", children: [_jsx("h3", { className: "text-xl font-bold mb-6", children: "Seleccione el tipo de servicio" }), _jsxs("p", { className: "text-sm text-gray-600 mb-4", children: ["Cita programada para: ", _jsx("span", { className: "font-semibold", children: formatDate(selectedDate) }), " a las ", _jsx("span", { className: "font-semibold", children: selectedTime })] }), _jsx("div", { className: "space-y-3", children: legalServices.map((service) => (_jsxs("button", { onClick: () => setSelectedService(service.id), className: `w-full flex items-center p-4 rounded-lg border transition-colors ${selectedService === service.id
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`, children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center mr-3 ${selectedService === service.id ? 'bg-blue-600 text-white' : 'bg-gray-100'}`, children: selectedService === service.id ? _jsx(FaCheck, {}) : null }), _jsx("span", { className: "font-medium", children: service.name })] }, service.id))) }), _jsxs("div", { className: "flex justify-between mt-8", children: [_jsx("button", { onClick: prevStep, className: "text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors", children: "Anterior" }), _jsx("button", { onClick: nextStep, className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors", children: "Continuar" })] })] })), step === 4 && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, className: "p-6 md:p-8", children: [_jsx("h3", { className: "text-xl font-bold mb-6", children: "Complete sus datos de contacto" }), _jsxs("p", { className: "text-sm text-gray-600 mb-6", children: ["Cita programada para: ", _jsx("span", { className: "font-semibold", children: formatDate(selectedDate) }), " a las ", _jsx("span", { className: "font-semibold", children: selectedTime })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [_jsx(FaUser, { className: "inline-block mr-2 text-blue-600" }), " Nombre Completo *"] }), _jsx("input", { type: "text", name: "nombre", value: formData.nombre, onChange: handleInputChange, className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "Ingrese su nombre y apellido", required: true })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [_jsx(FaEnvelope, { className: "inline-block mr-2 text-blue-600" }), " Correo Electr\u00F3nico *"] }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "ejemplo@correo.com", required: true })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [_jsx(FaPhone, { className: "inline-block mr-2 text-blue-600" }), " Tel\u00E9fono *"] }), _jsx("input", { type: "tel", name: "telefono", value: formData.telefono, onChange: handleInputChange, className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "+593 XXXXXXXXX", required: true })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [_jsx(FaCommentAlt, { className: "inline-block mr-2 text-blue-600" }), " Mensaje (Opcional)"] }), _jsx("textarea", { name: "mensaje", value: formData.mensaje, onChange: handleInputChange, rows: "4", className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "Describa brevemente su caso o consulta" })] })] }), _jsx("div", { className: "bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6", children: _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("strong", { children: "Nota:" }), " Al agendar esta cita, est\u00E1 reservando un espacio con el Abg. Wilson Ipiales. Recibir\u00E1 una confirmaci\u00F3n por correo electr\u00F3nico con los detalles de su cita."] }) }), _jsxs("div", { className: "flex justify-between", children: [_jsx("button", { type: "button", onClick: prevStep, className: "text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors", children: "Anterior" }), _jsx("button", { type: "submit", disabled: loading, className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center", children: loading ? 'Procesando...' : 'Confirmar Cita' })] })] })] }))] })) : (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, className: "bg-white rounded-xl shadow-lg p-8 text-center", children: [_jsx("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(FaCheck, { className: "text-green-600 text-3xl" }) }), _jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-4", children: "\u00A1Cita Confirmada!" }), _jsxs("p", { className: "text-gray-600 mb-6", children: ["Su cita ha sido programada exitosamente para el ", _jsx("span", { className: "font-semibold", children: formatDate(selectedDate) }), " a las ", _jsx("span", { className: "font-semibold", children: selectedTime }), ". Hemos enviado una confirmaci\u00F3n a su correo electr\u00F3nico."] }), _jsxs("div", { className: "bg-blue-50 rounded-lg p-6 mb-6 text-left", children: [_jsx("h4", { className: "font-bold text-lg mb-3", children: "Detalles de la Cita:" }), _jsxs("ul", { className: "space-y-3", children: [_jsxs("li", { className: "flex", children: [_jsx("span", { className: "font-medium w-32", children: "Fecha:" }), _jsx("span", { children: formatDate(selectedDate) })] }), _jsxs("li", { className: "flex", children: [_jsx("span", { className: "font-medium w-32", children: "Hora:" }), _jsx("span", { children: selectedTime })] }), _jsxs("li", { className: "flex", children: [_jsx("span", { className: "font-medium w-32", children: "Servicio:" }), _jsx("span", { children: legalServices.find(s => s.id === selectedService)?.name })] }), _jsxs("li", { className: "flex", children: [_jsx("span", { className: "font-medium w-32", children: "Direcci\u00F3n:" }), _jsx("span", { children: "Juan Jos\u00E9 Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador" })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4", children: [_jsx("a", { href: "/", className: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors", children: "Volver al Inicio" }), _jsx("a", { href: "/dashboard", className: "bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors", children: "Ver Mis Citas" })] })] }))] }) }) }));
};
export default AppointmentCalendar;
