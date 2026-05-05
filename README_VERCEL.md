# Déploiement du backend sur Vercel

## Configuration effectuée

1. **vercel.json** : Configuration du déploiement avec les routes vers les fonctions serverless
2. **api/index.js** : Point d'entrée principal pour Vercel
3. **package.json** : Scripts de build et start ajoutés
4. **.vercelignore** : Fichiers à ignorer lors du déploiement

## Variables d'environnement

Configurez ces variables dans le dashboard Vercel :

- `SUPABASE_URL` : URL de votre projet Supabase
- `SUPABASE_ANON_KEY` : Clé anonyme Supabase
- `SUPABASE_SERVICE_ROLE_KEY` : Clé service role Supabase
- `NODE_TLS_REJECT_UNAUTHORIZED` : Option TLS (0 ou 1)

## Déploiement

1. Connectez-vous à Vercel : `vercel login`
2. Déployez depuis le dossier backend : `vercel`
3. Suivez les instructions pour lier le projet

## Structure des routes

- `/api/*` : Routes de l'API
- `/` : Route racine (health check)

Le backend sera déployé comme des fonctions serverless sur Vercel.
