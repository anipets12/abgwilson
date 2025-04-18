import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import paymentIntegration from '../services/paymentIntegration';
import auth from '../utils/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

/**
 * Página de checkout para completar la compra
 * Integra múltiples métodos de pago (PayPal, WhatsApp, tarjeta)
 */
const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('paypal');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });
  const paypalButtonRef = useRef(null);
  const [user, setUser] = useState(null);

  // Cargar datos del carrito y usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Verificar si el usuario está autenticado
        const userData = auth.getUser();
        setUser(userData || null);
        
        // Obtener datos del carrito
        // En producción, esto vendría de una API o estado global
        let items = [];
        
        // Si recibimos los items directamente del estado de navegación
        if (location.state?.items) {
          items = location.state.items;
        } else {
          // Intentar recuperar del localStorage
          const storedCart = localStorage.getItem('cart');
          if (storedCart) {
            items = JSON.parse(storedCart);
          }
        }
        
        if (!items || items.length === 0) {
          setError('Su carrito está vacío');
        }
        
        setCartItems(items);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('No se pudieron cargar los datos del carrito');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [location.state]);

  // Inicializar PayPal cuando se selecciona como método de pago
  useEffect(() => {
    if (selectedPaymentMethod === 'paypal' && !loading && cartItems.length > 0) {
      renderPayPalButton();
    }
  }, [selectedPaymentMethod, loading, cartItems]);

  // Calcular total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };

  // Renderizar botón de PayPal
  const renderPayPalButton = async () => {
    if (!paypalButtonRef.current || cartItems.length === 0) return;
    
    try {
      await paymentIntegration.renderPayPalButton(
        paypalButtonRef.current,
        {
          amount: calculateTotal(),
          description: 'Compra en Abogado Wilson',
          currency: 'USD'
        },
        handlePaymentSuccess,
        handlePaymentError,
        handlePaymentCancel
      );
    } catch (err) {
      console.error('Error al renderizar botón de PayPal:', err);
      setError('No se pudo cargar el método de pago. Inténtelo nuevamente.');
    }
  };

  // Manejar cambio en formulario de tarjeta
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar selección de método de pago
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  // Manejar éxito en el pago
  const handlePaymentSuccess = (details) => {
    console.log('Pago completado:', details);
    setSuccess('¡Pago procesado correctamente! Su pedido ha sido confirmado.');
    
    // Limpiar carrito
    localStorage.removeItem('cart');
    
    // En producción, aquí se enviaría la información al backend
    // para registrar la venta y generar la orden
    
    // Redirección después de unos segundos
    setTimeout(() => {
      navigate('/order-confirmation', { 
        state: { 
          orderId: 'ORD-' + Date.now(),
          amount: calculateTotal(),
          paymentMethod: selectedPaymentMethod
        } 
      });
    }, 3000);
  };

  // Manejar error en el pago
  const handlePaymentError = (error) => {
    console.error('Error en el pago:', error);
    setError('Ocurrió un error al procesar el pago. Por favor, inténtelo nuevamente.');
    setProcessingPayment(false);
  };

  // Manejar cancelación de pago
  const handlePaymentCancel = () => {
    console.log('Pago cancelado por el usuario');
    setError('El proceso de pago fue cancelado.');
    setProcessingPayment(false);
  };

  // Procesar pago con tarjeta
  const handleCardPayment = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc || !formData.cardName) {
      setError('Por favor complete todos los campos de la tarjeta');
      return;
    }
    
    try {
      setProcessingPayment(true);
      
      // Procesar pago (simulado)
      const result = await paymentIntegration.processCardPayment({
        ...formData,
        amount: calculateTotal(),
        description: 'Compra en Abogado Wilson'
      });
      
      if (result.success) {
        handlePaymentSuccess(result);
      } else {
        handlePaymentError(new Error('No se pudo procesar el pago'));
      }
    } catch (err) {
      handlePaymentError(err);
    }
  };

  // Generar enlace de pago por WhatsApp
  const handleWhatsAppPayment = () => {
    const whatsAppLink = paymentIntegration.generateWhatsAppPaymentLink({
      amount: calculateTotal(),
      description: `Compra en Abogado Wilson: ${cartItems.length} productos`,
      // Número de WhatsApp del abogado
      phoneNumber: '593990000000'
    });
    
    // Abrir enlace en nueva pestaña
    window.open(whatsAppLink, '_blank');
    
    // Mostrar mensaje informativo
    setSuccess('Se ha abierto WhatsApp para finalizar su pago. Una vez completado, recibirá un correo de confirmación.');
  };

  // Contenido del carrito
  const renderCartSummary = () => {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen del pedido</h3>
        
        <div className="flow-root">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-4 flex">
                {item.image && (
                  <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                )}
                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h4>{item.name}</h4>
                      <p className="ml-4">${item.price.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex-1 flex items-end justify-between text-sm">
                    <p className="text-gray-500">Cantidad: {item.quantity || 1}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${calculateTotal()}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Impuestos y gastos de envío calculados en el siguiente paso.</p>
        </div>
      </div>
    );
  };

  // Renderizar métodos de pago
  const renderPaymentMethods = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Método de pago</h3>
        
        <div className="space-y-4">
          {/* PayPal */}
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-primary-600"
                name="paymentMethod"
                value="paypal"
                checked={selectedPaymentMethod === 'paypal'}
                onChange={() => handlePaymentMethodChange('paypal')}
              />
              <span className="ml-2 flex items-center">
                <img src="/images/paypal-logo.png" alt="PayPal" className="h-8" />
                <span className="ml-2 text-gray-700">PayPal</span>
              </span>
            </label>
            
            {selectedPaymentMethod === 'paypal' && (
              <div className="mt-4">
                <div ref={paypalButtonRef} className="paypal-button-container"></div>
              </div>
            )}
          </div>
          
          {/* Tarjeta de crédito */}
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-primary-600"
                name="paymentMethod"
                value="card"
                checked={selectedPaymentMethod === 'card'}
                onChange={() => handlePaymentMethodChange('card')}
              />
              <span className="ml-2 flex items-center">
                <div className="flex space-x-2">
                  <img src="/images/visa-logo.png" alt="Visa" className="h-8" />
                  <img src="/images/mastercard-logo.png" alt="Mastercard" className="h-8" />
                </div>
                <span className="ml-2 text-gray-700">Tarjeta de crédito/débito</span>
              </span>
            </label>
            
            {selectedPaymentMethod === 'card' && (
              <div className="mt-4">
                <form onSubmit={handleCardPayment} className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Nombre en la tarjeta</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Nombre completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">Fecha de vencimiento</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="MM/AA"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">CVC</label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={processingPayment}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                        processingPayment ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {processingPayment ? (
                        <span className="flex items-center">
                          <LoadingSpinner size="small" color="white" />
                          <span className="ml-2">Procesando...</span>
                        </span>
                      ) : (
                        'Pagar ahora'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* WhatsApp */}
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-primary-600"
                name="paymentMethod"
                value="whatsapp"
                checked={selectedPaymentMethod === 'whatsapp'}
                onChange={() => handlePaymentMethodChange('whatsapp')}
              />
              <span className="ml-2 flex items-center">
                <img src="/images/whatsapp-logo.png" alt="WhatsApp" className="h-8" />
                <span className="ml-2 text-gray-700">Pago por WhatsApp</span>
              </span>
            </label>
            
            {selectedPaymentMethod === 'whatsapp' && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Al hacer clic en el botón de abajo, serás redirigido a WhatsApp para coordinar el pago directamente con nosotros.
                </p>
                
                <button
                  type="button"
                  onClick={handleWhatsAppPayment}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Pagar vía WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Checkout</h1>
          
          {error && (
            <div className="mb-6">
              <ErrorAlert 
                message={error}
                type="error"
                onClose={() => setError('')}
              />
            </div>
          )}
          
          {success && (
            <div className="mb-6">
              <ErrorAlert 
                message={success}
                type="success"
                onClose={() => setSuccess('')}
              />
            </div>
          )}
          
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600 mb-6">Su carrito está vacío</p>
              <Link 
                to="/services"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Ver servicios
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {renderCartSummary()}
                
                {/* Información de contacto */}
                {!user && (
                  <div className="mt-6 bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información de contacto</h3>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Ya tiene una cuenta? 
                        <Link to="/login" className="text-primary-600 font-medium ml-1">
                          Iniciar sesión
                        </Link>
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre</label>
                          <input
                            type="text"
                            id="firstName"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido</label>
                          <input
                            type="text"
                            id="lastName"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                          type="tel"
                          id="phone"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                {renderPaymentMethods()}
                
                <div className="mt-6 flex justify-between">
                  <Link 
                    to="/cart" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Volver al carrito
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
