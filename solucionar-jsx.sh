#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 CORRECCIÓN DE JSX - ABOGADO WILSON WEBSITE                    ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Configurar vite.config.js para manejar JSX en archivos .js
echo -e "${YELLOW}[1/3]${NC} Configurando Vite para manejar JSX en archivos .js..."

cat > vite.config.js << 'EOL'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Incluye archivos .js - por defecto es solo .jsx
      include: "**/*.{jsx,js}",
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true
      }
    }
  }
})
EOL

echo -e "${GREEN}✓${NC} vite.config.js configurado"

# 2. Crear estructura básica de componentes
echo -e "${YELLOW}[2/3]${NC} Creando estructura básica de componentes..."

mkdir -p src/components

# Crear componentes básicos
cat > src/main.jsx << 'EOL'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOL

cat > src/App.jsx << 'EOL'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
EOL

cat > src/index.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  display: flex;
  min-width: 320px;
  min-height: 100vh;
}

#root {
  width: 100%;
}
EOL

# Crear componentes mínimos necesarios
cat > src/components/Navbar.jsx << 'EOL'
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Abg. Wilson Alexander Ipiales Guerron</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Inicio</Link>
          <Link to="/servicios" className="hover:text-gray-300">Servicios</Link>
          <Link to="/contacto" className="hover:text-gray-300">Contacto</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
EOL

cat > src/components/Footer.jsx << 'EOL'
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Abg. Wilson Alexander Ipiales Guerron. Todos los derechos reservados.</p>
        <p>Contacto: +593 988835269 | alexip2@hotmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
EOL

cat > src/components/Home.jsx << 'EOL'
import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Abogado Wilson Alexander Ipiales Guerron</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Bienvenido a mi despacho legal</h2>
        <p className="text-gray-700 mb-4">
          Ofrezco servicios legales profesionales en Ibarra, Ecuador. Con experiencia y dedicación, 
          me comprometo a brindar asesoría legal de alta calidad para ayudarle a resolver sus asuntos legales.
        </p>
        <div className="mt-4">
          <a href="/contacto" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Contactar ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
EOL

cat > src/components/Services.jsx << 'EOL'
import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Derecho Civil",
      description: "Asesoría en contratos, obligaciones, responsabilidad civil y procesos judiciales."
    },
    {
      title: "Derecho Penal",
      description: "Defensa en procesos penales, medidas cautelares y recursos de apelación."
    },
    {
      title: "Derecho Laboral",
      description: "Asesoría en contrataciones, despidos, indemnizaciones y conflictos laborales."
    },
    {
      title: "Derecho Familiar",
      description: "Procesos de divorcio, custodia, pensiones alimenticias y adopciones."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nuestros Servicios Legales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
EOL

cat > src/components/Contact.jsx << 'EOL'
import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
            <p className="mb-2"><strong>Abogado:</strong> Wilson Alexander Ipiales Guerron</p>
            <p className="mb-2"><strong>Ubicación:</strong> Ibarra, Ecuador</p>
            <p className="mb-2"><strong>Teléfono:</strong> +593 988835269</p>
            <p className="mb-2"><strong>Email:</strong> alexip2@hotmail.com</p>
            <p className="mb-2"><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Envíe su Consulta</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mensaje</label>
                <textarea rows="4" className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
EOL

cat > src/components/NotFound.jsx << 'EOL'
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Página No Encontrada</h2>
      <p className="text-lg text-gray-600 mb-8">
        Lo sentimos, la página que está buscando no existe o ha sido movida.
      </p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
EOL

# 3. Crear archivo HTML base
echo -e "${YELLOW}[3/3]${NC} Creando archivo HTML base..."

cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzMzNjZmZiIgZD0iTTEyIDJsOS4yIDMuNHYxMi4xTDEyIDIybC05LjItNC41VjUuNEwxMiAybTAtMkwxLjggNS44djEyLjRMMTIgMjRsMTAuMi01LjhWNS44TDEyIDB6Ii8+PHBhdGggZmlsbD0iIzMzNjZmZiIgZD0iTTEyIDRMNCAxMGgxNmwtOC02em0wIDJ2MTJsNi01LjJWOC43TDEyIDZ6Ii8+PC9zdmc+" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Abg. Wilson Alexander Ipiales Guerron</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOL

# Script de worker para Cloudflare
cat > src/worker-simple.js << 'EOL'
/**
 * Worker optimizado para Cloudflare Pages que maneja correctamente las rutas SPA
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Servir archivos estáticos directamente
    if (url.pathname.match(/\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2)$/)) {
      return fetch(request);
    }
    
    // Para cualquier otra ruta, servir index.html (SPA routing)
    return fetch(new URL('/index.html', url.origin));
  }
};
EOL

echo -e "${GREEN}✓${NC} Estructura básica creada exitosamente"

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ PROYECTO LISTO PARA COMPILAR                                    ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Ahora ejecute los siguientes comandos para compilar y ejecutar el proyecto:"
echo -e "${BLUE}npm install${NC}"
echo -e "${BLUE}npm run build${NC}"
echo -e "${BLUE}npm run preview${NC}"
echo ""
echo -e "Para desplegar en Cloudflare Pages:"
echo -e "${BLUE}npx wrangler pages deploy dist${NC}"
