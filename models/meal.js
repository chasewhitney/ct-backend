const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  user: { type: String, minlength: 3, maxlength: 50 },
  servings: { type: Number, default: 1, max: 50 },
  servingSize: { type: String, required: true, maxlength: 100, minlength: 3 },
  calories: { type: Number, default: 0, max: 5000 },
  carbs: { type: Number, default: 0, max: 1000 },
  fiber: { type: Number, default: 0, max: 1000 },
  fat: { type: Number, default: 0, max: 1000 },
  protein: { type: Number, default: 0, max: 1000 },
  netCarbs: { type: Number, default: 0, max: 1000 },
  date: { type: Date, default: new Date() },
  img: { type: String, maxlength: 300 }
});

const Meal = mongoose.model("Meal", mealSchema);

exports.Meal = Meal;
