// Auth middleware - Integration testing

const request = require("supertest");
const auth = require("../../../middleware/auth");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  let server;
  let token;

  const id = mongoose.Types.ObjectId();
  const newMeal = {
    name: "123",
    userId: id,
    servings: 1,
    servingSize: "123",
    calories: 1,
    carbs: 1,
    fiber: 1,
    fat: 1,
    protein: 1,
    netCarbs: 0,
    img: "myUrl.jpeg",
    date: new Date()
  };

  beforeEach(() => {
    server = require("../../../index");
    token = new User({ _id: id }).generateAuthToken();
  });

  afterEach(async () => {
    await server.close();
  });

  const exec = () => {
    return request(server)
      .post("/api/meals")
      .set("x-auth-token", token)
      .send(newMeal);
  };

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();

    expect(res.status).toBe(401);
  });
  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
