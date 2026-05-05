require('dotenv').config();

// Désactiver les avertissements SSL pour le développement
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Importer fetch polyfill pour Node.js v20+
const { default: fetch } = require('node-fetch');
global.fetch = fetch;

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
