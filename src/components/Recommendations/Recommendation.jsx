import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const Recommendation = ({ title, description, link }) => {
    return (_jsxs("div", { className: "recommendation", children: [_jsx("h3", { children: title }), _jsx("p", { children: description }), _jsx("a", { href: link, className: "btn-primary", children: "Ver M\u00E1s" })] }));
};
export default Recommendation;
