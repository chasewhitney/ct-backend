//// User meals routes

const { Meal, validate } = require("../models/meal");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("Got");
});

router.post("/", auth, (req, res) => {
  res.send("Got");
});

module.exports = router;
