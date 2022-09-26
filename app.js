// Call express modules
const express = require("express");
// Call mongoose packages
const mongoose = require("mongoose");
// Call .env files - security module
require("dotenv").config();
// console.log(process.env);
const helmet = require("helmet");
// Call module for limite the time of your connexion
const rateLimit = require("express-rate-limit");

// Routes importations
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

// path access
const path = require("path");

// Connect to database MongoDB
mongoose
  .connect(
    "mongodb+srv://user:Budokai33@clusterp6.iusvsi5.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Create express application
const app = express();

// Pour gérer la requête POST venant de l'application front-end (extraction du json)
app.use(express.json());

// CORS app access config
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// Get .env file content
app.get("/", function (req, res) {
  res.send(process.env.S3_BUCKET);
});
// Create the limiter time for express-rate-limit module
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // Limit each IP to 25 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

// Register Routes in app
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images"))); // groutes gestionnary for POST images
app.use(helmet());
app.use(limiter);

// export modules for the application
module.exports = app;
