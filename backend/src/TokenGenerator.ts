import { Login } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Generates 256bit hex string for jwt secret
export function generateSecret(): string {
  return randomBytes(42).toString("hex");
}

// Signs a token with a secret
export function generateJWT(login: Login, secret: string): string {
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

const jwtSecret = process.env.JWT_SECRET;

// middleware for JWT auth
export function authenticateJWT(token?: string) {
  // TODO: handle the case for when token is an empty string. right now it treats it as null
  if (!token || !jwtSecret) return null;
  return verifyJWT(token, jwtSecret);
}

//might want to auto gen this later
const JwtPayload = z.object({
  id: z.string(),
  email: z.string(),
  role: z.enum(["admin", "user"]),
});
type JwtPayload = z.infer<typeof JwtPayload>;

function verifyJWT(token: string, secret: string): JwtPayload {
  return JwtPayload.parse(jwt.verify(token, secret));
}
