import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar el formulario
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "contact-form", children: [_jsx("input", { type: "text", name: "name", placeholder: "Nombre", value: formData.name, onChange: handleChange, required: true }), _jsx("input", { type: "email", name: "email", placeholder: "Correo electr\u00F3nico", value: formData.email, onChange: handleChange, required: true }), _jsx("textarea", { name: "message", placeholder: "Mensaje", value: formData.message, onChange: handleChange, required: true }), _jsx("button", { type: "submit", className: "btn-primary", children: "Enviar Mensaje" })] }));
};
export default ContactForm;
