// Check for jwtPrivateKey

const { jwtPrivateKey } = require("../config/keys");

module.exports = function() {
  if (!jwtPrivateKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
