import React, { useState, useEffect } from 'react';

/**
 * Lista de afiliados activos y sus estadísticas
 */
const AffiliateList = () => {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        setLoading(true);
        
        // En una implementación real, aquí se obtendrían los afiliados desde una API
        // Simulamos la carga de datos
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos simulados para demostración
        const mockAffiliates = [
          {
            id: 1,
            name: 'María González',
            website: 'https://mariagonzalez.com',
            referrals: 12,
            earnings: 240.50,
            status: 'active',
            joinDate: '2025-01-15'
          },
          {
            id: 2,
            name: 'Juan Pérez',
            website: 'https://bloglegaldejuan.com',
            referrals: 8,
            earnings: 160.00,
            status: 'active',
            joinDate: '2025-02-03'
          },
          {
            id: 3,
            name: 'Adriana Mendoza',
            website: 'https://derechoypractica.ec',
            referrals: 15,
            earnings: 310.75,
            status: 'active',
            joinDate: '2024-11-20'
          }
        ];
        
        setAffiliates(mockAffiliates);
        setError(null);
      } catch (err) {
        console.error('Error al cargar afiliados:', err);
        setError('No se pudieron cargar los datos de afiliados.');
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliates();
  }, []);

  // Formatear fecha en formato legible
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Formatear cantidad como moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  if (affiliates.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-600">
        <p>No hay afiliados registrados actualmente.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-hidden">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Afiliados activos</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Afiliado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referencias
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ganancias
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de unión
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {affiliates.map((affiliate) => (
              <tr key={affiliate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {affiliate.name}
                  {affiliate.website && (
                    <a 
                      href={affiliate.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-xs text-primary-600 hover:text-primary-800"
                    >
                      {affiliate.website}
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {affiliate.referrals}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatCurrency(affiliate.earnings)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(affiliate.joinDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center mt-4">
        <button className="text-sm text-primary-600 hover:text-primary-800">
          Ver todos los afiliados
        </button>
      </div>
    </div>
  );
};

export default AffiliateList;
