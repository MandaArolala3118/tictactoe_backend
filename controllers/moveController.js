const supabase = require('../config/database');
const Move = require('../models/Move');

class MoveController {
  // Créer un mouvement
  static async create(req, res) {
    try {
      Move.validate(req.body);
      const moveData = Move.toDatabase(req.body);
      
      const { data, error } = await supabase
        .from('moves')
        .insert(moveData)
        .select()
        .single();
      
      if (error) throw error;
      
      res.status(201).json(new Move(data));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtenir un mouvement par ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await supabase
        .from('moves')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Move not found' });
        }
        throw error;
      }
      
      res.json(new Move(data));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir les mouvements d'un jeu
  static async getByGame(req, res) {
    try {
      const { gameId } = req.params;
      
      const { data, error } = await supabase
        .from('moves')
        .select('*')
        .eq('game_id', gameId)
        .order('move_number', { ascending: true });
      
      if (error) throw error;
      
      const moves = data.map(move => new Move(move));
      res.json(moves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir tous les mouvements
  static async getAll(req, res) {
    try {
      const { data, error } = await supabase
        .from('moves')
        .select('*');
      
      if (error) throw error;
      
      const moves = data.map(move => new Move(move));
      res.json(moves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Supprimer un mouvement
  static async delete(req, res) {
    try {
      const { id } = req.params;
      
      const { error } = await supabase
        .from('moves')
        .delete()
        .eq('id', id);
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Move not found' });
        }
        throw error;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MoveController;
