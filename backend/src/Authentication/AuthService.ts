import * as bcrypt from 'bcrypt';

import {
  generateToken,
  verifyRefreshToken,
  generateRefreshToken,
  verifyToken
} from '../TokenGenerator';

import { loginDB } from '../../prisma/db/Login';
import { Request, Response, NextFunction } from 'express';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const savedCredentials = await loginDB.read(email);

  // Confirm login credentials existed in full in DB
  if (!savedCredentials) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: `Login with email: ${email} not found.`
    });
  }

  if (!(savedCredentials.email && savedCredentials.password)) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'User record incomplete'
    });
  }

  console.log(`login found for ${email}`);

  const samePasswords = bcrypt.compare(password, savedCredentials.password);
  if (!samePasswords) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'passwords do not match'
    });
  }

  try {
    const token = generateToken(savedCredentials);
    const refreshToken = generateRefreshToken(savedCredentials);
    return res.json({ token, refreshToken, savedCredentials });
  } catch (error) {
    console.error('Error generating tokens:', error);
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to generate tokens'
    });
  }
}

export async function register(req: Request, res: Response) {
  const login = req.body;

  // Though a role is required, having a string helps more than "null"
  if (login.role == null) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
      message: 'Role cannot be empty.'
    });
  }

  // Not allowed to register an empty password
  if (!login.password) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
      message: 'Password cannot be empty.'
    });
  }

  try {
    login.password = bcrypt.hash(login.password, 10);
    await loginDB.create(login);
    return res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred during registration',
      cause: error
    });
  }
}

// Generate a new access token using a refresh token
export async function refresh(req: Request, res: Response) {
  const { email, refreshToken } = req.body;
  const tokenValidation = verifyRefreshToken(refreshToken);

  if (!tokenValidation) {
    console.log('Invalid token.');
    return res.status(403).json({
      code: 'FORBIDDEN',
      message: 'Refresh token not valid.'
    });
  }

  const savedCredentials = await loginDB.read(email);

  if (!savedCredentials) {
    return res.status(404).json({
      code: 'NOT_FOUND',
      message: 'Login does not exist.'
    });
  }

  try {
    const token = generateToken(savedCredentials);
    return res.json({ token, savedCredentials });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred while generating the access token.',
      cause: error
    });
  }
}

// re-implement role checking middleware, may move this elsewhere
export function authenticateRoleMiddleWare(roles: string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
      verifyToken(token);
    } catch (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    const decodedToken: any = verifyToken(token);
    if (!roles.includes(decodedToken.role)) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }
    next();
  };
}
