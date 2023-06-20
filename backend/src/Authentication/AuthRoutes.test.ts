import {Request, Response} from "express";
import * as AuthService from "./AuthService";

// Create a mock request object
const mockLogin = {
  body: {
    email: 'testemail@gmail.com',
    password: 'hunter2',
  },
} as Request;

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