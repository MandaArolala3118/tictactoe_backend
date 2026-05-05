// Move model - définit la structure des données de mouvement
// Les opérations CRUD sont dans controllers/moveController.js

class Move {
  constructor(data) {
    this.id = data.id;
    this.game_id = data.game_id;
    this.player_id = data.player_id;
    this.position = data.position;
    this.move_number = data.move_number;
    this.played_at = data.played_at;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Validation des données
  static validate(moveData) {
    if (!moveData.game_id) {
      throw new Error('Game ID is required');
    }
    if (!moveData.player_id) {
      throw new Error('Player ID is required');
    }
    if (moveData.position === undefined || moveData.position === null) {
      throw new Error('Position is required');
    }
    if (moveData.position < 0 || moveData.position > 8) {
      throw new Error('Position must be between 0 and 8');
    }
    if (!moveData.move_number || moveData.move_number < 1) {
      throw new Error('Move number must be greater than 0');
    }
    return true;
  }

  // Formatage des données pour l'insertion
  static toDatabase(moveData) {
    return {
      game_id: moveData.game_id,
      player_id: moveData.player_id,
      position: moveData.position,
      move_number: moveData.move_number,
      played_at: moveData.played_at || new Date().toISOString()
    };
  }
}

module.exports = Move;
