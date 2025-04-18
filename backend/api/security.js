/**
 * API de seguridad para Abogado Wilson
 * Implementa endpoints para verificación de Turnstile y protección contra bots
 */

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Limitar intentos para prevenir ataques de fuerza bruta
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 solicitudes por ventana
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Demasiadas solicitudes, por favor intente más tarde.'
  }
});

// Aplicar limitador a todas las rutas de seguridad
router.use(apiLimiter);

/**
 * Verificar token de Cloudflare Turnstile
 * POST /api/security/verify-turnstile
 */
router.post('/verify-turnstile', async (req, res) => {
  try {
    const { token, action } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token de verificación no proporcionado'
      });
    }
    
    // Verificar el token con Cloudflare
    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: req.ip
      })
    });
    
    const turnstileResult = await turnstileResponse.json();
    
    // Registrar la verificación para auditoría
    await prisma.securityVerification.create({
      data: {
        type: 'turnstile',
        success: turnstileResult.success,
        action: action || 'unknown',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] || '',
        details: JSON.stringify(turnstileResult)
      }
    });
    
    if (!turnstileResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Verificación de seguridad fallida'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Verificación exitosa'
    });
  } catch (error) {
    console.error('Error en verificación Turnstile:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en la verificación de seguridad',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

/**
 * Verificar estado de seguridad
 * GET /api/security/status
 */
router.get('/status', async (req, res) => {
  try {
    // Verificar si la IP está en lista negra
    const ipBlacklisted = await prisma.ipBlacklist.findUnique({
      where: {
        ipAddress: req.ip
      }
    });
    
    if (ipBlacklisted) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado'
      });
    }
    
    // Verificar si hay demasiados intentos fallidos desde esta IP
    const failedAttempts = await prisma.securityVerification.count({
      where: {
        ipAddress: req.ip,
        success: false,
        createdAt: {
          gte: new Date(Date.now() - 60 * 60 * 1000) // Última hora
        }
      }
    });
    
    // Si hay más de 10 intentos fallidos en la última hora, pedir verificación adicional
    const requiresAdditionalVerification = failedAttempts > 10;
    
    return res.status(200).json({
      success: true,
      requiresAdditionalVerification
    });
  } catch (error) {
    console.error('Error al verificar estado de seguridad:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al verificar estado de seguridad',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
});

module.exports = router;
