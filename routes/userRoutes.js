const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

// GET /api/users - Obtenir tous les utilisateurs
router.get('/', userController.getAll);

// GET /api/users/:id - Obtenir un utilisateur par ID
router.get('/:id', userController.getById);

// POST /api/users - Créer un nouvel utilisateur
router.post('/', userController.create);
// DELETE /api/users/:id - Supprimer un utilisateur
router.delete('/:id', userController.delete);

module.exports = router;
