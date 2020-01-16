const mongoose = require("mongoose");
const express = require("express");
const auth = require("../routes/auth");
const meals = require("../routes/meals");
const users = require("../routes/users");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/meals", meals);
  app.use("/api/users", users);
  app.use(error);
};
