import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { authService } from '../../services/apiService';
import { toast } from 'react-hot-toast';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await authService.getCurrentUser();
                if (error) {
                    console.error('Error al obtener usuario:', error);
                    setUser(null);
                }
                else {
                    setUser(data.user);
                }
            }
            catch (err) {
                console.error('Error al verificar sesión:', err);
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
    const handleLogout = async () => {
        try {
            await authService.signOut();
            setUser(null);
            toast.success('Sesión cerrada correctamente');
        }
        catch (error) {
            console.error('Error al cerrar sesión:', error);
            toast.error('Error al cerrar sesión');
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-32", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" }) }));
    }
    return (_jsx("div", { className: "profile bg-white rounded-lg shadow-md p-6 max-w-md mx-auto", children: user ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Perfil de Usuario" }), _jsxs("button", { onClick: handleLogout, className: "flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors", children: [_jsx(FaSignOutAlt, { className: "mr-2" }), " Cerrar Sesi\u00F3n"] })] }), _jsx("div", { className: "bg-blue-50 p-4 rounded-lg mb-6", children: _jsxs("div", { className: "flex items-center mb-4", children: [_jsx("div", { className: "bg-blue-100 p-3 rounded-full mr-4", children: _jsx(FaUser, { className: "text-blue-600 text-xl" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-gray-900", children: "Bienvenido" }), _jsx("p", { className: "text-blue-600 font-medium", children: user.email || user.name })] })] }) })] })) : (_jsxs("div", { className: "text-center p-6 bg-gray-50 rounded-lg", children: [_jsx(FaUser, { className: "mx-auto text-gray-400 text-4xl mb-4" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Por favor, inicia sesi\u00F3n para ver tu perfil." }), _jsx("a", { href: "/login", className: "inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors", children: "Iniciar Sesi\u00F3n" })] })) }));
};
export default Profile;
