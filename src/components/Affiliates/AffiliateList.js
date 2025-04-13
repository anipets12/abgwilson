import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';
const AffiliateList = () => {
    const [affiliates, setAffiliates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAffiliates = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    throw new Error('Debe iniciar sesión para ver la lista de afiliados');
                }
                const { data, error: fetchError } = await supabase
                    .from('affiliates')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
                if (fetchError) {
                    throw fetchError;
                }
                setAffiliates(data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAffiliates();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Cargando afiliados..." });
    }
    if (error) {
        return _jsx("div", { className: "text-red-500", children: error });
    }
    return (_jsx("div", { className: "space-y-4", children: affiliates.map((affiliate) => (_jsxs("div", { className: "p-4 border rounded-md", children: [_jsx("p", { className: "text-gray-700", children: affiliate.name }), _jsx("p", { className: "text-sm text-gray-500", children: affiliate.email }), _jsxs("p", { className: "text-sm text-gray-500", children: ["C\u00F3digo de referido: ", affiliate.referral_code] }), _jsx("p", { className: "text-sm text-gray-500", children: new Date(affiliate.created_at).toLocaleString() })] }, affiliate.id))) }));
};
export default AffiliateList;
