import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

/**
 * Sistema de tokens para los usuarios premium
 */
const TokenSystem = () => {
  const [tokens, setTokens] = useState({
    available: 0,
    used: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [tokenPackages, setTokenPackages] = useState([]);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);
        
        // En una implementación real, aquí se obtendrían los datos de los tokens desde una API
        // Simulamos la carga de datos
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos simulados para demostración
        setTokens({
          available: 15,
          used: 5,
          total: 20
        });
        
        setTokenPackages([
          { id: 1, name: 'Paquete Básico', amount: 10, price: 15.99 },
          { id: 2, name: 'Paquete Estándar', amount: 25, price: 29.99 },
          { id: 3, name: 'Paquete Premium', amount: 50, price: 49.99 }
        ]);
      } catch (err) {
        console.error('Error al cargar datos de tokens:', err);
        toast.error('No se pudieron cargar los datos de tokens');
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  const handlePurchaseTokens = async (packageId) => {
    const selectedPackage = tokenPackages.find(pkg => pkg.id === packageId);
    if (!selectedPackage) return;
    
    setPurchasing(true);
    
    try {
      // En una implementación real, aquí se enviaría la solicitud de compra a una API
      console.log(`Comprando paquete de tokens: ${selectedPackage.name}`);
      
      // Simular tiempo de respuesta
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar tokens disponibles
      setTokens(prev => ({
        ...prev,
        available: prev.available + selectedPackage.amount,
        total: prev.total + selectedPackage.amount
      }));
      
      toast.success(`Has adquirido ${selectedPackage.amount} tokens correctamente.`);
    } catch (error) {
      console.error('Error al comprar tokens:', error);
      toast.error('Ocurrió un error al procesar tu compra. Inténtalo de nuevo.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleUseToken = async () => {
    if (tokens.available <= 0) {
      toast.error('No tienes tokens disponibles para usar');
      return;
    }
    
    try {
      // En una implementación real, aquí se enviaría la solicitud de uso de token a una API
      console.log('Usando un token...');
      
      // Simular tiempo de respuesta
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Actualizar tokens disponibles
      setTokens(prev => ({
        ...prev,
        available: prev.available - 1,
        used: prev.used + 1
      }));
      
      toast.success('Token utilizado correctamente');
    } catch (error) {
      console.error('Error al usar token:', error);
      toast.error('Ocurrió un error al usar el token');
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Tus Tokens</h3>
      
      {/* Estadísticas de tokens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Tokens disponibles</p>
          <p className="text-2xl font-bold text-primary-600">{tokens.available}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Tokens utilizados</p>
          <p className="text-2xl font-bold text-gray-700">{tokens.used}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total de tokens</p>
          <p className="text-2xl font-bold text-gray-700">{tokens.total}</p>
        </div>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm text-gray-500">Uso de tokens</p>
          <p className="text-sm text-gray-500">{tokens.used} de {tokens.total}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary-600 h-2.5 rounded-full" 
            style={{ width: `${(tokens.used / tokens.total) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Usar token */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleUseToken}
          disabled={tokens.available <= 0}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Usar un token
        </button>
      </div>
      
      {/* Comprar más tokens */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">Comprar más tokens</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tokenPackages.map(pkg => (
            <div key={pkg.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h5 className="font-medium text-gray-900 mb-2">{pkg.name}</h5>
              <p className="text-2xl font-bold text-primary-600 mb-2">{pkg.amount} tokens</p>
              <p className="text-gray-700 mb-4">${pkg.price.toFixed(2)}</p>
              <button
                onClick={() => handlePurchaseTokens(pkg.id)}
                disabled={purchasing}
                className="w-full px-3 py-1.5 border border-primary-600 rounded-md text-sm font-medium text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {purchasing ? 'Procesando...' : 'Comprar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenSystem;
