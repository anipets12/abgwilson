import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../../config/supabase';
import { AuthContext } from '../../contexts/AuthContext';
import storageService from '../../services/storageService';

/**
 * Sistema de tokens para los usuarios premium
 * Componente mejorado con integración completa con Supabase
 */
const TokenSystem = () => {
  const { user } = useContext(AuthContext);
  const [tokens, setTokens] = useState({
    available: 0,
    used: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [tokenPackages, setTokenPackages] = useState([]);
  const [tokenHistory, setTokenHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTokenData();
      fetchTokenHistory();
    }
  }, [user]);

  /**
   * Obtiene los datos de tokens del usuario desde Supabase
   */
  const fetchTokenData = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
      
      // Obtener datos de tokens desde Supabase
      const { data, error } = await supabase
        .from('user_tokens')
        .select('available_tokens, used_tokens, total_tokens')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') { // No data found
        throw error;
      }
      
      // Si el usuario no tiene registro de tokens, creamos uno nuevo
      if (!data) {
        const initialTokens = { available: 10, used: 0, total: 10 };
        await supabase.from('user_tokens').insert({
          user_id: user.id,
          available_tokens: initialTokens.available,
          used_tokens: initialTokens.used,
          total_tokens: initialTokens.total
        });
        setTokens(initialTokens);
      } else {
        setTokens({
          available: data.available_tokens,
          used: data.used_tokens,
          total: data.total_tokens
        });
      }
      
      // Obtener paquetes de tokens disponibles
      const { data: packagesData, error: packagesError } = await supabase
        .from('token_packages')
        .select('*')
        .order('price', { ascending: true });
        
      if (packagesError) throw packagesError;
      
      if (packagesData && packagesData.length > 0) {
        setTokenPackages(packagesData);
      } else {
        // Crear paquetes predeterminados si no existen
        const defaultPackages = [
          { name: 'Paquete Básico', amount: 10, price: 15.99, image_url: null },
          { name: 'Paquete Estándar', amount: 25, price: 29.99, image_url: null },
          { name: 'Paquete Premium', amount: 50, price: 49.99, image_url: null }
        ];
        
        await supabase.from('token_packages').insert(defaultPackages);
        setTokenPackages(defaultPackages.map((pkg, idx) => ({ ...pkg, id: idx + 1 })));
      }
    } catch (err) {
      console.error('Error al cargar datos de tokens:', err);
      toast.error('No se pudieron cargar los datos de tokens');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene el historial de transacciones de tokens del usuario
   */
  const fetchTokenHistory = async () => {
    try {
      setLoadingHistory(true);
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
      
      // Obtener historial de transacciones desde Supabase
      const { data, error } = await supabase
        .from('token_transactions')
        .select('id, amount, type, description, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      setTokenHistory(data || []);
    } catch (err) {
      console.error('Error al cargar historial de tokens:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  /**
   * Maneja la carga de imágenes para paquetes de tokens
   * @param {File} file - Archivo de imagen a subir
   * @param {number} packageId - ID del paquete al que se asignará la imagen
   */
  const handleImageUpload = async (file, packageId) => {
    try {
      setUploadingImage(true);
      
      if (!file) throw new Error('No se seleccionó un archivo');
      
      // Verificar que sea una imagen
      if (!file.type.startsWith('image/')) {
        throw new Error('El archivo debe ser una imagen');
      }
      
      // Subir archivo a Supabase Storage
      const uploadResult = await storageService.uploadFile(
        file,
        'packages',
        'tokens',
        { packageId: packageId.toString() }
      );
      
      if (!uploadResult) throw new Error('Error al subir la imagen');
      
      // Actualizar la URL de la imagen en la base de datos
      const { error } = await supabase
        .from('token_packages')
        .update({ image_url: uploadResult.url })
        .eq('id', packageId);
        
      if (error) throw error;
      
      // Actualizar estado local
      setTokenPackages(prev =>
        prev.map(pkg => pkg.id === packageId ? { ...pkg, image_url: uploadResult.url } : pkg)
      );
      
      toast.success('Imagen actualizada correctamente');
    } catch (err) {
      console.error('Error al subir imagen:', err);
      toast.error(err.message || 'Error al subir la imagen');
    } finally {
      setUploadingImage(false);
    }
  };

  /**
   * Realiza una compra de tokens para el usuario
   * @param {number} packageId - ID del paquete de tokens a comprar
   */
  const handlePurchaseTokens = async (packageId) => {
    try {
      const selectedPackage = tokenPackages.find(pkg => pkg.id === packageId);
      if (!selectedPackage) return;
      
      setPurchasing(true);
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
      
      // Simulación de procesamiento de pago (en producción se integraría con un gateway de pago)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Actualizar los tokens del usuario
      const newAvailableTokens = tokens.available + selectedPackage.amount;
      const newTotalTokens = tokens.total + selectedPackage.amount;
      
      // Actualizar en base de datos
      const { error: updateError } = await supabase
        .from('user_tokens')
        .update({
          available_tokens: newAvailableTokens,
          total_tokens: newTotalTokens
        })
        .eq('user_id', user.id);
        
      if (updateError) throw updateError;
      
      // Registrar la transacción
      const { error: transactionError } = await supabase
        .from('token_transactions')
        .insert({
          user_id: user.id,
          amount: selectedPackage.amount,
          type: 'purchase',
          description: `Compra de ${selectedPackage.name}`,
          price: selectedPackage.price
        });
        
      if (transactionError) throw transactionError;
      
      // Actualizar el estado local
      setTokens(prev => ({
        ...prev,
        available: newAvailableTokens,
        total: newTotalTokens
      }));
      
      toast.success(`¡Has adquirido ${selectedPackage.amount} tokens con éxito!`);
      
      // Refrescar el historial de transacciones
      fetchTokenHistory();
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      toast.error('No se pudo procesar tu compra. Intenta nuevamente.');
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
