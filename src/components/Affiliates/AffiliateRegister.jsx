import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

/**
 * Formulario para registrarse como afiliado
 */
const AffiliateRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    phone: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }
    
    setLoading(true);
    
    try {
      // En una implementación real, aquí se enviaría el formulario a una API
      console.log('Enviando solicitud de afiliado:', formData);
      
      // Simular tiempo de respuesta
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Solicitud enviada correctamente. Te contactaremos pronto.');
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        website: '',
        phone: '',
        reason: ''
      });
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      toast.error('Ocurrió un error al enviar tu solicitud. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Solicitar afiliación</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Tu nombre completo"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="tu@email.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Sitio web
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="https://tusitio.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono de contacto
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="+593 000000000"
          />
        </div>
        
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            ¿Por qué quieres ser afiliado?
          </label>
          <textarea
            id="reason"
            name="reason"
            rows="3"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Cuéntanos brevemente por qué te interesa ser afiliado"
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : 'Enviar solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AffiliateRegister;
