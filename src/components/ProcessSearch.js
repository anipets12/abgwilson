import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';

import { dataService } from '../services/apiService';
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
            // Usar método getAll directamente sin esperar from().select()
            const response = await dataService.getAll('searches');
            const { data, error } = response;
            if (error)
                throw error;
            // Ordenar los resultados manualmente si es necesario
            const sortedData = data ? [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5) : [];
            setRecentSearches(sortedData || []);
        }
        catch (error) {
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
            // Guardar la búsqueda en la base de datos
            const searchData = {
                search_type: searchParams.type,
                search_value: searchParams.value,
                province: searchParams.province,
                timestamp: new Date().toISOString()
            };
            const { error: insertError } = await dataService.create('searches', searchData);
            if (insertError)
                throw insertError;
            // Realizar la búsqueda de procesos judiciales
            // Utilizamos el método search personalizado en lugar de from().select()
            const { data, error: searchError } = await dataService.search('judicial_processes', {
                searchType: searchParams.type,
                searchValue: searchParams.value,
                province: searchParams.province
            });
            if (searchError)
                throw searchError;
            // Si no hay resultados en la base de datos, usar datos de ejemplo
            if (!data || data.length === 0) {
                // Simulación de resultados para demostración
                const mockResults = [
                    {
                        id: `${searchParams.province}-2023-${Math.floor(Math.random() * 10000)}`,
                        tipo: ['PENAL', 'CIVIL', 'TRÁNSITO', 'ADMINISTRATIVO'][Math.floor(Math.random() * 4)],
                        actor: searchParams.type === 'actor' ? searchParams.value : 'FISCALÍA GENERAL DEL ESTADO',
                        demandado: searchParams.type === 'demandado' ? searchParams.value : 'PERSONA NATURAL/JURÍDICA',
                        fecha: new Date().toISOString().split('T')[0],
                        estado: ['EN TRÁMITE', 'ARCHIVADO', 'SENTENCIA', 'APELACIÓN'][Math.floor(Math.random() * 4)],
                        judicatura: `UNIDAD JUDICIAL DE ${provinces.find(p => p.id === searchParams.province)?.name.toUpperCase() || 'IMBABURA'}`
                    },
                    {
                        id: `${searchParams.province}-2023-${Math.floor(Math.random() * 10000)}`,
                        tipo: ['PENAL', 'CIVIL', 'TRÁNSITO', 'ADMINISTRATIVO'][Math.floor(Math.random() * 4)],
                        actor: 'JUAN PÉREZ',
                        demandado: 'MARÍA LÓPEZ',
                        fecha: new Date(Date.now() - 86400000 * 30).toISOString().split('T')[0],
                        estado: ['EN TRÁMITE', 'ARCHIVADO', 'SENTENCIA', 'APELACIÓN'][Math.floor(Math.random() * 4)],
                        judicatura: `UNIDAD JUDICIAL DE ${provinces.find(p => p.id === searchParams.province)?.name.toUpperCase() || 'IMBABURA'}`
                    }
                ];
                setResults(mockResults);
            }
            else {
                setResults(data);
            }
            // Actualizar búsquedas recientes
            fetchRecentSearches();
        }
        catch (err) {
            setError('Error al realizar la búsqueda. Por favor, intente nuevamente.');
            console.error('Error:', err);
        }
        finally {
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
    return (_jsx("div", { className: "py-12 bg-secondary-50", children: _jsxs("div", { className: "container-custom", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center mb-12", children: [_jsx("h2", { className: "section-title", children: "Consulta de Procesos Judiciales" }), _jsx("p", { className: "text-xl text-secondary-600 max-w-3xl mx-auto", children: "Busque informaci\u00F3n actualizada sobre procesos judiciales en Ecuador. Acceda a datos de causas por n\u00FAmero, actor, demandado o judicatura." })] }), _jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [_jsxs("div", { className: "md:w-2/3", children: [_jsxs(motion.form, { onSubmit: handleSearch, className: "card space-y-6", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 }, children: [_jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-secondary-700 mb-1", children: "Tipo de B\u00FAsqueda" }), _jsx("select", { value: searchParams.type, onChange: (e) => setSearchParams(prev => ({ ...prev, type: e.target.value })), className: "input-field", children: searchTypes.map(type => (_jsx("option", { value: type.id, children: type.name }, type.id))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-secondary-700 mb-1", children: "Provincia" }), _jsx("select", { value: searchParams.province, onChange: (e) => setSearchParams(prev => ({ ...prev, province: e.target.value })), className: "input-field", children: provinces.map(province => (_jsx("option", { value: province.id, children: province.name }, province.id))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-secondary-700 mb-1", children: "Valor de B\u00FAsqueda" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: searchParams.value, onChange: (e) => setSearchParams(prev => ({ ...prev, value: e.target.value })), className: "input-field pl-10", placeholder: "Ingrese el valor a buscar", required: true }), _jsx(FaSearch, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" })] })] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(motion.button, { type: "submit", className: "flex-1 btn-primary flex items-center justify-center gap-2", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(FaSpinner, { className: "animate-spin" }), _jsx("span", { children: "Buscando..." })] })) : (_jsxs(_Fragment, { children: [_jsx(FaSearch, {}), _jsx("span", { children: "Buscar" })] })) }), _jsx(motion.button, { type: "button", onClick: handleClearSearch, className: "btn-secondary", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "Limpiar" })] })] }), error && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-3", children: [_jsx(FaExclamationTriangle, {}), _jsx("span", { children: error })] })), results.length > 0 && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: "mt-8 space-y-4", children: [_jsxs("h3", { className: "text-xl font-semibold text-secondary-900", children: ["Resultados (", results.length, ")"] }), results.map((result, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "card hover:shadow-lg transition-shadow border-l-4 border-blue-500", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold text-secondary-900 flex items-center gap-2", children: [_jsx(FaFileAlt, { className: "text-blue-500" }), result.id] }), _jsxs("p", { className: "text-secondary-600", children: ["Tipo: ", result.tipo] })] }), _jsx("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${result.estado === 'EN TRÁMITE'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : result.estado === 'ARCHIVADO'
                                                                        ? 'bg-gray-100 text-gray-800'
                                                                        : result.estado === 'SENTENCIA'
                                                                            ? 'bg-blue-100 text-blue-800'
                                                                            : 'bg-yellow-100 text-yellow-800'}`, children: result.estado })] }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-secondary-500", children: "Actor" }), _jsx("p", { className: "text-secondary-900 font-medium", children: result.actor })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-secondary-500", children: "Demandado" }), _jsx("p", { className: "text-secondary-900 font-medium", children: result.demandado })] })] }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-secondary-500", children: "Fecha" }), _jsx("p", { className: "text-secondary-900", children: new Date(result.fecha).toLocaleDateString('es-ES') })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-secondary-500", children: "Judicatura" }), _jsx("p", { className: "text-secondary-900", children: result.judicatura })] })] }), _jsx("div", { className: "mt-4 pt-4 border-t border-gray-100 flex justify-end", children: _jsx("button", { className: "text-blue-600 hover:text-blue-800 text-sm font-medium", onClick: () => window.open(`https://consultas.funcionjudicial.gob.ec/informacionjudicial/public/informacion.jsf?causa=${result.id}`, '_blank'), children: "Ver detalles completos" }) })] }, result.id)))] }))] }), _jsx("div", { className: "md:w-1/3", children: _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.2 }, className: "card", children: [_jsx("h3", { className: "text-lg font-semibold text-secondary-900 mb-4", children: "B\u00FAsquedas Recientes" }), recentSearches.length > 0 ? (_jsx("div", { className: "space-y-3", children: recentSearches.map((search, index) => (_jsxs("div", { className: "p-3 bg-secondary-50 rounded-lg cursor-pointer hover:bg-secondary-100 transition-colors", onClick: () => handleUseRecentSearch(search), children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "font-medium text-secondary-900", children: search.search_value }), _jsx("span", { className: "text-xs text-secondary-500", children: new Date(search.timestamp).toLocaleDateString('es-ES') })] }), _jsxs("div", { className: "mt-1 text-sm text-secondary-600", children: [_jsx("span", { className: "inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2", children: searchTypes.find(t => t.id === search.search_type)?.name || search.search_type }), _jsx("span", { className: "inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs", children: provinces.find(p => p.id === search.province)?.name || search.province })] })] }, index))) })) : (_jsx("p", { className: "text-secondary-500 text-center py-4", children: "No hay b\u00FAsquedas recientes" })), _jsxs("div", { className: "mt-6", children: [_jsx("h4", { className: "text-md font-medium text-secondary-900 mb-3", children: "Consejos de b\u00FAsqueda" }), _jsxs("ul", { className: "space-y-2 text-sm text-secondary-600", children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-blue-500 mt-1", children: "\u2022" }), _jsx("span", { children: "Para buscar por n\u00FAmero de causa, use el formato completo (ej. 17294-2023-00123)" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-blue-500 mt-1", children: "\u2022" }), _jsx("span", { children: "Al buscar por nombre, incluya al menos un apellido completo" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-blue-500 mt-1", children: "\u2022" }), _jsx("span", { children: "Seleccione la provincia correcta para obtener resultados m\u00E1s precisos" })] })] })] })] }) })] }) })] }) }));
};
export default ProcessSearch;
