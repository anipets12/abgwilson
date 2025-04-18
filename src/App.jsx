import React, { useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AppRoutes from './routes';
import ErrorBoundary from './components/ErrorBoundary';

// Contextos
import { AuthProvider } from './contexts/AuthContext';

// Estilos
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Efecto para manejar el scroll al cambiar de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Simular carga de la aplicación
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-white">
          <Toaster position="top-right" toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
              borderRadius: '8px',
              padding: '12px 16px',
            }
          }} />
          <Header />
          <main className="flex-grow pt-20">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[50vh] bg-white">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Cargando página...</p>
                </div>
              </div>
            }>
              <AppRoutes />
            </Suspense>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
