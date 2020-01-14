const mongoose = require("mongoose");
const meals = require("../routes/meals");
const express = require("express");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/meals", meals);
};
