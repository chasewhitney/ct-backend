// Users route - Integration testing

const request = require("supertest");
const { User } = require("../../../models/user");

describe("/api/users", () => {
  let server;
  let name;
  let email;
  let password;

  beforeEach(() => {
    server = require("../../../index");
    name = "123456";
    email = "email@email.com";
    password = "123456";
  });

  afterEach(async () => {
    await User.remove({});
    await server.close();
  });

  const exec = () => {
    return request(server)
      .post("/api/users")
      .send({ name, email, password });
  };

  it("should return 400 if name is less than 3 characters", async () => {
    name = "12";
    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if email is less than 5 characters", async () => {
    email = "1234";
    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if email format is invalid", async () => {
    email = "1234@567";
    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if password is less than 6 characters", async () => {
    password = "12345";
    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if email is already registered", async () => {
    let res = await exec();

    expect(res.status).toBe(200);

    name = "654321";
    password = "654321";
    res = await exec();

    expect(res.status).toBe(400);
  });
  it("should save user to database if registration info is valid", async () => {
    const res = await exec();

    const user = await User.findOne({ name: "123456" });

    expect(user).not.toBeNull();
    expect(user).toHaveProperty("_id");
    expect(user).toHaveProperty("password");
    expect(user).toHaveProperty("name", "123456");
    expect(user).toHaveProperty("email", "email@email.com");
  });
  it("should return token if registration info is valid", async () => {
    const res = await exec();
    const token = res.headers["x-auth-token"];

    expect(res.status).toBe(200);
    expect(token).toBeDefined();
    expect(res.body).not.toBeNull();
    expect(res.body).toHaveProperty("_id");
    expect(res.body).not.toHaveProperty("password");
    expect(res.body).toHaveProperty("name", "123456");
    expect(res.body).toHaveProperty("email", "email@email.com");
  });
});
