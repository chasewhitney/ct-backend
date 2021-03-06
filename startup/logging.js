// Setup logging, exception-handling, rejection-handling

const winston = require("winston");
require("express-async-errors");

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.File({ filename: "./logs/uncaughtExceptions.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );

  winston.add(winston.transports.File, { filename: "./logs/logfile.log" });

  // Kick unhandled rejections to winston
  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
