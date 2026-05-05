const express = require("express");
const cors = require("cors");
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend morpion OK");
});

// API routes
app.use('/api', routes);

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});