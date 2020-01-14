const Joi = require("joi");

module.exports = function() {
  // Validation for mongoose object _ids
  Joi.objectId = require("joi-objectId")(Joi);
};
