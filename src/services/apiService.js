/**
 * Servicio de API para consultas a servicios externos
 * @module apiService
 */

/**
 * Busca procesos judiciales según los criterios proporcionados
 * @param {string} type - Tipo de búsqueda (número, actor, demandado, judicatura)
 * @param {string} value - Valor de búsqueda
 * @param {string} province - Provincia (opcional)
 * @returns {Promise<Array>} Resultados de la búsqueda
 */
export const searchJudicialProcess = async (type, value, province = 'IMBABURA') => {
  // En una implementación real, aquí se haría una llamada a la API de la Función Judicial
  // Por ahora, simulamos una respuesta con datos de ejemplo
  
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simular tiempo de respuesta
  
  // Datos de ejemplo según el tipo de búsqueda
  let results = [];
  
  switch (type) {
    case 'numero':
      results = [
        {
          id: value,
          numero: value,
          actor: 'PEREZ MARTINEZ JUAN CARLOS',
          demandado: 'RODRIGUEZ SUAREZ MARIA ELENA',
          tipo: 'CIVIL - ORDINARIO',
          estado: 'EN TRÁMITE',
          fecha: '2023-08-15',
          judicatura: 'UNIDAD JUDICIAL CIVIL CON SEDE EN EL CANTÓN IBARRA',
          acciones: ['Ver detalles', 'Descargar']
        }
      ];
      break;
      
    case 'actor':
      results = [
        {
          id: '10201-2023-00123',
          numero: '10201-2023-00123',
          actor: `${value.toUpperCase()}`,
          demandado: 'CONSTRUCTORA XYZ S.A.',
          tipo: 'CIVIL - ORDINARIO',
          estado: 'EN TRÁMITE',
          fecha: '2023-09-20',
          judicatura: 'UNIDAD JUDICIAL CIVIL CON SEDE EN EL CANTÓN IBARRA',
          acciones: ['Ver detalles', 'Descargar']
        },
        {
          id: '10201-2022-01234',
          numero: '10201-2022-01234',
          actor: `${value.toUpperCase()}`,
          demandado: 'BANCO ABC',
          tipo: 'EJECUTIVO',
          estado: 'SENTENCIA',
          fecha: '2022-11-05',
          judicatura: 'UNIDAD JUDICIAL CIVIL CON SEDE EN EL CANTÓN IBARRA',
          acciones: ['Ver detalles', 'Descargar']
        }
      ];
      break;
      
    case 'demandado':
      results = [
        {
          id: '10201-2023-00456',
          numero: '10201-2023-00456',
          actor: 'COOPERATIVA DE AHORRO Y CRÉDITO XYZ',
          demandado: `${value.toUpperCase()}`,
          tipo: 'EJECUTIVO',
          estado: 'EN TRÁMITE',
          fecha: '2023-07-12',
          judicatura: 'UNIDAD JUDICIAL CIVIL CON SEDE EN EL CANTÓN IBARRA',
          acciones: ['Ver detalles', 'Descargar']
        }
      ];
      break;
      
    case 'judicatura':
      results = [
        {
          id: '10201-2023-00789',
          numero: '10201-2023-00789',
          actor: 'MINISTERIO PÚBLICO',
          demandado: 'GÓMEZ LÓPEZ CARLOS',
          tipo: 'PENAL - ORDINARIO',
          estado: 'EN TRÁMITE',
          fecha: '2023-10-01',
          judicatura: province.toUpperCase(),
          acciones: ['Ver detalles', 'Descargar']
        },
        {
          id: '10201-2023-00790',
          numero: '10201-2023-00790',
          actor: 'FISCALÍA GENERAL DEL ESTADO',
          demandado: 'TORRES RUIZ FERNANDO',
          tipo: 'PENAL - ORDINARIO',
          estado: 'AUDIENCIA',
          fecha: '2023-10-05',
          judicatura: province.toUpperCase(),
          acciones: ['Ver detalles', 'Descargar']
        },
        {
          id: '10201-2023-00791',
          numero: '10201-2023-00791',
          actor: 'DEFENSORÍA DEL PUEBLO',
          demandado: 'MUNICIPIO DE IBARRA',
          tipo: 'CONSTITUCIONAL',
          estado: 'EN TRÁMITE',
          fecha: '2023-09-28',
          judicatura: province.toUpperCase(),
          acciones: ['Ver detalles', 'Descargar']
        }
      ];
      break;
      
    default:
      results = [];
  }
  
  return results;
};

/**
 * Busca infracciones de tránsito por placa o licencia
 * @param {string} type - Tipo de búsqueda (placa, licencia)
 * @param {string} value - Valor de búsqueda
 * @returns {Promise<Array>} Resultados de la búsqueda
 */
export const searchTrafficInfractions = async (type, value) => {
  // Simulación de búsqueda de infracciones de tránsito
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Datos de ejemplo según el tipo de búsqueda
  let results = [];
  
  switch (type) {
    case 'placa':
      results = [
        {
          id: '1234567',
          fecha: '2023-06-10',
          lugar: 'AV. MARIANO ACOSTA Y JAIME RIVADENEIRA',
          infraccion: 'EXCESO DE VELOCIDAD',
          valor: '$80.00',
          estado: 'NO PAGADA',
          placa: value.toUpperCase()
        },
        {
          id: '1234568',
          fecha: '2023-02-15',
          lugar: 'PANAMERICANA NORTE KM 5',
          infraccion: 'ESTACIONAMIENTO PROHIBIDO',
          valor: '$30.00',
          estado: 'PAGADA',
          placa: value.toUpperCase()
        }
      ];
      break;
      
    case 'licencia':
      results = [
        {
          id: '2345678',
          fecha: '2023-05-20',
          lugar: 'CALLE BOLIVAR Y FLORES',
          infraccion: 'NO RESPETAR SEÑALES DE TRÁNSITO',
          valor: '$50.00',
          estado: 'NO PAGADA',
          licencia: value
        }
      ];
      break;
      
    default:
      results = [];
  }
  
  return results;
};

/**
 * Busca información civil como juicios, deudas, etc.
 * @param {string} type - Tipo de búsqueda (cedula, ruc, nombre)
 * @param {string} value - Valor de búsqueda
 * @returns {Promise<Array>} Resultados de la búsqueda
 */
export const searchCivilInfo = async (type, value) => {
  // Simulación de búsqueda de información civil
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Datos de ejemplo según el tipo de búsqueda
  let results = [];
  
  switch (type) {
    case 'cedula':
      results = [
        {
          id: '3456789',
          tipo: 'JUICIO DE ALIMENTOS',
          demandante: 'MARÍA JOSEFINA PÉREZ',
          demandado: `TITULAR DE CÉDULA ${value}`,
          juzgado: 'UNIDAD JUDICIAL DE FAMILIA',
          estado: 'VIGENTE',
          valor: '$250.00 MENSUALES'
        }
      ];
      break;
      
    case 'ruc':
      results = [
        {
          id: '4567890',
          tipo: 'JUICIO MERCANTIL',
          demandante: 'PROVEEDORES ASOCIADOS S.A.',
          demandado: `EMPRESA CON RUC ${value}`,
          juzgado: 'TRIBUNAL DE LO MERCANTIL',
          estado: 'EN TRÁMITE',
          valor: '$12,500.00'
        },
        {
          id: '4567891',
          tipo: 'COACTIVA SRI',
          demandante: 'SERVICIO DE RENTAS INTERNAS',
          demandado: `EMPRESA CON RUC ${value}`,
          juzgado: 'DEPARTAMENTO DE COBRANZAS SRI',
          estado: 'NOTIFICADO',
          valor: '$8,750.00'
        }
      ];
      break;
      
    case 'nombre':
      results = [
        {
          id: '5678901',
          tipo: 'JUICIO LABORAL',
          demandante: value.toUpperCase(),
          demandado: 'INDUSTRIAS ABC',
          juzgado: 'UNIDAD JUDICIAL DE TRABAJO',
          estado: 'SENTENCIA FAVORABLE',
          valor: '$15,000.00 INDEMNIZACIÓN'
        }
      ];
      break;
      
    default:
      results = [];
  }
  
  return results;
};

export default {
  searchJudicialProcess,
  searchTrafficInfractions,
  searchCivilInfo
};
