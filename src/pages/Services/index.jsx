import React from 'react';
import Services from '../../components/Services';

const ServicesPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Nuestros Servicios Legales</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16">
          Ofrecemos una amplia gama de servicios legales de alta calidad, adaptados a las necesidades específicas de nuestros clientes.
          Con experiencia en diversas áreas del derecho, nuestro equipo está preparado para brindarle la mejor asesoría y representación legal.
        </p>
        <Services fullPage={true} />
      </div>
    </div>
  );
};

export default ServicesPage;
