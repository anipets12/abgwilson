import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importar páginas principales
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import BlogPage from './pages/Blog';
import ForumPage from './pages/Forum';
import ContactPage from './pages/Contact';
import NotFoundPage from './pages/NotFound';

// Componentes de Consultas
import ProcessSearch from './components/ProcessSearch';
import ConsultasPenales from './components/ConsultasPenales';
import ConsultasTransito from './components/ConsultasTransito';
import ConsultasCiviles from './components/ConsultasCiviles';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/foro" element={<ForumPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      
      {/* Consultas */}
      <Route path="/consultas">
        <Route path="procesos-judiciales" element={<ProcessSearch />} />
        <Route path="procesos-penales" element={<ConsultasPenales />} />
        <Route path="transito" element={<ConsultasTransito />} />
        <Route path="civil" element={<ConsultasCiviles />} />
      </Route>
      
      {/* Ruta 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
