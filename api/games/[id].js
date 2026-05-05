const express = require('express');
const cors = require('cors');
const { gameController } = require('../../controllers/index');

const router = express.Router();

// Middleware
router.use(cors());
router.use(express.json());

// GET /api/games/:id - Obtenir un jeu par ID
router.get('/', gameController.getById);

// PUT /api/games/:id - Mettre à jour un jeu
router.put('/', gameController.update);

// DELETE /api/games/:id - Supprimer un jeu
router.delete('/', gameController.delete);

module.exports = router;
