const express = require('express');
const router = express.Router();
const joinGameController = require('../controllers/joinGameController');

// Route pour rejoindre une partie et créer un jeu
router.post('/join', joinGameController.joinGame);

// Route pour obtenir les détails d'un jeu
router.get('/:gameId', joinGameController.getGame);

module.exports = router;
