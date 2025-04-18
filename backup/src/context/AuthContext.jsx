import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../config/supabase';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (credentials) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword(credentials);
            if (error)
                throw error;
            setUser(data.user);
            return { success: true };
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : 'Error de autenticación');
            return { success: false, error };
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
        }
        catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (_jsx(AuthContext.Provider, { value: { user, login, logout, loading }, children: !loading && children }));
};
