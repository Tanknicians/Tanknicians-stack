import * as AuthService from './API';
import express, { NextFunction, Response, Request } from 'express';
import {
  authLogin,
  AuthLoginRequest,
  authRegister,
  AuthRegisterRequest,
  EmailRequest,
  emailSchema,
  validateRequestBody,
} from '../zodTypes';

import { z } from 'zod';

const authRouter = express.Router();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
authRouter.use(express.json());

// Login route
authRouter.post(
  '/login',
  validateRequestBody(authLogin),
  async (req: AuthLoginRequest, res) => {
    const data = authLogin.parse(req.body);
    try {
      await AuthService.login(data, res);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred with the login function.' });
    }
  },
);

// Register route
authRouter.post(
  '/register',
  validateRequestBody(authRegister),
  async (req: AuthRegisterRequest, res) => {
    const data = authRegister.parse(req.body);
    try {
      await AuthService.register(data, res);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred with the register function.' });
    }
  },
);

const validateJwtToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    z.string().parse(req.cookies.jwt);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid refresh token.' });
  }
};

// Refresh route
authRouter.post(
  '/refresh',
  validateRequestBody(emailSchema),
  validateJwtToken,
  async (req: EmailRequest, res) => {
    const data = emailSchema.parse(req.body);
    const refreshToken = req.cookies.jwt;
    try {
      await AuthService.refresh(data.email, refreshToken, res);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred with the refresh function.' });
    }
  },
);

export default authRouter;
