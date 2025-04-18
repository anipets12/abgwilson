import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { supabase } from '../../config/supabase';
const AffiliateRegister = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                throw new Error('Debe iniciar sesión para registrarse como afiliado');
            }
            const { data, error: insertError } = await supabase
                .from('affiliates')
                .insert([
                {
                    user_id: user.id,
                    email,
                    name,
                    referral_code: referralCode,
                    created_at: new Date().toISOString()
                }
            ]);
            if (insertError) {
                throw insertError;
            }
            setEmail('');
            setName('');
            setReferralCode('');
            // Aquí puedes agregar lógica para redirigir al dashboard o mostrar un mensaje de éxito
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Correo electr\u00F3nico", className: "w-full p-2 border rounded-md", required: true }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Nombre completo", className: "w-full p-2 border rounded-md", required: true }), _jsx("input", { type: "text", value: referralCode, onChange: (e) => setReferralCode(e.target.value), placeholder: "C\u00F3digo de referido (opcional)", className: "w-full p-2 border rounded-md" }), error && _jsx("div", { className: "text-red-500", children: error }), _jsx("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50", children: loading ? 'Registrando...' : 'Registrarse como Afiliado' })] }));
};
export default AffiliateRegister;
