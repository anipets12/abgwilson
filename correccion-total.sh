#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}   DIAGNÓSTICO Y CORRECCIÓN COMPLETA - ABOGADO WILSON WEBSITE         ${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""

# 1. Diagnosticar problema de favicon y archivos estáticos
echo -e "${BLUE}[1/7]${NC} Diagnóstico de archivos estáticos..."

# Verificar y crear favicon si no existe
if [ ! -f "public/favicon.ico" ] && [ ! -f "public/favicon.svg" ]; then
  echo -e "${YELLOW}[AVISO]${NC} Favicon no encontrado, creando uno nuevo..."
  mkdir -p public
  
  # Crear favicon.svg
  cat > public/favicon.svg << 'EOL'
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="4" fill="#3B82F6"/>
  <path d="M8 8H24V12H8V8Z" fill="white"/>
  <path d="M8 14H20V18H8V14Z" fill="white"/>
  <path d="M8 20H16V24H8V20Z" fill="white"/>
</svg>
EOL

  # También crear favicon.ico como copia de seguridad
  echo -e "${YELLOW}[AVISO]${NC} Generando favicon.ico a partir de SVG..."
  if command -v convert &> /dev/null; then
    convert public/favicon.svg public/favicon.ico
    echo -e "${GREEN}✓${NC} favicon.ico generado"
  else
    # Si no tiene ImageMagick, crear un favicon básico
    echo -e "${YELLOW}[AVISO]${NC} 'convert' no disponible. Creando un favicon.ico básico..."
    cp $(dirname "$0")/public/favicon.svg public/favicon.ico
  fi

  echo -e "${GREEN}✓${NC} Favicon creado correctamente"
else
  echo -e "${GREEN}✓${NC} Favicon encontrado"
fi

# 2. Corregir configuración de Vite para manejo de chunks
echo -e "${BLUE}[2/7]${NC} Optimizando configuración de Vite para chunks..."

# Respaldar archivo actual
if [ -f "vite.config.js" ]; then
  cp vite.config.js vite.config.js.bak
fi

# Crear configuración de Vite optimizada
cat > vite.config.js << 'EOL'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Configuración optimizada para Cloudflare Workers
    rollupOptions: {
      output: {
        // Estructura de chunks simplificada
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', 'react-icons']
        },
        // Nombres predecibles para archivos generados
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    // Sin source maps en producción
    sourcemap: false,
    // Minificación terser
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false // Mantener console.logs para diagnóstico
      }
    }
  },
  // Resolver alias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // Configuración para servidor de desarrollo
  server: {
    port: 3000,
    open: true,
    cors: true
  }
});
EOL

echo -e "${GREEN}✓${NC} Configuración de Vite optimizada"

# 3. Corregir inicialización de React en main.jsx
echo -e "${BLUE}[3/7]${NC} Optimizando inicialización de React..."

# Asegurar que src/ existe
mkdir -p src

# Respaldar archivo actual
if [ -f "src/main.jsx" ]; then
  cp src/main.jsx src/main.jsx.bak
fi

# Crear main.jsx con inicialización robusta
cat > src/main.jsx << 'EOL'
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

// Configuración para React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            refetchOnWindowFocus: false,
        },
    },
});

// Inicialización del log de errores para diagnóstico
window.appErrors = [];
window.logError = function(error) {
    console.error('App Error:', error);
    window.appErrors.push({
        timestamp: new Date().toISOString(),
        error: error.message || String(error),
        stack: error.stack
    });
};

// Inicializa analytics si existe
try {
    if (typeof initializeAnalytics === 'function') {
        initializeAnalytics();
    }
} catch (err) {
    console.warn('Analytics no disponible:', err);
}

// Función de renderizado segura
function renderApp() {
    try {
        console.log('Inicializando aplicación React...');
        const rootElement = document.getElementById('root');
        
        if (!rootElement) {
            throw new Error('Elemento root no encontrado en el DOM');
        }
        
        const root = ReactDOM.createRoot(rootElement);
        
        root.render(
            <React.StrictMode>
                <ErrorBoundary>
                    <HelmetProvider>
                        <QueryClientProvider client={queryClient}>
                            <AuthProvider>
                                <BrowserRouter>
                                    <Suspense fallback={
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100vh',
                                            width: '100vw',
                                            backgroundColor: '#f9fafb'
                                        }}>
                                            <div>Cargando...</div>
                                        </div>
                                    }>
                                        <App />
                                    </Suspense>
                                </BrowserRouter>
                            </AuthProvider>
                        </QueryClientProvider>
                    </HelmetProvider>
                </ErrorBoundary>
            </React.StrictMode>
        );
        
        console.log('React inicializado correctamente');
    } catch (error) {
        console.error('Error al renderizar la aplicación:', error);
        window.logError(error);
        
        // Mostrar error en pantalla si no hay nada renderizado
        const rootElement = document.getElementById('root');
        if (rootElement && (!rootElement.hasChildNodes() || rootElement.children.length === 0)) {
            rootElement.innerHTML = `
                <div style="padding: 20px; font-family: system-ui, sans-serif;">
                    <h2 style="color: #b91c1c;">Error al inicializar la aplicación</h2>
                    <p>Se produjo un error durante la inicialización de React.</p>
                    <pre style="background: #f1f5f9; padding: 10px; overflow: auto; border-radius: 4px;">${error.message || String(error)}</pre>
                    <button onclick="window.location.reload()" style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">Reintentar</button>
                </div>
            `;
        }
    }
}

// Capturar errores globales no manejados
window.addEventListener('error', (event) => {
    window.logError(event.error || new Error(event.message));
});

window.addEventListener('unhandledrejection', (event) => {
    window.logError(event.reason || new Error('Promesa rechazada no manejada'));
});

// Inicialización segura que funciona en todos los entornos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
} else {
    renderApp();
}

// Si después de 5 segundos no hay nada renderizado, recargar la página
setTimeout(() => {
    const rootElement = document.getElementById('root');
    if (rootElement && (!rootElement.hasChildNodes() || rootElement.children.length === 0)) {
        console.warn('La aplicación no se ha renderizado después de 5 segundos, recargando...');
        window.location.reload();
    }
}, 5000);
EOL

echo -e "${GREEN}✓${NC} Inicialización de React optimizada"

# 4. Verificar y corregir configuración de Supabase
echo -e "${BLUE}[4/7]${NC} Configurando Supabase (bindings)..."

# Crear .env si no existe
if [ ! -f ".env" ]; then
  echo -e "${YELLOW}[AVISO]${NC} Archivo .env no encontrado, creando uno básico..."
  
  cat > .env << 'EOL'
# Configuración de Supabase para desarrollo local
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Otros valores de configuración
VITE_API_URL=http://localhost:8787
VITE_ENVIRONMENT=development
EOL

  echo -e "${GREEN}✓${NC} Archivo .env creado (necesita configuración real)"
else
  echo -e "${GREEN}✓${NC} Archivo .env encontrado"
fi

# 5. Corregir AuthContext para manejo robusto de errores con Supabase
echo -e "${BLUE}[5/7]${NC} Optimizando AuthContext para manejo de errores..."

# Asegurar que el directorio existe
mkdir -p src/context

# Crear AuthContext optimizado
cat > src/context/AuthContext.jsx << 'EOL'
import React, { createContext, useState, useEffect, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

// Contexto de autenticación
const AuthContext = createContext();

// Inicializar cliente de Supabase con manejo de errores
function createSupabaseClient() {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Error: Variables de entorno de Supabase no configuradas');
      throw new Error('Configuración de Supabase incompleta');
    }
    
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Error al crear cliente Supabase:', error);
    
    // Cliente simulado para desarrollo sin romper la aplicación
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: { user: null }, error: new Error('Cliente Supabase no inicializado') }),
        signUp: () => Promise.resolve({ data: { user: null }, error: new Error('Cliente Supabase no inicializado') }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => {
          console.warn('Auth state change no disponible - cliente simulado');
          return { data: { subscription: { unsubscribe: () => {} } } };
        }
      }
    };
  }
}

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supabase] = useState(() => createSupabaseClient());

  // Función para inicializar la autenticación
  useEffect(() => {
    async function initializeAuth() {
      try {
        setLoading(true);
        
        // Obtener sesión actual
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (session?.user) {
          setUser(session.user);
        }
        
        // Suscribirse a cambios de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null);
        });
        
        return () => {
          subscription?.unsubscribe();
        };
      } catch (err) {
        console.error('Error al inicializar autenticación:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    initializeAuth();
  }, [supabase]);

  // Funciones de autenticación
  const signIn = async ({ email, password }) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ email, password, metadata = {} }) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      });
      
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  // Valor del contexto
  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    supabase
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
EOL

echo -e "${GREEN}✓${NC} AuthContext optimizado"

# 6. Optimizar index.html para manejo de errores
echo -e "${BLUE}[6/7]${NC} Optimizando index.html..."

# Respaldar index.html si existe
if [ -f "index.html" ]; then
  cp index.html index.html.bak
fi

# Crear index.html optimizado
cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abg. Wilson Alexander Ipiales Guerron - Asesoría Legal Profesional</title>
  <meta name="description" content="Servicios legales profesionales en Ibarra, Ecuador. Asesoría en derecho penal, civil, laboral y más.">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="alternate icon" href="/favicon.ico">
  
  <!-- Precargar fuentes -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Script de diagnóstico para detectar y corregir problemas -->
  <script>
    // Sistema de diagnóstico y recuperación
    window.appErrors = [];
    window.logError = function(error) {
      console.error('App Error:', error);
      window.appErrors.push({
        timestamp: new Date().toISOString(),
        error: error.message || String(error),
        stack: error.stack
      });
    };
    
    // Capturar errores de recursos
    document.addEventListener('error', function(e) {
      if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'IMG') {
        console.warn('Error cargando recurso:', e.target.src || e.target.href);
        
        // Reintentar carga de favicon si falla
        if ((e.target.href && e.target.href.includes('favicon')) || 
            (e.target.src && e.target.src.includes('favicon'))) {
          console.log('Reintentando carga de favicon con ruta alternativa...');
          
          // Crear favicon fallback
          const link = document.createElement('link');
          link.rel = 'icon';
          link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%233B82F6"/><path d="M30 30H70V40H30V30Z" fill="white"/><path d="M30 45H60V55H30V45Z" fill="white"/><path d="M30 60H50V70H30V60Z" fill="white"/></svg>';
          document.head.appendChild(link);
        }
      }
    }, true);
    
    // Verificar carga de scripts
    window.addEventListener('load', function() {
      setTimeout(function() {
        var root = document.getElementById('root');
        if (root && (!root.hasChildNodes() || root.children.length === 0)) {
          console.warn('La aplicación no se ha renderizado correctamente. Verificando scripts...');
          
          // Verificar si los scripts se cargaron
          var scriptStatus = {
            total: document.querySelectorAll('script').length,
            loaded: Array.from(document.querySelectorAll('script')).filter(s => !s.hasAttribute('failed')).length
          };
          
          console.log('Estado de carga de scripts:', scriptStatus);
          
          // Si hay problemas con los scripts, recargar la página
          if (scriptStatus.total > scriptStatus.loaded) {
            console.warn('Algunos scripts no se cargaron correctamente. Recargando página...');
            window.location.reload();
          }
        }
      }, 5000);
    });
  </script>
</head>
<body>
  <div id="root"></div>
  
  <!-- Mostrar mensaje de carga mientras React se inicializa -->
  <script>
    document.getElementById('root').innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw; background-color: #f9fafb; font-family: system-ui, sans-serif;">
        <div style="text-align: center;">
          <h2 style="color: #1e3a8a;">Abg. Wilson Alexander Ipiales Guerron</h2>
          <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
          <p>Cargando aplicación...</p>
        </div>
      </div>
    `;
    
    // Limpiar mensaje de carga cuando React se inicialice
    window.__originalCreateElement = React?.createElement;
    if (typeof React !== 'undefined') {
      React.createElement = function() {
        // React está inicializando, limpiar mensaje de carga
        document.getElementById('root').innerHTML = '';
        // Restaurar React.createElement original
        React.createElement = window.__originalCreateElement;
        // Llamar al createElement original
        return window.__originalCreateElement.apply(this, arguments);
      };
    }
  </script>
  
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
EOL

echo -e "${GREEN}✓${NC} index.html optimizado"

# 7. Ejecutar build y verificar
echo -e "${BLUE}[7/7]${NC} Ejecutando build con la nueva configuración..."

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/vite" ]; then
  echo -e "${YELLOW}[AVISO]${NC} Instalando dependencias..."
  npm install
fi

# Ejecutar build
NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}[ERROR]${NC} Error en el build. Revise los mensajes anteriores."
  exit 1
fi

echo -e "${GREEN}✓${NC} Build completado con éxito"

# Crear un worker simplificado para Cloudflare
echo -e "${BLUE}   Creando worker para Cloudflare...${NC}"

# Asegurar que existe el directorio src
mkdir -p src

cat > src/worker-final.js << 'EOL'
export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      
      // Manejo específico para favicon
      if (path === '/favicon.ico' || path === '/favicon.svg') {
        const response = await fetch(request);
        if (response.ok) {
          const headers = new Headers(response.headers);
          headers.set('Cache-Control', 'public, max-age=86400');
          return new Response(response.body, { headers });
        }
      }
      
      // Manejo de assets estáticos
      if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json)$/) || 
          path.includes('/assets/')) {
        const response = await fetch(request);
        if (response.ok) {
          const headers = new Headers(response.headers);
          
          // Configurar headers adecuados para cada tipo de archivo
          if (path.endsWith('.js')) {
            headers.set('Content-Type', 'application/javascript; charset=utf-8');
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          } else if (path.endsWith('.css')) {
            headers.set('Content-Type', 'text/css; charset=utf-8');
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          } else if (path.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
            headers.set('Cache-Control', 'public, max-age=86400');
          }
          
          headers.set('Access-Control-Allow-Origin', '*');
          
          return new Response(response.body, { headers });
        }
      }
      
      // Para cualquier otra ruta, servir index.html (SPA)
      const indexResponse = await fetch(new URL('/index.html', url.origin));
      if (!indexResponse.ok) {
        throw new Error(`No se pudo obtener index.html: ${indexResponse.status}`);
      }
      
      let html = await indexResponse.text();
      
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      console.error('Error:', error);
      
      return new Response(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Abg. Wilson Alexander Ipiales Guerron</title>
          <style>
            body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .error { background-color: #fee2e2; border: 1px solid #f87171; padding: 15px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>Abg. Wilson Alexander Ipiales Guerron</h1>
          <p>Servicios legales profesionales en Ibarra, Ecuador.</p>
          <div class="error">
            <p>Lo sentimos, estamos experimentando dificultades técnicas.</p>
            <p>Por favor intente nuevamente en unos momentos.</p>
            <button onclick="window.location.reload()">Reintentar</button>
          </div>
        </body>
        </html>
      `, {
        status: 500,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          'Cache-Control': 'no-store'
        }
      });
    }
  }
};
EOL

# Configurar wrangler.toml
cat > wrangler.toml << 'EOL'
name = "abogado-wilson-website"
main = "src/worker-final.js"
compatibility_date = "2023-11-21"

[site]
bucket = "./dist"
EOL

echo -e "${GREEN}✓${NC} Worker y configuración de Cloudflare creados"

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}   ✅ CORRECCIÓN COMPLETA FINALIZADA                                   ${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "La aplicación ha sido completamente diagnosticada y corregida:"
echo -e "• ${GREEN}✓${NC} Favicon creado y optimizado"
echo -e "• ${GREEN}✓${NC} Configuración de Vite mejorada para evitar errores de chunks"
echo -e "• ${GREEN}✓${NC} Inicialización de React robusta con manejo de errores"
echo -e "• ${GREEN}✓${NC} Bindings de Supabase con recuperación ante fallos"
echo -e "• ${GREEN}✓${NC} index.html optimizado con diagnóstico automático"
echo -e "• ${GREEN}✓${NC} Worker de Cloudflare mejorado"
echo ""
echo -e "Para probar localmente, ejecute:"
echo -e "${BLUE}npm run dev${NC}"
echo ""
echo -e "Para desplegar a Cloudflare, ejecute:"
echo -e "${BLUE}npx wrangler deploy${NC}"
echo ""
