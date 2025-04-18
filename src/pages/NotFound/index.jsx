import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página No Encontrada</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que está buscando no existe o ha sido movida.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary inline-block"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
