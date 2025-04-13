import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const Post = ({ title, content, image }) => {
    return (_jsxs("div", { className: "blog-post", children: [_jsx("img", { src: image, alt: title }), _jsx("h3", { children: title }), _jsx("p", { children: content }), _jsx("button", { className: "btn-primary", children: "Leer M\u00E1s" })] }));
};
export default Post;
