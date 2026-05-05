const express = require('express');
const cors = require('cors');
const { invitationController } = require('../../controllers/index');

const router = express.Router();

// Middleware
router.use(express.json());

// GET /api/invitations - Obtenir toutes les invitations
router.get('/', invitationController.getAll);

// POST /api/invitations - Créer une nouvelle invitation
router.post('/', invitationController.create);

// GET /api/invitations/:id - Obtenir une invitation par ID
router.get('/:id', invitationController.getById);

// POST /api/invitations/party - Créer une invitation pour une partie
router.post('/party', invitationController.createPartyGame);

module.exports = router;
