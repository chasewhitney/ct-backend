// Auth middleware - Unit testing

const jwt = require("jsonwebtoken");
const jwtPrivateKey = require("../../../config/keys").jwtPrivateKey;
const mongoose = require("mongoose");
const auth = require("../../../middleware/auth");

describe("auth middleware", () => {
  it("should populate req.user if provided token is valid", () => {
    const userObject = { _id: "123", name: "345" };
    const token = jwt.sign(userObject, jwtPrivateKey);
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(userObject);
  });
});
