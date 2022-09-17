const express = require("express");
// Create an Express router
const router = express.router();
// import model data
const Thing = require("../models/Thing");
// import all controllers
const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.getAllStuff);
router.post("/", auth, saucesCtrl.createThing);
router.get("/:id", auth, saucesCtrl.getOneThing);
router.put("/:id", auth, saucesCtrl.modifyThing);
router.delete("/:id", auth, saucesCtrl.deleteThing);

module.exports = router;
