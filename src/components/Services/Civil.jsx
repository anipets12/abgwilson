import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { FaBalanceScale, FaHandshake, FaHome, FaFileContract } from 'react-icons/fa';
import ServiceLayout from './ServiceLayout';
const Civil = () => {
    // Precios de servicios
    const servicios = [
        {
            id: 1,
            nombre: "Consulta Inicial",
            descripcion: "Evaluación de su caso, análisis preliminar y orientación legal básica",
            precio: 45,
            duracion: "1 hora",
            destacado: false
        },
        {
            id: 2,
            nombre: "Patrocinio Estándar",
            descripcion: "Representación legal en procesos civiles de complejidad media",
            precio: 450,
            duracion: "Por caso",
            destacado: true,
            caracteristicas: [
                "Análisis exhaustivo del caso",
                "Elaboración de escritos y demandas",
                "Representación en audiencias",
                "Comunicación constante",
                "Informes periódicos del avance"
            ]
        },
        {
            id: 3,
            nombre: "Patrocinio Empresarial",
            descripcion: "Asesoría y representación para empresas",
            precio: 900,
            duracion: "Contrato mensual",
            destacado: false
        },
        {
            id: 4,
            nombre: "Defensa de Divorcios",
            descripcion: "Representación legal especializada en divorcios, incluyendo custodia y acuerdos de pensión alimenticia.",
            precio: 650,
            duracion: "Por caso",
            destacado: true,
            caracteristicas: [
                "Asesoría integral",
                "Negociación y mediación",
                "Gestión de documentación"
            ]
        },
        {
            id: 5,
            nombre: "E-Book Legal",
            descripcion: "Acceso a guías y documentos legales en formato digital para una consulta rápida.",
            precio: 20,
            duracion: "Compra única",
            destacado: false
        }
    ];
    // Casos de éxito
    const casosExito = [
        {
            titulo: "Resolución favorable en litigio inmobiliario",
            descripcion: "Cliente recuperó propiedad valuada en $250,000 tras litigio por escritura fraudulenta",
            resultado: "Recuperación de propiedad"
        },
        {
            titulo: "Acuerdo ventajoso en disputa contractual",
            descripcion: "Negociación exitosa que evitó juicio largo y costoso",
            resultado: "Acuerdo favorable"
        },
        {
            titulo: "Anulación de contrato abusivo",
            descripcion: "Cliente liberado de obligaciones en contrato con cláusulas abusivas",
            resultado: "Contrato anulado"
        }
    ];
    // Áreas de especialización
    const especialidades = [
        {
            icon: _jsx(FaHome, {}),
            title: "Derecho Inmobiliario",
            description: "Compraventa, arrendamientos, desalojos, problemas de propiedad horizontal"
        },
        {
            icon: _jsx(FaHandshake, {}),
            title: "Responsabilidad Civil",
            description: "Reclamaciones por daños y perjuicios, responsabilidad contractual y extracontractual"
        },
        {
            icon: _jsx(FaFileContract, {}),
            title: "Contratos Civiles",
            description: "Redacción, revisión y negociación de todo tipo de contratos"
        },
        {
            icon: _jsx(FaBalanceScale, {}),
            title: "Sucesiones",
            description: "Herencias, testamentos, donaciones y particiones hereditarias"
        },
        {
            icon: _jsx(FaHandshake, {}),
            title: "Mediación y Arbitraje",
            description: "Resolución alternativa de conflictos civiles y mercantiles"
        },
        {
            icon: _jsx(FaFileContract, {}),
            title: "Derecho de Familia",
            description: "Divorcios, pensiones alimenticias, custodia de menores"
        },
    ];
    return (_jsx(ServiceLayout, { title: "Civil", icon: _jsx(FaHandshake, { className: "mr-2 text-yellow-400" }), description: "Asesor\u00EDa legal especializada en asuntos civiles para proteger sus derechos e intereses patrimoniales y personales. Soluciones efectivas en conflictos con contratos, propiedad, familia y obligaciones.", services: servicios, successCases: casosExito, specialties: especialidades, whatsappText: "Hola Abg. Wilson, necesito asesor\u00EDa en derecho civil." }));
};
export default Civil;
