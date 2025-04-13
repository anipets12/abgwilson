import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const blogPosts = [
    {
        id: 1,
        title: 'Guía Completa sobre Procesos Penales en Ecuador',
        excerpt: 'Aprenda todo sobre el proceso penal ecuatoriano, desde la denuncia hasta la sentencia.',
        category: 'Derecho Penal',
        date: '2023-12-10',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3',
        tags: ['Proceso Penal', 'Justicia', 'Ecuador', 'Derecho']
    },
    {
        id: 2,
        title: 'Derechos y Obligaciones en Accidentes de Tránsito',
        excerpt: 'Conozca sus derechos y responsabilidades en caso de accidentes de tránsito.',
        category: 'Tránsito',
        date: '2023-12-08',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3',
        tags: ['Tránsito', 'Accidentes', 'Derechos', 'Seguros']
    },
    {
        id: 3,
        title: 'Actualización: Nueva Ley de Empresas en Ecuador',
        excerpt: 'Análisis detallado de las últimas reformas a la ley de compañías.',
        category: 'Derecho Comercial',
        date: '2023-12-05',
        readTime: '10 min',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3',
        tags: ['Empresas', 'Reformas', 'Comercial', 'Negocios']
    }
];
export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const categories = ['Todos', 'Derecho Penal', 'Tránsito', 'Derecho Comercial', 'Civil'];
    const filteredPosts = selectedCategory === 'Todos'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);
    return (_jsx("div", { className: "py-12 bg-secondary-50", children: _jsxs("div", { className: "container-custom", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "section-title", children: "Blog Legal" }), _jsx("p", { className: "text-xl text-secondary-600", children: "Informaci\u00F3n actualizada y an\u00E1lisis experto sobre temas legales" })] }), _jsx("div", { className: "flex justify-center space-x-4 mb-8", children: categories.map(category => (_jsx(motion.button, { onClick: () => setSelectedCategory(category), className: `px-4 py-2 rounded-lg ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: category }, category))) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredPosts.map(post => (_jsxs(motion.article, { className: "card overflow-hidden", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [_jsx("img", { src: post.image, alt: post.title, className: "w-full h-48 object-cover mb-4 rounded-lg" }), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium text-primary-600", children: post.category }), _jsx("span", { className: "text-sm text-secondary-500", children: post.date })] }), _jsx("h3", { className: "text-xl font-bold text-secondary-900 mb-2", children: post.title }), _jsx("p", { className: "text-secondary-600 mb-4", children: post.excerpt }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex flex-wrap gap-2", children: post.tags.map(tag => (_jsx("span", { className: "text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded", children: tag }, tag))) }), _jsxs("span", { className: "text-sm text-secondary-500", children: [post.readTime, " lectura"] })] }), _jsx(Link, { to: `/noticias?id=${post.id}`, children: _jsx(motion.button, { className: "w-full btn-primary mt-4", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "Leer m\u00E1s" }) })] })] }, post.id))) })] }) }));
}
