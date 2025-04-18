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

// Configuración de React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

// Inicializar analíticas
initializeAnalytics();

// Función para renderizar la aplicación
function renderApp() {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
        console.error('Error: Elemento root no encontrado');
        return;
    }
    
    try {
        // Crear root de React y renderizar la aplicación
        ReactDOM.createRoot(rootElement).render(
            <React.StrictMode>
                <ErrorBoundary>
                    <HelmetProvider>
                        <QueryClientProvider client={queryClient}>
                            <AuthProvider>
                                <BrowserRouter>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <App />
                                    </Suspense>
                                </BrowserRouter>
                            </AuthProvider>
                        </QueryClientProvider>
                    </HelmetProvider>
                </ErrorBoundary>
            </React.StrictMode>
        );
        
        console.log('React inicializado correctamente');
    } catch (error) {
        console.error('Error al renderizar React:', error);
    }
}

// Inicialización segura que funciona en todos los entornos, incluyendo Cloudflare Workers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
} else {
    renderApp();
}
