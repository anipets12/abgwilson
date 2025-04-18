/**
 * Servicio de afiliados para Abogado Wilson
 * Implementa funcionalidades para el programa de afiliados y referidos
 */

import { getApiUrls } from '../utils/env';
import auth from '../utils/auth';

/**
 * Obtiene el token de autorización para las peticiones
 * @returns {string} Token de autorización
 */
const getAuthToken = () => {
  return localStorage.getItem('abgwilson_auth_token') || '';
};

/**
 * Servicio para gestionar el sistema de afiliados
 */
const affiliateService = {
  /**
   * Generar un nuevo código de afiliado para el usuario
   * @returns {Promise<Object>} Datos del código de afiliado generado
   */
  async generateAffiliateCode() {
    try {
      const apiUrl = getApiUrls().affiliates + '/generate-code';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al generar código de afiliado');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en generateAffiliateCode:', error);
      throw error;
    }
  },
  
  /**
   * Obtener el estado y estadísticas del afiliado
   * @returns {Promise<Object>} Estado y estadísticas del afiliado
   */
  async getAffiliateStatus() {
    try {
      const apiUrl = getApiUrls().affiliates + '/status';
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener estado de afiliado');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en getAffiliateStatus:', error);
      throw error;
    }
  },
  
  /**
   * Registrar una referencia utilizando un código de afiliado
   * @param {string} referralCode - Código de afiliado utilizado
   * @returns {Promise<Object>} Resultado del registro de la referencia
   */
  async registerReferral(referralCode) {
    try {
      const apiUrl = getApiUrls().affiliates + '/register-referral';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ referralCode })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar referencia');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en registerReferral:', error);
      throw error;
    }
  },
  
  /**
   * Obtener historial de referencias y comisiones
   * @param {number} page - Número de página
   * @param {number} limit - Límite de resultados por página
   * @returns {Promise<Object>} Historial de referencias y comisiones
   */
  async getReferralHistory(page = 1, limit = 10) {
    try {
      const apiUrl = `${getApiUrls().affiliates}/history?page=${page}&limit=${limit}`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener historial de referencias');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en getReferralHistory:', error);
      throw error;
    }
  },
  
  /**
   * Solicitar pago de comisiones
   * @param {Object} paymentData - Datos para el pago
   * @param {string} paymentData.amount - Monto a retirar
   * @param {string} paymentData.paymentMethod - Método de pago (bank_transfer, paypal, etc.)
   * @param {Object} paymentData.paymentDetails - Detalles específicos del método de pago
   * @returns {Promise<Object>} Resultado de la solicitud de pago
   */
  async requestCommissionPayment(paymentData) {
    try {
      const apiUrl = getApiUrls().affiliates + '/request-payment';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(paymentData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al solicitar pago de comisiones');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en requestCommissionPayment:', error);
      throw error;
    }
  },
  
  /**
   * Obtener el enlace de referido personalizado
   * @returns {Promise<string>} Enlace de referido
   */
  async getReferralLink() {
    try {
      const baseUrl = window.location.origin;
      const { code } = await this.getAffiliateStatus();
      
      if (!code) {
        const result = await this.generateAffiliateCode();
        return `${baseUrl}/registro?ref=${result.code}`;
      }
      
      return `${baseUrl}/registro?ref=${code}`;
    } catch (error) {
      console.error('Error en getReferralLink:', error);
      throw error;
    }
  },
  
  /**
   * Verificar si un usuario fue referido al registrarse
   * @returns {string|null} Código de referido o null si no hay
   */
  getReferralCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref');
  },
  
  /**
   * Guardar el código de referido en localStorage para usarlo después
   * @param {string} code - Código de referido
   */
  saveReferralCode(code) {
    if (code) {
      localStorage.setItem('abgwilson_referral_code', code);
    }
  },
  
  /**
   * Obtener el código de referido guardado
   * @returns {string|null} Código de referido guardado o null
   */
  getSavedReferralCode() {
    return localStorage.getItem('abgwilson_referral_code');
  },
  
  /**
   * Limpiar el código de referido guardado
   */
  clearSavedReferralCode() {
    localStorage.removeItem('abgwilson_referral_code');
  }
};

export default affiliateService;
