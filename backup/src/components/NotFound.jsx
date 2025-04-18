import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Página No Encontrada</h2>
      <p className="text-lg text-gray-600 mb-8">
        Lo sentimos, la página que está buscando no existe o ha sido movida.
      </p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
