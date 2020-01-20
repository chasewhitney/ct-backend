const mongoose = require("mongoose");
const Joi = require("joi");

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  userId: { type: String, required: true, length: 24 },
  servings: { type: Number, min: 1, max: 50 },
  servingSize: { type: String, required: true, maxlength: 100, minlength: 3 },
  calories: { type: Number, required: true, min: 0, max: 5000 },
  carbs: { type: Number, required: true, min: 0, max: 1000 },
  fiber: { type: Number, required: true, min: 0, max: 1000 },
  fat: { type: Number, required: true, min: 0, max: 1000 },
  protein: { type: Number, required: true, min: 0, max: 1000 },
  netCarbs: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
    validate: {
      validator: function(v) {
        return v == this.carbs - this.fiber;
      }
    }
  },
  date: { type: Date, required: true },
  img: { type: String, required: true, minlength: 1, maxlength: 300 }
});

const Meal = mongoose.model("Meal", mealSchema);

function validateMeal(meal) {
  const schema = {
    _id: Joi.objectId(),
    name: Joi.string()
      .required()
      .min(2)
      .max(50),
    userId: Joi.objectId().required(),
    servings: Joi.number()
      .required()
      .min(1)
      .max(50),
    servingSize: Joi.string()
      .required()
      .min(3)
      .max(100),
    calories: Joi.number()
      .required()
      .min(0)
      .max(1000),
    carbs: Joi.number()
      .required()
      .min(0)
      .max(1000),
    fiber: Joi.number()
      .required()
      .min(0)
      .max(1000),
    fat: Joi.number()
      .required()
      .min(0)
      .max(1000),
    protein: Joi.number()
      .required()
      .min(0)
      .max(1000),
    img: Joi.string()
      .required()
      .min(1)
      .max(300),
    netCarbs: Joi.number()
      .required()
      .min(meal.carbs - meal.fiber)
      .max(meal.carbs - meal.fiber),
    date: Joi.date().required()
  };
  return Joi.validate(meal, schema);
}

exports.Meal = Meal;
exports.validateMeal = validateMeal;
