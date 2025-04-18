import React, { Component } from 'react';
import { diagnoseError1042, applyAutoFix } from '../diagnostics/errorHandler';

/**
 * Componente ErrorBoundary para capturar y manejar errores en la aplicación
 * Implementa soluciones específicas para el error 1042 de Cloudflare Workers
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      errorInfo: null,
      errorCode: null,
      isRecovering: false,
      diagnosis: null
    };
  }

  static getDerivedStateFromError(error) {
    // Actualizar estado para mostrar la UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Detectar si es un error 1042
    const is1042Error = error.message?.includes('1042') || 
                      error.name?.includes('NetworkError') ||
                      error.message?.includes('Failed to fetch');
    
    // Aplicar diagnóstico para error 1042
    const errorCode = is1042Error ? 1042 : null;
    
    // Guardar estado del error
    this.setState({
      errorInfo,
      errorCode
    });

    // Si es error 1042, diagnosticar
    if (is1042Error) {
      this.runDiagnostics();
    }
    
    console.error("Error capturado:", error, errorInfo);
  }
  
  // Ejecutar diagnóstico para el error 1042
  runDiagnostics = async () => {
    if (this.state.errorCode === 1042) {
      const diagnosis = diagnoseError1042();
      this.setState({ diagnosis });
    }
  }
  
  // Intentar recuperación automática
  tryAutoRecovery = async () => {
    this.setState({ isRecovering: true });
    
    if (this.state.errorCode === 1042) {
      const fixed = await applyAutoFix(1042);
      
      if (!fixed) {
        // Si no se pudo corregir automáticamente, mostrar mensaje de error
        this.setState({ isRecovering: false });
      }
      // No necesitamos actualizar más estados aquí porque la página se recargará si funciona
    } else {
      // Para otros errores, simplemente recargar la página
      window.location.reload();
    }
  }
  
  render() {
    const { hasError, errorCode, isRecovering, diagnosis } = this.state;
    
    if (hasError) {
      // UI de error específica para error 1042
      if (errorCode === 1042) {
        return (
          <div className="error-container bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto my-16 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Problema de conectividad detectado
            </h2>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Estamos experimentando problemas para conectarnos con nuestros servidores.
                Nuestro sistema de diagnóstico ha detectado el siguiente problema:
              </p>
              
              {diagnosis && (
                <div className="bg-blue-50 p-4 rounded-md text-left mb-4">
                  <h3 className="font-semibold text-blue-800">Diagnóstico:</h3>
                  <ul className="list-disc ml-5 mt-2 text-blue-700">
                    {diagnosis.possibleCauses.cors && 
                      <li>Problema de permisos de conexión (CORS)</li>}
                    {diagnosis.possibleCauses.supabaseConnection && 
                      <li>Problema de conexión con la base de datos</li>}
                    {diagnosis.possibleCauses.serviceWorker && 
                      <li>Problema con la caché del navegador</li>}
                    {!diagnosis.networkConnected && 
                      <li>No hay conexión a internet</li>}
                  </ul>
                  <p className="mt-2 text-blue-800">
                    <strong>Recomendación:</strong> {diagnosis.recommendedAction}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-3">
              {isRecovering ? (
                <button disabled className="bg-gray-400 text-white py-2 px-4 rounded-md">
                  Intentando recuperar la conexión...
                </button>
              ) : (
                <button 
                  onClick={this.tryAutoRecovery}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Solucionar automáticamente
                </button>
              )}
              
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        );
      }
      
      // UI de error genérica para otros errores
      return (
        <div className="error-container bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto my-16 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Algo salió mal</h2>
          <p className="text-gray-700 mb-6">
            Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      );
    }

    // Si no hay error, renderizar los children normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
