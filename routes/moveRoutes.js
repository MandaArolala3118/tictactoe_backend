const express = require('express');
const router = express.Router();
const { moveController } = require('../controllers');

// GET /api/moves - Obtenir tous les mouvements
router.get('/', moveController.getAll);

// GET /api/moves/:id - Obtenir un mouvement par ID
router.get('/:id', moveController.getById);

// GET /api/moves/game/:gameId - Obtenir les mouvements d'un jeu
router.get('/game/:gameId', moveController.getByGame);

// POST /api/moves - Créer un nouveau mouvement
router.post('/', moveController.create);

// DELETE /api/moves/:id - Supprimer un mouvement
router.delete('/:id', moveController.delete);

module.exports = router;
