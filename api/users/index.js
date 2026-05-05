const express = require('express');
const cors = require('cors');
const { userController } = require('../../controllers/index');

const router = express.Router();

// Middleware
router.use(express.json());

// GET /api/users - Obtenir tous les utilisateurs
router.get('/', userController.getAll);

// POST /api/users - Créer un nouvel utilisateur
router.post('/', userController.create);

// GET /api/users/:id - Obtenir un utilisateur par ID
router.get('/:id', userController.getById);

module.exports = router;
