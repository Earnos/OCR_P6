const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

const mdpValidatorRoute = require("../models/mdpvalidator");

router.post("/signup", mdpValidatorRoute, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
