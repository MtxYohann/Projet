import "dotenv/config";
import mongoose, { mongo } from "mongoose";
import request from "supertest";
const MONGO_STRING = process.env.MONGO_STRING;
import { CreateApp } from "../mock.app.mjs";
import user from "../models/user.js";

describe("creation d'un utilisateur et login", () => {
  let app;

  beforeAll(() => {
    mongoose
      .connect(MONGO_STRING)
      .then(() => console.log("Connected to the database for Testing!"))
      .catch((err) => console.log(err));
    app = CreateApp();
  });

  it("Should create a new user", async () => {
    const response = await request(app).post("/auth/signup").send({
      email: "test@lachancla.com",
      password: "test!Dvz36",
      name: "test",
      phoneNumber: "123456789",
    });
    expect(response.statusCode).toBe(201);
  });

  it("Should login a user", async () => {
    const response = await request(app).post("/auth/signin").send({
      email: "test@lachancla.com",
      password: "test!Dvz36",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should create a new car", async () => {
    const response = await request(app).post("/cars").send({
    marque: "BMW",
    model: "M3 E46 Essai",
    Cylindree :"3.2L",
    Position_moteur: "avant", 
    Architechture_moteur: "6 cylindre en ligne",
    Poid: "1300",
    });
    expect(response.statusCode).toBe(201);
  });

  afterAll(async () => {
    // delete the user created
    await user.deleteOne({ email: "test" });
    await mongoose.connection.close();
  });
});