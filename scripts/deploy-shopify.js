#!/usr/bin/env node

/**
 * Shopify Theme Deploy Script
 * Sube archivos de la carpeta shopify/ a tu tienda Shopify
 * 
 * Uso:
 *   node scripts/deploy-shopify.js
 * 
 * Requisitos:
 *   - Node.js 16+
 *   - Configurar variables de entorno:
 *     SHOPIFY_SHOP=tu-tienda.myshopify.com
 *     SHOPIFY_ADMIN_API_ACCESS_TOKEN=tu_token
 *     SHOPIFY_THEME_ID=theme_id (opcional)
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuración
const SHOPIFY_SHOP = process.env.SHOPIFY_SHOP;
const SHOPIFY_ADMIN_API_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
const SHOPIFY_THEME_ID = process.env.SHOPIFY_THEME_ID || 'current';
const API_VERSION = '2024-01';

// Validar configuración
if (!SHOPIFY_SHOP || !SHOPIFY_ADMIN_API_ACCESS_TOKEN) {
  console.error('❌ Error: Missing required environment variables');
  console.error('   SHOPIFY_SHOP: Your store URL (e.g., tu-tienda.myshopify.com)');
  console.error('   SHOPIFY_ADMIN_API_ACCESS_TOKEN: Admin API access token');
  console.error('');
  console.error('How to get the access token:');
  console.error('  1. Go to Shopify Admin → Apps → Develop apps → API credentials');
  console.error('  2. Create a custom app with "write_themes" permission');
  console.error('  3. Generate an Admin API access token');
  process.exit(1);
}

const API_BASE_URL = `https://${SHOPIFY_SHOP}/admin/api/${API_VERSION}`;

// Crear cliente HTTP
const shopifyApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
    'Content-Type': 'application/json'
  }
});

/**
 * Subir un archivo a Shopify
 */
async function uploadFile(filePath, relativePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // El key en Shopify es la ruta relativa sin la carpeta base
    const key = relativePath.replace(/^shopify\//, '');
    
    const payload = {
      asset: {
        key: key,
        value: fileContent
      }
    };
    
    const url = `/themes/${SHOPIFY_THEME_ID}/assets.json`;
    const response = await shopifyApi.put(url, payload);
    
    if (response.data && response.data.asset) {
      console.log(`  ✅ ${key}`);
      return true;
    } else {
      console.log(`  ⚠️  ${key} - Unexpected response:`, response.data);
      return false;
    }
  } catch (error) {
    console.log(`  ❌ ${relativePath} - Error:`, error.message);
    if (error.response) {
      console.log(`     Status: ${error.response.status}`);
      console.log(`     Data:`, error.response.data);
    }
    return false;
  }
}

/**
 * Buscar todos los archivos .liquid y .json en una carpeta
 */
function findThemeFiles(directory) {
  const files = [];
  
  function walk(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile() && (item.endsWith('.liquid') || item.endsWith('.json'))) {
        files.push(fullPath);
      }
    }
  }
  
  walk(directory);
  return files;
}

/**
 * Función principal
 */
async function main() {
  const shopifyDir = path.join(__dirname, '..', 'shopify');
  
  if (!fs.existsSync(shopifyDir)) {
    console.error(`❌ Error: Directory not found: ${shopifyDir}`);
    console.error('   Make sure you have a "shopify/" folder in your project');
    process.exit(1);
  }
  
  console.log('🚀 Shopify Theme Deploy');
  console.log('========================');
  console.log(`Store: ${SHOPIFY_SHOP}`);
  console.log(`Theme: ${SHOPIFY_THEME_ID}`);
  console.log('');
  
  // Buscar archivos
  const files = findThemeFiles(shopifyDir);
  
  if (files.length === 0) {
    console.log('⚠️  No .liquid or .json files found in shopify/');
    process.exit(0);
  }
  
  console.log(`Found ${files.length} files to deploy:`);
  console.log('');
  
  // Subir archivos
  let successCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    const relativePath = path.relative(path.join(__dirname, '..'), file);
    const success = await uploadFile(file, relativePath);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }
  
  console.log('');
  console.log('📊 Summary:');
  console.log(`  Total files: ${files.length}`);
  console.log(`  Successful: ${successCount}`);
  console.log(`  Failed: ${errorCount}`);
  
  if (errorCount > 0) {
    console.log('');
    console.log('⚠️  Some files failed to upload. Check the errors above.');
    process.exit(1);
  } else {
    console.log('');
    console.log('✅ All files deployed successfully!');
    console.log('');
    console.log('Your Shopify theme has been updated with the latest changes.');
  }
}

// Ejecutar
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
