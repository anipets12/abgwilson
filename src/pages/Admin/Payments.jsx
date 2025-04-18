import React, { useState } from 'react';

/**
 * Componente de gestión de pagos para administradores
 * Permite ver y gestionar transacciones, facturación y reportes financieros
 */
const AdminPayments = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  
  // Datos de ejemplo para transacciones
  const [transactions, setTransactions] = useState([
    { id: 'TRX-001', date: '2025-04-15', client: 'Juan Pérez', service: 'Consulta legal', amount: 50, status: 'completed', paymentMethod: 'credit_card' },
    { id: 'TRX-002', date: '2025-04-10', client: 'María López', service: 'Ebook: Derechos Laborales', amount: 15.99, status: 'completed', paymentMethod: 'paypal' },
    { id: 'TRX-003', date: '2025-04-05', client: 'Carlos Ramírez', service: 'Representación civil', amount: 500, status: 'pending', paymentMethod: 'bank_transfer' },
    { id: 'TRX-004', date: '2025-03-28', client: 'Ana Suárez', service: 'Suscripción Premium (Mensual)', amount: 29.99, status: 'completed', paymentMethod: 'credit_card' },
    { id: 'TRX-005', date: '2025-03-20', client: 'Roberto González', service: 'Plantillas legales', amount: 12.50, status: 'failed', paymentMethod: 'credit_card' },
  ]);

  // Función para cambiar de pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Obtener badge de estado
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completado</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Fallido</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  // Obtener icono de método de pago
  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'credit_card':
        return <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>;
      case 'paypal':
        return <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.112 7.571c-.452 0-.9.056-1.329.167-1.325.33-2.175 1.308-2.189 2.592-.016 1.421 1.088 2.061 2.418 2.069.349.004.698-.036 1.045-.117.786-.175 1.468-.644 1.898-1.307.39-.599.534-1.346.423-2.053-.132-.848-.792-1.351-2.266-1.351z" />
          <path d="M7.84 13.905c-.5 0-1.016.016-1.516.026-.15.049-.301.123-.451.182-.85.335-1.4.942-1.376 1.752.035 1.122.871 1.636 2.077 1.636.399 0 .782-.057 1.144-.158.709-.193 1.276-.612 1.564-1.162.298-.568.381-1.288.247-1.846-.099-.413-.474-.429-1.689-.429z" />
          <path d="M20.297 0H3.702C1.652 0 0 1.652 0 3.702v16.596C0 22.349 1.652 24 3.702 24h16.596c2.049 0 3.702-1.651 3.702-3.702V3.702C24 1.652 22.346 0 20.297 0zm-5.16 9.045c.057.301.086.612.088.942-.033 3.011-2.752 4.461-5.445 4.461-.312 0-.638-.028-.985-.082-2.037.736-2.334 2.252-2.334 2.85 0 .629.409.852.805.852h2.698c1.361 0 2.619.551 3.515 1.598.764.895 1.116 1.996 1.03 3.221-.038.551-.141 1.085-.309 1.598h1.836c.142-.513.229-1.048.263-1.598.074-1.225-.271-2.326-1.03-3.221-.9-1.047-2.16-1.598-3.522-1.598h-2.699c-.877 0-1.572-.495-1.733-1.277-.103-.505.026-1.057.359-1.562-1.442-.937-2.236-2.361-2.23-3.985.015-2.933 2.713-5.446 6.039-5.446.345 0 .696.026 1.05.081 1.731-.622 2.416-1.32 3.1-2.506.029-.05.055-.1.08-.15h-3.358c-.396.61-.98 1.281-1.781 1.717.381-.038.761-.056 1.133-.056 1.655 0 3.175.524 4.064 1.536.72.822.938 1.84.647 2.783z" />
        </svg>;
      case 'bank_transfer':
        return <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>;
      default:
        return <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>;
    }
  };

  // Pestañas de contenido
  const TransactionsTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Transacciones</h2>
        <div className="flex space-x-2">
          <button className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
            Exportar
          </button>
          <button className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
            Nueva Transacción
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">ID</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Fecha</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Cliente</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Servicio</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Monto</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Método</div>
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
              {transactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-800">{transaction.id}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">{transaction.date}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">{transaction.client}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">{transaction.service}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left font-medium">${transaction.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left flex items-center">
                      {getPaymentMethodIcon(transaction.paymentMethod)}
                      <span className="ml-2">{transaction.paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-left">{getStatusBadge(transaction.status)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-center space-x-1">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
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

  // Componente para la pestaña de facturación
  const InvoicingTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Facturación</h2>
        <button className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
          Nueva Factura
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-500 mb-6">Gestione las facturas, recibos y documentos fiscales.</p>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Factura #INV-2025-042</h3>
                <p className="text-sm text-gray-600 mt-1">Cliente: Juan Pérez - Fecha: 2025-04-15</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Pagada</span>
                <button className="text-gray-600 hover:text-gray-900 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Factura #INV-2025-041</h3>
                <p className="text-sm text-gray-600 mt-1">Cliente: Ana Suárez - Fecha: 2025-04-10</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>
                <button className="text-gray-600 hover:text-gray-900 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente para la pestaña de reportes
  const ReportsTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Reportes Financieros</h2>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Último mes</option>
            <option>Últimos 3 meses</option>
            <option>Último año</option>
            <option>Personalizado</option>
          </select>
          <button className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Ingresos Totales</h3>
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">$12,450.80</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
            <span>12.5% vs. mes anterior</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Transacciones</h3>
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">68</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
            <span>8.2% vs. mes anterior</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Promedio por Transacción</h3>
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">$183.10</p>
          <p className="text-sm text-red-600 mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            <span>3.1% vs. mes anterior</span>
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Resumen de Ventas por Categoría</h3>
        <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Gráfico de distribución de ingresos por categoría de servicio</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Pagos</h1>
        <p className="text-sm text-gray-600 mt-1">
          Administre transacciones, facturación y reportes financieros
        </p>
      </div>

      {/* Pestañas de navegación */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transactions' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('transactions')}
            >
              Transacciones
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invoicing' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('invoicing')}
            >
              Facturación
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('reports')}
            >
              Reportes
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido de la pestaña seleccionada */}
      <div>
        {activeTab === 'transactions' && <TransactionsTab />}
        {activeTab === 'invoicing' && <InvoicingTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </div>
    </div>
  );
};

export default AdminPayments;
