import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaMoneyBillWave, FaChartLine, FaLink, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import auth from '../../utils/auth';

const AfiliadosPage = () => {
  const [user, setUser] = useState(auth.getUser());
  const [referralCode, setReferralCode] = useState(user ? `REF-${user.id || '123'}` : 'REF-DEMO');
  const [earnings, setEarnings] = useState({
    total: 0,
    pending: 0,
    available: 0,
    paid: 0,
    referrals: []
  });

  // Simular carga de datos de afiliados para demostración
  const [isLoading, setIsLoading] = useState(true);
  
  React.useEffect(() => {
    // Simulación de carga de datos de afiliados
    const timer = setTimeout(() => {
      if (user) {
        setEarnings({
          total: 450.75,
          pending: 150.25,
          available: 300.50,
          paid: 0,
          referrals: [
            { id: 1, name: 'Juan Pérez', date: '2023-12-10', status: 'active', earnings: 150.25 },
            { id: 2, name: 'María López', date: '2023-12-15', status: 'active', earnings: 300.50 },
            { id: 3, name: 'Carlos Ruiz', date: '2023-12-20', status: 'pending', earnings: 0 }
          ]
        });
      }
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [user]);

  // Función para copiar el enlace de referido
  const copyReferralLink = () => {
    const link = `https://abogadowilson.com/registro?ref=${referralCode}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Enlace copiado al portapapeles');
      })
      .catch(err => {
        console.error('Error al copiar enlace: ', err);
      });
  };

  // Beneficios del programa
  const benefits = [
    {
      icon: <FaMoneyBillWave className="text-4xl text-primary-600 mb-4" />,
      title: "Comisiones Generosas",
      description: "Gane hasta un 20% de comisión por cada cliente que se registre y contrate servicios a través de su enlace de referido."
    },
    {
      icon: <FaUsers className="text-4xl text-primary-600 mb-4" />,
      title: "Sin Límites de Referidos",
      description: "Invite a tantas personas como desee. No hay límite en la cantidad de referidos ni en las comisiones que puede ganar."
    },
    {
      icon: <FaChartLine className="text-4xl text-primary-600 mb-4" />,
      title: "Panel de Control Detallado",
      description: "Acceda a estadísticas en tiempo real sobre sus referidos, comisiones generadas y pagos realizados."
    },
    {
      icon: <FaUserPlus className="text-4xl text-primary-600 mb-4" />,
      title: "Bonos por Volumen",
      description: "Reciba bonificaciones adicionales al alcanzar determinados niveles de referidos activos o volumen de ventas."
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {!user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-secondary-900 mb-6">Programa de Afiliados</h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              Únase a nuestro programa de afiliados y gane comisiones por cada cliente que nos refiera. 
              Ofrecemos excelentes tasas de comisión y pagos puntuales.
            </p>
            
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">¿Cómo funciona?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-secondary-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-lg text-secondary-700 mb-6">
                  Regístrese hoy mismo para comenzar a ganar comisiones. 
                  Solo toma unos minutos empezar a generar ingresos pasivos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/registro?afiliado=true"
                    className="px-8 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors duration-300"
                  >
                    Registrarse como Afiliado
                  </Link>
                  <Link 
                    to="/login"
                    className="px-8 py-3 bg-white text-primary-700 border border-primary-600 font-bold rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Preguntas Frecuentes</h2>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <h3 className="text-xl font-bold mb-2">¿Cómo recibo mis comisiones?</h3>
                  <p className="text-secondary-700">
                    Las comisiones se acumulan en su cuenta de afiliado y puede solicitarlas una vez alcance el mínimo de $50. 
                    Ofrecemos pagos vía transferencia bancaria, PayPal o depósito a cuenta nacional.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <h3 className="text-xl font-bold mb-2">¿Cuáles son los porcentajes de comisión?</h3>
                  <p className="text-secondary-700">
                    Ofrecemos un 15% de comisión en todos los servicios legales y un 20% en la compra de eBooks y recursos digitales. 
                    Las suscripciones generan comisiones recurrentes durante 6 meses.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-2">¿Hay algún costo para unirse al programa?</h3>
                  <p className="text-secondary-700">
                    No, unirse a nuestro programa de afiliados es completamente gratuito. 
                    No exigimos compras previas ni inversiones para participar.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-start flex-wrap mb-10">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900 mb-2">Panel de Afiliado</h1>
                <p className="text-secondary-600">
                  Bienvenido a su panel de afiliado, {user.name}. Aquí puede gestionar sus referencias y comisiones.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button 
                  onClick={copyReferralLink}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-300"
                >
                  <FaLink className="mr-2" />
                  Copiar Enlace de Referido
                </button>
                <div className="text-xs text-secondary-500 mt-1 text-center">
                  Su código: {referralCode}
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
              </div>
            ) : (
              <>
                {/* Dashboard de ganancias */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-secondary-500 font-medium mb-2">Ganancias Totales</h3>
                    <p className="text-3xl font-bold text-secondary-900">${earnings.total.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-secondary-500 font-medium mb-2">Pendiente</h3>
                    <p className="text-3xl font-bold text-secondary-900">${earnings.pending.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-secondary-500 font-medium mb-2">Disponible</h3>
                    <p className="text-3xl font-bold text-primary-700">${earnings.available.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-secondary-500 font-medium mb-2">Pagado</h3>
                    <p className="text-3xl font-bold text-green-600">${earnings.paid.toFixed(2)}</p>
                  </div>
                </div>
                
                {/* Tabla de referidos */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-secondary-900">Sus Referidos</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ganancias
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {earnings.referrals.map((referral) => (
                          <tr key={referral.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{referral.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{referral.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                referral.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {referral.status === 'active' ? 'Activo' : 'Pendiente'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${referral.earnings.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Acciones */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  {earnings.available > 0 && (
                    <button className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-300">
                      Solicitar Pago (${earnings.available.toFixed(2)})
                    </button>
                  )}
                  <Link 
                    to="/materiales-promocionales"
                    className="px-6 py-3 bg-white border border-primary-600 text-primary-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300 text-center"
                  >
                    Materiales Promocionales
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AfiliadosPage;
