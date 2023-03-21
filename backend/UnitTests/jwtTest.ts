import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import userRouter from "../UserService/UserRoutes";

const testUser: User = {
  id: 0,
  email: "email@mail.com",
  password: "butt",
  role: null,
  firstName: null,
  middleName: null,
  lastName: null,
  address: null,
  phone: null,
};

// this should contain a user with role "admin" and secret key "secret"
const testToken: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxOCwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJ0ZXN0ZW1haWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaGdINzAuOFBXUG1tOWFBUlVHRzhkT2g4bUhGTklHbFVLTjQzMTJQRi9Xakx3MjMvQjhveXEiLCJmaXJzdE5hbWUiOiJqb2huIiwibWlkZGxlTmFtZSI6ImR1ZGUiLCJsYXN0TmFtZSI6Im1hbiIsImFkZHJlc3MiOiIxMTExMSBvcmxhbmRvIiwicGhvbmUiOjQyMDY5Njl9LCJpYXQiOjE2Nzk0MjA2MTh9.2cumvLdnRJt7k4mtHN5I8lQDL_7eL4vc_95_XmmQIKk";
//NOTE: To test on JWT.IO, copy/paste the "Secret" on the right-hand space under 'Verifiy Signature'

// signs a token with a given secret
export function generateToken(user: User, secret: string): string {
  // TODO: use or remove json
  // const json: string = JSON.stringify(user);
  return jwt.sign(
    {
      data: user,
    },
    secret
  );
}

function verifyToken(token: string, secret: string): JwtPayload {
  try {
    const payload: JwtPayload = jwt.verify(token, secret) as JwtPayload;
    console.log("Token verified");
    return payload;
  } catch (err) {
    throw err;
  }
}


console.log("Token: " + generateToken(testUser, "secret"));

verifyToken(testToken, "secret");