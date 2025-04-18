import React from 'react';
import Forum from '../../components/Forum';

const ForumPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Foro Legal</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16">
          Participe en nuestro foro de consultas legales, donde puede hacer preguntas, compartir experiencias y obtener orientación de profesionales y miembros de la comunidad.
        </p>
        <Forum />
      </div>
    </div>
  );
};

export default ForumPage;
