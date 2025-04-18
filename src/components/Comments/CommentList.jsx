import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle, FaPaperclip, FaDownload } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userProfiles, setUserProfiles] = useState({});
    const { user } = useAuth();
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data, error: fetchError } = await supabase
                    .from('comments')
                    .select('*')
                    .eq('post_id', postId)
                    .order('created_at', { ascending: false });
                if (fetchError) {
                    throw fetchError;
                }
                // Obtener los IDs de usuarios únicos
                const userIds = [...new Set(data.map(comment => comment.user_id))];
                // Obtener los perfiles de los usuarios
                if (userIds.length > 0) {
                    const { data: profiles, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .in('id', userIds);
                    if (profileError) {
                        console.error('Error fetching profiles:', profileError);
                    }
                    else {
                        // Crear un objeto con los perfiles indexados por ID
                        const profileMap = {};
                        profiles.forEach(profile => {
                            profileMap[profile.id] = profile;
                        });
                        setUserProfiles(profileMap);
                    }
                }
                setComments(data);
            }
            catch (err) {
                setError(err.message);
                toast.error(`Error al cargar comentarios: ${err.message}`);
            }
            finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [postId]);
    const handleDeleteComment = async (commentId) => {
        if (!user) {
            toast.error('Debe iniciar sesión para eliminar un comentario');
            return;
        }
        try {
            const comment = comments.find(c => c.id === commentId);
            if (comment.user_id !== user.id) {
                toast.error('Solo puede eliminar sus propios comentarios');
                return;
            }
            const { error } = await supabase
                .from('comments')
                .delete()
                .eq('id', commentId);
            if (error)
                throw error;
            setComments(comments.filter(c => c.id !== commentId));
            toast.success('Comentario eliminado correctamente');
        }
        catch (err) {
            toast.error(`Error al eliminar comentario: ${err.message}`);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "bg-white p-6 rounded-lg shadow-md mb-6", children: _jsxs("div", { className: "flex justify-center items-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }), _jsx("span", { className: "ml-2", children: "Cargando comentarios..." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "bg-white p-6 rounded-lg shadow-md mb-6", children: _jsx("div", { className: "text-red-500 text-center py-4", children: error }) }));
    }
    return (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [_jsxs("h3", { className: "text-xl font-bold mb-4", children: ["Comentarios (", comments.length, ")"] }), comments.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-6", children: "No hay comentarios a\u00FAn. \u00A1S\u00E9 el primero en comentar!" })) : (_jsx("div", { className: "space-y-6", children: comments.map((comment) => {
                    const profile = userProfiles[comment.user_id] || {};
                    const userName = profile.full_name || 'Usuario Anónimo';
                    return (_jsx("div", { className: "border-b pb-4 last:border-b-0", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(FaUserCircle, { className: "w-10 h-10 text-gray-400" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-medium text-gray-900", children: userName }), _jsx("span", { className: "text-sm text-gray-500", children: new Date(comment.created_at).toLocaleDateString('es-ES', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }) })] }), _jsx("p", { className: "text-gray-700 mt-1", children: comment.content }), comment.attachments && comment.attachments.length > 0 && (_jsxs("div", { className: "mt-3", children: [_jsxs("p", { className: "text-sm text-gray-600 mb-1 flex items-center", children: [_jsx(FaPaperclip, { className: "mr-1" }), " Archivos adjuntos:"] }), _jsx("ul", { className: "space-y-1", children: comment.attachments.map((file, index) => (_jsxs("li", { className: "text-sm flex items-center", children: [_jsxs("a", { href: file.url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline flex items-center", children: [file.name, " ", _jsx(FaDownload, { className: "ml-1" })] }), _jsxs("span", { className: "text-gray-500 ml-2", children: ["(", (file.size / 1024).toFixed(1), " KB)"] })] }, index))) })] })), user && user.id === comment.user_id && (_jsx("button", { onClick: () => handleDeleteComment(comment.id), className: "text-sm text-red-600 hover:text-red-800 mt-2", children: "Eliminar" }))] })] }) }, comment.id));
                }) }))] }));
};
export default CommentList;
