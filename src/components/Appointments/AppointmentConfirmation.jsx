import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaClock, FaUser, FaEnvelope, FaPhone, FaFileAlt, FaDownload } from 'react-icons/fa';

/**
 * Componente de confirmación de cita programada
 */
const AppointmentConfirmation = ({ appointment, onNewAppointment }) => {
  // Formatear fecha para mostrar
  const formatDate = (date) => {
    if (!date) return '';
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  // Generar PDF con los detalles de la cita (simulado)
  const handleDownloadDetails = () => {
    // En una implementación real, esto generaría un PDF
    // Por ahora, sólo mostraremos un mensaje en consola
    console.log('Descargando detalles de la cita:', appointment);
    alert('La función de descarga estará disponible próximamente');
  };

  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <FaCalendarCheck className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">
          ¡Su cita ha sido programada exitosamente!
        </h2>
        <p className="mt-2 text-gray-600">
          Hemos enviado un correo electrónico de confirmación a {appointment.email}
        </p>
      </div>

      {/* Detalles de la cita */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
          Detalles de su consulta
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaCalendarCheck className="h-5 w-5 text-primary-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Fecha</p>
              <p className="text-sm text-gray-700">{formatDate(appointment.date)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaClock className="h-5 w-5 text-primary-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Hora</p>
              <p className="text-sm text-gray-700">{appointment.time}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaFileAlt className="h-5 w-5 text-primary-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Tipo de consulta</p>
              <p className="text-sm text-gray-700">{appointment.serviceName}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaUser className="h-5 w-5 text-primary-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Nombre</p>
              <p className="text-sm text-gray-700">{appointment.name}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaEnvelope className="h-5 w-5 text-primary-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Correo electrónico</p>
              <p className="text-sm text-gray-700">{appointment.email}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaPhone className="h-5 w-5 text-primary-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Teléfono</p>
              <p className="text-sm text-gray-700">{appointment.phone}</p>
            </div>
          </div>
          
          {appointment.details && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm font-medium text-gray-900 mb-1">Detalles adicionales</p>
              <p className="text-sm text-gray-700">{appointment.details}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadDetails}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FaDownload className="mr-2 -ml-1" />
            Descargar comprobante
          </button>
        </div>
      </div>

      {/* Información adicional */}
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Información importante
        </h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Por favor, llegue 10 minutos antes de su cita para completar cualquier documentación necesaria.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            <strong>¿Necesita reprogramar?</strong> Si necesita cambiar la fecha u hora de su cita, por favor contáctenos con al menos 24 horas de anticipación.
          </p>
          <p>
            <strong>Preparación:</strong> Para aprovechar al máximo su consulta, le recomendamos traer toda la documentación relevante a su caso.
          </p>
          <p>
            <strong>Ubicación:</strong> Nuestra oficina se encuentra en Av. Principal 123, Ibarra, Ecuador. Contamos con estacionamiento para clientes.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onNewAppointment}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Programar otra cita
          </button>
          
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Ir al dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
