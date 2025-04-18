import React from 'react';
import ReactDOM from 'react-dom/client';
// Router ya está en App.jsx, no lo importamos aquí
import App from './App';
import './index.css';

// Asegurar que se carga correctamente el CSS
import './assets/tailwind.css';

// Función para renderizar la aplicación
function renderApp() {
  try {
    const root = document.getElementById('root');
    
    if (!root) {
      console.error('Error: No se encontró el elemento root');
      return;
    }
    
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('Aplicación React inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar React:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
        <h1>Error al inicializar la aplicación</h1>
        <p>Se ha producido un error al cargar la aplicación.</p>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${error.message}</pre>
        <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Reintentar</button>
      </div>
    `;
  }
}

// Iniciar la aplicación de forma segura
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
