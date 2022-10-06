const express = require("express");

// Identification module
const auth = require("../middleware/auth");

// Create an Express router
const router = express.Router();

// import all controllers
const saucesCtrl = require("../controllers/sauces");

// import of multer (files gestionnary)
const multer = require("../middleware/multer-config");

router.get("/", auth, saucesCtrl.getAllSauces);
router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauces);

module.exports = router;
