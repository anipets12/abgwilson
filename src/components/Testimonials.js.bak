import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaQuoteRight, FaArrowLeft, FaArrowRight, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Testimonials() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const testimonials = [
        {
            id: 1,
            name: 'Carlos Rodríguez',
            position: 'Empresario',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: 'El Abg. Wilson Ipiales manejó mi caso de disputa comercial con profesionalismo excepcional. Su conocimiento del derecho mercantil y su estrategia legal fueron fundamentales para alcanzar un acuerdo favorable. Recomiendo ampliamente sus servicios.',
            rating: 5,
            case: 'Disputa Comercial',
            result: 'Acuerdo favorable'
        },
        {
            id: 2,
            name: 'María González',
            position: 'Docente Universitaria',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: 'Después de un accidente de tránsito, el Abg. Wilson me brindó asesoría clara y precisa. Su dedicación y conocimiento en derecho de tránsito me permitieron obtener la compensación justa. Su equipo siempre estuvo disponible para responder mis dudas.',
            rating: 5,
            case: 'Accidente de Tránsito',
            result: 'Compensación justa'
        },
        {
            id: 3,
            name: 'Roberto Méndez',
            position: 'Médico',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: 'Contraté los servicios del Abg. Wilson para un caso de mala praxis médica. Su enfoque meticuloso y su capacidad para explicar conceptos legales complejos de manera sencilla fueron invaluables. Logró un resultado favorable en un caso que parecía imposible.',
            rating: 4,
            case: 'Mala Praxis Médica',
            result: 'Caso ganado'
        },
        {
            id: 4,
            name: 'Ana Suárez',
            position: 'Gerente de Recursos Humanos',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: 'El bufete del Abg. Wilson nos ha proporcionado asesoría legal corporativa durante tres años. Su conocimiento en derecho laboral y su capacidad para anticipar problemas potenciales han sido fundamentales para nuestra empresa. Servicio de primera categoría.',
            rating: 5,
            case: 'Asesoría Corporativa',
            result: 'Prevención de problemas legales'
        },
        {
            id: 5,
            name: 'Luis Morales',
            position: 'Propietario de Inmobiliaria',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: 'He trabajado con el Abg. Wilson en múltiples transacciones inmobiliarias. Su atención al detalle y su profundo conocimiento de las leyes de propiedad han sido cruciales para cerrar negociaciones complejas. Un profesional en quien confiar plenamente.',
            rating: 5,
            case: 'Transacciones Inmobiliarias',
            result: 'Negociaciones exitosas'
        }
    ];
    // Autoplay functionality
    useEffect(() => {
        let interval;
        if (autoplay) {
            interval = setInterval(() => {
                handleNext();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [activeTestimonial, autoplay]);
    const handlePrev = () => {
        setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setAutoplay(false); // Disable autoplay when user interacts
    };
    const handleNext = () => {
        setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };
    // Variants for animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };
    return (_jsxs("div", { className: "py-16 bg-gradient-to-b from-secondary-50 to-white relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-64 bg-blue-50 opacity-50 -skew-y-6 -translate-y-32" }), _jsx("div", { className: "absolute top-20 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-30" }), _jsx("div", { className: "absolute bottom-10 left-10 w-24 h-24 bg-blue-100 rounded-full opacity-30" }), _jsxs("div", { className: "container-custom relative z-10", children: [_jsxs(motion.div, { className: "text-center mb-12", variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, children: [_jsx(motion.span, { variants: itemVariants, className: "text-blue-600 font-semibold uppercase tracking-wider text-sm", children: "Lo que nuestros clientes dicen" }), _jsx(motion.h2, { variants: itemVariants, className: "section-title mt-2 text-4xl font-bold text-secondary-900", children: "Testimonios de Clientes" }), _jsx(motion.p, { variants: itemVariants, className: "text-xl text-secondary-600 max-w-2xl mx-auto mt-4", children: "Descubra c\u00F3mo hemos ayudado a nuestros clientes a resolver sus problemas legales con \u00E9xito" })] }), _jsxs("div", { className: "relative max-w-5xl mx-auto", children: [_jsx("div", { className: "overflow-hidden rounded-xl shadow-xl bg-white p-2", children: _jsx(AnimatePresence, { mode: "wait", children: testimonials.map((testimonial, index) => (index === activeTestimonial && (_jsxs(motion.div, { className: "p-8 relative", initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 }, transition: { duration: 0.5 }, children: [_jsx("div", { className: "absolute text-blue-100 opacity-30 top-4 left-4", children: _jsx(FaQuoteLeft, { size: 60 }) }), _jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [_jsx("div", { className: "md:col-span-1", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("img", { src: testimonial.image, alt: testimonial.name, className: "w-24 h-24 rounded-full object-cover border-4 border-blue-50 shadow-md" }), _jsx("h4", { className: "text-lg font-semibold text-secondary-900 mt-3", children: testimonial.name }), _jsx("p", { className: "text-secondary-600", children: testimonial.position }), _jsx("div", { className: "flex mt-2", children: [...Array(5)].map((_, i) => (_jsx(FaStar, { className: `w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}` }, i))) }), _jsxs("div", { className: "mt-4 bg-blue-50 rounded-lg p-3 w-full", children: [_jsx("p", { className: "text-xs text-secondary-500 font-medium", children: "CASO" }), _jsx("p", { className: "text-sm font-semibold text-secondary-700", children: testimonial.case }), _jsx("p", { className: "text-xs text-secondary-500 font-medium mt-2", children: "RESULTADO" }), _jsx("p", { className: "text-sm font-semibold text-green-600", children: testimonial.result })] })] }) }), _jsxs("div", { className: "md:col-span-2 flex flex-col justify-between", children: [_jsxs("blockquote", { className: "text-lg text-secondary-700 italic mb-6 relative z-10", children: [_jsx(FaQuoteLeft, { className: "inline-block mr-2 text-blue-400 mb-1", size: 16 }), testimonial.content, _jsx(FaQuoteRight, { className: "inline-block ml-2 text-blue-400 mb-1", size: 16 })] }), _jsxs("div", { className: "mt-auto bg-gray-50 p-4 rounded-lg", children: [_jsxs("p", { className: "text-sm text-secondary-600", children: [_jsx("span", { className: "font-semibold", children: "\u00BFTiene un caso similar? " }), "Nuestro equipo legal puede ayudarle a obtener resultados favorables."] }), _jsx("div", { className: "mt-2", children: _jsx(Link, { to: "/contacto", className: "inline-block text-blue-600 hover:text-blue-800 font-medium text-sm", children: "Consulta gratuita \u2192" }) })] })] })] })] }, testimonial.id)))) }) }), _jsxs("div", { className: "flex justify-between mt-8", children: [_jsx(motion.button, { onClick: handlePrev, className: "p-4 rounded-full bg-white shadow-md hover:bg-primary-50 focus:outline-none", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, "aria-label": "Anterior testimonio", children: _jsx(FaArrowLeft, { className: "w-5 h-5 text-primary-600" }) }), _jsx("div", { className: "flex space-x-2 items-center", children: testimonials.map((_, index) => (_jsx("button", { onClick: () => {
                                                setActiveTestimonial(index);
                                                setAutoplay(false);
                                            }, className: `w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial
                                                ? 'bg-primary-600 w-6'
                                                : 'bg-secondary-300'}`, "aria-label": `Ir al testimonio ${index + 1}` }, index))) }), _jsx(motion.button, { onClick: handleNext, className: "p-4 rounded-full bg-white shadow-md hover:bg-primary-50 focus:outline-none", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, "aria-label": "Siguiente testimonio", children: _jsx(FaArrowRight, { className: "w-5 h-5 text-primary-600" }) })] })] }), _jsx(motion.div, { className: "text-center mt-20 bg-blue-600 text-white py-12 px-6 rounded-xl shadow-xl mx-auto max-w-4xl", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, viewport: { once: true }, children: _jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between", children: [_jsxs("div", { className: "md:w-2/3 text-left mb-8 md:mb-0", children: [_jsx("h3", { className: "text-2xl font-bold mb-4", children: "\u00BFListo para recibir asesor\u00EDa legal de calidad?" }), _jsx("p", { className: "text-lg text-blue-100", children: "\u00DAnase a nuestros clientes satisfechos y perm\u00EDtanos ayudarle con sus necesidades legales. Primera consulta totalmente gratuita." })] }), _jsxs("div", { className: "md:w-1/3", children: [_jsxs(Link, { to: "/contacto", className: "btn-primary inline-flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold shadow-md transition-all duration-300 w-full", children: [_jsx(FaUserPlus, { className: "mr-2" }), "Solicitar Consulta"] }), _jsx("p", { className: "text-xs mt-3 text-blue-200", children: "Sin compromiso. Respuesta en 24 horas" })] })] }) }), _jsxs("div", { className: "mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [_jsxs(motion.div, { className: "p-6 bg-white rounded-xl shadow-md", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, viewport: { once: true }, children: [_jsx("h4", { className: "text-4xl font-bold text-blue-600", children: "+250" }), _jsx("p", { className: "text-secondary-700 mt-2", children: "Casos Ganados" })] }), _jsxs(motion.div, { className: "p-6 bg-white rounded-xl shadow-md", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, viewport: { once: true }, children: [_jsx("h4", { className: "text-4xl font-bold text-blue-600", children: "+500" }), _jsx("p", { className: "text-secondary-700 mt-2", children: "Clientes Satisfechos" })] }), _jsxs(motion.div, { className: "p-6 bg-white rounded-xl shadow-md", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, viewport: { once: true }, children: [_jsx("h4", { className: "text-4xl font-bold text-blue-600", children: "15+" }), _jsx("p", { className: "text-secondary-700 mt-2", children: "A\u00F1os de Experiencia" })] }), _jsxs(motion.div, { className: "p-6 bg-white rounded-xl shadow-md", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, viewport: { once: true }, children: [_jsx("h4", { className: "text-4xl font-bold text-blue-600", children: "100%" }), _jsx("p", { className: "text-secondary-700 mt-2", children: "Compromiso" })] })] })] })] }));
}
