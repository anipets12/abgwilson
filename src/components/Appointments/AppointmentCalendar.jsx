import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';

/**
 * Componente para seleccionar fecha y hora de la cita
 */
const AppointmentCalendar = ({ 
  selectedDate, 
  selectedTime, 
  availableTimes, 
  onDateSelect, 
  onTimeSelect, 
  onContinue 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendar, setCalendar] = useState([]);
  
  // Calcular días del mes al cambiar el mes
  useEffect(() => {
    setCalendar(generateCalendar(currentMonth));
  }, [currentMonth]);
  
  /**
   * Genera un array con los días del mes actual
   */
  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Primer día del mes (0-6, donde 0 es domingo)
    const firstDay = new Date(year, month, 1).getDay();
    // Número de días en el mes
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Array para almacenar los días
    const days = [];
    
    // Añadir días vacíos para ajustar el primer día de la semana
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Añadir los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  /**
   * Avanzar al mes siguiente
   */
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  /**
   * Retroceder al mes anterior
   */
  const goToPrevMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    
    // No permitir seleccionar meses anteriores al actual
    if (prevMonth >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)) {
      setCurrentMonth(prevMonth);
    }
  };
  
  /**
   * Verificar si una fecha es seleccionable
   */
  const isDateSelectable = (date) => {
    if (!date) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // No permitir fechas anteriores a hoy
    if (date < today) return false;
    
    // No permitir fines de semana (0 = domingo, 6 = sábado)
    const day = date.getDay();
    if (day === 0 || day === 6) return false;
    
    return true;
  };
  
  /**
   * Verificar si una fecha es la seleccionada
   */
  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  /**
   * Formatear fecha para mostrar
   */
  const formatDate = (date) => {
    if (!date) return '';
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };
  
  /**
   * Obtener nombre del mes actual
   */
  const getMonthName = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };
  
  /**
   * Formatear hora para mostrar
   */
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  // Animaciones
  const calendarVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.03
      }
    }
  };
  
  const dayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const timeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Seleccione fecha y hora
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendario */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 rounded-lg p-4">
            {/* Encabezado del calendario */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={goToPrevMonth}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-medium text-gray-900">
                {getMonthName(currentMonth)}
              </h3>
              <button 
                onClick={goToNextMonth}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
                <div key={index} className="text-center font-medium text-gray-600 p-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Días del mes */}
            <motion.div 
              className="grid grid-cols-7 gap-1"
              variants={calendarVariants}
              initial="hidden"
              animate="visible"
            >
              {calendar.map((date, index) => (
                <motion.div key={index} variants={dayVariants}>
                  {date ? (
                    <button
                      className={`w-full p-2 rounded-md transition ${
                        isDateSelected(date)
                          ? 'bg-primary-600 text-white font-semibold'
                          : isDateSelectable(date)
                          ? 'hover:bg-gray-200 text-gray-900'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => isDateSelectable(date) && onDateSelect(date)}
                      disabled={!isDateSelectable(date)}
                    >
                      {date.getDate()}
                    </button>
                  ) : (
                    <div className="w-full p-2"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            {/* Leyenda */}
            <div className="mt-4 text-xs text-gray-500">
              <p>* No se atiende en fines de semana</p>
              <p>* Los horarios disponibles se muestran al seleccionar una fecha</p>
            </div>
          </div>
        </div>
        
        {/* Selección de hora */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 rounded-lg p-4 h-full">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Hora de la cita
              </h3>
              
              {selectedDate ? (
                <div className="mb-4">
                  <div className="flex items-center text-primary-700 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  
                  {availableTimes.length > 0 ? (
                    <motion.div 
                      className="grid grid-cols-3 gap-2"
                      variants={calendarVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {availableTimes.map((time, index) => (
                        <motion.div key={index} variants={timeVariants}>
                          <button
                            className={`w-full py-2 px-3 border rounded-md transition ${
                              selectedTime === time
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                            }`}
                            onClick={() => onTimeSelect(time)}
                          >
                            {formatTime(time)}
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="text-gray-600">
                      No hay horarios disponibles para esta fecha. Por favor seleccione otra fecha.
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center text-gray-500">
                    <FaClock className="mx-auto h-10 w-10 mb-2" />
                    <p>Seleccione una fecha para ver los horarios disponibles</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Botón continuar */}
            <div className="mt-auto">
              <button
                onClick={onContinue}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-3 px-4 rounded-md flex items-center justify-center transition ${
                  selectedDate && selectedTime
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span className="mr-2">Continuar</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
