// in here we may or may not use axios
import * as Prisma from "@prisma/client";
import { Request, Response } from "express";
import * as LoginDB from "../../prisma/db/Login";
import * as bcrypt from "bcrypt";
import * as TokenGenerator from "../TokenGenerator";
import { TRPCError } from "@trpc/server";

const jwtSecret = process.env.JWT_SECRET;

export async function login(user: { email: string; password: string }) {
  // Construct user login model for Prisma
  const userLogin = {
    id: 0,
    email: user.email,
    password: user.password,
    role: null,
    userId: null,
  };

  // Retrieve user saved credentials based on username/email
  const savedCredentials = await LoginDB.read(user.email);

  // Confirm user credentials existed in full in DB
  if (!savedCredentials) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Login with email: ${userLogin.email} not found.`,
    });
  }
  if (!savedCredentials.email || !savedCredentials.password) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User record incomplete",
    });
  }

  console.log(`login found for ${userLogin.email}`);

  return new Promise<{ token: string }>((resolve, reject) => {
    bcrypt.compare(
      userLogin.password,
      savedCredentials.password,
      function (err, samePasswords) {
        if (err) {
          reject(
            new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Error occured during password compare",
              cause: err,
            }),
          );
          return;
        }
        if (!samePasswords) {
          reject(
            new TRPCError({
              code: "CONFLICT",
              message: "passwords do not match",
            }),
          );
          return;
        }
        try {
          if (!jwtSecret) {
            reject(
              new TRPCError({
                code: "PRECONDITION_FAILED",
                message: "JWT_SECRET is not set in environment variables.",
              }),
            );
            return;
          }
          const token = TokenGenerator.generateJWT(savedCredentials, jwtSecret);
          resolve({ token });
        } catch (err) {
          console.error(err);
          reject(
            new TRPCError({
              code: "UNAUTHORIZED",
              message: "Cannot generate token for session",
              cause: err,
            }),
          );
        }
      },
    );
  });
}

export async function read(user: { email: string }) {
  const { email } = user;
  try {
    const login = await LoginDB.read(email);
    if (!login) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `login with email: ${email} not found.`,
      });
    }
    return login;
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during read",
      cause: e,
    });
  }
}

// this should be a private function that cannot be used by a front-end until future expansion
export async function register(req: Request, res: Response) {
  const parsedLogin: Prisma.Login = {
    id: 0,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    userId: req.body.personId,
  };

  // though a role is required, having a string helps more than "null"
  if (parsedLogin.role == null) {
    res.send("Role cannot be empty.");
    return;
  }

  // not allowed to register an empty password
  if (parsedLogin.password) {
    parsedLogin.password = await bcrypt.hash(parsedLogin.password, 10);
  } else {
    res.send("Password cannot be empty.");
    return;
  }

  try {
    LoginDB.create(parsedLogin);
  } catch (error) {
    res.send(error);
  }
}
