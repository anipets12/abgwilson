import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import auth from '../utils/auth';

/**
 * Página del foro legal
 * Permite a los usuarios discutir temas legales y recibir orientación
 */
const Forum = () => {
  const { id } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await auth.isAuthenticated();
      setIsAuthenticated(authenticated);
    };
    
    checkAuth();
  }, []);

  // Cargar datos del foro
  useEffect(() => {
    const fetchForumData = async () => {
      try {
        setLoading(true);
        
        // Simulación de carga de datos desde una API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Categorías del foro
        const mockCategories = [
          { id: 'civil', name: 'Derecho Civil' },
          { id: 'familiar', name: 'Derecho Familiar' },
          { id: 'mercantil', name: 'Derecho Mercantil' },
          { id: 'laboral', name: 'Derecho Laboral' },
          { id: 'penal', name: 'Derecho Penal' },
          { id: 'administrativo', name: 'Derecho Administrativo' },
        ];
        
        // Temas del foro
        const mockTopics = [
          {
            id: '1',
            title: 'Consulta sobre contrato de arrendamiento',
            author: 'María Gómez',
            authorId: 'user123',
            content: 'Tengo dudas sobre las cláusulas de un contrato de arrendamiento que firmé recientemente. ¿Es legal que el arrendador pueda aumentar el alquiler en cualquier momento?',
            date: '2025-04-15T10:30:00',
            category: 'civil',
            views: 124,
            replies: 5,
            solved: true
          },
          {
            id: '2',
            title: 'Dudas sobre proceso de divorcio',
            author: 'Carlos Ruiz',
            authorId: 'user456',
            content: 'Estoy considerando iniciar un proceso de divorcio. ¿Cuáles son los pasos y documentos necesarios para comenzar? ¿Es obligatorio contratar un abogado?',
            date: '2025-04-14T15:45:00',
            category: 'familiar',
            views: 256,
            replies: 8,
            solved: false
          },
          {
            id: '3',
            title: 'Problema con despido injustificado',
            author: 'Ana López',
            authorId: 'user789',
            content: 'Fui despedido sin causa justificada después de 3 años de trabajo. Mi empleador se niega a pagar indemnización. ¿Qué acciones legales puedo tomar?',
            date: '2025-04-12T09:15:00',
            category: 'laboral',
            views: 312,
            replies: 12,
            solved: true
          },
          {
            id: '4',
            title: 'Consulta sobre herencia sin testamento',
            author: 'Juan Torres',
            authorId: 'user101',
            content: 'Mi padre falleció sin dejar testamento. Somos tres hermanos y hay propiedades y cuentas bancarias. ¿Cómo se procede en estos casos? ¿Qué documentos necesitamos?',
            date: '2025-04-10T14:20:00',
            category: 'civil',
            views: 189,
            replies: 6,
            solved: false
          },
          {
            id: '5',
            title: 'Consulta sobre registro de marca comercial',
            author: 'Sofia Pérez',
            authorId: 'user202',
            content: 'Estoy iniciando un negocio y quiero registrar mi marca. ¿Cuál es el proceso y qué debo tener en cuenta para evitar problemas futuros?',
            date: '2025-04-08T11:05:00',
            category: 'mercantil',
            views: 147,
            replies: 4,
            solved: true
          },
          {
            id: '6',
            title: 'Denuncia por ruidos molestos',
            author: 'Roberto Sánchez',
            authorId: 'user303',
            content: 'Mis vecinos generan ruidos excesivos a toda hora, he intentado hablar con ellos sin éxito. ¿Cómo puedo proceder legalmente? ¿Qué pruebas necesito?',
            date: '2025-04-06T16:30:00',
            category: 'administrativo',
            views: 98,
            replies: 7,
            solved: false
          },
          {
            id: '7',
            title: 'Consulta sobre licencia de conducir suspendida',
            author: 'Miguel Castro',
            authorId: 'user404',
            content: 'Me suspendieron la licencia de conducir por acumulación de puntos. ¿Hay alguna forma de apelar o reducir el tiempo de suspensión?',
            date: '2025-04-04T13:45:00',
            category: 'administrativo',
            views: 87,
            replies: 3,
            solved: true
          }
        ];
        
        // Comentarios del foro (para un tema específico)
        const mockComments = [
          {
            id: 'c1',
            topicId: '1',
            author: 'Wilson Alexander Ipiales',
            authorId: 'admin-wilson',
            content: 'Según la Ley de Inquilinato de Ecuador, el arrendador no puede aumentar el valor del canon de arrendamiento durante la vigencia del contrato. Cualquier incremento debe estar estipulado previamente en el contrato y no puede ser arbitrario. Le recomendaría revisar cuidadosamente los términos del contrato que firmó.',
            date: '2025-04-15T11:30:00',
            isLawyer: true,
            verified: true
          },
          {
            id: 'c2',
            topicId: '1',
            author: 'José Martínez',
            authorId: 'user505',
            content: 'Pasé por una situación similar. Es importante verificar si el contrato establece alguna cláusula específica sobre ajustes del valor. Si no lo hace, el arrendador no puede modificar unilateralmente el canon durante la vigencia del contrato.',
            date: '2025-04-15T14:20:00',
            isLawyer: false,
            verified: false
          },
          {
            id: 'c3',
            topicId: '1',
            author: 'Laura Guzmán',
            authorId: 'user606',
            content: '¿El contrato que firmaste tiene un plazo establecido? Eso es muy importante para determinar si puede haber o no un aumento.',
            date: '2025-04-16T09:15:00',
            isLawyer: false,
            verified: false
          },
          {
            id: 'c4',
            topicId: '1',
            author: 'María Gómez',
            authorId: 'user123',
            content: 'Gracias por las respuestas. El contrato es por un año y no menciona nada sobre aumentos durante ese periodo. Voy a hablar con el arrendador con esta información.',
            date: '2025-04-16T10:45:00',
            isLawyer: false,
            verified: false
          },
          {
            id: 'c5',
            topicId: '1',
            author: 'Wilson Alexander Ipiales',
            authorId: 'admin-wilson',
            content: 'Efectivamente, si el contrato es por un año y no menciona ajustes o incrementos, el valor debe mantenerse durante toda la vigencia del contrato. Cualquier modificación requeriría un acuerdo entre ambas partes. Si necesita asistencia adicional, puede agendar una consulta más detallada a través de nuestra plataforma.',
            date: '2025-04-16T14:30:00',
            isLawyer: true,
            verified: true
          }
        ];
        
        setCategories(mockCategories);
        setTopics(mockTopics);
        
        // Si hay un ID de tema en la URL, mostrar ese tema
        if (id) {
          const topic = mockTopics.find(t => t.id === id);
          if (topic) {
            setSelectedTopic(topic);
            // Filtrar comentarios para el tema seleccionado
            setComments(mockComments.filter(c => c.topicId === id));
          }
        }
        
      } catch (error) {
        console.error('Error al cargar datos del foro:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchForumData();
  }, [id]);

  // Filtrar temas por categoría y término de búsqueda
  const filteredTopics = topics.filter(topic => {
    const matchesCategory = activeCategory === 'all' || topic.category === activeCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        topic.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
      // Hoy
      return `Hoy, ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      // Ayer
      return `Ayer, ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      // Esta semana
      return date.toLocaleDateString('es-ES', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    } else {
      // Más de una semana
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  // Manejar envío de nuevo comentario
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Debe iniciar sesión para comentar');
      return;
    }
    
    if (!newComment.trim()) {
      return;
    }
    
    // En una implementación real, esto sería una llamada a la API
    const newCommentObj = {
      id: `c${comments.length + 1}`,
      topicId: selectedTopic.id,
      author: auth.getUser()?.name || 'Usuario',
      authorId: auth.getUser()?.id || 'unknown',
      content: newComment,
      date: new Date().toISOString(),
      isLawyer: auth.getUser()?.isAdmin || false,
      verified: auth.getUser()?.isAdmin || false
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
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

  // Obtener nombre de categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Otro';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Foro Legal
            </h1>
            <p className="text-xl text-primary-100">
              Comparta sus dudas legales y reciba orientación de profesionales y la comunidad
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : selectedTopic ? (
          // Vista detallada de un tema
          <div>
            <div className="mb-6">
              <Link 
                to="/foro" 
                className="inline-flex items-center text-primary-600 hover:text-primary-800"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al foro
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedTopic.title}</h2>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-4">Por: {selectedTopic.author}</span>
                      <span className="mr-4">Categoría: {getCategoryName(selectedTopic.category)}</span>
                      <span>Publicado: {formatDate(selectedTopic.date)}</span>
                    </div>
                  </div>
                  {selectedTopic.solved && (
                    <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                      Resuelto
                    </span>
                  )}
                </div>
                
                <div className="prose max-w-none mt-6">
                  <p>{selectedTopic.content}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Respuestas ({comments.length})</h3>
              
              {comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div 
                      key={comment.id} 
                      className={`bg-white rounded-lg shadow-sm p-6 ${comment.isLawyer ? 'border-l-4 border-primary-500' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start">
                          <div className="mr-4">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${comment.isLawyer ? 'bg-primary-600' : 'bg-gray-500'}`}>
                              {comment.author.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-gray-900">{comment.author}</h4>
                              {comment.isLawyer && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                                  Abogado
                                </span>
                              )}
                              {comment.verified && (
                                <span className="ml-2 text-primary-600" title="Verificado">
                                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="prose prose-sm max-w-none mt-2">
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <p className="text-gray-600">No hay respuestas aún. Sea el primero en responder.</p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Responder</h3>
              
              {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit}>
                  <div className="mb-4">
                    <textarea
                      rows="4"
                      placeholder="Escriba su respuesta..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Publicar respuesta
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">Debe iniciar sesión para responder.</p>
                  <Link
                    to="/login?redirect=/foro"
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Iniciar sesión
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Lista de temas del foro
          <div>
            {/* Barra de búsqueda y filtros */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar temas..."
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
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón para nuevo tema */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Temas de discusión</h2>
              
              {isAuthenticated ? (
                <Link
                  to="/foro/nuevo"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Nuevo tema
                </Link>
              ) : (
                <Link
                  to="/login?redirect=/foro/nuevo"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Iniciar sesión para publicar
                </Link>
              )}
            </div>

            {/* Lista de temas */}
            {filteredTopics.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {filteredTopics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    variants={itemVariants}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
                  >
                    <Link to={`/foro/${topic.id}`} className="block p-6">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600">{topic.title}</h3>
                            {topic.solved && (
                              <span className="ml-2 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                Resuelto
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <span className="mr-4">Por: {topic.author}</span>
                            <span className="mr-4">Categoría: {getCategoryName(topic.category)}</span>
                            <span>{formatDate(topic.date)}</span>
                          </div>
                          
                          <p className="text-gray-600 mt-3 line-clamp-2">{topic.content}</p>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center ml-6 text-center">
                          <div className="text-2xl font-semibold text-gray-900">{topic.replies}</div>
                          <div className="text-sm text-gray-500">Respuestas</div>
                          <div className="mt-2 text-xs text-gray-400">{topic.views} visitas</div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron temas</h3>
                <p className="text-gray-600">
                  No hay temas que coincidan con su búsqueda. Intente con otros términos o categorías.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Ver todos los temas
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sección de información */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Normas del foro
            </h2>
            <div className="prose prose-lg mx-auto">
              <ul className="text-left text-gray-700">
                <li>Sea respetuoso con todos los participantes</li>
                <li>No comparta información personal sensible</li>
                <li>Recuerde que las respuestas son orientativas y no reemplazan el asesoramiento legal personalizado</li>
                <li>Mantenga las preguntas y respuestas relacionadas con temas legales</li>
                <li>Las respuestas verificadas con el ícono <span className="text-primary-600">✓</span> son proporcionadas por abogados certificados</li>
              </ul>
            </div>
            <div className="mt-8">
              <Link
                to="/legal/terminos"
                className="text-primary-600 hover:text-primary-800"
              >
                Ver términos y condiciones completos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
