const express = require('express');
const cors = require('cors');
const { moveController } = require('../../controllers/index');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://tictactoe-manda-arolala-andrianina.vercel.app', 'http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', moveController.getAll);
app.post('/', moveController.create);
app.get('/:id', moveController.getById);

module.exports = app;
