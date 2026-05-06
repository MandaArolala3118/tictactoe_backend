const express = require('express');
const cors = require('cors');
const { invitationController } = require('../../controllers/index');

const app = express();

// Middleware
const corsOptions = {
  origin: ['https://tictactoe-manda-arolala-andrianina.vercel.app', 'http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Fallback headers to ensure preflight receives CORS response
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(express.json());

// Routes
app.get('/', invitationController.getAll);
app.get('/key/:gameKey', invitationController.getByGameKey);
app.get('/user/:userId', invitationController.getByUser);
app.post('/', invitationController.create);
app.post('/party', invitationController.createPartyGame);
app.put('/:id', invitationController.update);
app.delete('/:id', invitationController.delete);
app.get('/:id', invitationController.getById);

module.exports = app;
