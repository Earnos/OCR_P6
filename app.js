// express modules
const express = require("express");
// mongoose packages
const mongoose = require("mongoose");
// .env files - security module
require("dotenv").config();
// Security module for cookies and headers http request protection
const helmet = require("helmet");
// module for limit the time of your connexion
const rateLimit = require("express-rate-limit");

// Routes importations
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

// path access
const path = require("path");
// Connect to database MongoDB
mongoose
  .connect(process.env.SECRET_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
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

// Create the limiter time for express-rate-limit module
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // Limit each IP to 25 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

// Register Routes in app
app.use("/images", express.static(path.join(__dirname, "images"))); // routes gestionnary for POST images
app.use(helmet());
app.use(limiter);
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

// export modules for the application
module.exports = app;
