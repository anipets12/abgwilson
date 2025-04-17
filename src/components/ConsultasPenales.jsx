import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGavel, FaSearch, FaUserShield, FaExclamationTriangle, FaCheckCircle, FaLock, FaCrown, FaArrowRight } from 'react-icons/fa';
import ConsultasBase from './ConsultasBase';

const ConsultasPenales = () => {
  const [activeQuery, setActiveQuery] = useState(null);
  
  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <ConsultasBase queryType="penal">
      {({ handleQuery, queryCount, isLoading }) => (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-extrabold text-blue-900 mb-4 flex items-center justify-center">
              <FaGavel className="text-blue-700 mr-3" /> Consultas Penales
            </h1>
            <p className="text-xl text-blue-600 mb-6 max-w-3xl mx-auto">
              Asistencia profesional para resolver sus casos penales con celeridad y eficacia
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>
          
          {!isLoading && (
            <motion.div 
              className="bg-white shadow-lg rounded-xl p-6 mb-10 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className={`rounded-full w-16 h-16 flex items-center justify-center mr-4 ${
                    queryCount >= 5 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'
                  }`}>
                    <FaSearch className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Consultas disponibles</h3>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className={`h-3 w-6 rounded-full ${i < (5 - queryCount) ? 'bg-blue-500' : 'bg-gray-200'}`}
                          />
                        ))}
                      </div>
                      <p className="ml-3 text-gray-600 font-medium">
                        {5 - queryCount} de 5 restantes
                      </p>
                    </div>
                  </div>
                </div>
                
                {queryCount >= 5 ? (
                  <Link to="/planes">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold flex items-center shadow-md"
                    >
                      <FaCrown className="mr-2" /> Desbloquear Consultas Ilimitadas
                    </motion.button>
                  </Link>
                ) : (
                  <div className="text-sm bg-blue-50 text-blue-700 py-2 px-4 rounded-lg">
                    Plan Gratuito: Máximo 5 consultas mensuales
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-2 bg-blue-600"></div>
              <div className="p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full mb-4 flex items-center justify-center mx-auto">
                  <FaUserShield className="text-blue-700 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Delitos contra la Propiedad</h3>
                <div className="text-gray-600">
                  <p className="mb-3">Si has sido víctima de robo o hurto, te ayudamos a:</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Presentar la denuncia formal</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Seguimiento del caso</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Recuperación de bienes</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Representación en audiencias</span>
                    </li>
                  </ul>
                </div>
                
                {queryCount >= 5 ? (
                  <div className="relative">
                    <button 
                      disabled
                      className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-medium flex items-center justify-center opacity-70"
                    >
                      <FaLock className="mr-2" /> Iniciar Consulta
                    </button>
                    <Link 
                      to="/planes" 
                      className="absolute inset-0 flex items-center justify-center bg-blue-900/60 rounded-lg text-white font-bold hover:bg-blue-800/70 transition-colors"
                    >
                      Desbloquear <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                ) : (
                  <motion.button 
                    onClick={() => {
                      setActiveQuery('propiedad');
                      handleQuery();
                    }}
                    disabled={queryCount >= 5}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Iniciar Consulta <FaArrowRight className="ml-2" />
                  </motion.button>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-red-50 rounded-xl shadow-lg overflow-hidden border border-red-100 hover:border-red-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-2 bg-red-600"></div>
              <div className="p-6">
                <div className="bg-red-100 w-16 h-16 rounded-full mb-4 flex items-center justify-center mx-auto">
                  <FaExclamationTriangle className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Delitos contra las Personas</h3>
                <div className="text-gray-600">
                  <p className="mb-3">Para casos de agresión, violencia o amenazas:</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Asesoría legal especializada</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Medidas de protección</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Seguimiento del proceso penal</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Atención prioritaria en 24h</span>
                    </li>
                  </ul>
                </div>
                
                {queryCount >= 5 ? (
                  <div className="relative">
                    <button 
                      disabled
                      className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-medium flex items-center justify-center opacity-70"
                    >
                      <FaLock className="mr-2" /> Solicitar Ayuda
                    </button>
                    <Link 
                      to="/planes" 
                      className="absolute inset-0 flex items-center justify-center bg-red-900/60 rounded-lg text-white font-bold hover:bg-red-800/70 transition-colors"
                    >
                      Desbloquear <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                ) : (
                  <motion.button 
                    onClick={() => {
                      setActiveQuery('personas');
                      handleQuery();
                    }}
                    disabled={queryCount >= 5}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    Solicitar Ayuda <FaArrowRight className="ml-2" />
                  </motion.button>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg overflow-hidden border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-2 bg-green-600"></div>
              <div className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full mb-4 flex items-center justify-center mx-auto">
                  <FaGavel className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Delitos contra la Seguridad Pública</h3>
                <div className="text-gray-600">
                  <p className="mb-3">Para casos de tráfico de drogas, armas u otros:</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Investigación especializada</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Protección de testigos</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Asesoría en procesos complejos</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Equipo especializado de defensa</span>
                    </li>
                  </ul>
                </div>
                
                {queryCount >= 5 ? (
                  <div className="relative">
                    <button 
                      disabled
                      className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-medium flex items-center justify-center opacity-70"
                    >
                      <FaLock className="mr-2" /> Consultar Caso
                    </button>
                    <Link 
                      to="/planes" 
                      className="absolute inset-0 flex items-center justify-center bg-green-900/60 rounded-lg text-white font-bold hover:bg-green-800/70 transition-colors"
                    >
                      Desbloquear <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                ) : (
                  <motion.button 
                    onClick={() => {
                      setActiveQuery('seguridad');
                      handleQuery();
                    }}
                    disabled={queryCount >= 5}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    Consultar Caso <FaArrowRight className="ml-2" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Sección de planes premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-blue-800 to-indigo-800 rounded-xl shadow-xl p-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-bold mb-3 flex items-center">
                  <FaCrown className="mr-2 text-yellow-400" /> Desbloquea Consultas Ilimitadas
                </h3>
                <p className="text-blue-100 mb-4">
                  Accede a consultas ilimitadas, asesoría personalizada y seguimiento prioritario con nuestros planes premium.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>Consultas ilimitadas en todas las áreas</span>
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>Asesoría legal personalizada</span>
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>Respuestas en menos de 24 horas</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  $49.99 <span className="text-sm font-normal">/mes</span>
                </div>
                <Link to="/planes">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-bold shadow-lg"
                  >
                    Ver Planes Premium
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </ConsultasBase>
  );
};

export default ConsultasPenales;
