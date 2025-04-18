import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import auth from '../utils/auth';

/**
 * Página del programa de afiliados
 * Permite a los usuarios unirse al programa de afiliados y ver sus estadísticas
 */
const Afiliados = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [affiliateData, setAffiliateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Verificar estado de autenticación y afiliado
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        setLoading(true);
        
        const authenticated = await auth.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          // En una implementación real, esto vendría de una llamada a la API
          // Simulamos datos para desarrollo
          const userData = auth.getUser();
          
          // Simulamos que el usuario es afiliado si tiene suscripción premium
          if (userData?.subscription === 'premium') {
            setIsAffiliate(true);
            setAffiliateData({
              referralCode: 'ABGWILS' + userData.id,
              earnings: 125.50,
              pendingPayment: 75.25,
              referrals: 5,
              conversions: 3,
              commission: 20, // porcentaje
              nextPaymentDate: '2025-05-15'
            });
          } else {
            setIsAffiliate(false);
          }
        }
      } catch (error) {
        console.error('Error al verificar estado del usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUserStatus();
  }, []);

  // Generar enlace de referido
  const generateReferralLink = (code) => {
    return `${window.location.origin}/?ref=${code}`;
  };

  // Copiar enlace de referido
  const copyReferralLink = () => {
    const link = generateReferralLink(affiliateData.referralCode);
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Enlace copiado al portapapeles');
      })
      .catch(err => {
        console.error('Error al copiar enlace:', err);
      });
  };

  // Unirse al programa de afiliados
  const handleJoinAffiliate = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      // Redirigir al login si no está autenticado
      window.location.href = '/login?redirect=/afiliados';
      return;
    }
    
    // En una implementación real, esto enviaría una solicitud a la API
    // Simulamos éxito para desarrollo
    setShowSuccessMessage(true);
    
    // Simular respuesta exitosa
    setTimeout(() => {
      setIsAffiliate(true);
      const userData = auth.getUser();
      setAffiliateData({
        referralCode: 'ABGWILS' + userData.id,
        earnings: 0,
        pendingPayment: 0,
        referrals: 0,
        conversions: 0,
        commission: 20, // porcentaje
        nextPaymentDate: '2025-05-15'
      });
      setShowSuccessMessage(false);
    }, 2000);
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

  // Beneficios del programa
  const benefits = [
    {
      title: 'Comisiones Competitivas',
      description: 'Gane hasta un 20% por cada cliente que se suscriba a nuestros servicios a través de su enlace.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Pagos Mensuales',
      description: 'Reciba sus comisiones puntualmente cada mes a través de transferencia bancaria o PayPal.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Materiales de Marketing',
      description: 'Acceso a banners, textos y otros materiales promocionales para maximizar sus conversiones.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    },
    {
      title: 'Sin Límite de Referidos',
      description: 'Recomiende a tantos clientes como desee y gane comisiones por cada uno que se convierta en cliente.',
      icon: (
        <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white pt-16 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Programa de Afiliados
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Gane comisiones recomendando nuestros servicios legales de alta calidad a sus amigos, familia y seguidores.
            </p>
            {!isAffiliate && (
              <Link
                to={isAuthenticated ? "#join-form" : "/login?redirect=/afiliados"}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-800 bg-white hover:bg-primary-50 transition"
              >
                {isAuthenticated ? 'Unirse ahora' : 'Iniciar sesión para unirse'}
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        {/* Panel de afiliado o formulario para unirse */}
        {loading ? (
          <div className="flex justify-center py-12">
            <svg className="animate-spin h-10 w-10 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : isAffiliate ? (
          // Panel de control del afiliado
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Su Panel de Afiliado</h2>
            
            <div className="mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-lg p-4 md:p-6">
                <div>
                  <p className="text-gray-600 mb-2">Su enlace de referido:</p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      readOnly
                      value={generateReferralLink(affiliateData.referralCode)}
                      className="py-2 px-3 border border-gray-300 rounded-l-md bg-white text-sm focus:outline-none"
                      style={{ width: '280px' }}
                    />
                    <button
                      onClick={copyReferralLink}
                      className="py-2 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-r-md text-sm focus:outline-none"
                    >
                      Copiar
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <div className="flex items-center">
                    <p className="text-gray-600 mr-2">Código de referido:</p>
                    <span className="bg-primary-100 text-primary-800 py-1 px-3 rounded-md font-medium">
                      {affiliateData.referralCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-md">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Ganancias Totales</h3>
                    <p className="text-2xl font-bold text-green-600">${affiliateData.earnings.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-md">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Pago Pendiente</h3>
                    <p className="text-2xl font-bold text-blue-600">${affiliateData.pendingPayment.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-md">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Referidos</h3>
                    <p className="text-2xl font-bold text-purple-600">{affiliateData.referrals}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-md">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Conversiones</h3>
                    <p className="text-2xl font-bold text-yellow-600">{affiliateData.conversions}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Pago</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-1">Porcentaje de comisión:</p>
                  <p className="text-lg font-semibold">{affiliateData.commission}%</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Próximo pago estimado:</p>
                  <p className="text-lg font-semibold">{new Date(affiliateData.nextPaymentDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                to="/dashboard/afiliados"
                className="inline-flex items-center text-primary-600 hover:text-primary-800"
              >
                <span>Ver estadísticas detalladas</span>
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          // Formulario para unirse al programa
          <div id="join-form" className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Unirse al Programa de Afiliados</h2>
            
            {showSuccessMessage ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Solicitud enviada con éxito</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Su solicitud para unirse al programa de afiliados ha sido enviada. Estamos procesando sus datos...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              isAuthenticated ? (
                <form onSubmit={handleJoinAffiliate} className="space-y-6">
                  <div>
                    <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">Código de referido deseado (opcional)</label>
                    <div className="mt-1">
                      <input
                        id="referralCode"
                        name="referralCode"
                        type="text"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="Ejemplo: SUALIAS"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Si se deja en blanco, se generará automáticamente. Debe tener entre 4-10 caracteres (letras y números).
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="terms" className="text-sm text-gray-700">
                          Acepto los <Link to="/legal/terminos" className="text-primary-600 hover:underline">términos y condiciones</Link> y la <Link to="/legal/privacidad" className="text-primary-600 hover:underline">política de privacidad</Link> del programa de afiliados.
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Unirse al Programa de Afiliados
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Debe iniciar sesión para unirse al programa de afiliados.
                  </p>
                  <Link
                    to="/login?redirect=/afiliados"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Iniciar sesión
                  </Link>
                </div>
              )
            )}
          </div>
        )}
        
        {/* Beneficios del programa */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Beneficios del Programa
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Preguntas frecuentes */}
        <div className="py-12 border-t border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Preguntas Frecuentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Quién puede unirse al programa?</h3>
              <p className="text-gray-600">
                Cualquier persona mayor de 18 años puede unirse. Es especialmente adecuado para profesionales del derecho, estudiantes, influencers legales y creadores de contenido.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Cómo se realizan los pagos?</h3>
              <p className="text-gray-600">
                Los pagos se realizan mensualmente mediante transferencia bancaria o PayPal, siempre que su saldo acumulado sea superior a $50.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Cómo funciona el seguimiento de referidos?</h3>
              <p className="text-gray-600">
                Utilizamos cookies con una duración de 30 días para rastrear las visitas desde su enlace. Cualquier compra realizada en ese período será atribuida a su cuenta.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Se requiere exclusividad?</h3>
              <p className="text-gray-600">
                No, puede promocionar otros servicios legales. Sin embargo, valoramos su compromiso y ofrecemos bonificaciones especiales para afiliados exclusivos.
              </p>
            </div>
          </div>
        </div>
        
        {/* Llamada a la acción final */}
        {!isAffiliate && !loading && (
          <div className="py-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              ¿Listo para empezar a ganar?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Únase hoy mismo a nuestro programa de afiliados y comience a generar ingresos recomendando nuestros servicios legales de calidad.
            </p>
            <Link
              to={isAuthenticated ? "#join-form" : "/login?redirect=/afiliados"}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isAuthenticated ? 'Unirse ahora' : 'Iniciar sesión para unirse'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Afiliados;
