// Invitation model - définit la structure des données d'invitation
// Les opérations CRUD sont dans controllers/invitationController.js

class Invitation {
  constructor(data) {
    this.id = data.id;
    this.from_user_id = data.from_user_id;
    this.game_id = data.game_id;
    this.game_key = data.game_key;
    this.status = data.status || 'pending';
    this.expires_at = data.expires_at;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Validation des données
  static validate(invitationData) {
    if (!invitationData.from_user_id) {
      throw new Error('From user ID is required');
    }
    if (!invitationData.game_key || invitationData.game_key.trim().length === 0) {
      throw new Error('Game key is required');
    }
    if (invitationData.status && !['pending', 'accepted', 'declined', 'expired'].includes(invitationData.status)) {
      throw new Error('Invalid status');
    }
    return true;
  }

  // Formatage des données pour l'insertion
  static toDatabase(invitationData) {
    return {
      from_user_id: invitationData.from_user_id,
      game_id: invitationData.game_id,
      game_key: invitationData.game_key.trim(),
      status: invitationData.status || 'pending',
      expires_at: invitationData.expires_at || new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
    };
  }
}

module.exports = Invitation;
