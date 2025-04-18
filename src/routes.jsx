import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Componente de carga para Suspense
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-600 text-sm">Cargando...</p>
    </div>
  </div>
);

// Lazy load para páginas principales
const HomePage = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/Services'));
const BlogPage = lazy(() => import('./pages/Blog'));
const ForumPage = lazy(() => import('./pages/Forum'));
const ContactPage = lazy(() => import('./pages/Contact'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

// Lazy load para páginas de Servicios por Especialidad
const DerechoCivil = lazy(() => import('./pages/Services/Civil'));
const DerechoFamiliar = lazy(() => import('./pages/Services/Familiar'));
const DerechoMercantil = lazy(() => import('./pages/Services/Mercantil'));
const DerechoAdministrativo = lazy(() => import('./pages/Services/Administrativo'));
const DerechoTransito = lazy(() => import('./pages/Services/Transito'));

// Lazy load para Consultas y Procesos
const ProcessSearch = lazy(() => import('./components/ProcessSearch'));
const ConsultasPenales = lazy(() => import('./components/ConsultasPenales'));
const ConsultasTransito = lazy(() => import('./components/ConsultasTransito'));
const ConsultasCiviles = lazy(() => import('./components/ConsultasCiviles'));

// Lazy load para Autenticación y Perfil
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const ForgotPassword = lazy(() => import('./components/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/Auth/ResetPassword'));
const Profile = lazy(() => import('./components/Auth/Profile'));

// Lazy load para Dashboard
const DashboardPage = lazy(() => import('./components/Dashboard/DashboardPage'));
const ClientDashboard = lazy(() => import('./components/Dashboard/ClientDashboard'));

// Lazy load para Sistema de Citas
const Appointments = lazy(() => import('./pages/Appointments/Appointments'));

// Lazy load para E-Commerce y Afiliados
const EbooksPage = lazy(() => import('./pages/Ebooks'));
const AfiliadosPage = lazy(() => import('./pages/Afiliados'));
const Cart = lazy(() => import('./components/Cart'));

// Lazy load para Certificados y servicios adicionales
const Certificates = lazy(() => import('./pages/Certificates'));
const Sponsorships = lazy(() => import('./pages/Sponsorships'));
const ThankYou = lazy(() => import('./pages/ThankYou'));

// Lazy load para Términos y Políticas
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/Legal/TermsConditions'));

// Contenido Exclusivo y Suscripciones
import PlanPremium from './components/Suscripcion/PlanPremium';
import SuscripcionExitosa from './components/Suscripcion/SuscripcionExitosa';
import ContenidoExclusivo from './pages/ContenidoExclusivo';
import RecursosLegales from './pages/RecursosLegales';

// Componente para verificar autenticación
import RequireAuth from './components/Auth/RequireAuth';

// Componente para verificar autenticación de administrador
import AdminRoute from './components/AdminRoute';

// Páginas de administrador
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminContent from './pages/Admin/Content';
import AdminServices from './pages/Admin/Services';
import AdminPayments from './pages/Admin/Payments';
import AdminSettings from './pages/Admin/Settings';
import AdminAffiliates from './pages/Admin/Affiliates';

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/servicios/civil" element={<DerechoCivil />} />
        <Route path="/servicios/familiar" element={<DerechoFamiliar />} />
        <Route path="/servicios/mercantil" element={<DerechoMercantil />} />
        <Route path="/servicios/administrativo" element={<DerechoAdministrativo />} />
        <Route path="/servicios/transito" element={<DerechoTransito />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/foro" element={<ForumPage />} />
        <Route path="/foro/:id" element={<ForumPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/ebooks" element={<EbooksPage />} />
        <Route path="/afiliados" element={<AfiliadosPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/legal/privacidad" element={<PrivacyPolicy />} />
        <Route path="/legal/terminos" element={<TermsConditions />} />
        <Route path="/certificados" element={<Certificates />} />
        <Route path="/patrocinios" element={<Sponsorships />} />
        <Route path="/gracias" element={<ThankYou />} />
        <Route path="/citas" element={<Appointments />} />
        
        {/* Consultas */}
        <Route path="/consultas">
          <Route path="procesos-judiciales" element={<ProcessSearch />} />
          <Route path="procesos-penales" element={<ConsultasPenales />} />
          <Route path="transito" element={<ConsultasTransito />} />
          <Route path="civil" element={<ConsultasCiviles />} />
        </Route>
        
        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/perfil" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />

        {/* Dashboard - Rutas Protegidas */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }>
          <Route index element={<ClientDashboard />} />
          <Route path="casos" element={<ClientDashboard section="casos" />} />
          <Route path="citas" element={<ClientDashboard section="citas" />} />
          <Route path="documentos" element={<ClientDashboard section="documentos" />} />
          <Route path="pagos" element={<ClientDashboard section="pagos" />} />
        </Route>
        
        {/* Rutas de administrador */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />
        <Route path="/admin/content/*" element={
          <AdminRoute>
            <AdminContent />
          </AdminRoute>
        } />
        <Route path="/admin/services/*" element={
          <AdminRoute>
            <AdminServices />
          </AdminRoute>
        } />
        <Route path="/admin/payments/*" element={
          <AdminRoute>
            <AdminPayments />
          </AdminRoute>
        } />
        <Route path="/admin/marketing/affiliates" element={
          <AdminRoute>
            <AdminAffiliates />
          </AdminRoute>
        } />
        <Route path="/admin/settings" element={
          <AdminRoute>
            <AdminSettings />
          </AdminRoute>
        } />
        
        {/* Suscripciones y Contenido Exclusivo */}
        <Route path="/suscripcion">
          <Route path="premium" element={<PlanPremium />} />
          <Route path="exitosa" element={<SuscripcionExitosa />} />
        </Route>
        
        <Route path="/exclusivo" element={
          <RequireAuth premiumRequired={true}>
            <ContenidoExclusivo />
          </RequireAuth>
        } />
        
        <Route path="/recursos-legales" element={
          <RequireAuth premiumRequired={true}>
            <RecursosLegales />
          </RequireAuth>
        } />
        
        {/* Ruta 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
