import React, { useEffect, createContext, useContext, useState } from 'react';
import { initializeClientDiagnostics } from '../diagnostico-completo';

// Contexto de diagnóstico para compartir en toda la aplicación React
export const DiagnosticContext = createContext({
  reportError: () => {},
  errorLog: [],
  diagnosticsEnabled: true,
  toggleDiagnostics: () => {},
});

/**
 * Proveedor del sistema de diagnóstico para React
 */
export function DiagnosticProvider({ children }) {
  const [diagnosticsEnabled, setDiagnosticsEnabled] = useState(true);
  const [errorLog, setErrorLog] = useState([]);
  const [diagnosticSystem, setDiagnosticSystem] = useState(null);

  // Inicializar sistema de diagnóstico
  useEffect(() => {
    if (diagnosticsEnabled) {
      const system = initializeClientDiagnostics();
      setDiagnosticSystem(system);
      
      // Intervalo para actualizar el log de errores
      const interval = setInterval(() => {
        setErrorLog(system.getErrorLog());
      }, 5000);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [diagnosticsEnabled]);

  // Funciones expuestas al contexto
  const reportError = (type, details) => {
    if (diagnosticsEnabled && diagnosticSystem) {
      diagnosticSystem.reportError(type, details);
      setErrorLog(diagnosticSystem.getErrorLog());
    }
  };

  const toggleDiagnostics = () => {
    setDiagnosticsEnabled(prev => !prev);
  };

  // Contexto proporcionado a los componentes
  const contextValue = {
    reportError,
    errorLog,
    diagnosticsEnabled,
    toggleDiagnostics,
  };

  return (
    <DiagnosticContext.Provider value={contextValue}>
      {children}
    </DiagnosticContext.Provider>
  );
}

/**
 * Hook personalizado para usar el sistema de diagnóstico en cualquier componente
 */
export function useDiagnostics() {
  const context = useContext(DiagnosticContext);
  if (!context) {
    throw new Error('useDiagnostics debe usarse dentro de DiagnosticProvider');
  }
  return context;
}

/**
 * Componente para mostrar errores de diagnóstico (panel flotante)
 */
export function DiagnosticPanel() {
  const { errorLog, diagnosticsEnabled, toggleDiagnostics } = useDiagnostics();
  const [isOpen, setIsOpen] = useState(false);

  if (!diagnosticsEnabled) {
    return (
      <button 
        onClick={toggleDiagnostics}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          zIndex: 9999,
          padding: '8px',
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Activar Diagnósticos
      </button>
    );
  }

  return (
    <div style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 9999 }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px',
          background: errorLog.length > 0 ? '#d9534f' : '#5cb85c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {errorLog.length > 0 ? `Errores (${errorLog.length})` : 'Diagnóstico ✓'}
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '0',
          width: '400px',
          maxHeight: '500px',
          overflowY: 'auto',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          padding: '10px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ margin: 0 }}>Diagnóstico</h3>
            <button 
              onClick={toggleDiagnostics}
              style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer' }}
            >
              Desactivar
            </button>
          </div>
          
          {errorLog.length > 0 ? (
            <div>
              {errorLog.map((error, index) => (
                <div key={index} style={{ 
                  marginBottom: '10px', 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderLeft: '3px solid #d9534f',
                }}>
                  <div style={{ fontWeight: 'bold' }}>{error.type}: {error.message}</div>
                  {error.source && <div>Fuente: {error.source}</div>}
                  {error.line && <div>Línea: {error.line}</div>}
                  {error.details && <div>Detalles: {error.details}</div>}
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    {new Date(error.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
              No hay errores registrados.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Error Boundary mejorado con diagnóstico
 */
export class DiagnosticErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Reportar el error al sistema de diagnóstico
    if (this.context?.reportError) {
      this.context.reportError('react-error-boundary', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    } else {
      console.error('Error en componente React:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Mensaje de error personalizado
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px 0', 
          border: '1px solid #f5c6cb',
          borderRadius: '5px',
          backgroundColor: '#f8d7da', 
          color: '#721c24'
        }}>
          <h2>Ha ocurrido un error</h2>
          <p>Se ha producido un error al renderizar este componente.</p>
          <details style={{ marginTop: '10px', cursor: 'pointer' }}>
            <summary>Detalles del error</summary>
            <pre style={{ 
              marginTop: '10px', 
              padding: '10px', 
              backgroundColor: '#fff', 
              border: '1px solid #ddd',
              borderRadius: '3px',
              overflow: 'auto'
            }}>
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '15px',
              padding: '8px 15px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

DiagnosticErrorBoundary.contextType = DiagnosticContext;
