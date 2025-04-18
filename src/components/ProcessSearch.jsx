import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/apiService';
import { FaSearch, FaSpinner, FaExclamationTriangle, FaFileAlt } from 'react-icons/fa';

const ProcessSearch = () => {
  const [searchParams, setSearchParams] = useState({
    type: 'numero',
    value: '',
    province: 'imbabura'
  });
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  const provinces = [
    { id: 'imbabura', name: 'Imbabura' },
    { id: 'pichincha', name: 'Pichincha' },
    { id: 'guayas', name: 'Guayas' },
    { id: 'azuay', name: 'Azuay' },
    { id: 'manabi', name: 'Manabí' },
    { id: 'loja', name: 'Loja' },
    { id: 'tungurahua', name: 'Tungurahua' },
    { id: 'eloro', name: 'El Oro' },
    { id: 'chimborazo', name: 'Chimborazo' },
    { id: 'esmeraldas', name: 'Esmeraldas' }
  ];

  const searchTypes = [
    { id: 'numero', name: 'Número de Causa' },
    { id: 'actor', name: 'Actor' },
    { id: 'demandado', name: 'Demandado' },
    { id: 'judicatura', name: 'Judicatura' }
  ];

  useEffect(() => {
    // Cargar búsquedas recientes al iniciar
    fetchRecentSearches();
  }, []);

  const fetchRecentSearches = async () => {
    try {
      // Simulación de carga de búsquedas recientes
      const mockRecentSearches = [
        {
          search_type: 'numero',
          search_value: '10201-2023-00123',
          province: 'imbabura',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // Ayer
        },
        {
          search_type: 'actor',
          search_value: 'PEREZ MARTINEZ',
          province: 'pichincha',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // Hace 2 días
        },
        {
          search_type: 'demandado',
          search_value: 'RODRIGUEZ LOPEZ',
          province: 'imbabura',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() // Hace 3 días
        }
      ];
      
      // Ordenar los resultados por fecha
      const sortedData = mockRecentSearches.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRecentSearches(sortedData);
    } catch (error) {
      console.error('Error al cargar búsquedas recientes:', error);
      setRecentSearches([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchParams.value.trim()) {
      setError('Por favor ingrese un valor para realizar la búsqueda');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      // Guardar la búsqueda en memoria (no en base de datos)
      const searchData = {
        search_type: searchParams.type,
        search_value: searchParams.value,
        province: searchParams.province,
        timestamp: new Date().toISOString()
      };
      
      // Actualizar búsquedas recientes en memoria
      setRecentSearches([searchData, ...recentSearches.slice(0, 4)]);

      // Realizar la búsqueda de procesos judiciales usando apiService
      const searchResults = await apiService.searchJudicialProcess(
        searchParams.type,
        searchParams.value,
        searchParams.province.toUpperCase()
      );

      if (searchResults && searchResults.length > 0) {
        setResults(searchResults);
      } else {
        // Si no hay resultados, mostrar mensaje
        setError('No se encontraron resultados para su búsqueda');
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      setError('Ocurrió un error al realizar la búsqueda. Por favor intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchParams({
      type: 'numero',
      value: '',
      province: 'imbabura'
    });
    setResults([]);
    setError(null);
  };

  const handleUseRecentSearch = (search) => {
    setSearchParams({
      type: search.search_type,
      value: search.search_value,
      province: search.province
    });
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">
            Consulta de Procesos Judiciales
          </h2>
          <p className="text-secondary-600 mb-6">
            Busque información actualizada sobre procesos judiciales en Ecuador. Acceda a datos de causas por número, actor, demandado o judicatura.
          </p>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="searchType" className="block text-sm font-medium text-secondary-700 mb-1">
                  Tipo de Búsqueda
                </label>
                <select
                  id="searchType"
                  value={searchParams.type}
                  onChange={e => setSearchParams({...searchParams, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  {searchTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-secondary-700 mb-1">
                  Provincia
                </label>
                <select
                  id="province"
                  value={searchParams.province}
                  onChange={e => setSearchParams({...searchParams, province: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  {provinces.map(province => (
                    <option key={province.id} value={province.id}>{province.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="searchValue" className="block text-sm font-medium text-secondary-700 mb-1">
                  Valor de Búsqueda
                </label>
                <div className="relative">
                  <input
                    id="searchValue"
                    type="text"
                    value={searchParams.value}
                    onChange={e => setSearchParams({...searchParams, value: e.target.value})}
                    placeholder={`Ingrese ${searchTypes.find(t => t.id === searchParams.type)?.name.toLowerCase()}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                  {searchParams.value && (
                    <button
                      type="button"
                      onClick={() => setSearchParams({...searchParams, value: ''})}
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-4 py-2 border border-gray-300 rounded-md text-secondary-700 hover:bg-gray-50"
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <FaSearch className="mr-2" />
                    Buscar
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Resultados de la Búsqueda</h3>
              
              {error && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {isLoading ? (
                <div className="text-center py-12">
                  <FaSpinner className="animate-spin h-8 w-8 text-primary-600 mx-auto" />
                  <p className="mt-2 text-secondary-600">Buscando procesos judiciales...</p>
                </div>
              ) : results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between">
                        <h4 className="text-lg font-medium text-secondary-900">{result.numero || result.id}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.estado === 'EN TRÁMITE' ? 'bg-blue-100 text-blue-800' :
                          result.estado === 'SENTENCIA' ? 'bg-green-100 text-green-800' :
                          result.estado === 'ARCHIVADO' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {result.estado}
                        </span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2">
                        <div>
                          <span className="text-sm font-medium text-secondary-500">Tipo:</span>
                          <span className="ml-2 text-secondary-900">{result.tipo}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-secondary-500">Fecha:</span>
                          <span className="ml-2 text-secondary-900">{result.fecha}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-secondary-500">Actor:</span>
                          <span className="ml-2 text-secondary-900">{result.actor}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-secondary-500">Demandado:</span>
                          <span className="ml-2 text-secondary-900">{result.demandado}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-sm font-medium text-secondary-500">Judicatura:</span>
                          <span className="ml-2 text-secondary-900">{result.judicatura}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <button 
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          onClick={() => window.open(`https://consultas.funcionjudicial.gob.ec/informacionjudicial/public/informacion.jsf?causa=${result.id}`, '_blank')}
                        >
                          Ver detalles completos
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
            
            <div className="md:w-1/3">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Búsquedas Recientes
                </h3>
                
                {recentSearches.length > 0 ? (
                  <div className="space-y-3">
                    {recentSearches.map((search, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-secondary-50 rounded-lg cursor-pointer hover:bg-secondary-100 transition-colors"
                        onClick={() => handleUseRecentSearch(search)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-secondary-900">
                            {search.search_value}
                          </span>
                          <span className="text-xs text-secondary-500">
                            {new Date(search.timestamp).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-secondary-600">
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2">
                            {searchTypes.find(t => t.id === search.search_type)?.name || search.search_type}
                          </span>
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            {provinces.find(p => p.id === search.province)?.name || search.province}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary-500 text-center py-4">
                    No hay búsquedas recientes
                  </p>
                )}
                
                <div className="mt-6">
                  <h4 className="text-md font-medium text-secondary-900 mb-3">
                    Consejos de búsqueda
                  </h4>
                  <ul className="space-y-2 text-sm text-secondary-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Para buscar por número de causa, use el formato completo (ej. 17294-2023-00123)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Al buscar por nombre, incluya al menos un apellido completo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Seleccione la provincia correcta para obtener resultados más precisos</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSearch;
