import React from 'react';

/**
 * Componente de spinner de carga
 * @param {Object} props - Propiedades del componente
 * @param {string} props.size - Tamaño del spinner (small, medium, large)
 * @param {string} props.color - Color del spinner (white, primary, gray)
 * @param {string} props.className - Clases adicionales para el spinner
 */
const LoadingSpinner = ({ size = 'medium', color = 'primary', className = '' }) => {
  // Mapeo de tamaños
  const sizeMap = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-10 w-10'
  };
  
  // Mapeo de colores
  const colorMap = {
    white: 'text-white',
    primary: 'text-primary-600',
    gray: 'text-gray-500'
  };

  // Clases CSS para el spinner
  const classes = `animate-spin ${sizeMap[size] || sizeMap.medium} ${colorMap[color] || colorMap.primary} ${className}`;

  return (
    <svg className={classes} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

export default LoadingSpinner;
