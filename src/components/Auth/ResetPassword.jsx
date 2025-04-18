import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/apiService';
import { toast } from 'react-hot-toast';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [networkRetry, setNetworkRetry] = useState(false);
    const [tokenError, setTokenError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // Verificar al cargar si tenemos token en la URL
    useEffect(() => {
        // Extraer token de la URL
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (!token) {
            setTokenError(true);
            setError('No se encontró un token válido para cambiar la contraseña. Por favor solicite un nuevo enlace de recuperación.');
            toast.error('Enlace de recuperación inválido o expirado');
        }
    }, [location]);
    // Función para manejar reintentos en caso de errores de red
    const executeWithRetry = async (fn, maxRetries = 3) => {
        let lastError;
        for (let i = 0; i < maxRetries; i++) {
            try {
                setNetworkRetry(i > 0);
                return await fn();
            }
            catch (err) {
                console.log(`Intento ${i + 1} fallido. Reintentando...`);
                lastError = err;
                // Esperar antes de reintentar (1s, 2s, 4s - backoff exponencial)
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
            }
        }
        setNetworkRetry(false);
        throw lastError;
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }
        try {
            console.log('Cambiando contraseña');
            // Extraer token de la URL
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');
            if (!token) {
                throw new Error('No se encontró un token válido');
            }
            const { error: updateError } = await executeWithRetry(() => authService.updatePassword(password, token));
            if (updateError) {
                console.error('Error al cambiar contraseña:', updateError);
                throw updateError;
            }
            const successMessage = 'Tu contraseña ha sido cambiada exitosamente.';
            setMessage(successMessage);
            toast.success(successMessage);
            console.log('Contraseña cambiada exitosamente');
            // Redirigir después de un tiempo
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
        catch (err) {
            console.error('Error completo:', err);
            let errorMessage;
            if (err.message && (err.message.includes('fetch') || err.message.includes('network') || err.name === 'TypeError')) {
                errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
            }
            else if (err.message && err.message.includes('password')) {
                errorMessage = 'La contraseña no cumple con los requisitos mínimos de seguridad.';
            }
            else if (err.message && err.message.includes('token')) {
                errorMessage = 'El enlace ha expirado o es inválido. Por favor solicite uno nuevo.';
            }
            else {
                errorMessage = err.message || 'Error al cambiar la contraseña';
            }
            setError(errorMessage);
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);
            setNetworkRetry(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Cambiar tu contrase\u00F1a" }), _jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Por favor ingresa tu nueva contrase\u00F1a" })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [tokenError ? (_jsx("div", { className: "rounded-md bg-red-50 p-4 mb-4", children: _jsx("div", { className: "flex", children: _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium text-red-800", children: "Error de autenticaci\u00F3n" }), _jsx("div", { className: "mt-2 text-sm text-red-700", children: _jsx("p", { children: error }) }), _jsx("div", { className: "mt-4", children: _jsx("div", { className: "-mx-2 -my-1.5 flex", children: _jsxs("button", { type: "button", onClick: () => navigate('/login'), className: "bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600", children: [_jsx(FaArrowLeft, { className: "inline mr-1" }), " Volver al inicio de sesi\u00F3n"] }) }) })] }) }) })) : (_jsxs("form", { className: "space-y-6", onSubmit: handleResetPassword, children: [error && (_jsx("div", { className: "rounded-md bg-red-50 p-4", children: _jsx("div", { className: "flex", children: _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium text-red-800", children: "Error" }), _jsx("div", { className: "mt-2 text-sm text-red-700", children: _jsx("p", { children: error }) })] }) }) })), message && (_jsx("div", { className: "rounded-md bg-green-50 p-4", children: _jsx("div", { className: "flex", children: _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium text-green-800", children: "\u00A1\u00C9xito!" }), _jsx("div", { className: "mt-2 text-sm text-green-700", children: _jsx("p", { children: message }) })] }) }) })), networkRetry && (_jsx("div", { className: "rounded-md bg-yellow-50 p-4", children: _jsx("div", { className: "flex", children: _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium text-yellow-800", children: "Reintentando conexi\u00F3n" }), _jsx("div", { className: "mt-2 text-sm text-yellow-700", children: _jsx("p", { children: "Hubo un problema de conexi\u00F3n. Estamos reintentando autom\u00E1ticamente." }) })] }) }) })), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Nueva contrase\u00F1a" }), _jsxs("div", { className: "mt-1 relative rounded-md shadow-sm", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaLock, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" }) }), _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "new-password", required: true, className: "focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md", placeholder: "**********************", value: password, onChange: (e) => setPassword(e.target.value) })] }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: "M\u00EDnimo 6 caracteres" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700", children: "Confirmar nueva contrase\u00F1a" }), _jsxs("div", { className: "mt-1 relative rounded-md shadow-sm", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaLock, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" }) }), _jsx("input", { id: "confirmPassword", name: "confirmPassword", type: "password", autoComplete: "new-password", required: true, className: "focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md", placeholder: "**********************", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) })] })] }), _jsx("div", { children: _jsx("button", { type: "submit", className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Procesando..."] })) : ('Cambiar contraseña') }) })] })), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "o" }) })] }), _jsx("div", { className: "mt-6 grid grid-cols-1 gap-3", children: _jsxs("a", { href: "/login", className: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50", children: [_jsx(FaArrowLeft, { className: "mr-2 h-5 w-5 text-gray-500" }), "Volver al inicio de sesi\u00F3n"] }) })] })] }) })] }));
};
export default ResetPassword;
