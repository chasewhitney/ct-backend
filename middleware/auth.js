// Authenticate jwt token

const jwt = require("jsonwebtoken");
const jwtPrivateKey = require("../config/keys").jwtPrivateKey;

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("No jwt token provided.");

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
};
