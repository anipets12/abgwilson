import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const [networkRetry, setNetworkRetry] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    // Si el usuario ya está autenticado, redirigir al dashboard
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);
    // Limpiar errores si el usuario cambia credenciales
    useEffect(() => {
        if (error) {
            setError(null);
        }
    }, [email, password]);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Validación básica
            if (!email)
                throw new Error('El correo electrónico es obligatorio');
            if (!password)
                throw new Error('La contraseña es obligatoria');
            // Iniciar sesión con reintento en caso de error de red
            console.log('Intentando iniciar sesión con:', email);
            const response = await executeWithRetry(() => axios.post('/api/auth/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }));
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error al iniciar sesión');
            }
            const { token, user: userData } = response.data.data;
            // Guardar token en localStorage
            localStorage.setItem('authToken', token);
            // Actualizar contexto de autenticación
            setUser(userData);
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }
            else {
                localStorage.removeItem('rememberMe');
            }
            console.log('Login exitoso, redirigiendo...');
            toast.success('Inicio de sesión exitoso');
            // Pequeña espera para asegurar que los datos de sesión se guarden correctamente
            setTimeout(() => {
                navigate('/dashboard');
            }, 500);
        }
        catch (err) {
            console.error('Error de inicio de sesión:', err);
            // Mensajes de error mejorados y específicos
            let errorMessage;
            if (err.response) {
                // Error del servidor con respuesta
                errorMessage = err.response.data.message || 'Error en el servidor. Por favor, intenta más tarde.';
            }
            else if (err.request) {
                // Error de conexión (no se recibió respuesta)
                errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
            }
            else if (err.message.includes('invalid')) {
                errorMessage = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
            }
            else if (err.message.includes('fetch') || err.message.includes('network') || err.name === 'TypeError') {
                errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
            }
            else {
                errorMessage = `Error: ${err.message}`;
            }
            setError(errorMessage);
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);
            setNetworkRetry(false);
        }
    };
    const handleSocialLogin = async (provider) => {
        // Esta implementación usará OAuth más tarde si es necesario
        toast.error("Iniciar sesión con redes sociales no está disponible en este momento");
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "mt-6 text-3xl font-extrabold text-gray-900", children: "Iniciar Sesi\u00F3n" }), _jsxs("p", { className: "mt-2 text-sm text-gray-600", children: ["\u00BFNo tienes una cuenta?", ' ', _jsx(Link, { to: "/registro", className: "font-medium text-blue-600 hover:text-blue-500", children: "Reg\u00EDstrate aqu\u00ED" })] })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [_jsxs("div", { className: "rounded-md shadow-sm -space-y-px", children: [_jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaEnvelope, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "email-address", name: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm", placeholder: "Correo electr\u00F3nico" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaLock, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "password", name: "password", type: showPassword ? "text" : "password", autoComplete: "current-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "appearance-none rounded-md relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm", placeholder: "Contrase\u00F1a" }), _jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(FaEyeSlash, { className: "h-5 w-5 text-gray-400" })) : (_jsx(FaEye, { className: "h-5 w-5 text-gray-400" })) })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", checked: rememberMe, onChange: (e) => setRememberMe(e.target.checked), className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-900", children: "Recordarme" })] }), _jsx("div", { className: "text-sm", children: _jsx(Link, { to: "/recuperar-contrasena", className: "font-medium text-blue-600 hover:text-blue-500", children: "\u00BFOlvidaste tu contrase\u00F1a?" }) })] }), error && (_jsx("div", { className: "bg-red-50 border-l-4 border-red-500 p-4 mb-4", children: _jsx("p", { className: "text-red-700 text-sm", children: error }) })), _jsx("div", { children: _jsx("button", { type: "submit", disabled: loading, className: "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50", children: loading ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full" }), "Iniciando sesi\u00F3n..."] })) : ('Iniciar Sesión') }) })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "O continuar con" }) })] }), _jsxs("div", { className: "mt-6 grid grid-cols-2 gap-3", children: [_jsxs("button", { onClick: () => handleSocialLogin('google'), disabled: loading, className: "w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50", children: [_jsx(FaGoogle, { className: "text-red-500 mr-2 h-5 w-5" }), "Google"] }), _jsxs("button", { onClick: () => handleSocialLogin('facebook'), disabled: loading, className: "w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50", children: [_jsx(FaFacebook, { className: "text-blue-600 mr-2 h-5 w-5" }), "Facebook"] })] })] })] }) }));
};
export default Login;
