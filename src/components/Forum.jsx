import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { forumService } from '../utils/supabase';
import auth from '../utils/auth';

export default function Forum() {
  const navigate = useNavigate();
  const { id: topicId } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    'Todos', 'Derecho Penal', 'Derecho Civil', 'Tránsito', 'Derecho Laboral', 
    'Derecho Familiar', 'Derecho Mercantil', 'Consultas Generales', 'Casos Exclusivos'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [newTopicForm, setNewTopicForm] = useState({
    title: '',
    category: 'Consultas Generales',
    message: ''
  });
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const formRef = useRef(null);
  
  // Consultas exclusivas para abogados premium
  const [exclusiveTopics, setExclusiveTopics] = useState([]);
  const [showExclusiveContent, setShowExclusiveContent] = useState(false);
  const [userHasExclusiveAccess, setUserHasExclusiveAccess] = useState(false);
  const [exclusiveBenefits] = useState([
    'Acceso a opiniones jurídicas de alto nivel',
    'Casos de estudio exclusivos con análisis detallado',
    'Respuestas prioritarias de abogados expertos',
    'Acceso a jurisprudencia reciente y relevante',
    'Documentos modelo profesionales',
  ]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Cargar temas desde Supabase
        const fetchedTopics = await forumService.getTopics(
          selectedCategory !== 'Todos' ? selectedCategory : null
        );
        
        if (fetchedTopics && fetchedTopics.length > 0) {
          // Mapear temas para tener un formato consistente
          const formattedTopics = fetchedTopics.map(topic => ({
            id: topic.id,
            title: topic.title,
            author: topic.profiles?.name || 'Usuario Anónimo',
            authorAvatar: topic.profiles?.avatar_url,
            date: topic.created_at,
            replies: topic.reply_count || 0,
            views: topic.views || 0,
            category: topic.category,
            excerpt: topic.excerpt || topic.content?.substring(0, 150) + '...',
            content: topic.content,
            isHighlighted: topic.is_highlighted,
            isPremium: topic.is_premium
          }));
          
          setTopics(formattedTopics.filter(t => !t.isPremium));
          setExclusiveTopics(formattedTopics.filter(t => t.isPremium));
        } else {
          // En desarrollo o si no hay conexión, usar datos de ejemplo
          setTopics([
            {
              id: 1,
              title: 'Reforma al Código Penal: Implicaciones prácticas',
              author: 'Dr. Wilson Ipiales',
              date: '2023-12-15',
              replies: 24,
              views: 156,
              category: 'Derecho Penal',
              excerpt: 'Análisis de las recientes reformas al COIP y cómo afectan a los procesos penales en curso.',
              isHighlighted: true
            },
            {
              id: 2,
              title: 'Consulta sobre juicio de alimentos',
              author: 'María Sánchez',
              date: '2023-12-14',
              replies: 18,
              views: 89,
              category: 'Derecho Familiar',
              excerpt: 'Tengo dudas sobre el proceso de demanda de alimentos y los documentos necesarios.'
            },
            {
              id: 3,
              title: 'Procedimiento para impugnar multas de tránsito',
              author: 'Carlos Mendoza',
              date: '2023-12-12',
              replies: 32,
              views: 210,
              category: 'Tránsito',
              excerpt: 'Quisiera conocer el procedimiento correcto para impugnar una multa que considero injusta.'
            },
            {
              id: 4,
              title: 'Derechos laborales en caso de despido intempestivo',
              author: 'Laura Torres',
              date: '2023-12-10',
              replies: 45,
              views: 278,
              category: 'Derecho Laboral',
              excerpt: 'Me despidieron sin justificación después de 5 años de trabajo. ¿Qué derechos me amparan?'
            },
            {
              id: 5,
              title: 'Trámites para constitución de compañías',
              author: 'Roberto Paz',
              date: '2023-12-08',
              replies: 15,
              views: 124,
              category: 'Derecho Mercantil',
              excerpt: 'Información sobre los requisitos actualizados para constituir una compañía limitada.'
            }
          ]);
          
          // Temas exclusivos de ejemplo
          setExclusiveTopics([
            {
              id: 101,
              title: 'Análisis exclusivo: Casos controversiales de pensiones alimenticias',
              author: 'Dr. Wilson Ipiales',
              date: '2023-12-16',
              replies: 35,
              views: 189,
              category: 'Casos Exclusivos',
              excerpt: 'Análisis detallado de casos recientes sobre pensiones alimenticias y precedentes jurisprudenciales relevantes.',
              isPremium: true
            },
            {
              id: 102,
              title: 'Estrategias avanzadas para litigios de tránsito complejos',
              author: 'Dr. Wilson Ipiales',
              date: '2023-12-13',
              replies: 27,
              views: 165,
              category: 'Casos Exclusivos',
              excerpt: 'Metodologías efectivas para casos de tránsito donde existen lesiones graves y circunstancias agravantes.',
              isPremium: true
            }
          ]);
        }
      } catch (error) {
        console.error('Error al cargar temas:', error);
        setError('Error al cargar los temas del foro. Por favor, intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    const checkCurrentUser = async () => {
      try {
        const user = auth.getUser();
        if (user) {
          setCurrentUser(user);
          
          // Verificar si el usuario tiene acceso premium
          try {
            const hasPremium = await forumService.checkUserPremiumAccess(user.id);
            setUserHasExclusiveAccess(hasPremium);
          } catch (error) {
            console.error('Error al verificar acceso premium:', error);
            setUserHasExclusiveAccess(false);
          }
        } else {
          setCurrentUser(null);
          setUserHasExclusiveAccess(false);
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        setCurrentUser(null);
      }
    };
    
    // Si hay un ID de tema específico, cargarlo
    const loadSpecificTopic = async () => {
      if (topicId) {
        try {
          // Cargar detalles del tema
          const topic = await forumService.getTopic(topicId);
          setCurrentTopic(topic);
          
          // Cargar respuestas
          const topicReplies = await forumService.getReplies(topicId);
          setReplies(topicReplies);
          
          // Verificar acceso a contenido premium
          if (topic.is_premium && !userHasExclusiveAccess) {
            setError('Este contenido es exclusivo para usuarios premium.');
          }
        } catch (error) {
          console.error('Error al cargar tema específico:', error);
          setError('No se pudo cargar el tema solicitado.');
          navigate('/foro');
        }
      }
    };

    loadTopics();
    checkCurrentUser();
    if (topicId) {
      loadSpecificTopic();
    }
  }, [topicId, selectedCategory, navigate, userHasExclusiveAccess]);

  const filteredTopics = selectedCategory === 'Todos'
    ? topics
    : topics.filter(topic => topic.category === selectedCategory);

  const handleNewTopicSubmit = async (e) => {
    e.preventDefault();
    
    if (!newTopicForm.title || !newTopicForm.message) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }
    
    if (!currentUser) {
      setError('Debe iniciar sesión para crear un tema');
      navigate('/login', { state: { from: '/foro', message: 'Inicie sesión para participar en el foro' } });
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const topicData = {
        title: newTopicForm.title,
        category: newTopicForm.category,
        content: newTopicForm.message,
        excerpt: newTopicForm.message.substring(0, 150) + (newTopicForm.message.length > 150 ? '...' : ''),
        user_id: currentUser.id
      };
      
      // Crear tema en Supabase o usar simulación en desarrollo
      const result = await forumService.createTopic(topicData);
      
      if (result) {
        // Tema creado exitosamente
        const newTopic = {
          id: result.id || Date.now(),
          title: newTopicForm.title,
          author: currentUser.name,
          date: new Date().toISOString(),
          category: newTopicForm.category,
          excerpt: newTopicForm.message.substring(0, 150) + (newTopicForm.message.length > 150 ? '...' : ''),
          content: newTopicForm.message,
          replies: 0,
          views: 0
        };
        
        setTopics([newTopic, ...topics]);
        setNewTopicForm({
          title: '',
          category: 'Consultas Generales',
          message: ''
        });
        setShowNewTopicForm(false);
        setSuccess('Tema creado exitosamente');
        
        // Redireccionar al nuevo tema
        setTimeout(() => {
          navigate(`/foro/${newTopic.id}`);
        }, 1000);
      }
    } catch (error) {
      console.error('Error al crear tema:', error);
      setError('No se pudo crear el tema. Por favor, inténtelo nuevamente más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTopicForm({
      ...newTopicForm,
      [name]: value
    });
  };

  const handleTopicClick = (topicId) => {
    navigate(`/foro/${topicId}`);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    if (!replyText.trim()) {
      setError('Por favor ingrese un mensaje');
      return;
    }
    
    if (!currentUser) {
      setError('Debe iniciar sesión para responder');
      navigate('/login', { state: { from: `/foro/${topicId}`, message: 'Inicie sesión para responder' } });
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const replyData = {
        content: replyText,
        user_id: currentUser.id,
        topic_id: currentTopic.id
      };
      
      // Crear respuesta en Supabase
      const result = await forumService.addReply(currentTopic.id, replyData);
      
      if (result) {
        // Respuesta creada exitosamente
        const newReply = {
          id: result.id || Date.now(),
          content: replyText,
          author: currentUser.name,
          author_id: currentUser.id,
          created_at: new Date().toISOString()
        };
        
        setReplies([...replies, newReply]);
        setReplyText('');
        setSuccess('Respuesta publicada exitosamente');
      }
    } catch (error) {
      console.error('Error al publicar respuesta:', error);
      setError('No se pudo publicar la respuesta. Por favor, inténtelo nuevamente más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleToggleExclusiveContent = () => {
    if (!userHasExclusiveAccess) {
      setShowExclusiveContent(!showExclusiveContent);
    } else {
      // Si tiene acceso premium, mostrar directamente los temas exclusivos
      setShowExclusiveContent(true);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">Foro Legal</h1>
              <p className="text-secondary-600">
                Participe en nuestras discusiones sobre temas legales relevantes
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <button
                onClick={() => setShowNewTopicForm(!showNewTopicForm)}
                className="btn-primary"
              >
                {showNewTopicForm ? 'Cancelar' : 'Nuevo Tema'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {showNewTopicForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-4">Crear Nuevo Tema</h2>
              <form onSubmit={handleNewTopicSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-secondary-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTopicForm.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-1">
                    Categoría
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={newTopicForm.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.filter(cat => cat !== 'Todos').map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={newTopicForm.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? 'Publicando...' : 'Publicar Tema'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-center space-x-2">
            <span className="text-secondary-600 font-medium">Filtrar por:</span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-secondary-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-2 text-secondary-600">Cargando temas...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-secondary-200">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Tema
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Categoría
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Autor
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Respuestas
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Vistas
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-secondary-200">
                      {filteredTopics.map((topic) => (
                        <motion.tr 
                          key={topic.id}
                          whileHover={{ backgroundColor: '#f9fafb' }}
                          className="cursor-pointer"
                          onClick={() => handleTopicClick(topic.id)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-secondary-900">{topic.title}</span>
                              <span className="text-xs text-secondary-500 mt-1">{topic.excerpt}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                              {topic.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-secondary-500">
                            {topic.author}
                          </td>
                          <td className="px-6 py-4 text-sm text-secondary-500">
                            {topic.replies || 0}
                          </td>
                          <td className="px-6 py-4 text-sm text-secondary-500">
                            {topic.views || 0}
                          </td>
                          <td className="px-6 py-4 text-sm text-secondary-500">
                            {topic.date ? formatDistanceToNow(new Date(topic.date), {
                              addSuffix: true,
                              locale: es
                            }) : 'Desconocido'}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {!loading && filteredTopics.length === 0 && (
            <div className="text-center py-8 text-secondary-500">
              No hay temas en esta categoría. ¡Sé el primero en crear uno!
            </div>
          )}

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              ¿Necesita asesoría legal personalizada?
            </h3>
            <p className="text-lg text-secondary-600 mb-6">
              Nuestro equipo de abogados expertos está listo para ayudarle con su caso específico.
            </p>
            <a
              href="/contacto"
              className="btn-primary inline-block"
            >
              Solicitar Consulta
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}