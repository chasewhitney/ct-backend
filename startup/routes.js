const mongoose = require("mongoose");
const express = require("express");
const meals = require("../routes/meals");
const users = require("../routes/users");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/meals", meals);
  app.use("/api/users", users);
  app.use(error);
};
