import { Login, Role } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { z } from "zod";

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

//might want to auto gen this later
const JwtPayload = z.object({
  id: z.number(),
  email: z.string(),
  role: z.nativeEnum(Role),
  userId: z.number().nullable(),
});
type JwtPayload = z.infer<typeof JwtPayload>;

// Generates 256bit hex string for jwt secret
export function generateSecret(): string {
  return randomBytes(42).toString("hex");
}

// Signs a token with a secret
export function generateToken(login: Login): string {
  if (!jwtSecret) throw new Error("JWT secret not found.");
  const expiresIn = "24h";
  const payload = {
    data: login,
    isRefreshToken: false,
  };
  return jwt.sign(payload, jwtSecret, { expiresIn });
}

// Signs a refresh token with a refresh secret
export function generateRefreshToken(login: Login): string {
  if (!jwtRefreshSecret) throw new Error("Refresh secret not found.");
  const expiresIn = "7d";
  const payload = {
    data: login,
    isRefreshToken: true,
  };
  return jwt.sign(payload, jwtRefreshSecret, { expiresIn });
}

// verify JWT
export function verifyToken(token: string): JwtPayload {
  if (!jwtSecret) throw new Error("JWT Secret not found.");
  const payload = JwtPayload.parse(jwt.verify(token, jwtSecret));
  return payload;
}

// verify Refresh Token
export function verifyRefreshToken(token: string): JwtPayload {
  if (!jwtRefreshSecret) throw new Error("Refresh secret not found.");
  const payload = JwtPayload.parse(jwt.verify(token, jwtRefreshSecret));
  return payload;
}
