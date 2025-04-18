import React from 'react';
import Contact from '../../components/Contact';

const ContactPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Contacto</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16">
          Estamos aquí para ayudarle con sus necesidades legales. No dude en ponerse en contacto con nosotros mediante cualquiera de las siguientes opciones.
        </p>
        <Contact />
      </div>
    </div>
  );
};

export default ContactPage;
