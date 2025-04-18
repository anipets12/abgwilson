import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBook, FaDownload, FaShoppingCart, FaCheck, FaFilePdf } from 'react-icons/fa';
import { ebookService } from '../services/ebookService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
const ebooksData = [
    {
        id: 0,
        title: "Introducción al Derecho: Conceptos Básicos para Todos",
        description: "Guía gratuita que explica los fundamentos del derecho, sistema judicial y procesos legales básicos en Ecuador. ¡Perfecto para comenzar a entender el mundo legal!",
        price: 0,
        coverImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744",
        pages: 25,
        popular: true,
        category: "Básico",
        isFree: true,
        pdfUrl: "/ebooks/introduccion-al-derecho.pdf"
    },
    {
        id: 1,
        title: "Guía Completa de Derecho Civil para No Abogados",
        description: "Un compendio práctico sobre contratos, propiedades y derechos civiles explicado en lenguaje sencillo.",
        price: 19.99,
        coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
        pages: 120,
        popular: true,
        category: "Civil"
    },
    {
        id: 2,
        title: "Manual de Defensa en Casos Penales",
        description: "Estrategias y procedimientos para entender el proceso penal y conocer sus derechos durante una acusación.",
        price: 24.99,
        coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
        pages: 150,
        popular: false,
        category: "Penal"
    },
    {
        id: 3,
        title: "Derecho Comercial para Emprendedores",
        description: "Todo lo que necesita saber para proteger legalmente su negocio y evitar problemas jurídicos comunes.",
        price: 29.99,
        coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
        pages: 180,
        popular: true,
        category: "Comercial"
    },
    {
        id: 4,
        title: "Guía de Trámites de Tránsito",
        description: "Procedimientos, multas y recursos legales relacionados con infracciones y accidentes de tránsito.",
        price: 14.99,
        coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
        pages: 95,
        popular: false,
        category: "Tránsito"
    },
    {
        id: 5,
        title: "Procedimientos Aduaneros Simplificados",
        description: "Explicación detallada de los procesos de importación, exportación y resolución de controversias aduaneras.",
        price: 22.99,
        coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
        pages: 135,
        popular: false,
        category: "Aduanas"
    },
    {
        id: 6,
        title: "Divorcio en Ecuador: Guía Práctica",
        description: "Todo el proceso explicado paso a paso, incluyendo pensiones alimenticias, custodia y división de bienes.",
        price: 18.99,
        coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
        pages: 110,
        popular: true,
        category: "Civil"
    }
];
export default function Ebooks() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();
    const [downloading, setDownloading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [purchasedEbooks, setPurchasedEbooks] = useState([]);
    const categories = ['Todos', 'Civil', 'Penal', 'Comercial', 'Tránsito', 'Aduanas'];
    useEffect(() => {
        const loadPurchasedEbooks = async () => {
            if (user) {
                try {
                    const { data } = await supabase
                        .from('ebook_purchases')
                        .select('ebook_id')
                        .eq('user_id', user.id);
                    setPurchasedEbooks(data?.map(p => p.ebook_id) || []);
                }
                catch (error) {
                    console.error('Error loading purchases:', error);
                }
            }
            setIsLoading(false);
        };
        loadPurchasedEbooks();
    }, [user]);
    // Filtrar los e-books por categoría y término de búsqueda
    const filteredEbooks = ebooksData
        .filter(ebook => (selectedCategory === 'Todos' || ebook.category === selectedCategory))
        .filter(ebook => ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.description.toLowerCase().includes(searchTerm.toLowerCase()));
    // Agregar al carrito
    const addToCart = (ebook) => {
        if (!cartItems.some(item => item.id === ebook.id)) {
            setCartItems([...cartItems, ebook]);
        }
    };
    // Remover del carrito
    const removeFromCart = (ebookId) => {
        setCartItems(cartItems.filter(item => item.id !== ebookId));
    };
    // Calcular total del carrito
    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    const handleCheckout = async () => {
        if (!user) {
            toast.error('Por favor inicie sesión para continuar');
            navigate('/login', { state: { from: location } });
            return;
        }
        try {
            const { data: { sessionId }, error } = await supabase.functions.invoke('create-checkout-session', {
                body: { cartItems }
            });
            if (error)
                throw error;
            window.location.href = sessionId;
        }
        catch (error) {
            toast.error('Error al procesar el pago');
            console.error('Checkout error:', error);
        }
    };
    const handleDownload = async (ebook) => {
        try {
            setDownloading(true);
            if (!ebook.isFree && !user) {
                toast.error('Debe iniciar sesión para descargar este ebook');
                navigate('/login', { state: { from: location } });
                return;
            }
            if (!ebook.isFree && !purchasedEbooks.includes(ebook.id)) {
                toast.error('Debe comprar este ebook primero');
                return;
            }
            await ebookService.trackDownload(ebook.id);
            const downloadUrl = await ebookService.getDownloadUrl(ebook.id);
            // Crear un link temporal y simular click
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${ebook.title}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success('¡Descarga iniciada!');
        }
        catch (error) {
            console.error('Error al descargar:', error);
            toast.error('Error al iniciar la descarga');
        }
        finally {
            setDownloading(false);
        }
    };
    if (isLoading) {
        return _jsx("div", { className: "flex justify-center items-center min-h-screen", children: _jsx("div", { className: "loader" }) });
    }
    return (_jsx("div", { className: "py-12 bg-secondary-50", children: _jsxs("div", { className: "container-custom", children: [_jsx("div", { className: "mb-16", children: _jsx(motion.div, { className: "card p-6 border-2 border-primary-500", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: _jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: ebooksData[0].coverImage, alt: ebooksData[0].title, className: "w-full h-64 object-cover rounded-lg shadow-lg" }), _jsx("div", { className: "absolute top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-full font-bold", children: "GRATIS" })] }), _jsxs("div", { children: [_jsx("span", { className: "text-primary-600 font-semibold mb-2 block", children: "E-book Gratuito" }), _jsx("h2", { className: "text-2xl font-bold text-secondary-900 mb-4", children: ebooksData[0].title }), _jsx("p", { className: "text-secondary-600 mb-6", children: ebooksData[0].description }), _jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsxs("span", { className: "flex items-center text-secondary-600", children: [_jsx(FaFilePdf, { className: "mr-2" }), " ", ebooksData[0].pages, " p\u00E1ginas"] }), _jsxs("span", { className: "flex items-center text-secondary-600", children: [_jsx(FaDownload, { className: "mr-2" }), " PDF descargable"] })] }), _jsxs(motion.button, { onClick: () => handleDownload(ebooksData[0]), className: "btn-primary w-full md:w-auto flex items-center justify-center gap-2", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(FaDownload, {}), " Descargar Ahora"] })] })] }) }) }), _jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "section-title", children: "Biblioteca Legal Digital" }), _jsx("p", { className: "text-xl text-secondary-600", children: "E-books especializados para entender sus derechos y procedimientos legales" })] }), _jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex flex-col md:flex-row md:justify-between mb-4 gap-4", children: [_jsxs("div", { className: "relative w-full md:w-2/3", children: [_jsx("input", { type: "text", placeholder: "Buscar e-books...", className: "form-input pl-10 w-full", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2", children: _jsx("svg", { className: "w-5 h-5 text-secondary-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) })] }), _jsx("div", { className: "flex space-x-2 overflow-x-auto pb-2", children: categories.map(category => (_jsx(motion.button, { onClick: () => setSelectedCategory(category), className: `px-4 py-2 rounded-lg whitespace-nowrap ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: category }, category))) })] }) }), cartItems.length > 0 && (_jsx(motion.div, { className: "mb-8 card border-2 border-primary-100", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, children: _jsxs("div", { className: "p-4", children: [_jsxs("h3", { className: "text-xl font-bold text-secondary-900 mb-4 flex items-center", children: [_jsx(FaShoppingCart, { className: "mr-2 text-primary-600" }), "Carrito de Compra (", cartItems.length, " ", cartItems.length === 1 ? 'item' : 'items', ")"] }), _jsx("div", { className: "divide-y divide-secondary-100", children: cartItems.map(item => (_jsxs("div", { className: "py-3 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(FaBook, { className: "mr-2 text-primary-600" }), _jsx("span", { className: "font-medium", children: item.title })] }), _jsxs("div", { className: "flex items-center", children: [_jsxs("span", { className: "mr-4 font-bold", children: ["$", item.price] }), _jsx("button", { onClick: () => removeFromCart(item.id), className: "text-red-500 hover:text-red-700", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })] })] }, item.id))) }), _jsxs("div", { className: "flex justify-between items-center mt-4 pt-4 border-t border-secondary-100", children: [_jsxs("span", { className: "text-lg font-bold", children: ["Total: $", cartTotal] }), _jsx(motion.button, { onClick: handleCheckout, className: "btn-primary", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "Proceder al pago" })] })] }) })), filteredEbooks.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("svg", { className: "w-16 h-16 mx-auto text-secondary-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z" }) }), _jsx("h3", { className: "text-xl font-bold text-secondary-500 mt-4", children: "No se encontraron e-books" }), _jsx("p", { className: "text-secondary-400", children: "Intente con otra b\u00FAsqueda o categor\u00EDa" })] })) : (_jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredEbooks.filter(ebook => !ebook.isFree).map(ebook => (_jsxs(motion.div, { className: "card overflow-hidden", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: ebook.coverImage, alt: ebook.title, className: "w-full h-48 object-cover" }), ebook.popular && (_jsx("div", { className: "absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 text-sm font-bold", children: "Popular" })), _jsxs("div", { className: "absolute bottom-0 left-0 bg-secondary-900 bg-opacity-80 text-white px-3 py-1", children: [ebook.pages, " p\u00E1ginas"] })] }), _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h3", { className: "text-xl font-bold text-secondary-900", children: ebook.title }), _jsx("span", { className: "badge-primary", children: ebook.category })] }), _jsx("p", { className: "text-secondary-600 mb-4", children: ebook.description }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "text-2xl font-bold text-primary-600", children: ["$", ebook.price] }), cartItems.some(item => item.id === ebook.id) ? (_jsxs("span", { className: "flex items-center text-green-600 font-medium", children: [_jsx(FaCheck, { className: "mr-1" }), " Agregado"] })) : (_jsxs(motion.button, { onClick: () => addToCart(ebook), className: "btn-primary flex items-center", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(FaShoppingCart, { className: "mr-2" }), " Comprar"] }))] })] })] }, ebook.id))) })), _jsxs("div", { className: "mt-16", children: [_jsx("h3", { className: "text-2xl font-bold text-secondary-900 text-center mb-8", children: "Beneficios de nuestros E-Books Legales" }), _jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [_jsxs(motion.div, { className: "card text-center p-6", whileHover: { y: -10 }, children: [_jsx("div", { className: "rounded-full bg-primary-100 w-16 h-16 flex items-center justify-center mx-auto mb-4", children: _jsx(FaBook, { className: "text-primary-600 text-2xl" }) }), _jsx("h4", { className: "text-xl font-bold text-secondary-900 mb-2", children: "Conocimiento Accesible" }), _jsx("p", { className: "text-secondary-600", children: "Informaci\u00F3n legal especializada explicada en lenguaje claro y comprensible." })] }), _jsxs(motion.div, { className: "card text-center p-6", whileHover: { y: -10 }, children: [_jsx("div", { className: "rounded-full bg-primary-100 w-16 h-16 flex items-center justify-center mx-auto mb-4", children: _jsx(FaDownload, { className: "text-primary-600 text-2xl" }) }), _jsx("h4", { className: "text-xl font-bold text-secondary-900 mb-2", children: "Disponibilidad Inmediata" }), _jsx("p", { className: "text-secondary-600", children: "Descarga instant\u00E1nea tras la compra, sin esperas ni env\u00EDos." })] }), _jsxs(motion.div, { className: "card text-center p-6", whileHover: { y: -10 }, children: [_jsx("div", { className: "rounded-full bg-primary-100 w-16 h-16 flex items-center justify-center mx-auto mb-4", children: _jsx("svg", { className: "w-8 h-8 text-primary-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("h4", { className: "text-xl font-bold text-secondary-900 mb-2", children: "Ahorro de Tiempo" }), _jsx("p", { className: "text-secondary-600", children: "Resuelva dudas legales b\u00E1sicas sin necesidad de consultas presenciales." })] })] })] })] }) }));
}
