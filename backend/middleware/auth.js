/**
 * Middleware de autenticación para Abogado Wilson
 * Implementa verificación de tokens JWT y control de acceso
 */

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Middleware para verificar tokens JWT
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función para continuar al siguiente middleware
 */
const verifyToken = async (req, res, next) => {
  try {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No se proporcionó token de autenticación'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verificar si el token está en la lista negra
    const tokenInBlacklist = await prisma.tokenBlacklist.findUnique({
      where: {
        token
      }
    });
    
    if (tokenInBlacklist) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o ha expirado'
      });
    }
    
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    // Añadir información del usuario a la solicitud
    req.user = user;
    req.token = token;
    
    // Registrar acceso para auditoría
    await prisma.accessLog.create({
      data: {
        userId: user.id,
        endpoint: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] || '',
        timestamp: new Date()
      }
    });
    
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Error al verificar la autenticación',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
};

/**
 * Middleware para verificar roles de usuario
 * @param {string[]} roles - Roles permitidos para acceder al recurso
 * @returns {Function} Middleware de verificación de roles
 */
const verifyRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para acceder a este recurso'
      });
    }
    
    next();
  };
};

/**
 * Middleware para verificar suscripción premium
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función para continuar al siguiente middleware
 */
const verifyPremiumSubscription = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }
    
    // Verificar si el usuario tiene una suscripción premium activa
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: req.user.id,
        status: 'active',
        plan: {
          isPremium: true
        }
      }
    });
    
    if (!subscription) {
      return res.status(403).json({
        success: false,
        message: 'Requiere suscripción premium para acceder a este recurso',
        requiresPremium: true
      });
    }
    
    next();
  } catch (error) {
    console.error('Error al verificar suscripción premium:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al verificar suscripción',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
    });
  }
};

module.exports = {
  verifyToken,
  verifyRoles,
  verifyPremiumSubscription
};
