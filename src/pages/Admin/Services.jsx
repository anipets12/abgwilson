import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

/**
 * Componente de gestión de servicios legales para administradores
 * Permite administrar las categorías de servicios y detalles de cada servicio
 */
const AdminServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('list');
  
  // Servicios de ejemplo
  const [services, setServices] = useState([
    { id: 1, name: 'Consulta legal', category: 'General', price: 50, duration: '1 hora', isActive: true },
    { id: 2, name: 'Representación civil', category: 'Civil', price: 500, duration: 'Variable', isActive: true },
    { id: 3, name: 'Divorcio por mutuo acuerdo', category: 'Familiar', price: 800, duration: '3 meses', isActive: true },
    { id: 4, name: 'Juicio de alimentos', category: 'Familiar', price: 600, duration: '2 meses', isActive: true },
    { id: 5, name: 'Defensa penal', category: 'Penal', price: 1200, duration: 'Variable', isActive: true },
    { id: 6, name: 'Constitución de compañía', category: 'Mercantil', price: 900, duration: '1 mes', isActive: false },
  ]);

  // Función para cambiar de pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Renderiza la lista de servicios
  const ServicesList = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Servicios Legales</h2>
        <button className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
          Nuevo Servicio
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Nombre</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Categoría</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Precio ($)</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Duración Est.</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Estado</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Acciones</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {services.map(service => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-800">{service.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">{service.category}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">${service.price}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">{service.duration}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {service.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-center space-x-1">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Componente para gestionar categorías de servicios
  const ServiceCategories = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Categorías de Servicios</h2>
        <button className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
          Nueva Categoría
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Derecho Civil</h3>
          <p className="text-sm text-gray-600 mb-3">Servicios relacionados con litigios civiles, contratos y bienes raíces.</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">10 servicios</span>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">Ver servicios</button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Derecho Familiar</h3>
          <p className="text-sm text-gray-600 mb-3">Servicios relacionados con divorcios, custodia y pensiones alimenticias.</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">8 servicios</span>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">Ver servicios</button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Derecho Penal</h3>
          <p className="text-sm text-gray-600 mb-3">Servicios relacionados con defensa penal y litigios criminales.</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">6 servicios</span>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">Ver servicios</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Servicios</h1>
        <p className="text-sm text-gray-600 mt-1">
          Administre los servicios legales ofrecidos y sus categorías
        </p>
      </div>

      {/* Pestañas de navegación */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'list' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('list')}
            >
              Listado de Servicios
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'categories' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('categories')}
            >
              Categorías
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido de la pestaña seleccionada */}
      <div>
        {activeTab === 'list' && <ServicesList />}
        {activeTab === 'categories' && <ServiceCategories />}
      </div>
    </div>
  );
};

export default AdminServices;
