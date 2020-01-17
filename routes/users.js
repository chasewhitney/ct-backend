// User router - Register new User

const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, validateUser } = require("../models/user");
const validate = require("../middleware/validate");

// Register new User
router.post("/", validate(validateUser), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("User already register with that email.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  user = _.pick(user, ["_id", "name", "email"]);

  res.header("x-auth-token", token).send(user);
});

module.exports = router;
