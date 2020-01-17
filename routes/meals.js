//// User meals routes

const { Meal, validateMeal } = require("../models/meal");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validateId = require("../middleware/validateId");

router.get("/", (req, res) => {
  res.send("Got");
});

router.post("/", auth, (req, res) => {
  res.send("Posted");
});

router.put("/:id", [auth, validateId], (req, res) => {
  res.send("Put");
});

router.delete("/:id", auth, (req, res) => {
  res.send("Deleted");
});

module.exports = router;
