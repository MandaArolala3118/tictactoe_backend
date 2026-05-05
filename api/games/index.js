const express = require('express');
const cors = require('cors');
const { gameController } = require('../../controllers/index');

const router = express.Router();

// Middleware
router.use(cors());
router.use(express.json());

// GET /api/games - Obtenir tous les jeux
router.get('/', gameController.getAll);

// GET /api/games/player/:playerId - Obtenir les jeux d'un joueur
router.get('/player/:playerId', gameController.getByPlayer);

// POST /api/games - Créer un nouveau jeu
router.post('/', gameController.create);

module.exports = router;
