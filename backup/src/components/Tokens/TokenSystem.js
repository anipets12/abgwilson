import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaCoins, FaRedo, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
const TokenSystem = () => {
    const { user, tokens, useToken: useUserToken, refillTokens: refillUserTokens } = useAuth();
    const [loading, setLoading] = useState(false);
    const handleQuery = async () => {
        setLoading(true);
        try {
            const { success } = await useUserToken();
            if (success) {
                toast.success('Token utilizado correctamente');
            }
        }
        catch (error) {
            toast.error('Error al usar el token');
            console.error('Error using token:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleReload = async () => {
        setLoading(true);
        try {
            await refillUserTokens();
        }
        catch (error) {
            toast.error('Error al recargar los tokens');
            console.error('Error reloading tokens:', error);
        }
        finally {
            setLoading(false);
        }
    };
    if (!user) {
        return (_jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: _jsxs("div", { className: "text-center py-6", children: [_jsx(FaInfoCircle, { className: "text-blue-500 text-4xl mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: "Sistema de Tokens" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Inicie sesi\u00F3n para gestionar sus tokens de consulta" }), _jsx("a", { href: "/login", className: "inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700", children: "Iniciar Sesi\u00F3n" })] }) }));
    }
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-1", children: "Sistema de Tokens" }), _jsx("p", { className: "text-gray-600", children: "Utilice sus tokens para realizar consultas y generar documentos" })] }), _jsx("div", { className: "mt-4 md:mt-0 flex items-center", children: _jsxs("div", { className: "bg-blue-50 text-blue-700 rounded-full px-4 py-2 flex items-center", children: [_jsx(FaCoins, { className: "text-yellow-500 mr-2" }), _jsxs("span", { className: "font-semibold", children: [tokens, " tokens disponibles"] })] }) })] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-4 mb-6", children: [_jsxs("p", { className: "text-sm text-gray-700 mb-2", children: [_jsx(FaInfoCircle, { className: "inline-block mr-1 text-blue-500" }), _jsx("strong", { children: "\u00BFC\u00F3mo funciona?" })] }), _jsx("p", { className: "text-sm text-gray-600", children: "Cada consulta o generaci\u00F3n de documento consume 1 token. Tiene un l\u00EDmite de 3 tokens que puede recargar cuando se agoten." })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("button", { onClick: handleQuery, disabled: loading || tokens <= 0, className: "flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "mr-2", children: "Procesando..." }), _jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" })] })) : ('Realizar Consulta') }), _jsx("button", { onClick: handleReload, disabled: loading || tokens >= 3, className: "flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "mr-2", children: "Procesando..." }), _jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" })] })) : (_jsxs(_Fragment, { children: [_jsx(FaRedo, { className: "mr-2" }), " Recargar Tokens"] })) })] }), tokens <= 0 && (_jsx("div", { className: "mt-4 text-center text-sm text-red-500", children: "No tiene tokens disponibles. Por favor recargue para poder realizar consultas." })), tokens >= 3 && (_jsx("div", { className: "mt-4 text-center text-sm text-gray-600", children: "Ya tiene el m\u00E1ximo de tokens disponibles (3)." }))] }));
};
export default TokenSystem;
