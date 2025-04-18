import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { FaShip, FaGlobe, FaFileAlt, FaSearch, FaHandshake } from 'react-icons/fa';
import ServiceLayout from './ServiceLayout';
const Aduanas = () => {
    // Precios de servicios
    const servicios = [
        {
            id: 1,
            nombre: "Consulta Inicial",
            descripcion: "Evaluación de su caso, análisis de la situación aduanera y orientación legal",
            precio: 60,
            duracion: "1 hora",
            destacado: false
        },
        {
            id: 2,
            nombre: "Gestión Aduanera",
            descripcion: "Representación legal para trámites y procesos aduaneros completos",
            precio: 250,
            duracion: "Por caso",
            destacado: true,
            caracteristicas: [
                "Análisis del caso aduanero",
                "Preparación de documentación",
                "Representación ante autoridades",
                "Seguimiento del proceso",
                "Recursos administrativos si necesario"
            ]
        },
        {
            id: 3,
            nombre: "Litigio Aduanero",
            descripcion: "Representación en disputas y litigios con la administración aduanera",
            precio: 550,
            duracion: "Por caso",
            destacado: false
        }
    ];
    // Casos de éxito
    const casosExito = [
        {
            titulo: "Liberación de mercancía retenida",
            descripcion: "Cliente recuperó carga valorada en $40,000 que estaba retenida por supuestas irregularidades documentales",
            resultado: "Mercancía liberada"
        },
        {
            titulo: "Reducción de sanción aduanera",
            descripcion: "Se logró reducir una multa de $12,000 a $3,200 mediante recursos administrativos",
            resultado: "73% de reducción"
        },
        {
            titulo: "Clasificación arancelaria favorable",
            descripcion: "Obtuvimos una reclasificación arancelaria que redujo los impuestos de importación en un 15%",
            resultado: "Ahorro significativo"
        }
    ];
    // Áreas de especialización
    const especialidades = [
        {
            icon: _jsx(FaShip, {}),
            title: "Importaciones y Exportaciones",
            description: "Asesoría en procesos completos para importar o exportar bienes y servicios"
        },
        {
            icon: _jsx(FaFileAlt, {}),
            title: "Régimenes Aduaneros",
            description: "Gestión de régimenes especiales, depósitos aduaneros y zonas francas"
        },
        {
            icon: _jsx(FaSearch, {}),
            title: "Fiscalización Aduanera",
            description: "Representación en procesos de inspección, verificación y fiscalización"
        },
        {
            icon: _jsx(FaGlobe, {}),
            title: "Clasificación Arancelaria",
            description: "Asesoría en determinación de partidas arancelarias y origen de mercancías"
        },
        {
            icon: _jsx(FaHandshake, {}),
            title: "Procedimientos Administrativos",
            description: "Presentación de recursos, reclamos y procesos administrativos aduaneros"
        },
        {
            icon: _jsx(FaShip, {}),
            title: "Litigios Aduaneros",
            description: "Representación en juicios contenciosos tributarios y aduaneros"
        },
    ];
    return (_jsx(ServiceLayout, { title: "Aduanas", icon: _jsx(FaShip, { className: "mr-2 text-yellow-400" }), description: "Asesor\u00EDa legal especializada en derecho aduanero para importadores, exportadores y operadores de comercio exterior. Soluciones efectivas en tr\u00E1mites, fiscalizaci\u00F3n y litigios aduaneros.", services: servicios, successCases: casosExito, specialties: especialidades, whatsappText: "Hola Abg. Wilson, necesito asesor\u00EDa en derecho aduanero." }));
};
export default Aduanas;
