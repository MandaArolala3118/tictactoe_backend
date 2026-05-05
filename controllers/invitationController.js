const supabase = require('../config/database');
const Invitation = require('../models/Invitation');

class InvitationController {
  // Créer une invitation
  static async create(req, res) {
    try {
      Invitation.validate(req.body);
      const invitationData = Invitation.toDatabase(req.body);
      
      const { data, error } = await supabase
        .from('invitations')
        .insert(invitationData)
        .select()
        .single();
      
      if (error) throw error;
      
      res.status(201).json(new Invitation(data));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Créer une invitation pour une partie avec gameKey et user
  static async createPartyGame(req, res) {
    try {
      const { gameKey, user } = req.body;
      
      // Validation des paramètres
      if (!gameKey || typeof gameKey !== 'string' || gameKey.trim().length === 0) {
        return res.status(400).json({ error: 'Game key is required' });
      }
      
      if (!user || !user.id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      // Créer les données d'invitation
      const invitationData = {
        from_user_id: user.id,
        game_id: null, // Pas de game_id spécifique pour une partie simple
        game_key: gameKey.trim(),
        status: 'pending',
        expires_at: new Date(Date.now() + 3600000).toISOString() // Expire dans 1 heure
      };
      
      // Validation avec le modèle
      Invitation.validate(invitationData);
      const formattedData = Invitation.toDatabase(invitationData);
      
      // Insertion dans la base de données
      const { data, error } = await supabase
        .from('invitations')
        .insert(formattedData)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Failed to create invitation' });
      }
      
      res.status(201).json(new Invitation(data));
    } catch (error) {
      console.error('Error in createPartyGame:', error);
      res.status(400).json({ error: error.message });
    }
  }

  // Obtenir une invitation par ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Invitation not found' });
        }
        throw error;
      }
      
      res.json(new Invitation(data));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir une invitation par clé de jeu
  static async getByGameKey(req, res) {
    try {
      const { gameKey } = req.params;
      
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('game_key', gameKey)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) {
        return res.status(404).json({ error: 'Invitation not found' });
      }
      
      res.json(new Invitation(data));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir les invitations d'un utilisateur
  static async getByUser(req, res) {
    try {
      const { userId } = req.params;
      
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('from_user_id', userId);
      
      if (error) throw error;
      
      const invitations = data.map(invitation => new Invitation(invitation));
      res.json(invitations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  // Mettre à jour une invitation
  static async update(req, res) {
    try {
      const { id } = req.params;
      Invitation.validate(req.body);
      const invitationData = Invitation.toDatabase(req.body);
      
      const { data, error } = await supabase
        .from('invitations')
        .update(invitationData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Invitation not found' });
        }
        throw error;
      }
      
      res.json(new Invitation(data));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Supprimer une invitation
  static async delete(req, res) {
    try {
      const { id } = req.params;
      
      const { error } = await supabase
        .from('invitations')
        .delete()
        .eq('id', id);
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Invitation not found' });
        }
        throw error;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = InvitationController;
