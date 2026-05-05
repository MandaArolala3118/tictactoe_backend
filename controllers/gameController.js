const supabase = require('../config/database');
const Game = require('../models/Game');

class GameController {
  // Créer un jeu
  static async create(req, res) {
    try {
      Game.validate(req.body);
      const gameData = Game.toDatabase(req.body);
      
      const { data, error } = await supabase
        .from('games')
        .insert(gameData)
        .select()
        .single();
      
      if (error) throw error;
      
      res.status(201).json(new Game(data));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtenir un jeu par ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
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

  // Obtenir les jeux d'un joueur
  static async getByPlayer(req, res) {
    try {
      const { playerId } = req.params;
      
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .or(`player_x_id.eq.${playerId},player_o_id.eq.${playerId}`);
      
      if (error) throw error;
      
      const games = data.map(game => new Game(game));
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir tous les jeux
  static async getAll(req, res) {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*');
      
      if (error) throw error;
      
      const games = data.map(game => new Game(game));
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Mettre à jour un jeu
  static async update(req, res) {
    try {
      const { id } = req.params;
      Game.validate(req.body);
      const gameData = Game.toDatabase(req.body);
      
      const { data, error } = await supabase
        .from('games')
        .update(gameData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Game not found' });
        }
        throw error;
      }
      
      res.json(new Game(data));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Supprimer un jeu
  static async delete(req, res) {
    try {
      const { id } = req.params;
      
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Game not found' });
        }
        throw error;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = GameController;
