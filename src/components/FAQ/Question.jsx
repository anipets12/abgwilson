import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
const Question = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs("div", { className: "faq-question", children: [_jsxs("div", { className: "question-header", onClick: () => setIsOpen(!isOpen), children: [_jsx("h4", { children: question }), _jsx("span", { children: isOpen ? '-' : '+' })] }), isOpen && _jsx("p", { children: answer })] }));
};
export default Question;
