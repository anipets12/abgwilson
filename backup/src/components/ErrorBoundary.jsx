import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { className: "error-page", children: [_jsx("h1", { children: "Lo sentimos, algo sali\u00F3 mal." }), _jsx("p", { children: "Por favor, intente recargar la p\u00E1gina." })] }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
