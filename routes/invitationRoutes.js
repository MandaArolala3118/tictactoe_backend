const express = require('express');
const router = express.Router();
const { invitationController } = require('../controllers');

// GET /api/invitations/:id - Obtenir une invitation par ID
router.get('/:id', invitationController.getById);

// GET /api/invitations/key/:gameKey - Obtenir une invitation par clé de jeu
router.get('/key/:gameKey', invitationController.getByGameKey);

// GET /api/invitations/user/:userId - Obtenir les invitations d'un utilisateur
router.get('/user/:userId', invitationController.getByUser);

// POST /api/invitations - Créer une nouvelle invitation
router.post('/', invitationController.create);

// POST /api/invitations/party - Créer une invitation pour une partie
router.post('/party', invitationController.createPartyGame);

// PUT /api/invitations/:id - Mettre à jour une invitation
router.put('/:id', invitationController.update);

// DELETE /api/invitations/:id - Supprimer une invitation
router.delete('/:id', invitationController.delete);

module.exports = router;
