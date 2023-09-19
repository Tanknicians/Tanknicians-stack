import express from 'express';
import * as UserService from './API';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import {
  UpdateUser,
  UserRequest,
  createUser,
  updateUser,
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
  validateRequestBody(createUser),
  async (req: UserRequest, res) => {
    try {
      const input = createUser.parse(req.body);
      const result = await UserService.create(input);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to create User';
      res.status(500).json({ error: errorMessage });
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read User';
      res.status(500).json({ error: errorMessage });
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
      const isEmployee = req.query.isEmployee === 'true';
      const result = await UserService.readAll(includeTanks, isEmployee);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read all Users and Tanks';
      res.status(500).json({ error: errorMessage });
    }
  },
);


// Update User
userRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(updateUser),
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to update User';
      res.status(500).json({ error: errorMessage });
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to delete User';
      res.status(500).json({ error: errorMessage });
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to search User';
      res.status(500).json({ error: errorMessage });
    }
  },
);

export default userRouter;
