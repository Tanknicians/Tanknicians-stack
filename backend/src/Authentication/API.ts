import * as bcrypt from 'bcryptjs';

import {
  generateToken,
  verifyRefreshToken,
  generateRefreshToken,
  verifyToken
} from '../Token/Generator';

import { loginDB } from '../../prisma/db/Login';
import { Request, Response, NextFunction } from 'express';
import { AuthLogin, AuthRegister, RefreshToken } from '../zodTypes';
import { randomBytes } from 'crypto';
import { sendEmail } from '../Email/API';

const DEFAULT_PASSWORD_LENGTH = 16;
const DEFAULT_SALT_LENGTH = 10;

// we can modify this for password generating
// note: length of password is more important than randomness of password in security
export function generateRandomPassword(length: number): string {
  // we do NOT need unique characters for a more secure password
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const password = [];
  const randomBytesCount = Math.ceil((length * 3) / 4); // 3 bytes for every 4 characters to ensure randomness
  const randomValues = randomBytes(randomBytesCount);
  for (let i = 0; i < length; i++) {
    const randomIndex =
      randomValues.readUInt8(i % randomBytesCount) % charset.length;
    password.push(charset[randomIndex]);
  }
  return password.join('');
}

export async function login(login: AuthLogin, res: Response) {
  const foundCredentials = await loginDB.read(login.email);

  // Confirm login credentials existed in full in DB
  if (!foundCredentials) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Incorrect email/password combination'
      // message: `Login with email: ${login.email} not found.`
    });
  }

  if (!(foundCredentials.email && foundCredentials.password)) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'User record incomplete'
    });
  }

  console.log(`login found for ${login.email}`);

  const samePasswords = await bcrypt.compare(
    login.password,
    foundCredentials.password
  );
  if (!samePasswords) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Incorrect email/password combination'
      // message: 'passwords do not match'
    });
  }

  try {
    const { password: _, ...savedCredentials } = foundCredentials;
    const token = generateToken(foundCredentials);
    const refreshToken = generateRefreshToken(foundCredentials);
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    // added refreshToken to body for MOBILE auth
    res.status(200).json({ token, refreshToken, savedCredentials });
    return;
  } catch (error) {
    console.error('Error generating tokens:', error);
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to generate tokens'
    });
  }
}

export async function register(registration: AuthRegister) {
  try {
    // Generate password of character size 16; Saved to send in email after DB Login created.
    const generatedPassword = generateRandomPassword(DEFAULT_PASSWORD_LENGTH);
    const encryptedPassword = await bcrypt.hash(
      generatedPassword,
      DEFAULT_SALT_LENGTH
    );

    // move the data to a format with the encrypted password to be sent to the DB
    const registerData = {
      ...registration,
      password: encryptedPassword
    };

    // Send password to db first
    await loginDB.create(registerData);

    // email the Registration data
    const emailText = `Your email and password combination is: \n
      EMAIL: ${registerData.email} \n
      PASSWORD: ${generatedPassword} \n
      If you lose this password, please ask your admin to send a reset email.
    `;
    const confirmation = await sendEmail(
      registerData.email,
      'New Registration',
      emailText
    );
    console.log(confirmation);

    return { status: 200, data: { message: 'Registration successful' } };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred during registration',
        cause: error
      }
    };
  }
}

// Wrapper function that takes care of the response for registration
export async function handleRegistration(
  registration: AuthRegister,
  res: Response
) {
  const result = await register(registration);

  return res.status(result.status).json(result.data);
}

// Generate a new access token using a refresh token
export async function refresh(refreshToken: string, res: Response) {
  let decryptToken: RefreshToken;

  console.log('refreshing token');
  try {
    decryptToken = verifyRefreshToken(refreshToken);
  } catch (error) {
    console.log('Invalid token.');
    return res.status(403).json({
      code: 'FORBIDDEN',
      message: 'Refresh token not valid.'
    });
  }

  const foundCredentials = await loginDB.read(decryptToken.data.email);

  if (!foundCredentials) {
    return res.status(404).json({
      code: 'NOT_FOUND',
      message: 'Login does not exist.'
    });
  }

  // Remove sending hashed password since it's not necessary for frontend.
  const { password: _, ...savedCredentials } = foundCredentials;

  try {
    const token = generateToken(foundCredentials);
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
      return res.status(403).send({ message: 'Invalid token' });
    }
    const decodedToken = verifyToken(token);
    if (!roles.includes(decodedToken.data.role)) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }
    next();
  };
}
