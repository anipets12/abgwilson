import React from 'react';
import { FaCalendarAlt, FaClock, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

/**
 * Componente de formulario para datos de la cita
 */
const AppointmentForm = ({ 
  formData, 
  serviceTypes, 
  selectedDate, 
  selectedTime, 
  onChange, 
  onSubmit, 
  onBack,
  isSubmitting 
}) => {
  // Formatear fecha para mostrar
  const formatDate = (date) => {
    if (!date) return '';
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Formulario */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Detalles de su consulta
          </h2>
          
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Datos personales */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Información personal</h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Teléfono de contacto *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            
            {/* Detalles de la consulta */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Detalles de la consulta</h3>
              
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                  Tipo de servicio legal *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                >
                  <option value="">Seleccione una opción</option>
                  {serviceTypes.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                  Detalles adicionales de su caso
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  value={formData.details}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Describa brevemente su situación legal para que podamos preparar mejor su consulta"
                />
              </div>
            </div>
            
            {/* Política de privacidad */}
            <div className="mt-4">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="privacy" className="font-medium text-gray-700">
                    Acepto la política de privacidad
                  </label>
                  <p className="text-gray-500">
                    Al programar una cita, acepto que mis datos sean tratados según la{' '}
                    <a href="/legal/privacidad" className="text-primary-600 hover:text-primary-500">
                      política de privacidad
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
            
            {/* Botones */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <FaArrowLeft className="mr-2" />
                Volver
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Programar cita
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Resumen de la cita */}
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Resumen de su cita
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-700">
                  <FaCalendarAlt className="mr-2 text-primary-600" />
                  <span className="font-medium">Fecha:</span>
                </div>
                <p className="ml-6 text-gray-800">{formatDate(selectedDate)}</p>
              </div>
              
              <div>
                <div className="flex items-center text-gray-700">
                  <FaClock className="mr-2 text-primary-600" />
                  <span className="font-medium">Hora:</span>
                </div>
                <p className="ml-6 text-gray-800">{selectedTime}</p>
              </div>
              
              {formData.serviceType && (
                <div>
                  <p className="font-medium text-gray-700">Tipo de consulta:</p>
                  <p className="text-gray-800">
                    {serviceTypes.find(s => s.id === formData.serviceType)?.name || formData.serviceType}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                Una vez confirmada su cita, recibirá un correo electrónico con todos los detalles y las instrucciones para su consulta legal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
