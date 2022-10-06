const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
// Import a schema's, a restrictions security for passwords
const mdpValidatorRoute = require("../models/mdpvalidator");

router.post("/signup", mdpValidatorRoute, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
