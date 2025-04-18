import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

/**
 * Formulario para agregar comentarios
 * @param {Object} props - Propiedades del componente
 * @param {number} props.postId - ID del post al que se agrega el comentario
 */
const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('El comentario no puede estar vacío');
      return;
    }

    setLoading(true);

    try {
      // En una implementación real, aquí se enviaría el comentario a una API
      console.log('Enviando comentario:', { postId, content: comment });
      
      // Simular tiempo de respuesta
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Reiniciar formulario
      setComment('');
      toast.success('¡Comentario enviado exitosamente!');
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      toast.error('No se pudo enviar el comentario. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Tu comentario
        </label>
        <textarea
          id="comment"
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="Escribe tu comentario aquí..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            'Enviar comentario'
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
