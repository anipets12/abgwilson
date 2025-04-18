import React, { useState } from 'react';

/**
 * Componente de administración del programa de afiliados
 * Gestiona afiliados, comisiones, referencias y estadísticas
 */
const AdminAffiliates = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Datos de ejemplo para afiliados
  const [affiliates, setAffiliates] = useState([
    { id: 1, name: 'Roberto González', email: 'roberto@example.com', referrals: 12, earnings: 320.50, status: 'active', joined: '2025-01-15' },
    { id: 2, name: 'Ana Suárez', email: 'ana@example.com', referrals: 8, earnings: 210.25, status: 'active', joined: '2025-01-28' },
    { id: 3, name: 'Carlos Ramírez', email: 'carlos@example.com', referrals: 4, earnings: 90.00, status: 'pending', joined: '2025-02-10' },
    { id: 4, name: 'Elena Castro', email: 'elena@example.com', referrals: 15, earnings: 425.75, status: 'active', joined: '2024-12-05' },
    { id: 5, name: 'Pedro Morales', email: 'pedro@example.com', referrals: 0, earnings: 0, status: 'inactive', joined: '2025-03-01' },
  ]);

  // Función para cambiar de pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Obtener badge de estado
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Activo</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Inactivo</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  // Componente de resumen general
  const OverviewTab = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total de Afiliados</h3>
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
            <span>20% vs. mes anterior</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total de Referencias</h3>
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">39</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
            <span>15% vs. mes anterior</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Comisiones Pagadas</h3>
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">$1,046.50</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
            <span>25% vs. mes anterior</span>
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="font-medium text-gray-900 mb-4">Rendimiento del Programa de Afiliados</h3>
        <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Gráfico de tendencia de afiliados y conversiones</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Afiliados Destacados</h3>
          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            Ver todos
          </button>
        </div>
        
        <div className="space-y-4">
          {affiliates.slice(0, 3).map(affiliate => (
            <div key={affiliate.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                  {affiliate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{affiliate.name}</p>
                  <p className="text-xs text-gray-500">{affiliate.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{affiliate.referrals} referencias</p>
                <p className="text-xs text-gray-500">${affiliate.earnings.toFixed(2)} ganados</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Componente de listado de afiliados
  const AffiliatesListTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Afiliados</h2>
        <button className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
          Nuevo Afiliado
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Afiliado</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Referencias</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Ganancias</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Estado</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Desde</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Acciones</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {affiliates.map(affiliate => (
                <tr key={affiliate.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-xs">
                        {affiliate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-medium text-gray-800 ml-2">{affiliate.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">{affiliate.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">{affiliate.referrals}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left font-medium">${affiliate.earnings.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">{getStatusBadge(affiliate.status)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left text-gray-500">{affiliate.joined}</div>
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

  // Componente de configuración del programa
  const SettingsTab = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Configuración del Programa</h2>
      
      <form>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Parámetros de Comisiones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700 mb-1">Tasa de comisión (%)</label>
                <input
                  type="number"
                  id="commissionRate"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  defaultValue="15"
                />
              </div>
              <div>
                <label htmlFor="minimumPayout" className="block text-sm font-medium text-gray-700 mb-1">Pago mínimo ($)</label>
                <input
                  type="number"
                  id="minimumPayout"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  defaultValue="50"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Enlaces y Seguimiento</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="cookieDuration" className="block text-sm font-medium text-gray-700 mb-1">Duración de cookies (días)</label>
                <input
                  type="number"
                  id="cookieDuration"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  defaultValue="30"
                />
              </div>
              <div>
                <label htmlFor="referralParam" className="block text-sm font-medium text-gray-700 mb-1">Parámetro de referidos</label>
                <input
                  type="text"
                  id="referralParam"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  defaultValue="ref"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Reglas del Programa</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="requireApproval"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="requireApproval" className="ml-2 block text-sm text-gray-700">
                  Requerir aprobación manual para nuevos afiliados
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="allowOwnPurchases"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="allowOwnPurchases" className="ml-2 block text-sm text-gray-700">
                  Permitir comisiones por compras propias
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="enableAutoPayouts"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="enableAutoPayouts" className="ml-2 block text-sm text-gray-700">
                  Habilitar pagos automáticos mensuales
                </label>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Guardar Configuración
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Programa de Afiliados</h1>
        <p className="text-sm text-gray-600 mt-1">
          Gestione afiliados, comisiones, referencias y estrategias de marketing
        </p>
      </div>

      {/* Pestañas de navegación */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('overview')}
            >
              Resumen
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'affiliates' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('affiliates')}
            >
              Afiliados
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('settings')}
            >
              Configuración
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido de la pestaña seleccionada */}
      <div>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'affiliates' && <AffiliatesListTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
};

export default AdminAffiliates;
