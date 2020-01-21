// Enable validation for mongoose object _ids
const Joi = require("joi");

module.exports = function() {
  Joi.objectId = require("joi-objectId")(Joi);
};
