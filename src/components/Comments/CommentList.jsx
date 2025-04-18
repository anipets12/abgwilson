import React, { useState, useEffect } from 'react';

/**
 * Lista de comentarios para un post específico
 * @param {Object} props - Propiedades del componente
 * @param {number} props.postId - ID del post del que se muestran los comentarios
 */
const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        
        // En una implementación real, aquí se obtendrían los comentarios de una API
        // Simulamos la carga de datos
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos simulados para demostración
        const mockComments = [
          {
            id: 1,
            postId,
            author: 'Ana María Rodríguez',
            content: 'Excelente artículo sobre derecho civil. Me ha ayudado mucho con mi caso.',
            date: '2025-04-15T14:22:00Z'
          },
          {
            id: 2,
            postId,
            author: 'Carlos Mendoza',
            content: 'Tengo una consulta relacionada. ¿Puedo agendar una cita para discutir este tema más a fondo?',
            date: '2025-04-16T09:15:00Z'
          },
          {
            id: 3,
            postId,
            author: 'Elena Suárez',
            content: 'Gracias por compartir información tan valiosa. Esta guía legal es muy clara.',
            date: '2025-04-17T16:40:00Z'
          }
        ];
        
        setComments(mockComments);
        setError(null);
      } catch (err) {
        console.error('Error al cargar comentarios:', err);
        setError('No se pudieron cargar los comentarios. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  // Formatear fecha en formato legible
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded"></div>
        <div className="flex items-center mt-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="ml-3">
            <div className="h-3 bg-gray-200 rounded w-48"></div>
            <div className="h-2 bg-gray-200 rounded w-20 mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-600">
        <p>No hay comentarios todavía. ¡Sé el primero en comentar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                {comment.author.charAt(0)}
              </div>
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                <p className="text-xs text-gray-500">{formatDate(comment.date)}</p>
              </div>
              <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
              <div className="mt-2 flex items-center space-x-4">
                <button className="text-xs text-gray-500 hover:text-gray-700">
                  Responder
                </button>
                <button className="text-xs text-gray-500 hover:text-gray-700">
                  Me gusta
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
