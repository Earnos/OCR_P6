// Call express modules
const express = require("express");
// Call mongoose packages
const mongoose = require("mongoose");
// Call du models de données
const Thing = require("./models/Thing");
// Routes importation
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

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

// Register Routes in app
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

// export modules for the application
module.exports = app;
