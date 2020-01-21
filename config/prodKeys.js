module.exports = {
  db: process.env.MONGO_URI,
  port: process.env.PORT,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY
};
