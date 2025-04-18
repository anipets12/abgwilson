import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AppRoutes from './routes';
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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow pt-20">
        <AppRoutes />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
