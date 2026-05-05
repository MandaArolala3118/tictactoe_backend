const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./userRoutes');
const invitationRoutes = require('./invitationRoutes');
const gameRoutes = require('./gameRoutes');
const moveRoutes = require('./moveRoutes');

// Use routes
router.use('/users', userRoutes);
router.use('/invitations', invitationRoutes);
router.use('/games', gameRoutes);
router.use('/moves', moveRoutes);

module.exports = router;
