const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const sequelize = require("../config/database");

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", "test@example.com");
      expect(res.body.user).toHaveProperty("name", "Test User");
    });

    it("should not register user with existing email", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Email already registered");
    });
  });

  describe("POST /auth/login", () => {
    it("should login with valid credentials", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", "test@example.com");
    });

    it("should not login with invalid credentials", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("error", "Invalid credentials");
    });
  });

  describe("GET /auth/profile", () => {
    let token;

    beforeEach(async () => {
      const loginRes = await request(app).post("/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });
      token = loginRes.body.token;
    });

    it("should get user profile with valid token", async () => {
      const res = await request(app)
        .get("/auth/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty("email", "test@example.com");
    });

    it("should not get profile without token", async () => {
      const res = await request(app).get("/auth/profile");

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("error", "Please authenticate.");
    });
  });
});
