const supabase = require('../config/database');
const Game = require('../models/Game');
const Invitation = require('../models/Invitation');

class JoinGameController {
  // Rejoindre une partie et créer un jeu
  static async joinGame(req, res) {
    try {
      const { user_id, invitation_id } = req.body;
      
      // Validation des paramètres
      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      if (!invitation_id) {
        return res.status(400).json({ error: 'Invitation ID is required' });
      }
      
      // Récupérer l'invitation pour obtenir le from_user_id
      const { data: invitation, error: invitationError } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', invitation_id)
        .single();
      
      if (invitationError || !invitation) {
        return res.status(404).json({ error: 'Invitation not found' });
      }
      
      // Vérifier que l'invitation n'a pas déjà de game_id
      if (invitation.game_id) {
        return res.status(400).json({ error: 'Game already created for this invitation' });
      }
      
      // Vérifier que l'utilisateur qui rejoint n'est pas le créateur de l'invitation
      if (invitation.from_user_id === user_id) {
        return res.status(400).json({ error: 'Cannot join your own invitation' });
      }
      
      // Déterminer aléatoirement qui est X et qui est O
      const players = [invitation.from_user_id, user_id];
      const randomIndex = Math.floor(Math.random() * 2);
      const player_x_id = players[randomIndex];
      const player_o_id = players[1 - randomIndex];
      
      // Créer le jeu
      const gameData = {
        player_x_id,
        player_o_id,
        state: {
          board: Array(9).fill(null),
          winner: null,
          isDraw: false
        },
        current_turn: 'X',
        status: 'playing'
      };
      
      // Validation avec le modèle Game
      Game.validate(gameData);
      const formattedGameData = Game.toDatabase(gameData);
      
      // Insertion du jeu dans la base de données
      const { data: createdGame, error: gameError } = await supabase
        .from('games')
        .insert(formattedGameData)
        .select()
        .single();
      
      if (gameError) {
        console.error('Error creating game:', gameError);
        return res.status(500).json({ error: 'Failed to create game' });
      }
      
      // Mettre à jour l'invitation avec le game_id
      const { error: updateError } = await supabase
        .from('invitations')
        .update({ 
          game_id: createdGame.id,
          status: 'accepted',
          updated_at: new Date().toISOString()
        })
        .eq('id', invitation_id);
      
      if (updateError) {
        console.error('Error updating invitation:', updateError);
        return res.status(500).json({ error: 'Failed to update invitation' });
      }
      
      const game = new Game(createdGame);
      
      // Notifier WebSocket: jeu créé et invitation mise à jour
      global.io.to(`invitation-${invitation.game_key}`).emit('invitation-updated', {
        id: invitation.id,
        game_key: invitation.game_key,
        game_id: createdGame.id,
        status: 'accepted',
        updated_at: new Date().toISOString()
      });
      
      // Notifier les deux joueurs
      global.io.to(`user-${player_x_id}`).emit('game-created', {
        game: game,
        playerRole: 'X',
        opponent: player_o_id
      });
      
      global.io.to(`user-${player_o_id}`).emit('game-created', {
        game: game,
        playerRole: 'O',
        opponent: player_x_id
      });
      
      res.status(201).json({
        game,
        playerRole: player_x_id === user_id ? 'X' : 'O',
        opponent: player_x_id === user_id ? player_o_id : player_x_id
      });
      
    } catch (error) {
      console.error('Error in joinGame:', error);
      res.status(400).json({ error: error.message });
    }
  }
  
  // Obtenir les détails d'un jeu
  static async getGame(req, res) {
    try {
      const { gameId } = req.params;
      
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', gameId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Game not found' });
        }
        throw error;
      }
      
      res.json(new Game(data));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = JoinGameController;
