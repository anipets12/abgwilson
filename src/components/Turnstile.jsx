import React, { useEffect, useRef } from 'react';
import { env } from '../utils/env';

/**
 * Componente Cloudflare Turnstile para protección contra bots
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onVerify - Callback cuando la verificación es exitosa
 * @param {Function} props.onError - Callback cuando ocurre un error
 * @param {Function} props.onExpire - Callback cuando expira la verificación
 * @param {string} props.theme - Tema del widget (light, dark, auto)
 * @param {string} props.size - Tamaño del widget (normal, compact)
 */
const Turnstile = ({
  onVerify = () => {},
  onError = () => {},
  onExpire = () => {},
  theme = 'auto',
  size = 'normal'
}) => {
  const containerRef = useRef(null);
  const widgetId = useRef(null);
  
  // Cargar el script de Turnstile
  useEffect(() => {
    // Evitar cargar el script varias veces
    if (window.turnstile) {
      renderWidget();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    
    script.onload = renderWidget;
    
    document.body.appendChild(script);
    
    return () => {
      // Limpiar widget al desmontar
      if (widgetId.current) {
        window.turnstile?.reset(widgetId.current);
      }
    };
  }, []);
  
  // Renderizar el widget de Turnstile
  const renderWidget = () => {
    if (!window.turnstile || !containerRef.current) return;
    
    // Limpiar cualquier widget existente
    if (widgetId.current) {
      window.turnstile.reset(widgetId.current);
    }
    
    // Obtener la clave del sitio
    const siteKey = env.CLOUDFLARE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';
    
    // Renderizar nuevo widget
    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: theme,
      size: size,
      callback: (token) => {
        onVerify(token);
      },
      'expired-callback': () => {
        onExpire();
      },
      'error-callback': (error) => {
        onError(error);
      }
    });
  };
  
  return <div ref={containerRef} className="cloudflare-turnstile"></div>;
};

export default Turnstile;
