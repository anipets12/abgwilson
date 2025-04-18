import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importar páginas principales
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import BlogPage from './pages/Blog';
import ForumPage from './pages/Forum';
import ContactPage from './pages/Contact';
import NotFoundPage from './pages/NotFound';

// Páginas de Servicios por Especialidad
import DerechoCivil from './pages/Services/Civil';
import DerechoFamiliar from './pages/Services/Familiar';
import DerechoMercantil from './pages/Services/Mercantil';
import DerechoAdministrativo from './pages/Services/Administrativo';
import DerechoTransito from './pages/Services/Transito';

// Consultas y Procesos
import ProcessSearch from './components/ProcessSearch';
import ConsultasPenales from './components/ConsultasPenales';
import ConsultasTransito from './components/ConsultasTransito';
import ConsultasCiviles from './components/ConsultasCiviles';

// Autenticación y Perfil
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Profile from './components/Auth/Profile';

// Dashboard
import DashboardPage from './components/Dashboard/DashboardPage';
import ClientDashboard from './components/Dashboard/ClientDashboard';

// Sistema de Citas
import Appointments from './pages/Appointments/Appointments';

// E-Commerce y Afiliados
import EbooksPage from './pages/Ebooks';
import AfiliadosPage from './pages/Afiliados';
import Cart from './components/Cart';

// Certificados y servicios adicionales
import Certificates from './pages/Certificates';
import Sponsorships from './pages/Sponsorships';
import ThankYou from './pages/ThankYou';

// Términos y Políticas
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsConditions from './pages/Legal/TermsConditions';

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
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default AppRoutes;
