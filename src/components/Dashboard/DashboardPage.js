import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ClientDashboard from './ClientDashboard';
import CommentForm from '../Comments/CommentForm';
import CommentList from '../Comments/CommentList';
import AffiliateRegister from '../Affiliates/AffiliateRegister';
import AffiliateList from '../Affiliates/AffiliateList';
import TokenSystem from '../Tokens/TokenSystem';
const DashboardPage = () => {
    return (_jsxs("div", { className: "space-y-8 p-8", children: [_jsx(ClientDashboard, {}), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Comentarios" }), _jsx(CommentForm, { postId: 1 }), _jsx(CommentList, { postId: 1 })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Afiliados" }), _jsx(AffiliateRegister, {}), _jsx(AffiliateList, {})] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Consultas" }), _jsx(TokenSystem, {})] })] }));
};
export default DashboardPage;
