import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Abogado Wilson Alexander Ipiales Guerron</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Bienvenido a mi despacho legal</h2>
        <p className="text-gray-700 mb-4">
          Ofrezco servicios legales profesionales en Ibarra, Ecuador. Con experiencia y dedicación, 
          me comprometo a brindar asesoría legal de alta calidad para ayudarle a resolver sus asuntos legales.
        </p>
        <div className="mt-4">
          <a href="/contacto" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Contactar ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
