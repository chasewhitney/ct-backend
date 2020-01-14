const { Meal } = require("../models/meal");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Got");
});

module.exports = router;
