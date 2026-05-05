// User model - définit la structure des données utilisateur
// Les opérations CRUD sont dans controllers/userController.js

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Validation des données
  static validate(userData) {
    if (!userData.username || userData.username.trim().length === 0) {
      throw new Error('Username is required');
    }
    if (userData.username.length > 255) {
      throw new Error('Username too long (max 255 characters)');
    }
    return true;
  }

  // Formatage des données pour l'insertion
  static toDatabase(userData) {
    return {
      username: userData.username.trim()
    };
  }
}

module.exports = User;
