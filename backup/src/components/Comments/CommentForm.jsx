import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import FileUploader from './FileUploader';
import { tokenService } from '../../services/tokenService';
import { toast } from 'react-hot-toast';
const CommentForm = ({ postId }) => {
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [tokensRemaining, setTokensRemaining] = useState(3);
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                // Obtener tokens del usuario
                const { tokens, error } = await tokenService.getUserTokens(user.id);
                if (!error) {
                    setTokensRemaining(tokens);
                }
            }
        };
        fetchUser();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!user) {
                throw new Error('Debe iniciar sesión para comentar');
            }
            // Verificar si el usuario tiene tokens disponibles
            if (tokensRemaining <= 0) {
                throw new Error('No tiene tokens disponibles. Por favor recargue.');
            }
            // Usar un token para comentar
            const { tokensRemaining: newTokens, error: tokenError } = await tokenService.useToken(user.id);
            if (tokenError) {
                throw new Error(tokenError);
            }
            const { data, error: insertError } = await supabase
                .from('comments')
                .insert([
                {
                    post_id: postId,
                    user_id: user.id,
                    content: comment,
                    attachments: attachments.length > 0 ? attachments : null,
                    created_at: new Date().toISOString()
                }
            ]);
            if (insertError) {
                throw insertError;
            }
            setComment('');
            setAttachments([]);
            setTokensRemaining(newTokens);
            toast.success('Comentario enviado correctamente');
        }
        catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    const handleFileUpload = (files) => {
        setAttachments(files);
        toast.success(`${files.length} archivo(s) adjuntado(s) correctamente`);
    };
    return (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md mb-6", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Dejar un comentario" }), user ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "mb-4", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["Tokens disponibles: ", _jsx("span", { className: "font-bold", children: tokensRemaining })] }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("textarea", { value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Escribe tu comentario...", className: "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500", rows: "4", required: true }), _jsx(FileUploader, { onFileUpload: handleFileUpload }), error && _jsx("div", { className: "text-red-500 text-sm", children: error }), _jsx("button", { type: "submit", disabled: loading || tokensRemaining <= 0, className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? 'Enviando...' : 'Enviar Comentario' }), tokensRemaining <= 0 && (_jsx("p", { className: "text-sm text-red-500", children: "No tiene tokens disponibles. Por favor recargue para poder comentar." }))] })] })) : (_jsxs("div", { className: "text-center py-6", children: [_jsx("p", { className: "text-gray-600 mb-4", children: "Debe iniciar sesi\u00F3n para comentar" }), _jsx("a", { href: "/login", className: "inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700", children: "Iniciar Sesi\u00F3n" })] }))] }));
};
export default CommentForm;
