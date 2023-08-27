import { Response } from "express";
import * as AuthService from "./AuthService";
import { AuthLogin } from "../zodTypes";

// Create a mock request object
const mockLogin = {
  email: "testemail@gmail.com",
  password: "hunter2",
} as AuthLogin;

const mockResponse: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  cookie: jest.fn().mockReturnThis(),
};

test("Login endpoint test.", async () => {
  await AuthService.login(mockLogin, mockResponse as Response);
  expect(mockResponse.status);
});

/*
test("Register endpoint test.", () => {

});

test("Refresh endpoint test.", () => {

});
*/
