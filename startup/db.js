const mongoose = require("mongoose");
const { db } = require("../config/keys");
const winston = require("winston");

module.exports = function() {
  mongoose
    .connect(
      db,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      winston.info("Connected to database...");
    });
};
