import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

// Importación de componentes con lazy loading para mejor rendimiento
const Home = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact/ContactPage'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const Dashboard = lazy(() => import('./components/Dashboard/DashboardPage'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./components/TerminosCondiciones'));
const ConsultationHub = lazy(() => import('./components/Consultation/ConsultationHub'));
const PaymentForm = lazy(() => import('./components/Payment/PaymentForm'));
const ThankYouPage = lazy(() => import('./components/Payment/ThankYouPage'));
const NotFound = lazy(() => import('./components/ErrorBoundary'));

// Definición de las rutas de la aplicación
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Services />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/iniciar-sesion" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
      <Route path="/terminos-condiciones" element={<TermsConditions />} />
      <Route path="/consultas" element={<ConsultationHub />} />
      <Route path="/pago" element={<PaymentForm />} />
      <Route path="/gracias" element={<ThankYouPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
