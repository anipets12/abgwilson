import React, { useEffect, useRef } from 'react';

/**
 * Componente de Cloudflare Turnstile para protección anti-bot
 * 
 * @param {Object} props
 * @param {Function} props.onVerify - Función a llamar cuando la verificación es exitosa
 * @param {Function} props.onError - Función a llamar cuando hay un error en la verificación
 * @param {Function} props.onExpire - Función a llamar cuando el token expira
 * @param {string} props.action - Identificador de la acción que se está protegiendo (ej: 'login', 'contact_form')
 * @param {string} props.theme - Tema del widget ('light', 'dark', 'auto')
 * @param {string} props.size - Tamaño del widget ('normal', 'compact')
 */
const TurnstileWidget = ({ 
  onVerify, 
  onError, 
  onExpire,
  action = 'default',
  theme = 'auto',
  size = 'normal'
}) => {
  const containerRef = useRef(null);
  const widgetId = useRef(null);
  
  // Clave pública de Turnstile (site key)
  const siteKey = '0x4AAAAAABDkl--Sw4n_bwmU';

  // Función para verificar el token con nuestro backend
  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/verify-turnstile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, action }),
      });

      const data = await response.json();
      
      if (data.success) {
        if (typeof onVerify === 'function') {
          onVerify(token, data);
        }
      } else {
        console.error('Error al verificar token de Turnstile:', data.message);
        if (typeof onError === 'function') {
          onError(data.message, data.errors);
        }
        // Reiniciar el widget si hay error
        if (window.turnstile && widgetId.current) {
          window.turnstile.reset(widgetId.current);
        }
      }
    } catch (error) {
      console.error('Error en la verificación de Turnstile:', error);
      if (typeof onError === 'function') {
        onError('Error de conexión', error);
      }
    }
  };

  useEffect(() => {
    // Cargar el script de Turnstile si no está ya cargado
    if (!window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Una vez cargado el script, renderizar el widget
        renderTurnstile();
      };
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      // Si ya está cargado, renderizar el widget
      renderTurnstile();
    }
  }, []);

  const renderTurnstile = () => {
    // Limpiar el widget anterior si existe
    if (widgetId.current && window.turnstile) {
      window.turnstile.remove(widgetId.current);
    }
    
    // Solo renderizar si el DOM está listo y la API de turnstile está disponible
    if (containerRef.current && window.turnstile) {
      try {
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: theme,
          size: size,
          action: action,
          callback: (token) => {
            verifyToken(token);
          },
          'expired-callback': () => {
            console.log('Token de Turnstile expirado');
            if (typeof onExpire === 'function') {
              onExpire();
            }
          },
          'error-callback': (error) => {
            console.error('Error en widget de Turnstile:', error);
            if (typeof onError === 'function') {
              onError('Error en widget', error);
            }
          },
        });
      } catch (error) {
        console.error('Error al renderizar widget de Turnstile:', error);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="turnstile-container" 
      data-action={action}
      style={{ margin: '1rem 0' }}
    />
  );
};

export default TurnstileWidget;
