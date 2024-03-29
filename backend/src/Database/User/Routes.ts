import express from 'express';
import * as UserService from './API';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import {
  UserCreateRequest,
  UserUpdateRequest,
  createUser,
  searchSchema,
  updateUser,
  validateRequestBody
} from '../../zodTypes';
import { z } from 'zod';

const userRouter = express.Router();
userRouter.use(express.json());

// Create User
userRouter.post(
  '/',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(createUser),
  async (req: UserCreateRequest, res) => {
    try {
      const data = req.body;
      const result = await UserService.create(data);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to create User';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Read User
userRouter.get(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await UserService.read(id);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read User';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Read all Users and Tanks
userRouter.get(
  '/',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  async (req, res) => {
    const requestData = z
      .object({
        includeTanks: z.boolean().optional().default(false),
        isEmployee: z.boolean().optional()
      })
      .safeParse(req.query);
    if (!requestData.success) {
      return res.status(400).json({ error: requestData.error.errors });
    }

    try {
      const includeTanks = requestData.data.includeTanks;
      const isEmployee = requestData.data.isEmployee;
      const result = await UserService.readAll(includeTanks, isEmployee);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read all Users and Tanks';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Update User
userRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(updateUser),
  async (req: UserUpdateRequest, res) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const result = await UserService.update(id, data);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to update User';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Delete User
userRouter.delete(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await UserService.deleteOne(id);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to delete User';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Search User
userRouter.get(
  '/search',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  async (req, res) => {
    try {
      const searchQuery = searchSchema.safeParse(req.query);
      if (!searchQuery.success) {
        return res.status(400).json({ error: searchQuery.error.errors });
      } else {
        const result = await UserService.search(searchQuery.data);
        res.json(result);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to search User';
      res.status(500).json({ error: errorMessage });
    }
  }
);

export default userRouter;
