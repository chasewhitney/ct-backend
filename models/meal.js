const mongoose = require("mongoose");
const Joi = require("joi");

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  user: { type: String, minlength: 3, maxlength: 50 },
  servings: { type: Number, default: 1, max: 50 },
  servingSize: { type: String, required: true, maxlength: 100, minlength: 3 },
  calories: { type: Number, required: true, min: 0, max: 5000 },
  carbs: { type: Number, required: true, min: 0, max: 1000 },
  fiber: { type: Number, required: true, min: 0, max: 1000 },
  fat: { type: Number, required: true, min: 0, max: 1000 },
  protein: { type: Number, required: true, min: 0, max: 1000 },
  netCarbs: { type: Number, default: 0, max: 1000 },
  date: { type: Date, default: new Date() },
  img: { type: String, maxlength: 300 }
});

const Meal = mongoose.model("Meal", mealSchema);

// TODO: Where to set NETCARBS, DATE, IMG
// TODO: Where to validate NETCARBS, DATE, IMG
function validate(meal) {
  const schema = {
    _id: Joi.objectId().required(),
    name: Joi.string()
      .required()
      .min(2)
      .max(50),
    servings: Joi.number().required(),
    servingSize: Joi.string()
      .required()
      .min(3)
      .max(100),
    calories: Joi.number()
      .required()
      .min(0)
      .max(5000),
    carbs: Joi.number().required(),
    fiber: Joi.number()
      .required()
      .min(0)
      .max(5000),
    fat: Joi.number()
      .required()
      .min(0)
      .max(5000),
    protein: Joi.number()
      .required()
      .min(0)
      .max(5000)
  };
  return Joi.validate(meal, schema);
}

exports.Meal = Meal;
exports.validate = validate;
