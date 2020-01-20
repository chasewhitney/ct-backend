// validateId middleware - Integration testing
const request = require("supertest");
const { Meal } = require("../../../models/meal");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtPrivateKey = require("../../../config/keys").jwtPrivateKey;

describe("validateId middleware", () => {
  let server;
  let _id;
  let mealProps;
  let token;
  let meal;
  let queryId;

  beforeEach(async () => {
    server = require("../../../index");
    mealId = mongoose.Types.ObjectId();
    queryId = mealId;
    userId = mongoose.Types.ObjectId();
    mealProps = {
      _id: mealId,
      name: "123456",
      userId: userId,
      servings: 1,
      servingSize: "12345",
      calories: 1,
      carbs: 1,
      fiber: 1,
      fat: 1,
      protein: 1,
      netCarbs: 0,
      img: "myUrl.jpeg",
      date: new Date()
    };
    token = jwt.sign({ _id: userId }, jwtPrivateKey);

    meal = new Meal(mealProps);
    await meal.save();
  });

  afterEach(async () => {
    await Meal.remove({});
    await server.close();
  });

  const exec = () => {
    return request(server)
      .put(`/api/meals/${queryId}`)
      .set("x-auth-token", token)
      .send(mealProps);
  };

  it("should return 400 if req.params.id is invalid", async () => {
    queryId = "12345";
    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 200 if req.params.id is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
