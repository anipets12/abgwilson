import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import MainFooter from './components/Footer/MainFooter';
import Loading from './components/Loading';
import WhatsAppButton from './components/Common/WhatsAppButton';
import ErrorBoundary from './components/ErrorBoundary';

// Carga diferida de componentes
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Forum = lazy(() => import('./pages/Forum'));
const ConsultaRapida = lazy(() => import('./pages/ConsultaRapida'));
const DerechoPenal = lazy(() => import('./pages/servicios/DerechoPenal'));
const DerechoCivil = lazy(() => import('./pages/servicios/DerechoCivil'));
const DerechoTransito = lazy(() => import('./pages/servicios/DerechoTransito'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Appointment = lazy(() => import('./pages/Appointment'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <MainNavigation />
          <main className="flex-grow">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/servicios/:serviceId" element={<ServiceDetail />} />
                <Route path="/servicios/penal" element={<DerechoPenal />} />
                <Route path="/servicios/civil" element={<DerechoCivil />} />
                <Route path="/servicios/transito" element={<DerechoTransito />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<BlogPost />} />
                <Route path="/foro" element={<Forum />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/consulta-rapida" element={<ConsultaRapida />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/agendar-cita" element={<Appointment />} />
                <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
                <Route path="/terminos-condiciones" element={<TermsConditions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <MainFooter />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
