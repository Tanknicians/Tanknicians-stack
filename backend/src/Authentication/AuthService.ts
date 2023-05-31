// in here we may or may not use axios
import * as Prisma from "@prisma/client";
import * as bcrypt from "bcrypt";

import {
  generateToken,
  verifyRefreshToken,
  generateRefreshToken,
} from "../TokenGenerator";
import { loginDB } from "../../prisma/db/Login";

import { TRPCError } from "@trpc/server";

export async function login(login: { email: string; password: string }) {
  const { email, password } = login;

  // Retrieve login saved credentials based on username/email
  const savedCredentials = await loginDB.read(login.email);

  // Confirm login credentials existed in full in DB
  if (!savedCredentials) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Login with email: ${email} not found.`,
    });
  }
  if (!(savedCredentials.email && savedCredentials.password)) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User record incomplete",
    });
  }

  console.log(`login found for ${email}`);

  return new Promise<{
    token: string;
    refreshToken: string;
    savedCredentials: Prisma.Login;
  }>((resolve, reject) => {
    bcrypt.compare(
      password,
      savedCredentials.password,
      async function (err, samePasswords) {
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
          const token = generateToken(savedCredentials);
          const refreshToken = generateRefreshToken(savedCredentials);
          resolve({ token, refreshToken, savedCredentials });
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

export async function register(login: Omit<Prisma.Login, "id">) {
  // though a role is required, having a string helps more than "null"
  if (login.role == null) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Role cannot be empty.",
    });
  }

  // not allowed to register an empty password
  if (login.password) {
    login.password = await bcrypt.hash(login.password, 10);
  } else {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Password cannot be empty.",
    });
  }

  try {
    await loginDB.create(login);
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during registration",
      cause: error,
    });
  }
}

// Generate a new access token using a refresh token
export async function refresh(email: string, refreshToken: string) {
  const tokenValidation = verifyRefreshToken(refreshToken);

  if (!tokenValidation) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Refresh token not valid.",
    });
  }

  const dbLoginPayload = await loginDB.read(email);

  if (!dbLoginPayload) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Login does not exist.",
    });
  }

  // Generate and return a new ACCESS token
  return generateToken(dbLoginPayload);
}
