//// User meals routes

const { Meal, validateMeal } = require("../models/meal");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validateId = require("../middleware/validateId");
const validate = require("../middleware/validate");
const moment = require("moment");

router.get("/", auth, async (req, res) => {
  const meals = await Meal.find({ userId: req.user._id });
  res.send(meals);
});

router.get("/today", auth, async (req, res) => {
  const today = moment().startOf("day");
  const tomorrow = moment(today)
    .endOf("day")
    .toDate();

  const meals = await Meal.find({
    date: {
      $gte: today.toDate(),
      $lte: tomorrow
    },
    userId: req.user._id
  });

  res.send(meals);
});

router.post("/", [auth, validate(validateMeal)], async (req, res) => {
  if (req.user._id != req.body.userId) {
    return res.status(400).send("Invalid meal data.");
  }
  const meal = new Meal(req.body);
  await meal.save();

  res.send(meal);
});

router.put(
  "/:id",
  [auth, validateId, validate(validateMeal)],
  async (req, res) => {
    res.send("Put");
  }
);

router.delete("/:id", auth, (req, res) => {
  res.send("Deleted");
});

module.exports = router;
