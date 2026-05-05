const supabase = require('../config/database');
const User = require('../models/User');

class UserController {
  // Créer un utilisateur
  static async create(req, res) {
    try {
      User.validate(req.body);
      const userData = User.toDatabase(req.body);
      
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single();
      
      if (error) throw error;
      
      res.status(201).json(new User(data));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtenir un utilisateur par ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'User not found' });
        }
        throw error;
      }
      
      res.json(new User(data));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir un utilisateur par username
  static async getByUsername(req, res) {
    try {
      const { username } = req.params;
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(new User(data));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtenir tous les utilisateurs
  static async getAll(req, res) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      
      if (error) throw error;
      
      const users = data.map(user => new User(user));
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Mettre à jour un utilisateur
  static async update(req, res) {
    try {
      const { id } = req.params;
      User.validate(req.body);
      const userData = User.toDatabase(req.body);
      
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'User not found' });
        }
        throw error;
      }
      
      res.json(new User(data));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Supprimer un utilisateur
  static async delete(req, res) {
    try {
      const { id } = req.params;
      
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'User not found' });
        }
        throw error;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
