import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';

import { useAuth } from '../context/AuthContext';
import { affiliateService } from '../services/affiliateService';
import { ebookService } from '../services/ebookService';
export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [referralCode, setReferralCode] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [affiliateStats, code] = await Promise.all([
                    affiliateService.getReferralStats(user.id),
                    affiliateService.generateReferralCode(user.id)
                ]);
                setStats(affiliateStats);
                setReferralCode(code);
            }
            catch (error) {
                console.error('Error loading dashboard:', error);
            }
            finally {
                setLoading(false);
            }
        };
        if (user) {
            loadDashboardData();
        }
    }, [user]);
    const copyReferralLink = () => {
        const link = `${window.location.origin}/register?ref=${referralCode}`;
        navigator.clipboard.writeText(link);
        toast.success('Link copiado al portapapeles');
    };
    if (loading) {
        return _jsx("div", { className: "loader", children: "Cargando..." });
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-8", children: "Panel de Afiliado" }), _jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-8", children: [_jsx(StatsCard, { title: "Total Referidos", value: stats?.total_referrals || 0, icon: "users" }), _jsx(StatsCard, { title: "Referidos Exitosos", value: stats?.successful_referrals || 0, icon: "check" }), _jsx(StatsCard, { title: "Ganancias Totales", value: `$${stats?.total_earnings || 0}`, icon: "money" })] }), _jsxs("div", { className: "card p-6 mb-8", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Tu Link de Referido" }), _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", value: `${window.location.origin}/register?ref=${referralCode}`, className: "form-input flex-1", readOnly: true }), _jsx("button", { onClick: copyReferralLink, className: "btn-primary", children: "Copiar" })] })] })] }));
}
