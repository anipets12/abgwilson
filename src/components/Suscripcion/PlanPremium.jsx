import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';

const PlanPremium = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('mensual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const plans = {
    mensual: {
      price: 29.99,
      description: 'Facturación mensual',
      period: '/ mes',
      saveText: '',
    },
    trimestral: {
      price: 79.99,
      description: 'Facturación trimestral',
      period: '/ trimestre',
      saveText: 'Ahorra un 11%',
    },
    anual: {
      price: 299.99,
      description: 'Facturación anual',
      period: '/ año',
      saveText: 'Ahorra un 16%',
    },
  };

  const benefits = [
    'Acceso ilimitado a consultas con abogados especializados',
    'Respuestas prioritarias en menos de 24 horas',
    'Acceso a biblioteca exclusiva de modelos y plantillas de documentos legales',
    'Asistencia en la redacción de documentos personalizados',
    'Descuentos en servicios legales presenciales',
    'Notificaciones sobre cambios en la legislación relevante para tu caso',
    'Asesoramiento exclusivo sobre estrategias legales avanzadas',
    'Acceso a seminarios y webinars exclusivos',
    'Descarga de e-books especializados sin costo adicional',
    'Análisis de casos de jurisprudencia relevantes para tu situación',
  ];

  const exclusiveDocuments = [
    'Plantillas de contratos con cláusulas optimizadas por expertos',
    'Modelos de demandas con alta tasa de éxito',
    'Escritos de alegación profesionales para distintos procedimientos',
    'Documentos de negociación para acuerdos extrajudiciales',
    'Cartas formales para comunicaciones legales efectivas',
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = async () => {
    if (!auth.isAuthenticated()) {
      navigate('/login', { 
        state: { 
          from: '/suscripcion/premium', 
          message: 'Por favor inicie sesión para contratar el plan premium' 
        } 
      });
      return;
    }

    try {
      setLoading(true);
      setError('');

      // En una implementación real, aquí se conectaría con una pasarela de pagos
      // Para este ejemplo, simulamos un proceso de suscripción exitoso
      setTimeout(() => {
        setLoading(false);
        navigate('/suscripcion/exitosa', { 
          state: { 
            plan: selectedPlan, 
            price: plans[selectedPlan].price,
            benefits: benefits
          } 
        });
      }, 2000);

    } catch (error) {
      console.error("Error al procesar la suscripción:", error);
      setError('Error al procesar su suscripción. Por favor intente nuevamente.');
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="py-12 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-900 mb-4">
            Plan Premium Exclusivo Abogado Wilson
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Acceda a servicios jurídicos exclusivos y contenido premium para resolver sus casos con mayor eficacia y conocimiento especializado.
          </p>
        </div>

        {/* Selector de planes */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              {Object.keys(plans).map((plan) => (
                <motion.div
                  key={plan}
                  className={`relative px-6 py-4 rounded-lg cursor-pointer w-full sm:w-auto text-center ${
                    selectedPlan === plan ? 'bg-primary-100 border-2 border-primary-500' : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <h3 className="font-bold text-lg capitalize text-secondary-900">
                    Plan {plan}
                  </h3>
                  <div className="mt-2 flex items-baseline justify-center">
                    <span className="text-3xl font-extrabold text-primary-700">
                      ${plans[plan].price}
                    </span>
                    <span className="ml-1 text-sm text-secondary-500">
                      {plans[plan].period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-secondary-500">
                    {plans[plan].description}
                  </p>
                  {plans[plan].saveText && (
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-yellow-400 text-yellow-900 text-xs font-bold py-1 px-2 rounded-full">
                      {plans[plan].saveText}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.button
              className="w-full py-4 px-6 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                'Suscribirse ahora'
              )}
            </motion.button>

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Beneficios */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-8">
            Beneficios exclusivos del Plan Premium
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-primary-700 mb-4">Servicios exclusivos incluidos</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <svg className="flex-shrink-0 h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-secondary-600">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-primary-700 mb-4">Documentos y recursos exclusivos</h3>
              <ul className="space-y-3">
                {exclusiveDocuments.map((doc, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <svg className="flex-shrink-0 h-6 w-6 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="ml-3 text-secondary-600">{doc}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium">
                  <span className="font-bold">Contenido Exclusivo:</span> Además, recibirá actualizaciones mensuales con nuevo contenido exclusivo y análisis de jurisprudencia reciente.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonios */}
          <div className="bg-gradient-to-r from-secondary-800 to-primary-800 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Lo que dicen nuestros clientes premium</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white bg-opacity-10 p-6 rounded-lg"
                whileHover={{ scale: 1.03 }}
              >
                <p className="italic mb-4">"El acceso premium a los servicios de Abogado Wilson ha sido una inversión invaluable para mi empresa. El acceso a documentos legales exclusivos y la asesoría personalizada nos ha ahorrado tiempo y dinero en nuestras operaciones legales."</p>
                <p className="font-bold">— Carlos Mendoza, Empresario</p>
              </motion.div>
              
              <motion.div 
                className="bg-white bg-opacity-10 p-6 rounded-lg"
                whileHover={{ scale: 1.03 }}
              >
                <p className="italic mb-4">"Lo que más valoro es la rapidez en las respuestas y el nivel de detalle en los análisis legales. Los webinars exclusivos me han ayudado a entender mejor mis derechos y opciones legales. Totalmente recomendado."</p>
                <p className="font-bold">— María Torres, Profesional independiente</p>
              </motion.div>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-secondary-900 mb-8">
              Preguntas frecuentes
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-secondary-900">¿Puedo cancelar mi suscripción en cualquier momento?</h3>
                <p className="mt-2 text-secondary-600">Sí, puede cancelar su suscripción en cualquier momento sin penalización. Solo acceda a su perfil y seleccione "Gestionar suscripción".</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-secondary-900">¿Cuánto tiempo tardan en responder mis consultas?</h3>
                <p className="mt-2 text-secondary-600">Los suscriptores premium reciben respuestas prioritarias en un plazo máximo de 24 horas hábiles, aunque normalmente son respondidas en menos tiempo.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-secondary-900">¿Puedo acceder al contenido desde cualquier dispositivo?</h3>
                <p className="mt-2 text-secondary-600">Sí, nuestra plataforma es completamente responsiva y puede acceder a todo el contenido premium desde cualquier dispositivo con conexión a internet.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-secondary-900">¿Los documentos exclusivos son personalizables?</h3>
                <p className="mt-2 text-secondary-600">Todos los documentos y plantillas pueden ser descargados en formato editable para que pueda adaptarlos a sus necesidades específicas.</p>
              </div>
            </div>
          </div>
          
          {/* CTA final */}
          <div className="mt-16 text-center">
            <motion.button
              className="py-4 px-8 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-bold text-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubscribe}
            >
              Obtener acceso premium ahora
            </motion.button>
            <p className="mt-4 text-secondary-500">
              Sin compromisos a largo plazo. Cancele cuando quiera.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanPremium;
