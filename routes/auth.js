// Auth router - User login

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const validate = require("../middleware/validate");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

// Handles login
router.post("/", validate(validateUser), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  user = _.pick(user, ["_id", "name", "email"]);
  res.header("x-auth-token", token).send(user);
});

function validateUser(req) {
  const schema = {
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

  return Joi.validate(req, schema);
}

module.exports = router;
