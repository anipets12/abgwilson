import React, { useEffect, useRef } from 'react';
import { getPublicEnv } from '../../utils/env';

/**
 * Componente de protección contra bots utilizando Cloudflare Turnstile
 * Más seguro y respetuoso con la privacidad que reCAPTCHA
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onVerify - Función que se ejecuta cuando se verifica correctamente
 * @param {Function} props.onError - Función que se ejecuta en caso de error
 * @param {string} props.action - Nombre de la acción que se está protegiendo (login, register, etc.)
 * @param {string} props.theme - Tema del widget (light, dark, auto)
 */
const TurnstileProtection = ({ onVerify, onError, action = 'default', theme = 'auto' }) => {
  const containerRef = useRef(null);
  const widgetId = useRef(null);

  // Obtener la clave del sitio de Turnstile desde las variables de entorno
  const siteKey = getPublicEnv('CLOUDFLARE_TURNSTILE_SITE_KEY');

  useEffect(() => {
    // Cargar el script de Turnstile si no está ya cargado
    if (!window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => renderTurnstile();
      script.onerror = () => {
        console.error('Error al cargar Cloudflare Turnstile');
        onError && onError('Error al cargar el sistema de protección. Por favor, intente más tarde.');
      };
    } else {
      renderTurnstile();
    }

    // Función para renderizar el widget de Turnstile
    const renderTurnstile = () => {
      if (window.turnstile && containerRef.current) {
        // Si ya existe un widget, eliminarlo primero
        if (widgetId.current) {
          window.turnstile.remove(widgetId.current);
        }

        // Renderizar el nuevo widget
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: theme,
          action: action,
          callback: (token) => {
            console.log('Verificación exitosa de Turnstile');
            onVerify && onVerify(token);
          },
          'error-callback': () => {
            console.error('Error en la verificación de Turnstile');
            onError && onError('Error en la verificación. Por favor, intente nuevamente.');
          },
          'expired-callback': () => {
            console.warn('La verificación de Turnstile ha expirado');
            onError && onError('La verificación ha expirado. Por favor, intente nuevamente.');
          }
        });
      }
    };

    // Limpiar al desmontar
    return () => {
      if (window.turnstile && widgetId.current) {
        window.turnstile.remove(widgetId.current);
      }
    };
  }, [siteKey, onVerify, onError, action, theme]);

  return (
    <div className="w-full my-4">
      <div ref={containerRef} className="flex justify-center"></div>
    </div>
  );
};

export default TurnstileProtection;
