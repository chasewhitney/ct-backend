const request = require("supertest");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtPrivateKey = require("../../config/keys").jwtPrivateKey;

describe("auth route", () => {
  let server;
  let email;
  let password;

  beforeEach(() => {
    server = require("../../index");
    email = "123@mail.com";
    password = "123456";
  });

  afterEach(async () => {
    await User.remove({});
    await server.close();
  });

  const exec = () => {
    return request(server)
      .post("/api/auth")
      .send({ email, password });
  };

  it("should return 400 if email is not valid", async () => {
    email = "1";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if password is not valid", async () => {
    password = "1";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if no user found with given email", async () => {
    email = "shmemail@email.com";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return 400 if password is incorrect", async () => {
    password = "wrongPassword";

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it("should return token if login credentials are valid", async () => {
    let user = new User({ name: "123456", email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const res = await exec();

    expect(res.status).toBe(200);
    expect(jwt.verify(res.text, jwtPrivateKey)).toHaveProperty("_id");
  });
});
