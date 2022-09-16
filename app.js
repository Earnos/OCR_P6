// Call express modules
const express = require("express");
// Call mongoose packages
const mongoose = require("mongoose");

// Create express application
const app = express();

// Connect to database MongoDB
mongoose
  .connect(
    "mongodb+srv://user:Budokai33@clusterp6.iusvsi5.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// MIDDLEWARE's creations
app.use((req, res, next) => {
  console.log(req);
  next();
});

app.use((req, res) => {
  res.status(201);
});

// export modules for the application
module.exports = app;
