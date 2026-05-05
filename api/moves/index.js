const express = require('express');
const cors = require('cors');
const { moveController } = require('../../controllers/index');

const router = express.Router();

// Middleware
router.use(express.json());

// GET /api/moves - Obtenir tous les mouvements
router.get('/', moveController.getAll);

// POST /api/moves - Créer un nouveau mouvement
router.post('/', moveController.create);

// GET /api/moves/:id - Obtenir un mouvement par ID
router.get('/:id', moveController.getById);

module.exports = router;
