import express, { Request, Response } from "express";
import authRouter from "./AuthRoutes";
import * as AuthService from "./AuthService";

const app = express();
app.use(authRouter);

// Create a mock request object
const mockLogin = {
  body: {
    email: "testemail@gmail.com",
    password: "hunter2",
  },
} as Request;

const mockResponse: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  cookie: jest.fn().mockReturnThis(),
};

test("Login endpoint test.", async () => {
  await AuthService.login(mockLogin, mockResponse as Response);
  expect(mockResponse.status).toHaveBeenCalledWith(200);
});

/*
test("Register endpoint test.", () => {

});

test("Refresh endpoint test.", () => {

});
*/
