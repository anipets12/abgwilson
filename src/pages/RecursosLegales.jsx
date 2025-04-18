import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { exclusiveContentService } from '../utils/supabase';
import auth from '../utils/auth';

const RecursosLegales = () => {
  const [loading, setLoading] = useState(true);
  const [recursos, setRecursos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [tipoActivo, setTipoActivo] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categorias = [
    'Todos', 
    'Derecho Civil', 
    'Derecho Penal', 
    'Derecho Familiar',
    'Derecho Mercantil',
    'Derecho Administrativo',
    'Derecho de Tránsito'
  ];
  
  const tipos = [
    'Todos',
    'Contratos',
    'Demandas',
    'Recursos',
    'Escritos',
    'Formularios',
    'Acuerdos'
  ];
  
  // Ejemplos de recursos legales premium para desarrollo
  const recursosEjemplo = [
    {
      id: 1,
      titulo: 'Contrato de Compraventa de Bienes Inmuebles con Cláusulas Especiales',
      categoria: 'Derecho Civil',
      tipo: 'Contratos',
      descripcion: 'Contrato profesional con cláusulas detalladas sobre garantías, condiciones suspensivas, resolución de conflictos y anexos. Incluye comentarios jurídicos.',
      fechaActualizacion: '2023-12-01',
      formato: 'DOCX/PDF',
      descargas: 78,
      calificacion: 4.8
    },
    {
      id: 2,
      titulo: 'Modelo de Demanda de Divorcio Contencioso por Causal de Abandono',
      categoria: 'Derecho Familiar',
      tipo: 'Demandas',
      descripcion: 'Demanda completa con fundamentos jurídicos, solicitud de medidas provisionales, pruebas sugeridas y estrategia procesal recomendada.',
      fechaActualizacion: '2023-11-15',
      formato: 'DOCX/PDF',
      descargas: 134,
      calificacion: 4.9
    },
    {
      id: 3,
      titulo: 'Recurso de Casación en Materia Penal por Errónea Interpretación de la Ley',
      categoria: 'Derecho Penal',
      tipo: 'Recursos',
      descripcion: 'Recurso estructurado según los requisitos de la Corte Nacional de Justicia, con análisis de jurisprudencia relevante y argumentación técnica avanzada.',
      fechaActualizacion: '2023-11-28',
      formato: 'DOCX/PDF',
      descargas: 92,
      calificacion: 4.7
    },
    {
      id: 4,
      titulo: 'Contrato de Constitución de Sociedad de Responsabilidad Limitada',
      categoria: 'Derecho Mercantil',
      tipo: 'Contratos',
      descripcion: 'Contrato completo con cláusulas sobre capital, administración, reparto de utilidades, resolución de conflictos y liquidación.',
      fechaActualizacion: '2023-10-30',
      formato: 'DOCX/PDF',
      descargas: 116,
      calificacion: 4.6
    },
    {
      id: 5,
      titulo: 'Escrito de Alegaciones Finales para Juicio de Tránsito',
      categoria: 'Derecho de Tránsito',
      tipo: 'Escritos',
      descripcion: 'Modelo profesional de conclusiones para juicios de tránsito con análisis de pruebas periciales y argumentación específica para accidentes complejos.',
      fechaActualizacion: '2023-11-10',
      formato: 'DOCX/PDF',
      descargas: 67,
      calificacion: 4.5
    },
    {
      id: 6,
      titulo: 'Formulario de Reclamo Administrativo ante Entidades Públicas',
      categoria: 'Derecho Administrativo',
      tipo: 'Formularios',
      descripcion: 'Formulario profesional con fundamentos jurídicos y estructura óptima para reclamaciones administrativas efectivas.',
      fechaActualizacion: '2023-10-25',
      formato: 'DOCX/PDF',
      descargas: 143,
      calificacion: 4.8
    },
    {
      id: 7,
      titulo: 'Contrato de Arrendamiento Comercial con Garantías Reforzadas',
      categoria: 'Derecho Civil',
      tipo: 'Contratos',
      descripcion: 'Contrato detallado con cláusulas especiales sobre garantías, subarrendamiento, obras y mejoras, y condiciones de resolución anticipada.',
      fechaActualizacion: '2023-09-28',
      formato: 'DOCX/PDF',
      descargas: 156,
      calificacion: 4.9
    },
    {
      id: 8,
      titulo: 'Acuerdo de Confidencialidad y No Competencia para Empleados',
      categoria: 'Derecho Mercantil',
      tipo: 'Acuerdos',
      descripcion: 'Acuerdo elaborado por especialistas en derecho laboral y mercantil, con cláusulas ejecutables según la legislación ecuatoriana vigente.',
      fechaActualizacion: '2023-10-05',
      formato: 'DOCX/PDF',
      descargas: 178,
      calificacion: 4.7
    },
    {
      id: 9,
      titulo: 'Demanda de Impugnación de Paternidad con Análisis ADN',
      categoria: 'Derecho Familiar',
      tipo: 'Demandas',
      descripcion: 'Modelo completo con fundamentación jurídica actualizada, solicitud de pruebas científicas y argumentación especializada.',
      fechaActualizacion: '2023-11-18',
      formato: 'DOCX/PDF',
      descargas: 89,
      calificacion: 4.8
    },
    {
      id: 10,
      titulo: 'Recurso de Apelación contra Sentencia Administrativa Sancionadora',
      categoria: 'Derecho Administrativo',
      tipo: 'Recursos',
      descripcion: 'Recurso detallado con análisis de proporcionalidad, debido proceso y argumentación específica para procedimientos administrativos sancionadores.',
      fechaActualizacion: '2023-11-22',
      formato: 'DOCX/PDF',
      descargas: 74,
      calificacion: 4.6
    },
  ];

  useEffect(() => {
    const cargarRecursos = async () => {
      try {
        setLoading(true);
        
        // Intentar cargar desde Supabase
        let data = [];
        try {
          // En una implementación real, aquí se conectaría con Supabase
          // data = await exclusiveContentService.getLegalResources(
          //   categoriaActiva !== 'Todos' ? categoriaActiva : null,
          //   tipoActivo !== 'Todos' ? tipoActivo : null
          // );
          
          // Para desarrollo, simulamos un retardo en la carga
          await new Promise(resolve => setTimeout(resolve, 800));
          data = [];
        } catch (error) {
          console.error('Error al cargar recursos legales:', error);
          data = [];
        }
        
        // Si no hay datos de la API, usar los recursos de ejemplo
        if (!data || data.length === 0) {
          let recursosFiltered = [...recursosEjemplo];
          
          // Filtrar por categoría
          if (categoriaActiva !== 'Todos') {
            recursosFiltered = recursosFiltered.filter(
              item => item.categoria === categoriaActiva
            );
          }
          
          // Filtrar por tipo
          if (tipoActivo !== 'Todos') {
            recursosFiltered = recursosFiltered.filter(
              item => item.tipo === tipoActivo
            );
          }
          
          // Filtrar por término de búsqueda
          if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            recursosFiltered = recursosFiltered.filter(
              item => 
                item.titulo.toLowerCase().includes(term) || 
                item.descripcion.toLowerCase().includes(term)
            );
          }
          
          setRecursos(recursosFiltered);
        } else {
          setRecursos(data);
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
    
    cargarRecursos();
  }, [categoriaActiva, tipoActivo, searchTerm]);

  const handleDownload = (id, titulo) => {
    // En una implementación real, aquí se registraría la descarga y se obtendría la URL del archivo
    alert(`El documento "${titulo}" comenzará a descargarse en breve.`);
  };

  const getStarRating = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2; // Redondear a 0.5 más cercano
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= roundedRating) {
            // Estrella completa
            return (
              <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else if (star - 0.5 === roundedRating) {
            // Media estrella
            return (
              <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <defs>
                  <linearGradient id={`half-star-${id}-${star}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#e5e7eb" />
                  </linearGradient>
                </defs>
                <path fill={`url(#half-star-${id}-${star})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else {
            // Estrella vacía
            return (
              <svg key={star} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          }
        })}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
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
            Recursos Legales Premium
          </motion.h1>
          <motion.p 
            className="text-xl text-secondary-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Acceda a nuestra biblioteca exclusiva de documentos legales profesionales redactados por abogados expertos.
          </motion.p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div className="col-span-1 md:col-span-3 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar recursos legales..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Filtro por categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                value={categoriaActiva}
                onChange={(e) => setCategoriaActiva(e.target.value)}
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Filtro por tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de documento</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                value={tipoActivo}
                onChange={(e) => setTipoActivo(e.target.value)}
              >
                {tipos.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            
            {/* Ordenar por */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                defaultValue="recientes"
              >
                <option value="recientes">Más recientes</option>
                <option value="populares">Más populares</option>
                <option value="valorados">Mejor valorados</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Lista de recursos */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : recursos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recursos.map((recurso) => (
              <motion.div 
                key={recurso.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                        {recurso.categoria}
                      </span>
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-800 text-xs rounded-full">
                        {recurso.tipo}
                      </span>
                    </div>
                    <span className="text-xs text-secondary-500">
                      Actualizado: {new Date(recurso.fechaActualizacion).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-secondary-900 mb-3">
                    {recurso.titulo}
                  </h3>
                  
                  <p className="text-secondary-600 text-sm mb-4">
                    {recurso.descripcion}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-secondary-500 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      <span>{recurso.descargas} descargas</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{recurso.formato}</span>
                    </div>
                    
                    {getStarRating(recurso.calificacion)}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <motion.button
                    className="w-full py-2 flex justify-center items-center space-x-2 text-white font-medium bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownload(recurso.id, recurso.titulo)}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Descargar documento</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <svg className="w-16 h-16 text-secondary-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-secondary-700 mb-2">
              No se encontraron recursos
            </h3>
            <p className="text-secondary-500 max-w-md mx-auto">
              No hay documentos que coincidan con los criterios de búsqueda. Intente con otros filtros o términos de búsqueda.
            </p>
          </div>
        )}
        
        {/* Solicitar documento personalizado */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl shadow-lg p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="md:flex items-center justify-between">
            <div className="md:max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">¿No encuentra el documento que necesita?</h2>
              <p className="mb-6">
                Como suscriptor premium, puede solicitar la elaboración de documentos personalizados para su caso específico. Nuestro equipo de abogados expertos redactará un documento que se adapte perfectamente a sus necesidades.
              </p>
            </div>
            
            <motion.a
              href="/contacto"
              className="inline-block px-6 py-3 bg-white text-primary-700 font-bold rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Solicitar documento personalizado
            </motion.a>
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
            Preguntas frecuentes sobre los recursos legales
          </h2>
          
          <div className="space-y-4">
            <motion.div 
              className="bg-white rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                ¿Puedo modificar los documentos descargados?
              </h3>
              <p className="text-secondary-600">
                Sí, todos los documentos se proporcionan en formato editable para que pueda adaptarlos a sus necesidades específicas. Recomendamos revisar cuidadosamente cualquier modificación para asegurar que sigue cumpliendo con los requisitos legales.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                ¿Con qué frecuencia se actualizan los documentos?
              </h3>
              <p className="text-secondary-600">
                Todos nuestros documentos se revisan y actualizan regularmente para reflejar los cambios en la legislación. La fecha de última actualización se muestra en cada recurso para que pueda verificar su vigencia.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                ¿Puedo solicitar asesoría sobre cómo utilizar un documento específico?
              </h3>
              <p className="text-secondary-600">
                Por supuesto, como suscriptor premium tiene acceso a consultas ilimitadas con nuestros abogados. Puede solicitar orientación sobre cualquier documento descargado y recibir asesoramiento personalizado.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursosLegales;
