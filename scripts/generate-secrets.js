#!/usr/bin/env node

/**
 * Generate secure random secrets for Elevate production environment
 * Usage: node scripts/generate-secrets.js
 */

const crypto = require('crypto');

console.log('='.repeat(60));
console.log('ELEVATE - SECURE SECRET GENERATOR');
console.log('='.repeat(60));
console.log('');

console.log('Copy these values to your .env.production file:\n');

// Generate ACCESS_TOKEN_SECRET
const accessTokenSecret = crypto.randomBytes(32).toString('hex');
console.log(`ACCESS_TOKEN_SECRET=${accessTokenSecret}`);

// Generate REFRESH_TOKEN_SECRET
const refreshTokenSecret = crypto.randomBytes(32).toString('hex');
console.log(`REFRESH_TOKEN_SECRET=${refreshTokenSecret}`);

// Generate CHROME_TOKEN
const chromeToken = crypto.randomBytes(32).toString('hex');
console.log(`CHROME_TOKEN=${chromeToken}`);

console.log('');
console.log('='.repeat(60));
console.log('IMPORTANT: Store these secrets securely!');
console.log('Never commit them to version control.');
console.log('='.repeat(60));

