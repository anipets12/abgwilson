#!/usr/bin/env node

/**
 * Script de configuración segura para Abogado Wilson
 * 
 * Este script ayuda a configurar las variables de entorno de forma segura
 * y verifica la integridad de las credenciales sin exponerlas.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ruta del archivo .env
const ENV_FILE = path.join(__dirname, '..', '.env');
// Ruta del archivo .env.example
const ENV_EXAMPLE_FILE = path.join(__dirname, '..', 'env.example');

// Variables requeridas para la configuración
const REQUIRED_VARS = [
  'DATABASE_URL',
  'JWT_SECRET',
  'SUPABASE_URL',
  'SUPABASE_KEY',
  'CLOUDFLARE_TURNSTILE_SITE_KEY',
  'CLOUDFLARE_TURNSTILE_SECRET_KEY',
  'STRIPE_PUBLIC_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET'
];

// Variables públicas (expuestas al cliente)
const PUBLIC_VARS = [
  'VITE_SUPABASE_URL',
  'VITE_CLOUDFLARE_TURNSTILE_SITE_KEY',
  'VITE_STRIPE_PUBLIC_KEY',
  'VITE_API_BASE_URL'
];

// Función para verificar la existencia y validez del archivo .env
async function checkEnvFile() {
  console.log('\n🔐 Verificando configuración de seguridad para Abogado Wilson...\n');
  
  // Verificar si existe el archivo .env
  if (!fs.existsSync(ENV_FILE)) {
    console.log('⚠️ No se encontró el archivo .env');
    
    if (fs.existsSync(ENV_EXAMPLE_FILE)) {
      console.log('✅ Se encontró el archivo env.example');
      await createEnvFromExample();
    } else {
      console.log('❌ No se encontró el archivo env.example');
      await createNewEnvFile();
    }
  } else {
    console.log('✅ Se encontró el archivo .env');
    await validateEnvFile();
  }
}

// Crear .env desde env.example
async function createEnvFromExample() {
  console.log('\n📝 Creando archivo .env desde env.example...');
  
  try {
    const exampleContent = fs.readFileSync(ENV_EXAMPLE_FILE, 'utf8');
    fs.writeFileSync(ENV_FILE, exampleContent);
    console.log('✅ Archivo .env creado correctamente');
    await validateEnvFile();
  } catch (error) {
    console.error('❌ Error al crear archivo .env:', error.message);
    process.exit(1);
  }
}

// Crear nuevo archivo .env
async function createNewEnvFile() {
  console.log('\n📝 Creando nuevo archivo .env...');
  
  // Contenido básico para el archivo .env
  const basicEnvContent = `# Archivo de configuración para Abogado Wilson
# Creado automaticamente por secure-setup.js
# IMPORTANTE: Nunca compartir este archivo ni añadirlo a control de versiones

# Variables de Base de Datos
DATABASE_URL="your_database_url_here"

# Seguridad
JWT_SECRET="${generateRandomString(32)}"

# Supabase
VITE_SUPABASE_URL="your_supabase_url_here"
SUPABASE_KEY="your_supabase_key_here"

# Cloudflare Turnstile (Protección contra bots)
VITE_CLOUDFLARE_TURNSTILE_SITE_KEY="your_turnstile_site_key_here"
CLOUDFLARE_TURNSTILE_SECRET_KEY="your_turnstile_secret_key_here"

# Stripe (Pagos)
VITE_STRIPE_PUBLIC_KEY="your_stripe_public_key_here"
STRIPE_SECRET_KEY="your_stripe_secret_key_here"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret_here"

# API Base URL
VITE_API_BASE_URL="/api"
`;

  try {
    fs.writeFileSync(ENV_FILE, basicEnvContent);
    console.log('✅ Archivo .env creado correctamente con valores predeterminados');
    console.log('⚠️ Debe editar el archivo .env y completar los valores reales');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear archivo .env:', error.message);
    process.exit(1);
  }
}

// Validar el archivo .env existente
async function validateEnvFile() {
  console.log('\n🔍 Validando variables de entorno...');
  
  try {
    const envContent = fs.readFileSync(ENV_FILE, 'utf8');
    const envLines = envContent.split('\n');
    const envVars = {};
    
    // Extraer variables de entorno
    envLines.forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim().replace(/^["']|["']$/g, '');
          envVars[key] = value;
        }
      }
    });
    
    // Verificar variables requeridas
    const missingVars = [];
    REQUIRED_VARS.forEach(varName => {
      const varValue = envVars[varName];
      if (!varValue || varValue.includes('your_') || varValue === '') {
        missingVars.push(varName);
      }
    });
    
    if (missingVars.length > 0) {
      console.log('⚠️ Las siguientes variables de entorno no están correctamente configuradas:');
      missingVars.forEach(varName => {
        console.log(`   - ${varName}`);
      });
      console.log('\n⚠️ Por favor, edite el archivo .env y complete los valores reales');
    } else {
      console.log('✅ Todas las variables de entorno requeridas están configuradas');
      
      // Verificar variables expuestas al cliente
      const publicVarsMissing = [];
      PUBLIC_VARS.forEach(varName => {
        if (!envVars[varName]) {
          publicVarsMissing.push(varName);
        }
      });
      
      if (publicVarsMissing.length > 0) {
        console.log('⚠️ Las siguientes variables públicas no están configuradas:');
        publicVarsMissing.forEach(varName => {
          console.log(`   - ${varName}`);
        });
        console.log('\n⚠️ Estas variables son necesarias para el funcionamiento del cliente');
      } else {
        console.log('✅ Todas las variables públicas están configuradas');
      }
      
      // Verificar seguridad de JWT
      if (envVars.JWT_SECRET && envVars.JWT_SECRET.length < 32) {
        console.log('⚠️ La clave JWT_SECRET es demasiado corta. Se recomienda una longitud mínima de 32 caracteres');
      } else {
        console.log('✅ JWT_SECRET tiene una longitud adecuada');
      }
    }
    
    // Indicar al usuario cómo proceder
    console.log('\n📋 Próximos pasos:');
    console.log('1. Asegúrese de que todas las variables estén correctamente configuradas');
    console.log('2. Ejecute "npm run dev" para iniciar el servidor de desarrollo');
    console.log('3. Si es la primera vez, ejecute "npm run setup" para configurar la base de datos');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al validar archivo .env:', error.message);
    process.exit(1);
  }
}

// Función para generar una cadena aleatoria
function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

// Ejecutar la verificación
checkEnvFile();
