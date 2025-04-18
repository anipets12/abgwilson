import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componente de página de inicio simple
const Home = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Abg. Wilson Alexander Ipiales Guerron</h1>
      </div>
    </header>
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Servicios legales profesionales en Ibarra, Ecuador</h2>
            <p className="mb-4">Ofrecemos asesoría legal especializada en:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Derecho Civil</li>
              <li>Derecho Penal</li>
              <li>Derecho Laboral</li>
              <li>Derecho Administrativo</li>
              <li>Trámites Notariales</li>
            </ul>
            <p>Contáctenos para más información.</p>
          </div>
        </div>
      </div>
    </main>
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">© 2025 Abg. Wilson Alexander Ipiales Guerron</p>
      </div>
    </footer>
  </div>
);

// Página simple de servicios
const Services = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Servicios Legales</h1>
      </div>
    </header>
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Nuestros Servicios</h2>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded shadow">
                <h3 className="font-medium">Asesoría Legal Civil</h3>
                <p className="text-gray-600">Contratos, sucesiones, propiedad, etc.</p>
              </li>
              <li className="bg-white p-4 rounded shadow">
                <h3 className="font-medium">Derecho Penal</h3>
                <p className="text-gray-600">Defensa penal, recursos, etc.</p>
              </li>
              <li className="bg-white p-4 rounded shadow">
                <h3 className="font-medium">Derecho Laboral</h3>
                <p className="text-gray-600">Contratos laborales, despidos, etc.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">© 2025 Abg. Wilson Alexander Ipiales Guerron</p>
      </div>
    </footer>
  </div>
);

// Página de error 404
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <h2 className="text-2xl font-medium text-gray-600">Página no encontrada</h2>
      <p className="mt-2 text-gray-500">Lo sentimos, la página que buscas no existe.</p>
      <div className="mt-6">
        <a href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md">
          Volver al inicio
        </a>
      </div>
    </div>
  </div>
);

// Aplicación principal
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
