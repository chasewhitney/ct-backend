const express = require("express");
const app = express();
const winston = require("winston");
const { port } = require("./config/keys");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();
require("./startup/prod")(app);
require("./startup/validation")();

const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});

module.exports = server;

// TODO: netCarbs validation

// Routes/Endpoints
// TODO: Meals
// TODO: Favorites
