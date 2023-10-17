import * as AuthService from './API';
import express, { NextFunction, Response, Request } from 'express';
import {
  authLogin,
  AuthLoginRequest,
  authRegister,
  AuthRegisterRequest,
  validateRequestBody
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
    const data = req.body;
    try {
      await AuthService.login(data, res);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred with the login function.' });
    }
  }
);

// Register route
authRouter.post(
  '/register',
  validateRequestBody(authRegister),
  async (req: AuthRegisterRequest, res) => {
    const data = req.body;
    try {
      await AuthService.register(data, res);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred with the register function.' });
    }
  }
);

const validateRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    z.string().parse(req.cookies.jwt);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid refresh token.' });
  }
};

// Refresh route
authRouter.get('/refresh', validateRefreshToken, async (req, res) => {
  const refreshToken = req.cookies.jwt;
  try {
    await AuthService.refresh(refreshToken, res);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred with the refresh function.' });
  }
});

export default authRouter;
