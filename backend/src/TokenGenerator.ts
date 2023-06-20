import * as Prisma from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { randomBytes } from 'crypto';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

// Generates 256bit hex string for jwt secret
export function generateSecret(): string {
  return randomBytes(42).toString('hex');
}

// Signs a token with a secret
export function generateToken(login: Prisma.Login): string {
  if (!jwtSecret) throw new Error('JWT secret not found.');
  const expiresIn = '24h';
  const payload = {
    data: login,
    isRefreshToken: false
  };
  return jwt.sign(payload, jwtSecret, { expiresIn });
}

// Signs a refresh token with a refresh secret
export function generateRefreshToken(login: Prisma.Login): string {
  if (!jwtRefreshSecret) throw new Error('Refresh secret not found.');
  const expiresIn = '7d';
  const payload = {
    data: login,
    isRefreshToken: true
  };
  return jwt.sign(payload, jwtRefreshSecret, { expiresIn });
}

// verify JWT
export function verifyToken(token: string) {
  try {
    if (!jwtSecret) {
      throw new Error('Secret not found.');
    }
    const payload = jwt.verify(token, jwtSecret) as JwtPayload;
    return payload;
  } catch (error) {
    // Handle the error here
    console.error('Error verifying token:', error);
    throw new Error('Token verification failed.');
  }
}

// verify Refresh Token
export function verifyRefreshToken(token: string) {
  try {
    if (!jwtRefreshSecret) {
      throw new Error('Refresh secret not found.');
    }
    const payload = jwt.verify(token, jwtRefreshSecret) as JwtPayload;
    return payload;
  } catch (error) {
    // Handle the error here
    console.error('Error verifying refresh token:', error);
    throw new Error('Refresh token verification failed.');
  }
}
