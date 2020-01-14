const express = require("express");
const app = express();
const winston = require("winston");
const { port } = require("./config/keys");

require("./startup/routes")(app);
require("./startup/logging")();
require("./startup/db")();
require("./startup/prod")(app);

app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});
