// User model - Unit Testing

const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const jwtPrivateKey = require("../../../config/keys").jwtPrivateKey;
const mongoose = require("mongoose");

describe("user.generateAuthToken", () => {
  it("should generate a valid jwt", () => {
    const payload = { _id: new mongoose.Types.ObjectId().toHexString() };
    const user = new User(payload);

    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, jwtPrivateKey);
    expect(decoded).toMatchObject(payload);
  });
});
