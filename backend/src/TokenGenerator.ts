import { Login } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Generates 256bit hex string for jwt secret
export function generateSecret(): string {
  return randomBytes(42).toString("hex");
}

// Signs a token with a secret
export function generateJWT(login: Login, secret: string): string {
  if (!secret) {
    throw new Error("JWT_SECRET is undefined");
  }
  return jwt.sign(
    {
      data: login,
    },
    secret,
    {
      expiresIn: "24h",
    },
  );
}

// middleware for JWT auth
export function authenticateJWT(role: String, secret: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    let jwtPayload: JwtPayload;
    try {
      if (!secret) return res.status(401);
      jwtPayload = verifyJWT(token, secret);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      return res.status(401).send({ message: "Invalid token" });
    }

    if (jwtPayload.role !== role) {
      // Check if login has the correct role
      return res.status(401).send({ message: "Unauthorized access" });
    }
    next();
  };
}

// Attempt to convert token+string to JWTPayload
function verifyJWT(token: string, secret: string): JwtPayload {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
