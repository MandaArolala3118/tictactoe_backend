require('dotenv').config();

// Utiliser la variable d'environnement pour la configuration SSL
// NODE_TLS_REJECT_UNAUTHORIZED=0 désactive la vérification SSL (développement uniquement)
// NODE_TLS_REJECT_UNAUTHORIZED=1 active la vérification SSL (production recommandé)

// Importer fetch polyfill pour Node.js v20+
const { default: fetch } = require('node-fetch');
global.fetch = fetch;

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
