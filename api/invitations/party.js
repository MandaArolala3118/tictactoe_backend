const express = require('express');
const cors = require('cors');
const { invitationController } = require('../../controllers/index');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://tictactoe-manda-arolala-andrianina.vercel.app', 'http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());

// Route spécifique pour POST /party
app.post('/', invitationController.createPartyGame);

module.exports = app;
