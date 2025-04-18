/**
 * API de pagos para Abogado Wilson
 * Implementa endpoints seguros para procesar pagos con Stripe
 */

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { verifyToken } = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Asegurar que todos los endpoints requieren autenticación
router.use(verifyToken);

/**
 * Crear una sesión de checkout de Stripe
 * POST /api/payments/create-checkout-session
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { planId, userId } = req.body;
    const user = req.user; // El usuario autenticado desde el middleware verifyToken
    
    // Verificar que el usuario coincide con el token
    if (user.id !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'No autorizado para crear una sesión para este usuario' 
      });
    }
    
    // Buscar el plan en la base de datos
    const plan = await prisma.subscriptionPlan.findUnique({
      where: {
        id: planId
      }
    });
    
    if (!plan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Plan no encontrado' 
      });
    }
    
    // Buscar cliente existente en Stripe o crear uno nuevo
    let customer;
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        userId: user.id
      }
    });
    
    if (existingCustomer && existingCustomer.stripeCustomerId) {
      customer = existingCustomer.stripeCustomerId;
    } else {
      // Buscar usuario en la base de datos
      const dbUser = await prisma.user.findUnique({
        where: {
          id: user.id
        }
      });
      
      // Crear un nuevo cliente en Stripe
      const stripeCustomer = await stripe.customers.create({
        email: dbUser.email,
        name: dbUser.name,
        metadata: {
          userId: user.id
        }
      });
      
      // Guardar el ID del cliente en la base de datos
      await prisma.customer.create({
        data: {
          userId: user.id,
          stripeCustomerId: stripeCustomer.id
        }
      });
      
      customer = stripeCustomer.id;
    }
    
    // Crear la sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Plan Premium ${plan.name}`,
              description: plan.description,
            },
            unit_amount: plan.price * 100, // Stripe requiere el precio en centavos
            recurring: {
              interval: plan.interval, // 'month', 'year', etc.
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/suscripcion/exitosa?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/suscripcion/premium`,
      metadata: {
        userId: user.id,
        planId: plan.id
      }
    });
    
    // Registrar la intención de pago
    await prisma.paymentIntent.create({
      data: {
        userId: user.id,
        stripeSessionId: session.id,
        planId: plan.id,
        status: 'pending',
        amount: plan.price
      }
    });
    
    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error al crear sesión de checkout:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error al crear la sesión de pago',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

/**
 * Obtener el estado de la suscripción de un usuario
 * GET /api/payments/subscription-status
 */
router.get('/subscription-status', async (req, res) => {
  try {
    const user = req.user; // El usuario autenticado desde el middleware verifyToken
    
    // Buscar suscripción activa en la base de datos
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: 'active'
      },
      include: {
        plan: true
      }
    });
    
    if (!subscription) {
      return res.status(200).json({ 
        hasActiveSubscription: false,
        subscription: null
      });
    }
    
    // Si existe una suscripción, verificar su estado en Stripe
    if (subscription.stripeSubscriptionId) {
      const stripeSubscription = await stripe.subscriptions.retrieve(
        subscription.stripeSubscriptionId
      );
      
      // Verificar si la suscripción sigue activa en Stripe
      if (stripeSubscription.status !== 'active' && stripeSubscription.status !== 'trialing') {
        // Actualizar el estado en la base de datos
        await prisma.subscription.update({
          where: {
            id: subscription.id
          },
          data: {
            status: stripeSubscription.status
          }
        });
        
        return res.status(200).json({ 
          hasActiveSubscription: false,
          subscription: {
            ...subscription,
            status: stripeSubscription.status
          }
        });
      }
      
      return res.status(200).json({ 
        hasActiveSubscription: true,
        subscription: {
          id: subscription.id,
          planName: subscription.plan.name,
          status: subscription.status,
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
          cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
        }
      });
    } else {
      // Suscripción registrada localmente pero sin ID de Stripe
      return res.status(200).json({ 
        hasActiveSubscription: true,
        subscription: {
          id: subscription.id,
          planName: subscription.plan.name,
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd,
          cancelAtPeriodEnd: subscription.cancelAtPeriodEnd
        }
      });
    }
  } catch (error) {
    console.error('Error al obtener estado de suscripción:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error al obtener el estado de la suscripción',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

/**
 * Crear un portal de cliente para gestionar la suscripción
 * POST /api/payments/create-portal-session
 */
router.post('/create-portal-session', async (req, res) => {
  try {
    const user = req.user; // El usuario autenticado desde el middleware verifyToken
    
    // Buscar el cliente en la base de datos
    const customer = await prisma.customer.findUnique({
      where: {
        userId: user.id
      }
    });
    
    if (!customer || !customer.stripeCustomerId) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cliente no encontrado en Stripe' 
      });
    }
    
    // Crear sesión de portal
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/dashboard`,
    });
    
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error al crear portal de cliente:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error al crear el portal de cliente',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

/**
 * Cancelar una suscripción
 * POST /api/payments/cancel-subscription
 */
router.post('/cancel-subscription', async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const user = req.user; // El usuario autenticado desde el middleware verifyToken
    
    // Buscar la suscripción en la base de datos
    const subscription = await prisma.subscription.findUnique({
      where: {
        id: subscriptionId
      }
    });
    
    if (!subscription) {
      return res.status(404).json({ 
        success: false, 
        message: 'Suscripción no encontrada' 
      });
    }
    
    // Verificar que la suscripción pertenece al usuario
    if (subscription.userId !== user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'No autorizado para cancelar esta suscripción' 
      });
    }
    
    // Cancelar la suscripción en Stripe
    if (subscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(
        subscription.stripeSubscriptionId,
        {cancel_at_period_end: true}
      );
    }
    
    // Actualizar el estado en la base de datos
    await prisma.subscription.update({
      where: {
        id: subscriptionId
      },
      data: {
        cancelAtPeriodEnd: true
      }
    });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Suscripción cancelada correctamente. Seguirá activa hasta el final del período actual.' 
    });
  } catch (error) {
    console.error('Error al cancelar suscripción:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error al cancelar la suscripción',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

module.exports = router;
