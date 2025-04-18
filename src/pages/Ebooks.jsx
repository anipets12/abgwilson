import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import auth from '../utils/auth';

/**
 * Página de eBooks
 * Muestra catálogo de eBooks disponibles y permite filtrar por categoría y precio
 */
const Ebooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserPremium, setIsUserPremium] = useState(false);

  // Verificar si el usuario tiene suscripción premium
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const isAuthenticated = await auth.isAuthenticated();
        if (isAuthenticated) {
          const userData = auth.getUser();
          setIsUserPremium(userData?.subscription === 'premium');
        }
      } catch (error) {
        console.error('Error al verificar estado del usuario:', error);
      }
    };
    
    checkUserStatus();
  }, []);

  // Cargar catálogo de eBooks
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        setLoading(true);
        
        // En producción, aquí se cargarían los eBooks desde la API
        // Datos de muestra para desarrollo
        const mockEbooks = [
          {
            id: 1,
            title: 'Guía Completa de Derecho Civil',
            cover: '/images/ebooks/derecho-civil.jpg',
            description: 'Todo lo que necesitas saber sobre derecho civil en Ecuador, explicado de manera clara y accesible.',
            price: 19.99,
            category: 'civil',
            isPremium: false,
            pages: 245
          },
          {
            id: 2,
            title: 'Manual de Derecho Penal',
            cover: '/images/ebooks/derecho-penal.jpg',
            description: 'Un análisis exhaustivo del sistema penal ecuatoriano con casos prácticos y jurisprudencia reciente.',
            price: 24.99,
            category: 'penal',
            isPremium: false,
            pages: 320
          },
          {
            id: 3,
            title: 'Derecho Familiar: Guía Práctica',
            cover: '/images/ebooks/derecho-familiar.jpg',
            description: 'Todo sobre divorcios, custodia, pensiones alimenticias y otros aspectos del derecho familiar.',
            price: 15.99,
            category: 'familiar',
            isPremium: false,
            pages: 180
          },
          {
            id: 4,
            title: 'Estrategias de Defensa Legal Premium',
            cover: '/images/ebooks/estrategias-defensa.jpg',
            description: 'Técnicas avanzadas de defensa legal utilizadas por los abogados más exitosos del país.',
            price: 0,
            category: 'premium',
            isPremium: true,
            pages: 210
          },
          {
            id: 5,
            title: 'Derecho Corporativo para Emprendedores',
            cover: '/images/ebooks/derecho-corporativo.jpg',
            description: 'Guía esencial para proteger legalmente tu empresa desde su fundación hasta su crecimiento.',
            price: 29.99,
            category: 'mercantil',
            isPremium: false,
            pages: 275
          },
          {
            id: 6,
            title: 'Casos de Éxito: Análisis Jurídico',
            cover: '/images/ebooks/casos-exito.jpg',
            description: 'Colección exclusiva de casos resueltos con éxito y su análisis jurídico detallado.',
            price: 0,
            category: 'premium',
            isPremium: true,
            pages: 190
          }
        ];
        
        setEbooks(mockEbooks);
      } catch (error) {
        console.error('Error al cargar eBooks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEbooks();
  }, []);

  // Filtrar eBooks según criterios
  const filteredEbooks = ebooks.filter(ebook => {
    // Filtrar por categoría
    if (filter !== 'all' && ebook.category !== filter) {
      return false;
    }
    
    // Filtrar por búsqueda
    if (searchQuery && !ebook.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Mostrar eBooks premium solo si el usuario tiene suscripción
    if (ebook.isPremium && !isUserPremium) {
      return false;
    }
    
    return true;
  });

  // Manejar añadir al carrito
  const handleAddToCart = (ebook) => {
    try {
      // Obtener carrito actual
      const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Verificar si ya está en el carrito
      const isInCart = currentCart.some(item => item.id === ebook.id);
      
      if (!isInCart) {
        // Añadir al carrito
        const updatedCart = [
          ...currentCart,
          {
            id: ebook.id,
            name: ebook.title,
            price: ebook.price,
            image: ebook.cover,
            quantity: 1,
            type: 'ebook'
          }
        ];
        
        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
        // Mostrar notificación (en implementación real usar toast o similar)
        alert('eBook añadido al carrito');
      } else {
        alert('Este eBook ya está en tu carrito');
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
  };

  // Animación para las tarjetas de eBooks
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

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Biblioteca Legal
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Recursos exclusivos para ampliar su conocimiento legal
          </p>
        </div>
        
        {/* Barra de filtros */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md transition ${
                filter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button
              className={`px-4 py-2 rounded-md transition ${
                filter === 'civil' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setFilter('civil')}
            >
              Civil
            </button>
            <button
              className={`px-4 py-2 rounded-md transition ${
                filter === 'penal' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setFilter('penal')}
            >
              Penal
            </button>
            <button
              className={`px-4 py-2 rounded-md transition ${
                filter === 'familiar' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setFilter('familiar')}
            >
              Familiar
            </button>
            <button
              className={`px-4 py-2 rounded-md transition ${
                filter === 'premium' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setFilter('premium')}
            >
              Premium
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Buscar eBooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Mostrar mensaje si no hay resultados */}
        {filteredEbooks.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron eBooks que coincidan con los criterios de búsqueda.</p>
          </div>
        )}
        
        {/* Mostrar spinner durante la carga */}
        {loading ? (
          <div className="flex justify-center py-12">
            <svg className="animate-spin h-10 w-10 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEbooks.map((ebook) => (
              <motion.div
                key={ebook.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={ebook.cover || '/images/ebook-placeholder.jpg'}
                    alt={ebook.title}
                    className="w-full h-64 object-cover"
                  />
                  {ebook.isPremium && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                        Premium
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{ebook.title}</h3>
                  <p className="text-gray-600 mb-4">{ebook.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-sm text-gray-600">{ebook.pages} páginas</span>
                    </div>
                    
                    {ebook.isPremium ? (
                      <span className="text-green-600 font-semibold">Incluido en Premium</span>
                    ) : (
                      <span className="text-lg font-bold text-primary-600">${ebook.price.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {ebook.isPremium && !isUserPremium ? (
                    <Link
                      to="/suscripcion/premium"
                      className="block w-full text-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition"
                    >
                      Actualizar a Premium
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(ebook)}
                      className={`w-full px-4 py-2 font-medium rounded-md transition ${
                        ebook.isPremium
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-primary-600 hover:bg-primary-700 text-white'
                      }`}
                    >
                      {ebook.isPremium ? 'Descargar Ahora' : 'Añadir al Carrito'}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Banner de suscripción premium */}
        {!isUserPremium && (
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="md:flex-1">
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                  ¿Quiere acceso a todos nuestros eBooks?
                </h2>
                <p className="mt-3 text-lg text-primary-100">
                  Suscríbase a nuestro plan Premium y obtenga acceso ilimitado a nuestra biblioteca completa de recursos legales.
                </p>
              </div>
              <div className="mt-8 md:mt-0 md:ml-8 flex justify-center">
                <Link
                  to="/suscripcion/premium"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-800 bg-white hover:bg-primary-50 transition"
                >
                  Ver Plan Premium
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ebooks;
