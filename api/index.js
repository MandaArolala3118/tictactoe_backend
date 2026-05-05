const express = require("express");
const cors = require("cors");
const routes = require('../routes');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://tictactoe-manda-arolala-andrianina.vercel.app', 'http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend morpion OK");
});

// API routes
app.use('/api', routes);

// Export for Vercel
module.exports = app;
