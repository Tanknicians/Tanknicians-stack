import * as bcrypt from 'bcrypt';

import {
  generateToken,
  verifyRefreshToken,
  generateRefreshToken,
  verifyToken
} from '../TokenGenerator';
import { loginDB } from '../../prisma/db/Login';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

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

  try {
    const samePasswords = bcrypt.compare(password, savedCredentials.password);
    if (!samePasswords) {
      return res.status(409).json({
        code: 'CONFLICT',
        message: 'passwords do not match'
      });
    }
    const token = generateToken(savedCredentials);
    const refreshToken = generateRefreshToken(savedCredentials);
    res.json({ token, refreshToken, savedCredentials });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Cannot generate tokens for session',
      cause: err
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
    return res.status(403).json({
      code: 'FORBIDDEN',
      message: 'Refresh token not valid.'
    });
  }

  const dbLoginPayload = await loginDB.read(email);

  if (!dbLoginPayload) {
    return res.status(404).json({
      code: 'NOT_FOUND',
      message: 'Login does not exist.'
    });
  }

  try {
    const accessToken = generateToken(dbLoginPayload);
    return res.json({ accessToken });
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
    let jwtPayload: JwtPayload;
    try {
      jwtPayload = verifyToken(token);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    if (!roles.includes(jwtPayload.role)) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }
    next();
  };
}
