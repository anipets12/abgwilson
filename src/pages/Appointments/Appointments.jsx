import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AppointmentCalendar from '../../components/Appointments/AppointmentCalendar';
import AppointmentForm from '../../components/Appointments/AppointmentForm';
import AppointmentConfirmation from '../../components/Appointments/AppointmentConfirmation';
import auth from '../../utils/auth';

/**
 * Página de programación de citas
 * Permite a los usuarios programar consultas legales
 */
const Appointments = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    details: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Tipos de servicios disponibles
  const serviceTypes = [
    { id: 'civil', name: 'Derecho Civil' },
    { id: 'familiar', name: 'Derecho Familiar' },
    { id: 'penal', name: 'Derecho Penal' },
    { id: 'mercantil', name: 'Derecho Mercantil' },
    { id: 'administrativo', name: 'Derecho Administrativo' },
    { id: 'transito', name: 'Derecho de Tránsito' },
    { id: 'otro', name: 'Otra consulta legal' }
  ];

  // Obtener información del usuario si está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await auth.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          const userData = auth.getUser();
          setUser(userData);
          
          // Pre-poblar campos del formulario con información del usuario
          setFormData(prevData => ({
            ...prevData,
            name: userData.name || prevData.name,
            email: userData.email || prevData.email,
            phone: userData.phone || prevData.phone
          }));
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      }
    };
    
    checkAuth();
  }, []);

  // Generar horarios disponibles cuando se selecciona una fecha
  useEffect(() => {
    if (selectedDate) {
      // En un entorno real, aquí se consultaría a la API para obtener los horarios disponibles
      // Para este ejemplo, generamos horarios simulados
      const mockAvailableTimes = generateMockAvailableTimes(selectedDate);
      setAvailableTimes(mockAvailableTimes);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate]);

  // Función para generar horarios disponibles simulados
  const generateMockAvailableTimes = (date) => {
    const times = [];
    // Horarios de lunes a viernes (9:00 AM - 5:00 PM)
    const day = date.getDay();
    
    // Excluir fines de semana (0 = domingo, 6 = sábado)
    if (day === 0 || day === 6) {
      return [];
    }
    
    // Generar horarios cada 30 minutos
    for (let hour = 9; hour < 17; hour++) {
      // Añadir hora en punto
      times.push(`${hour}:00`);
      // Añadir media hora
      times.push(`${hour}:30`);
    }
    
    // Simular algunos horarios ya ocupados (aleatoriamente)
    return times.filter(() => Math.random() > 0.3); // 30% de probabilidad de que un horario esté ocupado
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Resetear tiempo seleccionado al cambiar de fecha
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Por favor seleccione fecha y hora para su cita');
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validar formulario
      if (!formData.name || !formData.email || !formData.phone || !formData.serviceType) {
        throw new Error('Por favor complete todos los campos requeridos');
      }
      
      // Simular solicitud a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Crear objeto con datos de la cita
      const appointmentData = {
        id: `APT-${Date.now()}`,
        date: selectedDate,
        time: selectedTime,
        ...formData,
        serviceName: serviceTypes.find(s => s.id === formData.serviceType)?.name,
        status: 'pendiente',
        createdAt: new Date()
      };
      
      // En un entorno real, aquí se enviaría la cita a la API
      console.log('Cita programada:', appointmentData);
      
      // Guardar datos para confirmación
      setConfirmationData(appointmentData);
      
      // Mostrar mensaje de éxito
      toast.success('¡Cita programada exitosamente!');
      
      // Avanzar al paso de confirmación
      setStep(3);
    } catch (error) {
      console.error('Error al programar cita:', error);
      toast.error(error.message || 'Ocurrió un error al programar su cita. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewAppointment = () => {
    // Resetear formulario para nueva cita
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmationData(null);
  };

  // Animación de página
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Programación de Citas
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Reserve una consulta legal con nuestros especialistas
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-10">
          <div className="flex justify-between items-center w-full max-w-3xl mx-auto mb-4">
            <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
              <div className="step-circle">1</div>
              <p className="text-sm mt-2">Seleccionar fecha</p>
            </div>
            <div className="step-line"></div>
            <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
              <div className="step-circle">2</div>
              <p className="text-sm mt-2">Datos personales</p>
            </div>
            <div className="step-line"></div>
            <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <p className="text-sm mt-2">Confirmación</p>
            </div>
          </div>
        </div>

        {/* Contenido según paso actual */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {step === 1 && (
            <AppointmentCalendar 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              availableTimes={availableTimes}
              onDateSelect={handleDateSelect}
              onTimeSelect={handleTimeSelect}
              onContinue={handleContinue}
            />
          )}

          {step === 2 && (
            <AppointmentForm 
              formData={formData}
              serviceTypes={serviceTypes}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          )}

          {step === 3 && confirmationData && (
            <AppointmentConfirmation 
              appointment={confirmationData}
              onNewAppointment={handleNewAppointment}
            />
          )}
        </div>

        {/* Ayuda y soporte */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            ¿Necesita ayuda para programar su cita?
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/contacto" className="text-primary-600 hover:text-primary-800">
              Contactar soporte
            </Link>
            <span className="text-gray-300">|</span>
            <a href="tel:+593000000000" className="text-primary-600 hover:text-primary-800">
              Llamar a recepción
            </a>
          </div>
        </div>
      </div>

      {/* Estilos CSS para la barra de progreso */}
      <style jsx>{`
        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
        }
        
        .step-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #6b7280;
          transition: all 0.3s ease;
        }
        
        .step-line {
          flex-grow: 1;
          height: 2px;
          background-color: #e5e7eb;
          margin: 0 15px;
        }
        
        .step-item.active .step-circle {
          background-color: #2563eb;
          color: white;
        }
      `}</style>
    </motion.div>
  );
};

export default Appointments;
