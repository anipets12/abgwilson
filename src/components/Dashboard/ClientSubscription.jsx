import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import paymentIntegration from '../../services/paymentIntegration';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';

/**
 * Componente para gestionar suscripciones de clientes
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario
 */
const ClientSubscription = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const paypalButtonRef = useRef(null);

  // Planes disponibles
  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: 29.99,
      billing: 'mensual',
      features: [
        'Acceso a consultas básicas',
        '2 documentos exclusivos por mes',
        'Horario de atención regular',
        'Acceso al foro legal'
      ],
      recommended: false
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: 49.99,
      billing: 'mensual',
      features: [
        'Consultas ilimitadas',
        'Documentos exclusivos ilimitados',
        'Atención prioritaria 24/7',
        'Acceso completo al foro legal',
        'Descuentos en servicios adicionales',
        'Asesoramiento personalizado'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Plan Empresarial',
      price: 99.99,
      billing: 'mensual',
      features: [
        'Todo lo incluido en Premium',
        'Consultas para múltiples colaboradores',
        'Documentos personalizados para empresa',
        'Asesoría legal empresarial',
        'Revisión de contratos comerciales',
        'Línea directa con abogado especializado'
      ],
      recommended: false
    }
  ];

  // Datos de suscripción del usuario
  const userSubscription = {
    plan: user?.subscription || 'free',
    startDate: '2025-01-15',
    nextBillingDate: '2025-05-18',
    paymentMethod: 'tarjeta',
    autoRenew: true,
    amount: user?.subscription === 'premium' ? 49.99 : 0
  };

  // Inicializar PayPal al montar el componente
  useEffect(() => {
    if (selectedPlan && activeTab === 'payment') {
      renderPayPalButton();
    }
  }, [selectedPlan, activeTab]);

  // Renderizar botón de PayPal
  const renderPayPalButton = async () => {
    if (!paypalButtonRef.current || !selectedPlan) return;
    
    try {
      setLoading(true);
      await paymentIntegration.renderPayPalButton(
        paypalButtonRef.current,
        {
          amount: selectedPlan.price,
          description: `Suscripción: ${selectedPlan.name}`,
          currency: 'USD'
        },
        handlePaymentSuccess,
        handlePaymentError,
        handlePaymentCancel
      );
    } catch (err) {
      console.error('Error al renderizar botón de PayPal:', err);
      setError('No se pudo cargar el método de pago. Inténtelo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar selección de plan
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setActiveTab('payment');
  };

  // Manejar éxito en el pago
  const handlePaymentSuccess = (details) => {
    console.log('Pago completado:', details);
    setSuccess(`¡Pago procesado correctamente! Su suscripción al ${selectedPlan.name} ha sido activada.`);
    
    // En producción, aquí se enviaría la información al backend
    // para actualizar el estado de la suscripción
    
    // Simular redirección después de unos segundos
    setTimeout(() => {
      setActiveTab('details');
      setSuccess('');
    }, 5000);
  };

  // Manejar error en el pago
  const handlePaymentError = (error) => {
    console.error('Error en el pago:', error);
    setError('Ocurrió un error al procesar el pago. Por favor, inténtelo nuevamente.');
  };

  // Manejar cancelación de pago
  const handlePaymentCancel = () => {
    console.log('Pago cancelado por el usuario');
    setError('El proceso de pago fue cancelado.');
  };

  // Generar enlace de pago por WhatsApp
  const handleWhatsAppPayment = () => {
    if (!selectedPlan) return;
    
    const whatsAppLink = paymentIntegration.generateWhatsAppPaymentLink({
      amount: selectedPlan.price,
      description: `Suscripción: ${selectedPlan.name}`,
      // Número de WhatsApp del abogado
      phoneNumber: '593990000000'
    });
    
    // Abrir enlace en nueva pestaña
    window.open(whatsAppLink, '_blank');
  };

  // Manejar cambio en renovación automática
  const handleAutoRenewToggle = () => {
    // En producción, esto actualizaría el estado en el backend
    console.log('Cambio en renovación automática');
  };

  // Manejar cancelación de suscripción
  const handleCancelSubscription = () => {
    // En producción, esto enviaría la solicitud al backend
    console.log('Solicitud de cancelación de suscripción');
  };

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
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Renderizar pestaña activa
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            {/* Detalles de suscripción actual */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Su suscripción actual</h3>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    userSubscription.plan === 'premium' 
                      ? 'bg-green-100 text-green-800' 
                      : userSubscription.plan === 'enterprise'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {userSubscription.plan === 'premium' 
                      ? 'Plan Premium' 
                      : userSubscription.plan === 'enterprise'
                        ? 'Plan Empresarial'
                        : 'Plan Gratuito'}
                  </span>
                </div>
                
                {userSubscription.plan !== 'free' && (
                  <div className="text-sm text-gray-600">
                    ${userSubscription.amount}/mes
                  </div>
                )}
              </div>
              
              {userSubscription.plan !== 'free' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Fecha de inicio</p>
                      <p className="text-sm font-medium">{new Date(userSubscription.startDate).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Próximo cobro</p>
                      <p className="text-sm font-medium">{new Date(userSubscription.nextBillingDate).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Método de pago</p>
                      <p className="text-sm font-medium capitalize">{userSubscription.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Renovación automática</p>
                      <div className="mt-1 flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={userSubscription.autoRenew}
                            onChange={handleAutoRenewToggle}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900">{userSubscription.autoRenew ? 'Activada' : 'Desactivada'}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={handleCancelSubscription}
                    >
                      Cancelar suscripción
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={() => setActiveTab('plans')}
                    >
                      Cambiar plan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">Actualmente está utilizando la versión gratuita con funcionalidades limitadas.</p>
                  <button
                    type="button"
                    className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    onClick={() => setActiveTab('plans')}
                  >
                    Actualizar a Premium
                  </button>
                </div>
              )}
            </div>
            
            {/* Beneficios de premium */}
            {userSubscription.plan === 'free' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Beneficios Premium</h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Consultas legales ilimitadas con abogados especializados</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Acceso a biblioteca completa de documentos legales personalizables</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Atención prioritaria y respuesta garantizada en 24 horas</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Descuentos exclusivos en servicios legales adicionales</p>
                  </li>
                </ul>
              </div>
            )}
            
            {/* Historial de pagos */}
            {userSubscription.plan !== 'free' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Historial de pagos</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Descripción
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recibo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2025-04-18
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Plan Premium - Mensual
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $49.99
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completado
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 hover:text-primary-900">
                          <a href="#" className="hover:underline">Ver recibo</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2025-03-18
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Plan Premium - Mensual
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $49.99
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completado
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 hover:text-primary-900">
                          <a href="#" className="hover:underline">Ver recibo</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'plans':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Seleccione su plan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    variants={itemVariants}
                    className={`relative rounded-lg border ${
                      plan.recommended 
                        ? 'border-primary-500 ring-1 ring-primary-500' 
                        : 'border-gray-200'
                    } bg-white shadow-sm p-6 flex flex-col`}
                  >
                    {plan.recommended && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="inline-flex rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
                          Recomendado
                        </span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                      
                      <div className="mt-4 flex items-baseline">
                        <span className="text-2xl font-extrabold text-gray-900">${plan.price}</span>
                        <span className="ml-1 text-sm font-medium text-gray-500">/{plan.billing}</span>
                      </div>
                      
                      <ul className="mt-6 space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="ml-3 text-sm text-gray-700">{feature}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-8">
                      <button
                        type="button"
                        className={`w-full ${
                          plan.recommended 
                            ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white' 
                            : 'bg-white hover:bg-gray-50 focus:ring-primary-500 text-primary-600 border border-primary-600'
                        } rounded-md shadow-sm py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`}
                        onClick={() => handlePlanSelect(plan)}
                      >
                        {userSubscription.plan === plan.id 
                          ? 'Plan actual' 
                          : userSubscription.plan === 'free' 
                            ? 'Seleccionar este plan' 
                            : 'Cambiar a este plan'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setActiveTab('details')}
                >
                  Volver a detalles de suscripción
                </button>
              </div>
            </div>
          </motion.div>
        );
        
      case 'payment':
        return (
          <div className="space-y-6">
            {error && (
              <ErrorAlert 
                message={error}
                type="error"
                onClose={() => setError('')}
              />
            )}
            
            {success && (
              <ErrorAlert 
                message={success}
                type="success"
                onClose={() => setSuccess('')}
              />
            )}
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Método de pago</h3>
              
              {selectedPlan && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-base font-medium text-gray-800">Resumen de compra</h4>
                  <div className="mt-2 flex justify-between">
                    <span className="text-sm text-gray-600">{selectedPlan.name}</span>
                    <span className="text-sm font-medium">${selectedPlan.price}/{selectedPlan.billing}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <img src="/images/paypal-logo.png" alt="PayPal" className="h-8" />
                    <h4 className="text-base font-medium text-gray-800">Pagar con PayPal</h4>
                  </div>
                  
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <LoadingSpinner size="medium" />
                    </div>
                  ) : (
                    <div ref={paypalButtonRef} className="paypal-button-container"></div>
                  )}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">o</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <img src="/images/whatsapp-logo.png" alt="WhatsApp" className="h-8" />
                    <h4 className="text-base font-medium text-gray-800">Pagar vía WhatsApp</h4>
                  </div>
                  
                  <button
                    type="button"
                    className="w-full bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white rounded-md shadow-sm py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onClick={handleWhatsAppPayment}
                  >
                    Generar enlace de pago
                  </button>
                  
                  <p className="mt-2 text-xs text-gray-500">
                    Serás redirigido a WhatsApp para coordinar el pago directamente con nosotros.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 flex justify-between">
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-900"
                    onClick={() => setActiveTab('plans')}
                  >
                    Volver a selección de planes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Contenido no disponible</div>;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Suscripción</h2>
      
      {/* Pestañas */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Detalles
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'plans'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('plans')}
          >
            Planes
          </button>
          {activeTab === 'payment' && (
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payment'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pago
            </button>
          )}
        </nav>
      </div>
      
      {/* Contenido de pestaña activa */}
      {renderActiveTab()}
    </div>
  );
};

export default ClientSubscription;
