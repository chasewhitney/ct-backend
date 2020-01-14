const mongoose = require("mongoose");
const meals = require("../routes/meals");
const express = require("express");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/meals", meals);
  app.use(error);
};
