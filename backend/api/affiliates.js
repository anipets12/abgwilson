/**
 * API de afiliados para Abogado Wilson
 * Implementa endpoints para el programa de afiliados y referidos
 */

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Asegurar que todos los endpoints requieren autenticación
router.use(verifyToken);

/**
 * Generar un nuevo código de afiliado
 * POST /api/affiliates/generate-code
 */
router.post('/generate-code', async (req, res) => {
  try {
    const user = req.user; // Usuario autenticado desde el middleware verifyToken
    
    // Verificar si el usuario ya tiene un código de afiliado
    const existingAffiliate = await prisma.affiliate.findUnique({
      where: {
        userId: user.id
      }
    });
    
    if (existingAffiliate) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya tiene un código de afiliado',
        code: existingAffiliate.code
      });
    }
    
    // Generar un código único
    const code = generateAffiliateCode(user.name || user.email);
    
    // Registrar el nuevo afiliado
    const affiliate = await prisma.affiliate.create({
      data: {
        userId: user.id,
        code,
        active: true,
        commissionRate: 0.15, // 15% de comisión por defecto
        balance: 0,
        totalEarned: 0
      }
    });
    
    return res.status(201).json({
      success: true,
      message: 'Código de afiliado generado correctamente',
      code: affiliate.code
    });
  } catch (error) {
    console.error('Error al generar código de afiliado:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al generar código de afiliado',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

/**
 * Obtener estado y estadísticas del afiliado
 * GET /api/affiliates/status
 */
router.get('/status', async (req, res) => {
  try {
    const user = req.user; // Usuario autenticado desde el middleware verifyToken
    
    // Buscar información del afiliado
    const affiliate = await prisma.affiliate.findUnique({
      where: {
        userId: user.id
      }
    });
    
    if (!affiliate) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró información de afiliado para este usuario',
        isAffiliate: false
      });
    }
    
    // Obtener estadísticas
    const referralCount = await prisma.referral.count({
      where: {
        affiliateId: affiliate.id
      }
    });
    
    const successfulReferrals = await prisma.referral.count({
      where: {
        affiliateId: affiliate.id,
        status: 'converted'
      }
    });
    
    const pendingPayments = await prisma.payment.count({
      where: {
        affiliateId: affiliate.id,
        status: 'pending'
      }
    });
    
    return res.status(200).json({
      success: true,
      isAffiliate: true,
      code: affiliate.code,
      active: affiliate.active,
      commissionRate: affiliate.commissionRate,
      balance: affiliate.balance,
      totalEarned: affiliate.totalEarned,
      statistics: {
        referralCount,
        successfulReferrals,
        pendingPayments,
        conversionRate: referralCount > 0 ? (successfulReferrals / referralCount) * 100 : 0
      }
    });
  } catch (error) {
    console.error('Error al obtener estado de afiliado:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener estado de afiliado',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

/**
 * Registrar referencia (usado al registrar un nuevo usuario)
 * POST /api/affiliates/register-referral
 */
router.post('/register-referral', async (req, res) => {
  try {
    const { referralCode } = req.body;
    const user = req.user; // Usuario autenticado desde el middleware verifyToken
    
    if (!referralCode) {
      return res.status(400).json({
        success: false,
        message: 'Código de referido no proporcionado'
      });
    }
    
    // Buscar el afiliado por el código
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        code: referralCode,
        active: true
      }
    });
    
    if (!affiliate) {
      return res.status(404).json({
        success: false,
        message: 'Código de referido no válido o inactivo'
      });
    }
    
    // Verificar que el usuario no se esté refiriendo a sí mismo
    if (affiliate.userId === user.id) {
      return res.status(400).json({
        success: false,
        message: 'No puedes usar tu propio código de referido'
      });
    }
    
    // Verificar si el usuario ya ha sido referido
    const existingReferral = await prisma.referral.findFirst({
      where: {
        userId: user.id
      }
    });
    
    if (existingReferral) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya ha sido referido anteriormente'
      });
    }
    
    // Registrar la referencia
    const referral = await prisma.referral.create({
      data: {
        affiliateId: affiliate.id,
        userId: user.id,
        status: 'pending',
        referralDate: new Date()
      }
    });
    
    return res.status(201).json({
      success: true,
      message: 'Referencia registrada correctamente',
      referralId: referral.id
    });
  } catch (error) {
    console.error('Error al registrar referencia:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar referencia',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

/**
 * Obtener historial de referencias y comisiones
 * GET /api/affiliates/history
 */
router.get('/history', async (req, res) => {
  try {
    const user = req.user; // Usuario autenticado desde el middleware verifyToken
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Buscar información del afiliado
    const affiliate = await prisma.affiliate.findUnique({
      where: {
        userId: user.id
      }
    });
    
    if (!affiliate) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró información de afiliado para este usuario'
      });
    }
    
    // Obtener referencias
    const referrals = await prisma.referral.findMany({
      where: {
        affiliateId: affiliate.id
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        referralDate: 'desc'
      },
      skip,
      take: limit
    });
    
    // Obtener el total de referencias
    const totalReferrals = await prisma.referral.count({
      where: {
        affiliateId: affiliate.id
      }
    });
    
    // Obtener pagos
    const payments = await prisma.payment.findMany({
      where: {
        affiliateId: affiliate.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });
    
    // Obtener el total de pagos
    const totalPayments = await prisma.payment.count({
      where: {
        affiliateId: affiliate.id
      }
    });
    
    return res.status(200).json({
      success: true,
      referrals: {
        data: referrals,
        total: totalReferrals,
        page,
        limit,
        totalPages: Math.ceil(totalReferrals / limit)
      },
      payments: {
        data: payments,
        total: totalPayments,
        page,
        limit,
        totalPages: Math.ceil(totalPayments / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener historial:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener historial de referencias y comisiones',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

/**
 * Solicitar pago de comisiones
 * POST /api/affiliates/request-payment
 */
router.post('/request-payment', async (req, res) => {
  try {
    const { amount, paymentMethod, paymentDetails } = req.body;
    const user = req.user; // Usuario autenticado desde el middleware verifyToken
    
    // Validar datos
    if (!amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Datos incompletos para la solicitud de pago'
      });
    }
    
    // Buscar información del afiliado
    const affiliate = await prisma.affiliate.findUnique({
      where: {
        userId: user.id
      }
    });
    
    if (!affiliate) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró información de afiliado para este usuario'
      });
    }
    
    // Verificar que el afiliado tenga saldo suficiente
    if (affiliate.balance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Saldo insuficiente para realizar esta solicitud de pago'
      });
    }
    
    // Registrar la solicitud de pago
    const payment = await prisma.payment.create({
      data: {
        affiliateId: affiliate.id,
        amount: parseFloat(amount),
        paymentMethod,
        paymentDetails: JSON.stringify(paymentDetails),
        status: 'pending',
        createdAt: new Date()
      }
    });
    
    // Actualizar el saldo del afiliado
    await prisma.affiliate.update({
      where: {
        id: affiliate.id
      },
      data: {
        balance: {
          decrement: parseFloat(amount)
        }
      }
    });
    
    return res.status(201).json({
      success: true,
      message: 'Solicitud de pago registrada correctamente',
      paymentId: payment.id,
      status: payment.status
    });
  } catch (error) {
    console.error('Error al solicitar pago:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al solicitar pago de comisiones',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

/**
 * Función para generar un código de afiliado único
 * @param {string} seed - Semilla para generar el código (nombre o email)
 * @returns {string} Código de afiliado
 */
function generateAffiliateCode(seed) {
  // Generar parte aleatoria
  const random = uuidv4().substring(0, 4);
  
  // Tomar las primeras letras del nombre/email
  const prefix = seed
    .substring(0, 3)
    .toUpperCase()
    .replace(/[^A-Z]/g, 'X');
  
  return `${prefix}${random}`;
}

module.exports = router;
