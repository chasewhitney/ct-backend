const request = require("supertest");
const { User } = require("../../../models/user");
const { Meal } = require("../../../models/meal");
const mongoose = require("mongoose");
const moment = require("moment");

describe("/api/meals", () => {
  let server;
  let token;
  let _id;
  let meal;

  beforeEach(async () => {
    server = require("../../../index");

    _id = mongoose.Types.ObjectId();
    token = new User({ _id: _id }).generateAuthToken();
    meal = new Meal({
      name: "123",
      userId: _id,
      servings: 1,
      servingSize: "12345",
      calories: 5,
      carbs: 5,
      fiber: 5,
      fat: 5,
      protein: 5,
      netCarbs: 0,
      img: "myUrl.jpeg",
      date: new Date()
    });
    await meal.save();
    meal = new Meal({
      name: "456",
      userId: _id,
      servings: 1,
      servingSize: "12345",
      calories: 5,
      carbs: 5,
      fiber: 5,
      fat: 5,
      protein: 5,
      netCarbs: 0,
      img: "myUrl.jpeg",
      date: moment()
        .add(-3, "days")
        .toDate()
    });
    await meal.save();
  });

  afterEach(async () => {
    await server.close();
    await Meal.remove();
  });

  describe("GET /", () => {
    const exec = () => {
      return request(server)
        .get(`/api/meals`)
        .set("x-auth-token", token);
    };

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("should return all meal entries related to client", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe("GET /today", () => {
    const exec = () => {
      return request(server)
        .get(`/api/meals/today`)
        .set("x-auth-token", token);
    };

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("should return client's meals from today only", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });
  describe("POST /", () => {
    let newMeal;

    beforeEach(() => {
      newMeal = {
        name: "123",
        userId: _id,
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
    });
    const exec = () => {
      return request(server)
        .post(`/api/meals`)
        .set("x-auth-token", token)
        .send(newMeal);
    };
    it("should return 401 if client not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });
    it("should return 400 if name is less than 3 characters", async () => {
      newMeal.name = "1";
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if name is longer than 50 characters", async () => {
      newMeal.name = new Array(52).join("a");
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if userId is invalid", async () => {
      newMeal.userId = "12345";
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if servings is less than 1", async () => {
      newMeal.servings = 0;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if servings is greater than 50", async () => {
      newMeal.servings = 51;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if calories is less than 0", async () => {
      newMeal.calories = -1;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if calories is greater than 5000", async () => {
      newMeal.calories = 5001;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if carbs is less than 0", async () => {
      newMeal.carbs = -1;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if carbs is greater than 1000", async () => {
      newMeal.carbs = 1001;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if fiber is less than 0", async () => {
      newMeal.fiber = -1;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if fiber is greater than 1000", async () => {
      newMeal.fiber = 1001;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if fat is less than 0", async () => {
      newMeal.fat = -1;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if fat is greater than 1000", async () => {
      newMeal.fat = 1001;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if protein is less than 0", async () => {
      newMeal.protein = -1;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if protein is greater than 1000", async () => {
      newMeal.protein = 1001;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if netCarbs is not equal to carbs - fiber", async () => {
      newMeal.carbs = 5;
      newMeal.fiber = 3;
      newMeal.netCarbs = 1;
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if date is invalid", async () => {
      newMeal.date = "not a date";
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if img string is shorter than 1", async () => {
      newMeal.img = "";
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if img string is longer than 300", async () => {
      newMeal.img = new Array(302).join("a");
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return meal object if it is valid", async () => {
      const res = await exec();

      expect(res.body).not.toBeNull();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", newMeal.name);
      expect(res.body).toHaveProperty("userId", newMeal.userId.toHexString());
      expect(res.status).toBe(200);
    });
  });
  // describe("PUT /:id", () => {
  //   it("should do something", async () => {
  //     expect(2).toBe(3);
  //   });
  // });
});
