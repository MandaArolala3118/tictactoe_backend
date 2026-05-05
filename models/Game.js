// Game model - définit la structure des données de jeu
// Les opérations CRUD sont dans controllers/gameController.js

class Game {
  constructor(data) {
    this.id = data.id;
    this.player_x_id = data.player_x_id;
    this.player_o_id = data.player_o_id;
    this.state = data.state || {
      board: Array(9).fill(null),
      winner: null,
      isDraw: false
    };
    this.current_turn = data.current_turn || 'X';
    this.status = data.status || 'waiting';
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Validation des données
  static validate(gameData) {
    if (!gameData.player_x_id) {
      throw new Error('Player X is required');
    }
    if (gameData.current_turn && !['X', 'O'].includes(gameData.current_turn)) {
      throw new Error('Current turn must be X or O');
    }
    if (gameData.status && !['waiting', 'playing', 'finished', 'abandoned'].includes(gameData.status)) {
      throw new Error('Invalid status');
    }
    return true;
  }

  // Formatage des données pour l'insertion
  static toDatabase(gameData) {
    return {
      player_x_id: gameData.player_x_id,
      player_o_id: gameData.player_o_id || null,
      state: gameData.state || {
        board: Array(9).fill(null),
        winner: null,
        isDraw: false
      },
      current_turn: gameData.current_turn || 'X',
      status: gameData.status || 'waiting'
    };
  }
}

module.exports = Game;
