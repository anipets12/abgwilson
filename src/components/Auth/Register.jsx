import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authService } from '../../services/apiService';
const Register = () => {
    const { user, register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // Extraer el código de referido de la URL si existe
    const queryParams = new URLSearchParams(location.search);
    const referralCode = queryParams.get('ref');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        referralCode: referralCode || ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiConnected, setApiConnected] = useState(true);
    // Si el usuario ya está autenticado, redirigir al dashboard
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);
    // Verificar conexión a la API al cargar el componente
    useEffect(() => {
        const checkApiConnection = async () => {
            try {
                // Intento simple de conexión
                await authService.checkConnection();
                setApiConnected(true);
            }
            catch (err) {
                console.warn('No se pudo conectar con la API:', err);
                setApiConnected(false);
            }
        };
        checkApiConnection();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar errores al cambiar el formulario
        if (error)
            setError(null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Validaciones básicas
            if (!formData.name.trim()) {
                throw new Error('El nombre es obligatorio');
            }
            if (!formData.email.trim()) {
                throw new Error('El correo electrónico es obligatorio');
            }
            if (!formData.password) {
                throw new Error('La contraseña es obligatoria');
            }
            if (formData.password.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres');
            }
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Las contraseñas no coinciden');
            }
            console.log('Intentando registrar usuario:', formData.email);
            // Registrar usuario con manejo de reintentos
            const registerWithRetry = async (retries = 2) => {
                try {
                    const result = await register({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        referralCode: formData.referralCode
                    });
                    return result;
                }
                catch (error) {
                    if (retries > 0 && (error.message?.includes('network') || !error.response)) {
                        // Esperar antes de reintentar (backoff exponencial)
                        const delay = 1000 * (3 - retries);
                        console.log(`Reintentando registro en ${delay}ms...`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                        return registerWithRetry(retries - 1);
                    }
                    throw error;
                }
            };
            const result = await registerWithRetry();
            if (!result.success) {
                throw new Error(result.error || 'Error al registrar usuario');
            }
            console.log('Registro exitoso');
            toast.success('Registro exitoso. ¡Bienvenido!');
            // Redirigir al usuario al dashboard
            navigate('/dashboard');
        }
        catch (err) {
            console.error('Error en registro:', err);
            // Mensajes de error mejorados
            let errorMessage;
            if (err.response) {
                // Error del servidor
                const status = err.response.status;
                if (status === 409) {
                    errorMessage = 'Este correo electrónico ya está registrado.';
                }
                else if (status === 422) {
                    errorMessage = 'Datos de registro inválidos. Por favor revisa la información.';
                }
                else if (status >= 500) {
                    errorMessage = 'Error en el servidor. Por favor, intenta más tarde.';
                }
                else {
                    errorMessage = err.response.data?.message || 'Error en el registro.';
                }
            }
            else if (err.request || !navigator.onLine || err.message.includes('network')) {
                // Error de red
                errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
                setApiConnected(false);
            }
            else {
                // Otros errores
                errorMessage = err.message;
            }
            setError(errorMessage);
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "mt-6 text-3xl font-extrabold text-gray-900", children: "Crear una cuenta" }), _jsxs("p", { className: "mt-2 text-sm text-gray-600", children: ["\u00BFYa tienes una cuenta?", ' ', _jsx(Link, { to: "/login", className: "font-medium text-blue-600 hover:text-blue-500", children: "Inicia sesi\u00F3n aqu\u00ED" })] })] }), !apiConnected && (_jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("svg", { className: "h-5 w-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) }), _jsx("div", { className: "ml-3", children: _jsx("p", { className: "text-sm text-yellow-700", children: "Detectamos problemas de conexi\u00F3n con nuestros servidores. Puedes continuar, pero es posible que encuentres dificultades." }) })] }) })), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [error && (_jsx("div", { className: "bg-red-50 border-l-4 border-red-500 p-4", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("svg", { className: "h-5 w-5 text-red-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) }), _jsx("div", { className: "ml-3", children: _jsx("p", { className: "text-sm text-red-700", children: error }) })] }) })), _jsxs("div", { className: "rounded-md shadow-sm -space-y-px", children: [_jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaUser, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "name", name: "name", type: "text", autoComplete: "name", required: true, className: "appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm", placeholder: "Nombre completo", value: formData.name, onChange: handleChange })] }), _jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaEnvelope, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, className: "appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm", placeholder: "Correo electr\u00F3nico", value: formData.email, onChange: handleChange })] }), _jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaLock, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "password", name: "password", type: showPassword ? "text" : "password", autoComplete: "new-password", required: true, className: "appearance-none rounded-md relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm", placeholder: "Contrase\u00F1a", value: formData.password, onChange: handleChange }), _jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "text-gray-400 hover:text-gray-500 focus:outline-none", children: showPassword ? (_jsx(FaEyeSlash, { className: "h-5 w-5" })) : (_jsx(FaEye, { className: "h-5 w-5" })) }) })] }), _jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaLock, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? "text" : "password", autoComplete: "new-password", required: true, className: "appearance-none rounded-md relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm", placeholder: "Confirmar contrase\u00F1a", value: formData.confirmPassword, onChange: handleChange }), _jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: _jsx("button", { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "text-gray-400 hover:text-gray-500 focus:outline-none", children: showConfirmPassword ? (_jsx(FaEyeSlash, { className: "h-5 w-5" })) : (_jsx(FaEye, { className: "h-5 w-5" })) }) })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaUser, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "referralCode", name: "referralCode", type: "text", className: "appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm", placeholder: "C\u00F3digo de referido (opcional)", value: formData.referralCode, onChange: handleChange })] })] }), _jsx("div", { children: _jsx("button", { type: "submit", disabled: loading, className: `group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`, children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Procesando..."] })) : ('Registrarse') }) })] }), _jsx("div", { className: "text-sm text-center", children: _jsxs("p", { className: "mt-2 text-gray-600", children: ["Al registrarte, aceptas nuestros", ' ', _jsx(Link, { to: "/terminos-condiciones", className: "font-medium text-blue-600 hover:text-blue-500", children: "T\u00E9rminos y Condiciones" }), ' ', "y", ' ', _jsx(Link, { to: "/politica-privacidad", className: "font-medium text-blue-600 hover:text-blue-500", children: "Pol\u00EDtica de Privacidad" }), "."] }) })] }) }));
};
export default Register;
