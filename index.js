const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/routes")(app);
require("./startup/logging")();
app.listen(5001, () => {
  winston.info("Listening on port", 5001);
});
