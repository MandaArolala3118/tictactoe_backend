const express = require("express");
const cors = require("cors");
const routes = require('../routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend morpion OK");
});

// API routes
app.use('/api', routes);

// Export for Vercel
module.exports = app;
