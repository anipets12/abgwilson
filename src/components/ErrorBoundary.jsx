import React, { Component } from 'react';
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
            return (<div className="error-page">
          <h1>Lo sentimos, algo salió mal.</h1>
          <p>Por favor, intente recargar la página.</p>
        </div>);
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
