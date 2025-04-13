import { jsx as _jsx } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { initializeAnalytics } from './utils/seo';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
initializeAnalytics();
document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    if (!rootElement)
        throw new Error('Root element not found');
    ReactDOM.createRoot(rootElement).render(_jsx(React.StrictMode, { children: _jsx(ErrorBoundary, { children: _jsx(HelmetProvider, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(AuthProvider, { children: _jsx(BrowserRouter, { children: _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(App, {}) }) }) }) }) }) }) }));
});
