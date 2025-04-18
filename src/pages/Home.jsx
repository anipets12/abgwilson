import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Abg. Wilson Alexander Ipiales Guerron - Asesoría Legal Profesional';
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Estadísticas */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Resultados Probados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">5+</div>
              <div className="text-gray-700">Años de Experiencia</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-700">Casos Ganados</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-700">Clientes Satisfechos</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Oferta Especial */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="mb-6 inline-block bg-red-600 py-1 px-4 rounded-full text-sm font-semibold">OFERTA ESPECIAL<span className="ml-2">¡Tiempo Limitado!</span></div>
          <h2 className="text-4xl font-bold mb-4">Primera Consulta Legal GRATUITA</h2>
          <p className="text-xl mb-6">Reciba asesoramiento legal personalizado sin costo. Oferta válida solo por tiempo limitado.</p>
          <Link to="/contacto" className="bg-white text-blue-700 hover:bg-blue-50 py-3 px-8 rounded-lg inline-block font-bold transition duration-300">
            Reservar Mi Consulta Gratuita
          </Link>
        </div>
      </div>
      
      {/* Servicios */}
      <Services />
      
      {/* Testimonios */}
      <Testimonials />
      
      {/* CTA Final */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para recibir asesoría legal de calidad?</h2>
          <p className="text-xl text-gray-700 mb-8">Únase a nuestros clientes satisfechos y permítanos ayudarle con sus necesidades legales. Primera consulta totalmente gratuita.</p>
          <Link to="/contacto" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg inline-block font-bold transition duration-300">
            Solicitar Consulta
          </Link>
          <p className="mt-4 text-gray-600">Sin compromiso. Respuesta en 24 horas</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
