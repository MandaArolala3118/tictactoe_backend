# Migration Supabase pour le jeu Morpion

## Étapes pour créer les tables dans Supabase

### Option 1: Via l'interface web (recommandé)

1. **Allez sur Supabase Dashboard**
   - URL: https://supabase.com/dashboard
   - Connectez-vous avec votre compte
   - Sélectionnez votre projet: `amwycegymigipzcrxyuz`

2. **Ouvrez l'éditeur SQL**
   - Dans le menu de gauche, cliquez sur **SQL Editor**
   - Cliquez sur **New query**

3. **Exécutez le schéma complet**
   - Copiez tout le contenu du fichier `database/schema.sql`
   - Collez-le dans l'éditeur SQL
   - Cliquez sur **Run** pour exécuter

### Option 2: Installer Supabase CLI manuellement (Windows)

1. **Téléchargez le CLI Supabase**
   - Allez sur: https://github.com/supabase/cli/releases/latest
   - Téléchargez: `supabase_windows_amd64.exe`
   - Renommez-le en `supabase.exe`
   - Placez-le dans un dossier de votre PATH (ex: C:\Windows\System32)

2. **Utilisez le CLI**
   ```bash
   supabase login
   supabase link --project-ref amwycegymigipzcrxyuz
   supabase db push
   ```

## Structure des tables créées

### Users
- id (UUID, primary key)
- username (VARCHAR unique)
- created_at, updated_at

### Games
- id (UUID, primary key)
- player_x_id (UUID, foreign key → users)
- player_o_id (UUID, foreign key → users, nullable)
- state (JSONB)
- current_turn (X ou O)
- status (waiting, playing, finished, abandoned)
- created_at, updated_at

### Moves
- id (UUID, primary key)
- game_id (UUID, foreign key → games)
- player_id (UUID, foreign key → users)
- position (0-8)
- move_number (integer)
- played_at
- created_at, updated_at

### Invitations
- id (UUID, primary key)
- from_user_id (UUID, foreign key → users)
- game_id (UUID, foreign key → games)
- game_key (VARCHAR unique)
- status (pending, accepted, declined, expired)
- expires_at (timestamp)
- created_at, updated_at

## Vérification après migration

Après avoir exécuté la migration, vérifiez que les tables existent:

1. Dans Supabase Dashboard → **Table Editor**
2. Vous devriez voir les 4 tables: `users`, `games`, `moves`, `invitations`

## Prochaines étapes

Une fois les tables créées, vous pouvez:
1. Tester les modèles dans votre backend
2. Créer les contrôleurs et services
3. Développer les routes API
