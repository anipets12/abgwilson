import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const Testimonial = ({ name, comment, image }) => {
    return (_jsxs("div", { className: "testimonial", children: [_jsx("img", { src: image, alt: name }), _jsx("h4", { children: name }), _jsx("p", { children: comment })] }));
};
export default Testimonial;
