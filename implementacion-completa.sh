#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 IMPLEMENTACIÓN COMPLETA ABOGADO WILSON WEBSITE                 ${NC}"
echo -e "${BLUE}======================================================================${NC}"

# Configuración de rutas
SOURCE_DIR="/home/wily/CascadeProjects/abogado-wilson-website"
TARGET_DIR="/home/wily/CascadeProjects/abgwilson"
SRC_DIR="${TARGET_DIR}/src"
COMPONENTS_DIR="${SRC_DIR}/components"
PAGES_DIR="${SRC_DIR}/pages"
CONTEXTS_DIR="${SRC_DIR}/context"
UTILS_DIR="${SRC_DIR}/utils"
HOOKS_DIR="${SRC_DIR}/hooks"
ASSETS_DIR="${SRC_DIR}/assets"

# 1. Limpieza y preparación de directorios
echo -e "${YELLOW}[1/10]${NC} Limpiando proyecto y preparando directorios..."

# Crear directorios principales si no existen
mkdir -p "${SRC_DIR}"
mkdir -p "${COMPONENTS_DIR}"
mkdir -p "${COMPONENTS_DIR}/Auth"
mkdir -p "${COMPONENTS_DIR}/Dashboard"
mkdir -p "${COMPONENTS_DIR}/Services"
mkdir -p "${COMPONENTS_DIR}/Chat"
mkdir -p "${COMPONENTS_DIR}/Forum"
mkdir -p "${COMPONENTS_DIR}/Appointment"
mkdir -p "${COMPONENTS_DIR}/Contact"
mkdir -p "${COMPONENTS_DIR}/Testimonials"
mkdir -p "${PAGES_DIR}"
mkdir -p "${PAGES_DIR}/Home"
mkdir -p "${PAGES_DIR}/Services"
mkdir -p "${PAGES_DIR}/Auth"
mkdir -p "${PAGES_DIR}/Dashboard"
mkdir -p "${PAGES_DIR}/Blog"
mkdir -p "${PAGES_DIR}/Forum"
mkdir -p "${PAGES_DIR}/Contact"
mkdir -p "${CONTEXTS_DIR}"
mkdir -p "${UTILS_DIR}"
mkdir -p "${HOOKS_DIR}"
mkdir -p "${ASSETS_DIR}"
mkdir -p "${TARGET_DIR}/public"

echo -e "${GREEN}✓${NC} Proyecto limpiado y directorios preparados"

# 2. Copiar archivos de configuración
echo -e "${YELLOW}[2/10]${NC} Copiando archivos de configuración..."

# Configuración de vite
cat > "${TARGET_DIR}/vite.config.js" << 'EOL'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@context': path.resolve(__dirname, './src/context'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets')
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
  }
});
EOL

# Copiar .env si existe
if [ -f "${SOURCE_DIR}/.env" ]; then
  cp "${SOURCE_DIR}/.env" "${TARGET_DIR}/.env"
else
  # Crear .env básico
  cat > "${TARGET_DIR}/.env" << 'EOL'
VITE_APP_NAME="Abg. Wilson Alexander Ipiales Guerron"
VITE_APP_URL="https://abogadowilson.com"
VITE_APP_ENV="development"
VITE_SUPABASE_URL=""
VITE_SUPABASE_KEY=""
EOL
fi

# Configuración de tailwind
cat > "${TARGET_DIR}/tailwind.config.js" << 'EOL'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a56db',
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d7fe',
          300: '#a4bcfd',
          400: '#8098f9',
          500: '#6173f3',
          600: '#4756e6',
          700: '#3a46cc',
          800: '#2d39a2',
          900: '#243283',
        },
        secondary: {
          DEFAULT: '#14b8a6',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
EOL

cat > "${TARGET_DIR}/postcss.config.js" << 'EOL'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

echo -e "${GREEN}✓${NC} Archivos de configuración copiados"

# 3. Crear package.json optimizado
echo -e "${YELLOW}[3/10]${NC} Creando package.json optimizado..."

cat > "${TARGET_DIR}/package.json" << 'EOL'
{
  "name": "abogado-wilson-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.0",
    "react-icons": "^4.12.0",
    "framer-motion": "^10.16.4",
    "react-hook-form": "^7.43.9",
    "react-datepicker": "^4.16.0",
    "react-toastify": "^9.1.3",
    "react-slick": "^0.29.0",
    "slick-carousel": "^1.8.1",
    "@supabase/supabase-js": "^2.38.0",
    "date-fns": "^2.30.0",
    "react-countup": "^6.4.2",
    "react-intersection-observer": "^9.5.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.3",
    "vite": "^5.0.0"
  }
}
EOL

echo -e "${GREEN}✓${NC} package.json creado"

# 4. Copiar archivos principales
echo -e "${YELLOW}[4/10]${NC} Copiando archivos principales..."

# Copiar index.html
if [ -f "${SOURCE_DIR}/index.html" ]; then
  cp "${SOURCE_DIR}/index.html" "${TARGET_DIR}/index.html"
else
  cat > "${TARGET_DIR}/index.html" << 'EOL'
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Abg. Wilson Alexander Ipiales Guerron - Asesoría Legal Profesional</title>
    <meta name="description" content="Asesoría legal profesional en derecho penal, civil, tránsito, comercial y aduanas. Protegiendo sus derechos con experiencia y dedicación en Ibarra, Ecuador." />
    <meta name="keywords" content="abogado, derecho penal, derecho civil, derecho de tránsito, derecho comercial, aduanas, asesoría legal, Ibarra, Ecuador" />
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOL
fi

# Copiar CSS base
cat > "${SRC_DIR}/index.css" << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }
  body {
    @apply bg-gray-50 text-gray-900 font-sans;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-bold;
  }
  h1 {
    @apply text-4xl md:text-5xl;
  }
  h2 {
    @apply text-3xl md:text-4xl;
  }
  h3 {
    @apply text-2xl md:text-3xl;
  }
  a {
    @apply transition-colors duration-200;
  }
}

@layer components {
  .btn {
    @apply px-6 py-3 rounded-lg font-medium transition-all duration-200;
  }
  .btn-primary {
    @apply bg-primary text-white hover:bg-primary-700;
  }
  .btn-secondary {
    @apply bg-secondary text-white hover:bg-secondary-700;
  }
  .btn-outline {
    @apply border border-gray-300 hover:bg-gray-100;
  }
  .card {
    @apply bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200;
  }
  .input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
  }
  .container {
    @apply px-4 mx-auto max-w-7xl;
  }
}
EOL

# Copiar main.jsx para la inicialización de React
cat > "${SRC_DIR}/main.jsx" << 'EOL'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  </React.StrictMode>,
)
EOL

echo -e "${GREEN}✓${NC} Archivos principales copiados"

# 5. Copiar componentes principales
echo -e "${YELLOW}[5/10]${NC} Copiando componentes principales..."

# Función para copiar componentes
copy_component() {
  local component=$1
  local source="${SOURCE_DIR}/src/components/${component}"
  local target="${COMPONENTS_DIR}/${component}"
  
  if [ -f "$source" ]; then
    cp "$source" "$target"
    echo -e "${GREEN}✓${NC} Copiado: ${component}"
  else
    echo -e "${RED}✗${NC} No se encontró: ${component}"
  fi
}

# Copiar componentes principales
copy_component "Header.jsx"
copy_component "Footer.jsx"
copy_component "Hero.jsx"
copy_component "Services.jsx"
copy_component "Testimonials.jsx"
copy_component "WhatsAppButton.jsx"
copy_component "Blog.jsx"
copy_component "Forum.jsx"
copy_component "Contact.jsx"
copy_component "Auth/Login.jsx"
copy_component "Auth/Register.jsx"
copy_component "Appointment/AppointmentCalendar.jsx"
copy_component "ConsultasPenales.jsx"
copy_component "ConsultasTransito.jsx"
copy_component "ConsultasCiviles.jsx"
copy_component "ProcessSearch.jsx"

echo -e "${GREEN}✓${NC} Componentes principales copiados"

# 6. Copiar páginas principales
echo -e "${YELLOW}[6/10]${NC} Copiando páginas principales..."

# Copiar páginas de Home
cat > "${PAGES_DIR}/Home/index.jsx" << 'EOL'
import React from 'react';
import Hero from '../../components/Hero';
import Services from '../../components/Services';
import Testimonials from '../../components/Testimonials';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="py-20">
        <Services />
      </div>
      <div className="py-16 bg-gray-50">
        <Testimonials />
      </div>
    </div>
  );
};

export default HomePage;
EOL

# Copiar páginas de Servicios
cat > "${PAGES_DIR}/Services/index.jsx" << 'EOL'
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
EOL

# Copiar páginas de Blogs
cat > "${PAGES_DIR}/Blog/index.jsx" << 'EOL'
import React from 'react';
import Blog from '../../components/Blog';

const BlogPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Blog Legal</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16">
          Manténgase informado sobre temas legales relevantes, cambios en la legislación ecuatoriana y consejos prácticos para diversas situaciones jurídicas.
        </p>
        <Blog />
      </div>
    </div>
  );
};

export default BlogPage;
EOL

# Copiar páginas de Foro
cat > "${PAGES_DIR}/Forum/index.jsx" << 'EOL'
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
EOL

# Copiar páginas de Contacto
cat > "${PAGES_DIR}/Contact/index.jsx" << 'EOL'
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
EOL

# Página 404
cat > "${PAGES_DIR}/NotFound/index.jsx" << 'EOL'
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página No Encontrada</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que está buscando no existe o ha sido movida.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary inline-block"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
EOL

echo -e "${GREEN}✓${NC} Páginas principales copiadas/creadas"

# 7. Crear configuración de rutas
echo -e "${YELLOW}[7/10]${NC} Creando configuración de rutas..."

cat > "${SRC_DIR}/routes.jsx" << 'EOL'
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
EOL

echo -e "${GREEN}✓${NC} Archivo de rutas creado"

# 8. Modificar App.jsx
echo -e "${YELLOW}[8/10]${NC} Modificando App.jsx..."

cat > "${SRC_DIR}/App.jsx" << 'EOL'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AppRoutes from './routes';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Efecto para manejar el scroll al cambiar de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Simular carga de la aplicación
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow pt-20">
        <AppRoutes />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
EOL

echo -e "${GREEN}✓${NC} App.jsx modificado"

# 9. Crear contexto de autenticación
echo -e "${YELLOW}[9/10]${NC} Creando contexto de autenticación..."

cat > "${CONTEXTS_DIR}/AuthContext.jsx" << 'EOL'
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (userData) => {
    // Aquí iría la lógica para registrar un usuario
    // Por ahora solo simularemos un registro exitoso
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'user'
    };
    login(newUser);
    return true;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
EOL

echo -e "${GREEN}✓${NC} Contexto de autenticación creado"

# 10. Instalar dependencias y compilar
echo -e "${YELLOW}[10/10]${NC} Instalando dependencias y ejecutando build..."

cd "${TARGET_DIR}" && npm install && npm run build

# Verificar si la compilación fue exitosa
if [ $? -eq 0 ]; then
  echo -e "\n${GREEN}======================================================================${NC}"
  echo -e "${GREEN}   ✅ IMPLEMENTACIÓN COMPLETADA EXITOSAMENTE                         ${NC}"
  echo -e "${GREEN}======================================================================${NC}"
  echo ""
  echo -e "El sitio web está listo para ser utilizado."
  echo -e "Para iniciar el servidor de desarrollo, ejecute:"
  echo -e "${BLUE}cd ${TARGET_DIR} && npm run dev${NC}"
  echo ""
  echo -e "Para desplegar el sitio web, ejecute:"
  echo -e "${BLUE}cd ${TARGET_DIR} && npm run build${NC}"
  echo ""
else
  echo -e "\n${RED}======================================================================${NC}"
  echo -e "${RED}   ❌ ERROR EN LA IMPLEMENTACIÓN                                      ${NC}"
  echo -e "${RED}======================================================================${NC}"
  echo ""
  echo -e "Ocurrió un error durante la compilación. Revise los mensajes de error anteriores."
  echo -e "Pruebe ejecutando manualmente:"
  echo -e "${BLUE}npm install${NC}"
  echo -e "${BLUE}npm run dev${NC}"
fi
