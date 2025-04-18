/**
 * Servicio de pagos con Stripe
 * Implementa una integración completa y segura con Stripe para procesar pagos
 */

import { loadStripe } from '@stripe/stripe-js';
import { getPublicEnv, getApiUrls } from '../utils/env';

// Carga de Stripe con la clave pública
let stripePromise = null;
const getStripe = () => {
  if (!stripePromise) {
    const stripeKey = getPublicEnv('STRIPE_PUBLIC_KEY');
    stripePromise = loadStripe(stripeKey);
  }
  return stripePromise;
};

/**
 * Servicio de pagos para Abogado Wilson
 */
const paymentService = {
  /**
   * Crear una sesión de checkout para un plan premium
   * @param {Object} planData - Datos del plan seleccionado
   * @param {string} planData.planId - ID del plan (mensual, trimestral, anual)
   * @param {string} planData.price - Precio del plan
   * @param {string} planData.userId - ID del usuario que realiza la compra
   * @returns {Promise<Object>} Sesión de checkout
   */
  async createCheckoutSession(planData) {
    try {
      const apiUrl = getApiUrls().payments + '/create-checkout-session';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('abgwilson_auth_token') || ''}`
        },
        body: JSON.stringify(planData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la sesión de pago');
      }
      
      const { sessionId } = await response.json();
      return { sessionId };
    } catch (error) {
      console.error('Error en createCheckoutSession:', error);
      throw error;
    }
  },
  
  /**
   * Redirigir al checkout de Stripe
   * @param {string} sessionId - ID de la sesión de checkout
   * @returns {Promise<void>}
   */
  async redirectToCheckout(sessionId) {
    try {
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        console.error('Error al redirigir al checkout:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error en redirectToCheckout:', error);
      throw error;
    }
  },
  
  /**
   * Verificar el estado de una suscripción
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object>} Estado de la suscripción
   */
  async getSubscriptionStatus(userId) {
    try {
      const apiUrl = getApiUrls().payments + '/subscription-status';
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('abgwilson_auth_token') || ''}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener el estado de la suscripción');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en getSubscriptionStatus:', error);
      throw error;
    }
  },
  
  /**
   * Crear un portal de cliente para gestionar la suscripción
   * @returns {Promise<Object>} URL del portal de cliente
   */
  async createCustomerPortalSession() {
    try {
      const apiUrl = getApiUrls().payments + '/create-portal-session';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('abgwilson_auth_token') || ''}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el portal de cliente');
      }
      
      const { url } = await response.json();
      return { url };
    } catch (error) {
      console.error('Error en createCustomerPortalSession:', error);
      throw error;
    }
  },
  
  /**
   * Cancelar una suscripción
   * @param {string} subscriptionId - ID de la suscripción
   * @returns {Promise<Object>} Resultado de la cancelación
   */
  async cancelSubscription(subscriptionId) {
    try {
      const apiUrl = getApiUrls().payments + '/cancel-subscription';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('abgwilson_auth_token') || ''}`
        },
        body: JSON.stringify({ subscriptionId })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cancelar la suscripción');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en cancelSubscription:', error);
      throw error;
    }
  }
};

export default paymentService;
