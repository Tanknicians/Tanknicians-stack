import express from 'express';
import * as LoginService from './API';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import {
  LoginRequest,
  UpdateLogin,
  createLogin,
  searchSchema,
  updateLogin,
  validateRequestBody,
} from '../../zodTypes';

const loginRouter = express.Router();
loginRouter.use(express.json());

// Create Login
loginRouter.post(
  '/',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(createLogin),
  async (req: LoginRequest, res) => {
    try {
      const input = createLogin.parse(req.body);
      const result = await LoginService.create(input);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to create Login';
      res.status(500).json({ error: errorMessage });
    }
  },
);

// Read Login
loginRouter.get(
  '/:email',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const email = req.params.email;
      const result = await LoginService.read(email);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to get Login';
      res.status(500).json({ error: errorMessage });
    }
  },
);

// Update Login
loginRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(updateLogin),
  async (req: LoginRequest, res) => {
    try {
      const id = Number(req.params.id);
      const input = req.body;
      const loginData: UpdateLogin = {
        id,
        ...input,
      };
      const result = await LoginService.update(loginData);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to update Login';
      res.status(500).json({ error: errorMessage });
    }
  },
);

// Delete Login
loginRouter.delete(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await LoginService.deleteOne(id);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to delete Login';
      res.status(500).json({ error: errorMessage });
    }
  },
);

// Search Login
loginRouter.get(
  '/search',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const searchQuery = searchSchema.safeParse(req.query);
      if (!searchQuery.success) {
        return res.status(400).json({ error: searchQuery.error.errors });
      } else {
        const result = await LoginService.search(searchQuery.data);
        res.json(result);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to search Login';
      res.status(500).json({ error: errorMessage });
    }
  },
);

export default loginRouter;
