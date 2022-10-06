const bcrypt = require("bcrypt");
const User = require("../models/User");
// Package for token connexion attributions
const jwt = require("jsonwebtoken");
//encrypt & decrypt email package
const CryptoJS = require("crypto-js");
// To use environement variables
require("dotenv").config();

exports.signup = (req, res, next) => {
  const emailEncrypt = CryptoJS.HmacSHA256(
    req.body.email,
    `${process.env.CRYPTOJS_EMAIL}`
  ).toString();
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: emailEncrypt,
        password: hash
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const emailDecrypt = CryptoJS.HmacSHA256(
    req.body.email,
    `${process.env.CRYPTOJS_EMAIL}`
  ).toString();
  User.findOne({ email: emailDecrypt })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "Login ou mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res
              .status(401)
              .json({ message: "Login ou mot de passe incorrecte" });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.RANDOM_TOKEN_SECRET,
                {
                  expiresIn: "24h"
                }
              )
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
