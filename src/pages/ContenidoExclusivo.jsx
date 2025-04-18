import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { exclusiveContentService } from '../utils/supabase';
import auth from '../utils/auth';

const ContenidoExclusivo = () => {
  const [loading, setLoading] = useState(true);
  const [contenido, setContenido] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  
  const categorias = [
    'Todos', 
    'Derecho Penal', 
    'Derecho Civil', 
    'Derecho Familiar',
    'Derecho Mercantil',
    'Derecho Administrativo',
    'Derecho de Tránsito'
  ];
  
  // Contenido de ejemplo para desarrollo
  const contenidoEjemplo = [
    {
      id: 1,
      titulo: 'Estrategias Avanzadas en Litigios Civiles',
      categoria: 'Derecho Civil',
      tipo: 'webinar',
      descripcion: 'Técnicas avanzadas de argumentación jurídica y presentación de pruebas en juicios civiles complejos. Incluye análisis de casos recientes.',
      fecha: '2023-12-10',
      autor: 'Dr. Wilson Ipiales',
      duracion: '90 minutos',
      imagenUrl: '/images/exclusivo/webinar-civil.jpg'
    },
    {
      id: 2,
      titulo: 'Guía Completa de Divorcio Contencioso',
      categoria: 'Derecho Familiar',
      tipo: 'ebook',
      descripcion: 'Manual detallado con todas las etapas procesales, jurisprudencia relevante y estrategias para casos complejos de divorcios contenciosos.',
      fecha: '2023-11-15',
      autor: 'Dr. Wilson Ipiales',
      paginas: 145,
      imagenUrl: '/images/exclusivo/ebook-divorcio.jpg'
    },
    {
      id: 3,
      titulo: 'Plantillas Premium para Contratos Mercantiles',
      categoria: 'Derecho Mercantil',
      tipo: 'plantillas',
      descripcion: 'Colección de 15 modelos profesionales de contratos mercantiles adaptados a la legislación ecuatoriana, con cláusulas optimizadas y notas explicativas.',
      fecha: '2023-12-01',
      actualizacion: '2023-12-01',
      items: 15,
      imagenUrl: '/images/exclusivo/plantillas-mercantil.jpg'
    },
    {
      id: 4,
      titulo: 'Análisis de Jurisprudencia en Casos de Tránsito con Agravantes',
      categoria: 'Derecho de Tránsito',
      tipo: 'analisis',
      descripcion: 'Estudio exhaustivo de las últimas sentencias relevantes en materia de accidentes de tránsito con circunstancias agravantes y estrategias de defensa.',
      fecha: '2023-11-28',
      autor: 'Dr. Wilson Ipiales',
      casos: 12,
      imagenUrl: '/images/exclusivo/analisis-transito.jpg'
    },
    {
      id: 5,
      titulo: 'Taller práctico: Recurso de Casación en materia penal',
      categoria: 'Derecho Penal',
      tipo: 'taller',
      descripcion: 'Metodología práctica para la elaboración efectiva de recursos de casación en materia penal, con ejemplos reales y análisis de requisitos formales y sustanciales.',
      fecha: '2023-11-05',
      autor: 'Dr. Wilson Ipiales',
      duracion: '120 minutos',
      imagenUrl: '/images/exclusivo/taller-casacion.jpg'
    },
    {
      id: 6,
      titulo: 'Guía de procedimientos administrativos ante entidades públicas',
      categoria: 'Derecho Administrativo',
      tipo: 'guia',
      descripcion: 'Manual detallado de todos los procedimientos administrativos relevantes ante las principales entidades públicas del Ecuador, con formularios y modelos de escritos.',
      fecha: '2023-10-22',
      autor: 'Dr. Wilson Ipiales',
      paginas: 210,
      imagenUrl: '/images/exclusivo/guia-administrativa.jpg'
    },
  ];

  useEffect(() => {
    const cargarContenido = async () => {
      try {
        setLoading(true);
        
        // Intentar cargar desde Supabase
        let data = [];
        try {
          data = await exclusiveContentService.getExclusiveDocuments(
            categoriaActiva !== 'Todos' ? categoriaActiva : null
          );
        } catch (error) {
          console.error('Error al cargar contenido exclusivo:', error);
          // Si falla, usar datos de ejemplo
          data = [];
        }
        
        // Si no hay datos de la API, usar el contenido de ejemplo
        if (!data || data.length === 0) {
          if (categoriaActiva === 'Todos') {
            setContenido(contenidoEjemplo);
          } else {
            setContenido(
              contenidoEjemplo.filter(item => item.categoria === categoriaActiva)
            );
          }
        } else {
          setContenido(data);
        }
        
        // Obtener información del usuario
        const user = auth.getUser();
        setUsuario(user);
        
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    cargarContenido();
  }, [categoriaActiva]);

  const renderContenidoCard = (item) => {
    return (
      <motion.div 
        key={item.id}
        className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-transform"
        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-48 overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs uppercase font-bold py-1 px-3 rounded-bl-lg">
            {item.tipo}
          </div>
          {item.imagenUrl ? (
            <img 
              src={item.imagenUrl}
              alt={item.titulo}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white">
              <span className="text-2xl font-bold">{item.tipo.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <span className="px-2 py-1 bg-secondary-100 text-secondary-800 text-xs rounded-full">
                {item.categoria}
              </span>
              <span className="text-xs text-secondary-500">
                {new Date(item.fecha).toLocaleDateString('es-ES')}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-secondary-900 mb-2">
              {item.titulo}
            </h3>
            
            <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
              {item.descripcion}
            </p>
            
            <div className="text-xs text-secondary-500 mb-4">
              {item.autor && <p>Por: {item.autor}</p>}
              {item.duracion && <p>Duración: {item.duracion}</p>}
              {item.paginas && <p>Páginas: {item.paginas}</p>}
              {item.items && <p>Documentos: {item.items}</p>}
              {item.casos && <p>Casos analizados: {item.casos}</p>}
            </div>
          </div>
          
          <motion.a
            href={`/exclusivo/${item.id}`}
            className="w-full py-2 flex justify-center items-center text-white font-medium bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {
              item.tipo === 'webinar' ? 'Ver webinar' :
              item.tipo === 'ebook' ? 'Descargar ebook' :
              item.tipo === 'plantillas' ? 'Explorar plantillas' :
              item.tipo === 'analisis' ? 'Leer análisis' :
              item.tipo === 'taller' ? 'Acceder al taller' :
              'Ver detalle'
            }
          </motion.a>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-primary-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contenido Exclusivo Premium
          </motion.h1>
          <motion.p 
            className="text-xl text-secondary-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Acceda a recursos jurídicos de alto nivel elaborados por expertos con experiencia en litigación y asesoría legal.
          </motion.p>
        </div>
        
        {/* Bienvenida personalizada */}
        {usuario && (
          <motion.div 
            className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 mb-10 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">¡Bienvenido, {usuario.name || 'estimado cliente'}!</h2>
                <p>Gracias por ser parte de nuestra comunidad premium. Aquí encontrará todo el contenido exclusivo diseñado específicamente para profesionales y clientes exigentes.</p>
              </div>
              <motion.div 
                className="mt-4 md:mt-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/recursos-legales" 
                  className="inline-block px-6 py-3 bg-white text-primary-700 font-bold rounded-lg shadow-md"
                >
                  Ver recursos legales
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Filtro de categorías */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categorias.map(categoria => (
              <motion.button
                key={categoria}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoriaActiva === categoria 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-secondary-700 hover:bg-secondary-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategoriaActiva(categoria)}
              >
                {categoria}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Contenido exclusivo */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : contenido.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contenido.map(renderContenidoCard)}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-secondary-600 mb-4">
              No se encontraron resultados para esta categoría
            </h3>
            <p className="text-secondary-500">
              Intente con otra categoría o vuelva más tarde. Actualizamos nuestro contenido regularmente.
            </p>
          </div>
        )}
        
        {/* Recordatorio de beneficios */}
        <motion.div 
          className="mt-16 bg-white rounded-xl shadow-md p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            Beneficios exclusivos para suscriptores premium
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Respuesta prioritaria</h3>
              <p className="text-secondary-600">Reciba respuesta a sus consultas en menos de 24 horas por parte de abogados expertos.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Documentos premium</h3>
              <p className="text-secondary-600">Acceda a plantillas y modelos profesionales redactados por abogados con amplia experiencia.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Webinars exclusivos</h3>
              <p className="text-secondary-600">Participe en sesiones formativas en vivo y acceda a grabaciones sobre temas legales avanzados.</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              to="/contacto" 
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              ¿Necesita ayuda con su suscripción premium? Contacte con nosotros
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContenidoExclusivo;
