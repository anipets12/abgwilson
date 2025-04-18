import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { dataService, authService } from '../services/apiService';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
export default function Forum() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([
        'Todos', 'Derecho Penal', 'Derecho Civil', 'Tránsito', 'Derecho Laboral',
        'Derecho Familiar', 'Derecho Mercantil', 'Consultas Generales'
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
    const [currentUser, setCurrentUser] = useState(null);
    // Cargar temas desde Supabase
    useEffect(() => {
        const loadTopics = async () => {
            try {
                setLoading(true);
                const { data, success } = await dataService.fetchData('topics');
                if (success && data) {
                    setTopics(data);
                }
                else {
                    // Si no hay datos en Supabase, usar datos de ejemplo
                    setTopics([
                        {
                            id: 1,
                            title: 'Reforma al Código Penal: Implicaciones prácticas',
                            author: 'Dr. Wilson Ipiales',
                            date: '2023-12-15',
                            replies: 24,
                            views: 156,
                            category: 'Derecho Penal',
                            excerpt: 'Análisis de las recientes reformas al COIP y cómo afectan a los procesos penales en curso.'
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
                }
            }
            catch (error) {
                console.error('Error al cargar temas:', error);
                setError('Error al cargar los temas del foro');
            }
            finally {
                setLoading(false);
            }
        };
        const checkCurrentUser = async () => {
            const { user } = await authService.getCurrentUser();
            setCurrentUser(user);
        };
        loadTopics();
        checkCurrentUser();
    }, []);
    const filteredTopics = selectedCategory === 'Todos'
        ? topics
        : topics.filter(topic => topic.category === selectedCategory);
    const handleNewTopicSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        if (!currentUser) {
            setError('Debe iniciar sesión para crear un tema');
            setIsSubmitting(false);
            return;
        }
        try {
            const newTopic = {
                title: newTopicForm.title,
                author: currentUser.user_metadata?.full_name || 'Usuario',
                author_id: currentUser.id,
                date: new Date().toISOString(),
                created_at: new Date().toISOString(),
                replies: 0,
                views: 0,
                category: newTopicForm.category,
                content: newTopicForm.message,
                excerpt: newTopicForm.message.substring(0, 150) + (newTopicForm.message.length > 150 ? '...' : '')
            };
            const { data, success } = await dataService.insertData('topics', newTopic);
            if (success && data) {
                setTopics([data[0], ...topics]);
                setNewTopicForm({
                    title: '',
                    category: 'Consultas Generales',
                    message: ''
                });
                setShowNewTopicForm(false);
            }
            else {
                throw new Error('Error al crear el tema');
            }
        }
        catch (error) {
            setError('Error al crear el tema. Por favor, inténtelo de nuevo.');
            console.error('Error:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTopicForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleTopicClick = (topicId) => {
        navigate(`/foro/tema/${topicId}`);
    };
    return (_jsx("div", { className: "py-12 bg-secondary-50", children: _jsxs("div", { className: "container-custom", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "section-title", children: "Foro Legal" }), _jsx("p", { className: "text-xl text-secondary-600", children: "Participe en discusiones sobre temas legales y obtenga respuestas de expertos" })] }), _jsxs("div", { className: "mb-8 flex flex-col md:flex-row md:items-center md:justify-between", children: [_jsx("div", { className: "flex flex-wrap gap-2 mb-4 md:mb-0", children: categories.map(category => (_jsx(motion.button, { onClick: () => setSelectedCategory(category), className: `px-3 py-1 rounded-lg text-sm ${selectedCategory === category ? 'bg-primary-600 text-white' : 'bg-white text-secondary-700 hover:bg-primary-50'}`, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: category }, category))) }), _jsx(motion.button, { onClick: () => setShowNewTopicForm(!showNewTopicForm), className: "btn-primary", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: showNewTopicForm ? 'Cancelar' : 'Nuevo Tema' })] }), showNewTopicForm && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mb-8", children: _jsxs("form", { onSubmit: handleNewTopicSubmit, className: "card space-y-4", children: [_jsx("h3", { className: "text-xl font-bold text-secondary-900 mb-4", children: "Crear Nuevo Tema" }), !currentUser && (_jsx("div", { className: "p-3 bg-yellow-50 text-yellow-700 rounded-lg mb-4", children: "Debe iniciar sesi\u00F3n para crear un nuevo tema." })), error && (_jsx("div", { className: "p-3 bg-red-50 text-red-700 rounded-lg", children: error })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-secondary-700 mb-1", children: "T\u00EDtulo" }), _jsx("input", { type: "text", name: "title", value: newTopicForm.title, onChange: handleInputChange, className: "input-field", disabled: !currentUser, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-secondary-700 mb-1", children: "Categor\u00EDa" }), _jsx("select", { name: "category", value: newTopicForm.category, onChange: handleInputChange, className: "input-field", disabled: !currentUser, required: true, children: categories.filter(cat => cat !== 'Todos').map(category => (_jsx("option", { value: category, children: category }, category))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-secondary-700 mb-1", children: "Mensaje" }), _jsx("textarea", { name: "message", value: newTopicForm.message, onChange: handleInputChange, rows: "5", className: "input-field", disabled: !currentUser, required: true })] }), _jsx("div", { className: "flex justify-end", children: _jsx(motion.button, { type: "submit", className: "btn-primary", disabled: isSubmitting || !currentUser, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: isSubmitting ? 'Enviando...' : 'Publicar Tema' }) })] }) })), loading ? (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-secondary-600", children: "Cargando temas..." }) })) : (_jsx("div", { className: "card overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-secondary-200", children: [_jsx("thead", { className: "bg-secondary-50", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider", children: "Tema" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider", children: "Categor\u00EDa" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider", children: "Autor" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider", children: "Respuestas" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider", children: "Vistas" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider", children: "Fecha" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-secondary-200", children: filteredTopics.map((topic) => (_jsxs(motion.tr, { whileHover: { backgroundColor: '#f9fafb' }, className: "cursor-pointer", onClick: () => handleTopicClick(topic.id), children: [_jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium text-secondary-900", children: topic.title }), _jsx("span", { className: "text-xs text-secondary-500 mt-1", children: topic.excerpt })] }) }), _jsx("td", { className: "px-6 py-4", children: _jsx("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800", children: topic.category }) }), _jsx("td", { className: "px-6 py-4 text-sm text-secondary-500", children: topic.author }), _jsx("td", { className: "px-6 py-4 text-sm text-secondary-500", children: topic.replies || 0 }), _jsx("td", { className: "px-6 py-4 text-sm text-secondary-500", children: topic.views || 0 }), _jsx("td", { className: "px-6 py-4 text-sm text-secondary-500", children: topic.date ? formatDistanceToNow(new Date(topic.date), {
                                                    addSuffix: true,
                                                    locale: es
                                                }) : 'Desconocido' })] }, topic.id))) })] }) }) })), !loading && filteredTopics.length === 0 && (_jsx("div", { className: "text-center py-8 text-secondary-500", children: "No hay temas en esta categor\u00EDa. \u00A1S\u00E9 el primero en crear uno!" })), _jsxs("div", { className: "mt-12 text-center", children: [_jsx("h3", { className: "text-2xl font-bold text-secondary-900 mb-4", children: "\u00BFNecesita asesor\u00EDa legal personalizada?" }), _jsx("p", { className: "text-lg text-secondary-600 mb-6", children: "Nuestro equipo de abogados expertos est\u00E1 listo para ayudarle con su caso espec\u00EDfico." }), _jsx("a", { href: "/contacto", className: "btn-primary inline-block", children: "Solicitar Consulta" })] })] }) }));
}
