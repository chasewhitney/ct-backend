const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const jwtPrivateKey = require("../config/keys").jwtPrivateKey;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, minlength: 5, maxlength: 255 },
  password: { type: String, required: true, minlength: 6, maxlength: 1024 }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, jwtPrivateKey);

  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(30),
    email: Joi.string()
      .required()
      .min(5)
      .max(255)
      .email({ minDomainAtoms: 2 }),
    password: Joi.string()
      .required()
      .min(6)
      .max(255)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
