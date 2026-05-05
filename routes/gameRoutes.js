const express = require('express');
const router = express.Router();
const { gameController } = require('../controllers');

// GET /api/games - Obtenir tous les jeux
router.get('/', gameController.getAll);

// GET /api/games/:id - Obtenir un jeu par ID
router.get('/:id', gameController.getById);

// GET /api/games/player/:playerId - Obtenir les jeux d'un joueur
router.get('/player/:playerId', gameController.getByPlayer);

// POST /api/games - Créer un nouveau jeu
router.post('/', gameController.create);

// PUT /api/games/:id - Mettre à jour un jeu
router.put('/:id', gameController.update);

// DELETE /api/games/:id - Supprimer un jeu
router.delete('/:id', gameController.delete);

module.exports = router;
