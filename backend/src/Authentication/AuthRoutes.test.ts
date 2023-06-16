import request from "supertest"
import express from "express";
import authRouter from "./AuthRoutes";
import * as AuthService from "./AuthService";

const app = express();
app.use(authRouter);

describe("Authentication API", () => {
  test("should login user", async () => {
    const mockLogin = jest.spyOn(AuthService, "login");
    const mockReq = { body: { username: "testuser", password: "testpassword" } };
    const mockRes = { status: jest.fn(), json: jest.fn() };

    await request(app).post("/login").send(mockReq.body);

    expect(mockLogin).toHaveBeenCalledWith(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalled();
  });

  test("should register user", async () => {
    const mockRegister = jest.spyOn(AuthService, "register");
    const mockReq = { body: { username: "testuser", password: "testpassword" } };
    const mockRes = { status: jest.fn(), json: jest.fn() };

    await request(app).post("/register").send(mockReq.body);

    expect(mockRegister).toHaveBeenCalledWith(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalled();
  });

  test("should refresh token", async () => {
    const mockRefresh = jest.spyOn(AuthService, "refresh");
    const mockReq = { body: { refreshToken: "testrefresh" } };
    const mockRes = { status: jest.fn(), json: jest.fn() };

    await request(app).post("/refresh").send(mockReq.body);

    expect(mockRefresh).toHaveBeenCalledWith(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalled();
  });
});
