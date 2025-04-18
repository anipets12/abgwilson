import React, { useState } from 'react';

const ConsultasBase = ({
  title,
  description,
  searchPlaceholder,
  searchTypes,
  onSearch,
  renderResults,
  children
}) => {
  const [searchType, setSearchType] = useState(searchTypes && searchTypes.length > 0 ? searchTypes[0].value : '');
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      setError('Por favor, ingrese un valor de búsqueda.');
      return;
    }
    
    setIsSearching(true);
    setError(null);
    
    try {
      // Si se proporciona una función de búsqueda personalizada, úsela
      if (onSearch) {
        const searchResults = await onSearch(searchType, searchValue);
        setResults(searchResults);
      } else {
        // Simulación de búsqueda para demostración
        await new Promise(resolve => setTimeout(resolve, 1500));
        setResults([
          { id: 1, title: 'Resultado 1', description: 'Descripción del resultado 1' },
          { id: 2, title: 'Resultado 2', description: 'Descripción del resultado 2' },
          { id: 3, title: 'Resultado 3', description: 'Descripción del resultado 3' },
        ]);
      }
    } catch (err) {
      setError('Ocurrió un error durante la búsqueda. Por favor, inténtelo de nuevo.');
      console.error('Error de búsqueda:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{title || 'Consulta de Procesos'}</h1>
        <p className="text-gray-600 mb-6">{description || 'Busque información actualizada sobre procesos.'}</p>
        
        <form onSubmit={handleSearch} className="space-y-4">
          {searchTypes && searchTypes.length > 0 && (
            <div>
              <label htmlFor="searchType" className="block text-gray-700 font-medium mb-2">
                Tipo de Búsqueda
              </label>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {searchTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label htmlFor="searchValue" className="block text-gray-700 font-medium mb-2">
              Valor de Búsqueda
            </label>
            <input
              id="searchValue"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder || 'Ingrese el valor a buscar'}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSearching}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full md:w-auto"
          >
            {isSearching ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
        
        {/* Renderizar contenido adicional */}
        {children}
      </div>
      
      {/* Mensajes de error */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {/* Resultados de búsqueda */}
      {results && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Resultados de la Búsqueda</h2>
          
          {results.length === 0 ? (
            <p className="text-gray-600">No se encontraron resultados para su búsqueda.</p>
          ) : (
            <div className="space-y-4">
              {renderResults ? (
                renderResults(results)
              ) : (
                results.map(result => (
                  <div key={result.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <h3 className="text-xl font-semibold">{result.title}</h3>
                    <p className="text-gray-600">{result.description}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConsultasBase;
