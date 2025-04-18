import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const CTA = ({ title, description, buttonText, link }) => {
    return (_jsxs("div", { className: "cta", children: [_jsx("h2", { children: title }), _jsx("p", { children: description }), _jsx("a", { href: link, className: "btn-primary", children: buttonText })] }));
};
export default CTA;
