import express from 'express';
import * as UserService from './API';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import {
  UpdateUser,
  UserRequest,
  createUserSchema,
  userSchema,
  validateRequestBody,
} from '../../zodTypes';
import { z } from 'zod';

const userRouter = express.Router();
userRouter.use(express.json());

// Create User
userRouter.post(
  '/',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(createUserSchema),
  async (req: UserRequest, res) => {
    try {
      const input = req.body;
      const result = await UserService.create(input);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create User' });
    }
  },
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
      res.status(500).json({ error: 'Failed to read User' });
    }
  },
);

// Read all Users and Tanks
userRouter.get(
  '/',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  async (req, res) => {
    try {
      const includeTanks = req.query.includeTanks === 'true';
      const result = await UserService.readAll(includeTanks);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get Users and Tanks' });
    }
  },
);

// Update User
userRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(userSchema),
  async (req: UserRequest, res) => {
    try {
      const id = Number(req.params.id);
      const input = req.body;
      const userData: UpdateUser = {
        id,
        ...input,
      };
      const result = await UserService.update(userData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update User' });
    }
  },
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
      res.status(500).json({ error: 'Failed to delete User' });
    }
  },
);

// Search User
userRouter.get(
  '/search/:searchString',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  async (req, res) => {
    const searchString = req.params.searchString;
    const pageNumberParse = z.coerce
      .number()
      .positive()
      .default(1)
      .safeParse(req.query.page);
    if (!pageNumberParse.success) {
      return res.status(400).json({ error: pageNumberParse.error.errors });
    }
    const pageNumber = pageNumberParse.data;

    try {
      const result = await UserService.search(searchString, pageNumber);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to search User' });
    }
  },
);

export default userRouter;
