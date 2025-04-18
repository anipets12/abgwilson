import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Página del blog de Abogado Wilson
 * Muestra artículos y recursos legales
 */
const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar artículos del blog (simulados para desarrollo)
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // Simulación de carga de artículos desde una API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos simulados de artículos
        const mockArticles = [
          {
            id: 1,
            title: 'Nuevas leyes de familia en Ecuador: Lo que debe saber',
            excerpt: 'Conozca las recientes actualizaciones legislativas que afectan a los procedimientos de divorcio, custodia y manutención infantil.',
            image: '/images/blog/derecho-familia.jpg',
            author: 'Wilson Alexander Ipiales',
            date: '2025-04-15',
            category: 'familiar',
            featured: true,
            slug: 'nuevas-leyes-familia-ecuador'
          },
          {
            id: 2,
            title: 'Protegiendo su negocio: Guía de propiedad intelectual',
            excerpt: 'Descubra cómo proteger sus marcas, patentes y derechos de autor para salvaguardar los activos más valiosos de su empresa.',
            image: '/images/blog/propiedad-intelectual.jpg',
            author: 'Wilson Alexander Ipiales',
            date: '2025-04-10',
            category: 'mercantil',
            featured: true,
            slug: 'guia-propiedad-intelectual'
          },
          {
            id: 3,
            title: 'Claves para redactar contratos seguros y efectivos',
            excerpt: 'Aprenda los elementos esenciales que debe incluir en sus contratos para evitar problemas legales futuros y proteger sus intereses.',
            image: '/images/blog/contratos.jpg',
            author: 'Wilson Alexander Ipiales',
            date: '2025-04-05',
            category: 'civil',
            featured: true,
            slug: 'redaccion-contratos-seguros'
          },
          {
            id: 4,
            title: 'Derechos laborales en Ecuador: Guía completa 2025',
            excerpt: 'Todo lo que necesita saber sobre sus derechos como trabajador según la legislación ecuatoriana vigente.',
            image: '/images/blog/derecho-laboral.jpg',
            author: 'Wilson Alexander Ipiales',
            date: '2025-03-28',
            category: 'laboral',
            featured: false,
            slug: 'derechos-laborales-ecuador-2025'
          },
          {
            id: 5,
            title: 'Procedimiento para reclamaciones por accidentes de tránsito',
            excerpt: 'Conozca los pasos a seguir y la documentación necesaria para presentar una reclamación después de un accidente de tránsito.',
            image: '/images/blog/accidente-transito.jpg',
            author: 'Wilson Alexander Ipiales',
            date: '2025-03-20',
            category: 'transito',
            featured: false,
            slug: 'reclamaciones-accidentes-transito'
          },
          {
            id: 6,
            title: 'Respuestas a preguntas frecuentes sobre herencias y sucesiones',
            excerpt: '¿Qué sucede con los bienes si no hay testamento? ¿Cómo se reparten las herencias? Respondemos las dudas más comunes.',
            image: '/images/blog/herencias.jpg',
            author: 'Wilson Alexander Ipiales',
            date: '2025-03-15',
            category: 'civil',
            featured: false,
            slug: 'faq-herencias-sucesiones'
          },
          {
            id: 7,
            title: 'Mediación como alternativa a procesos judiciales',
            excerpt: 'Ventajas de la mediación para resolver conflictos legales de manera más rápida, económica y menos adversarial.',
            image: '/images/blog/mediacion.jpg',
            author: 'Wilson Alexander Ipiales',
            date: '2025-03-10',
            category: 'civil',
            featured: false,
            slug: 'mediacion-alternativa-judicial'
          },
          {
            id: 8,
            title: 'Requisitos legales para constituir una empresa en Ecuador',
            excerpt: 'Guía paso a paso sobre los trámites, documentación y requerimientos legales para formar una empresa en Ecuador.',
            image: '/images/blog/constitucion-empresas.jpg',
            author: 'Wilson Alexander Ipiales',
            date: '2025-03-05',
            category: 'mercantil',
            featured: false,
            slug: 'requisitos-constituir-empresa'
          },
        ];
        
        setArticles(mockArticles);
        
        // Extraer categorías únicas de los artículos
        const uniqueCategories = [...new Set(mockArticles.map(article => article.category))];
        setCategories(uniqueCategories);
        
      } catch (error) {
        console.error('Error al cargar artículos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  // Filtrar artículos por categoría y término de búsqueda
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  // Capitalizar primera letra
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Blog Legal
            </h1>
            <p className="text-xl text-primary-100">
              Información y recursos legales actualizados para mantenerse informado
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Todos
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {capitalizeFirstLetter(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Artículos destacados */}
        {activeCategory === 'all' && searchTerm === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos Destacados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles
                .filter(article => article.featured)
                .slice(0, 3)
                .map((article) => (
                  <motion.div
                    key={article.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Link to={`/blog/${article.slug}`}>
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-100 rounded-full mb-2">
                        {capitalizeFirstLetter(article.category)}
                      </span>
                      <Link to={`/blog/${article.slug}`}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {formatDate(article.date)}
                        </span>
                        <Link
                          to={`/blog/${article.slug}`}
                          className="text-primary-600 hover:text-primary-800 font-medium"
                        >
                          Leer más →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Lista de artículos */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link to={`/blog/${article.slug}`}>
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-100 rounded-full mb-2">
                    {capitalizeFirstLetter(article.category)}
                  </span>
                  <Link to={`/blog/${article.slug}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {formatDate(article.date)}
                    </span>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="text-primary-600 hover:text-primary-800 font-medium"
                    >
                      Leer más →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron artículos</h3>
            <p className="text-gray-600">
              No hay artículos que coincidan con su búsqueda. Intente con otros términos o categorías.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Ver todos los artículos
            </button>
          </div>
        )}
      </div>

      {/* Llamado a la acción - Suscripción */}
      <div className="bg-primary-700 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Reciba actualizaciones legales en su correo
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Suscríbase a nuestro boletín para recibir información legal relevante y actualizada
            </p>
            
            <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
              <input
                type="email"
                placeholder="Su correo electrónico"
                className="px-4 py-3 w-full sm:w-64 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-6 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100">
                Suscribirse
              </button>
            </div>
            
            <p className="text-xs text-primary-200 mt-4">
              Respetamos su privacidad. Puede darse de baja en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
