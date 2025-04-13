import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { toast } from 'react-toastify';
const AuthContext = createContext({});
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
    return (<AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>);
};
