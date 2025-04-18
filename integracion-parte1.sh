#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   🚀 INTEGRACIÓN FINAL - WEBSITE ABOGADO WILSON (PARTE 1)          ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# Configurar directorios
SOURCE_DIR="/home/wily/CascadeProjects/abogado-wilson-website"
TARGET_DIR="/home/wily/CascadeProjects/abgwilson"
COMPONENTS_DIR="${TARGET_DIR}/src/components"
PAGES_DIR="${TARGET_DIR}/src/pages"
CONTEXT_DIR="${TARGET_DIR}/src/context"
UTILS_DIR="${TARGET_DIR}/src/utils"
HOOKS_DIR="${TARGET_DIR}/src/hooks"
CONFIG_DIR="${TARGET_DIR}/src/config"

# 1. Crear estructura de directorios si no existen
echo -e "${YELLOW}[1/6]${NC} Creando estructura de directorios..."
mkdir -p "${COMPONENTS_DIR}"
mkdir -p "${PAGES_DIR}"
mkdir -p "${CONTEXT_DIR}"
mkdir -p "${UTILS_DIR}"
mkdir -p "${HOOKS_DIR}"
mkdir -p "${CONFIG_DIR}"
mkdir -p "${COMPONENTS_DIR}/Auth"
mkdir -p "${COMPONENTS_DIR}/Dashboard"
mkdir -p "${COMPONENTS_DIR}/Appointment"
mkdir -p "${COMPONENTS_DIR}/Contact"
mkdir -p "${COMPONENTS_DIR}/Footer"
mkdir -p "${COMPONENTS_DIR}/Services"
mkdir -p "${COMPONENTS_DIR}/Chat"
mkdir -p "${COMPONENTS_DIR}/Forum"
mkdir -p "${COMPONENTS_DIR}/Testimonials"
mkdir -p "${PAGES_DIR}/Home"
mkdir -p "${PAGES_DIR}/Services"
mkdir -p "${PAGES_DIR}/Blog"
mkdir -p "${PAGES_DIR}/Forum"
mkdir -p "${PAGES_DIR}/Contact"
mkdir -p "${PAGES_DIR}/Auth"
mkdir -p "${PAGES_DIR}/Dashboard"
mkdir -p "${PAGES_DIR}/Appointment"
mkdir -p "${PAGES_DIR}/NotFound"
mkdir -p "${PAGES_DIR}/Consultas"

echo -e "${GREEN}✓${NC} Estructura de directorios creada"

# 2. Copiar archivos de configuración
echo -e "${YELLOW}[2/6]${NC} Copiando archivos de configuración..."

# Archivo de configuración principal
cat > "${CONFIG_DIR}/index.js" << 'EOL'
/**
 * Configuración global del sitio web de Abogado Wilson
 * @module config
 */

const config = {
  siteName: "Abg. Wilson Alexander Ipiales Guerron",
  siteUrl: "https://abogadowilson.com",
  contactInfo: {
    phone: "+593 988835269",
    email: "alexip2@hotmail.com",
    address: "Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador"
  },
  api: {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "",
    supabaseKey: import.meta.env.VITE_SUPABASE_KEY || "",
    judicaturaUrl: "https://www.funcionjudicial.gob.ec",
    transitoUrl: "https://www.ant.gob.ec",
    sriUrl: "https://www.sri.gob.ec"
  },
  social: {
    facebook: "https://facebook.com/abogadowilson",
    twitter: "https://twitter.com/abogadowilson",
    instagram: "https://instagram.com/abogadowilson",
    whatsapp: "https://wa.me/593988835269"
  },
  authentication: {
    tokenName: "abogado_wilson_auth_token",
    tokenExpiry: 7 // días
  }
};

export default config;
EOL

# Variables de entorno
cat > "${TARGET_DIR}/.env" << 'EOL'
VITE_APP_NAME="Abg. Wilson Alexander Ipiales Guerron"
VITE_APP_URL="https://abogadowilson.com"
VITE_APP_ENV="development"
VITE_SUPABASE_URL=""
VITE_SUPABASE_KEY=""
EOL

# 3. Actualizar package.json
echo -e "${YELLOW}[3/6]${NC} Actualizando package.json..."

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
    "react-intersection-observer": "^9.5.2",
    "tailwindcss": "^3.3.3",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
EOL

# 4. Configurar Vite
echo -e "${YELLOW}[4/6]${NC} Configurando Vite..."

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
      '@config': path.resolve(__dirname, './src/config'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  }
});
EOL

# 5. Configurar TailwindCSS
echo -e "${YELLOW}[5/6]${NC} Configurando TailwindCSS..."

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
        dark: {
          DEFAULT: '#111827',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
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

# 6. Configurar CSS base
echo -e "${YELLOW}[6/6]${NC} Configurando CSS base..."

cat > "${TARGET_DIR}/src/index.css" << 'EOL'
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
    @apply bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-200;
  }
  .input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
  }
  .container {
    @apply px-4 mx-auto max-w-7xl;
  }
}
EOL

echo -e "${GREEN}✓${NC} CSS base configurado"

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ INTEGRACIÓN PARTE 1 COMPLETADA                                  ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "Para continuar con la parte 2 de la integración, ejecute:"
echo -e "${BLUE}./integracion-parte2.sh${NC}"
echo ""
