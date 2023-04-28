import { Login, Role } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { z } from "zod";

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

// Generates 256bit hex string for jwt secret
export function generateSecret(): string {
  return randomBytes(42).toString("hex");
}

// Signs a token with a secret
export function generateJWT(
  login: Login,
  secret: string,
  isRefreshToken: boolean = false,
): string {
  const expiresIn = isRefreshToken ? "7d" : "24h";
  const payload = {
    data: login,
    isRefreshToken,
  };
  return jwt.sign(payload, secret, { expiresIn });
}

export function generateRefreshToken(login: Login): string {
  if (!jwtRefreshSecret) throw new Error("Refresh secret not found");
  return generateJWT(login, jwtRefreshSecret, true);
}

// middleware for JWT auth
export function authenticateJWT(
  token?: string, 
  isRefreshToken: boolean = false) {
    // change this to proper error checking
  if (!(token && jwtSecret && jwtRefreshSecret)) throw new Error("Secret not found!");
  const secret = isRefreshToken ? jwtRefreshSecret : jwtSecret;
  return verifyJWT(token, secret, isRefreshToken);
}

//might want to auto gen this later
const JwtPayload = z.object({
  id: z.number(),
  email: z.string(),
  role: z.nativeEnum(Role),
  userId: z.number().nullable(),
  isRefreshToken: z.boolean().optional()
});
type JwtPayload = z.infer<typeof JwtPayload>;

function verifyJWT(token: string, secret: string, isRefreshToken: boolean): JwtPayload {
  const payload = JwtPayload.parse(jwt.verify(token, secret));
  if (isRefreshToken && !payload.isRefreshToken) {
    throw new Error("Invalid token type");
  }
  return payload;
}