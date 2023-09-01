import * as bcrypt from "bcryptjs";

import {
  generateToken,
  verifyRefreshToken,
  generateRefreshToken,
  verifyToken,
} from "../TokenGenerator";

import { loginDB } from "../../prisma/db/Login";
import { Request, Response, NextFunction } from "express";
import { AuthLogin, AuthRegister } from "../zodTypes";
import { randomBytes } from "crypto";

// we can modify this for password generating
// note: length of password is more important than randomness of password in security
function generateRandomPassword(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const password = [];
  const randomBytesCount = Math.ceil((length * 3) / 4); // 3 bytes for every 4 characters to ensure randomness

  const randomValues = randomBytes(randomBytesCount);

  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues.readUInt8(i % randomBytesCount) % charset.length;
    password.push(charset[randomIndex]);
  }

  return password.join('');
}

export async function login(login: AuthLogin, res: Response) {
  const savedCredentials = await loginDB.read(login.email);

  // Confirm login credentials existed in full in DB
  if (!savedCredentials) {
    return res.status(401).json({
      code: "UNAUTHORIZED",
      message: "Incorrect email/password combination",
      // message: `Login with email: ${login.email} not found.`
    });
  }

  if (!(savedCredentials.email && savedCredentials.password)) {
    return res.status(401).json({
      code: "UNAUTHORIZED",
      message: "User record incomplete",
    });
  }

  console.log(`login found for ${login.email}`);

  const samePasswords = await bcrypt.compare(
    login.password,
    savedCredentials.password,
  );
  if (!samePasswords) {
    return res.status(401).json({
      code: "UNAUTHORIZED",
      message: "Incorrect email/password combination",
      // message: 'passwords do not match'
    });
  }

  try {
    const token = generateToken(savedCredentials);
    const refreshToken = generateRefreshToken(savedCredentials);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ token, savedCredentials });
    return;
  } catch (error) {
    console.error("Error generating tokens:", error);
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to generate tokens",
    });
  }
}

export async function register(registration: AuthRegister, res: Response) {

  // Though a role is required, having a string helps more than "null"
  if (registration.role == null) {
    return res.status(400).json({
      code: "BAD_REQUEST",
      message: "Role cannot be empty.",
    });
  }

  // move the data to a format with a generated password
  const registerData = {
    ...registration,
    password: generateRandomPassword(32)
  }

  try {

    // email the password should go here

    registerData.password = await bcrypt.hash(registerData.password, 10);
    await loginDB.create(registerData);
    return res.json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred during registration",
      cause: error,
    });
  }
}

// Generate a new access token using a refresh token
export async function refresh(
  email: string,
  refreshToken: string,
  res: Response,
) {
  console.log("refreshing token");
  try {
    verifyRefreshToken(refreshToken);
  } catch (error) {
    console.log("Invalid token.");
    return res.status(403).json({
      code: "FORBIDDEN",
      message: "Refresh token not valid.",
    });
  }

  const savedCredentials = await loginDB.read(email);

  if (!savedCredentials) {
    return res.status(404).json({
      code: "NOT_FOUND",
      message: "Login does not exist.",
    });
  }

  try {
    const token = generateToken(savedCredentials);
    return res.json({ token, savedCredentials });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while generating the access token.",
      cause: error,
    });
  }
}

// re-implement role checking middleware, may move this elsewhere
export function authenticateRoleMiddleWare(roles: string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
      verifyToken(token);
    } catch (error) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const decodedToken = verifyToken(token);
    if (!roles.includes(decodedToken.data.role)) {
      return res.status(403).send({ message: "Unauthorized access" });
    }
    next();
  };
}
