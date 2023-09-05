import express from 'express';
import * as UserService from './API';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import { User } from '@prisma/client';

const userRouter = express.Router();
userRouter.use(express.json());

// Create User
userRouter.post(
  '/',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const input = req.body;
      const result = await UserService.create(input);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create User' });
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
      res.status(500).json({ error: 'Failed to read User' });
    }
  }
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
  }
);

// Update User
userRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const id = req.params.id;
      const input = req.body;
      const userData: User = {
        id,
        ...input
      };
      const result = await UserService.update(userData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update User' });
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
      res.status(500).json({ error: 'Failed to delete User' });
    }
  }
);

// Search User
userRouter.get(
  '/search/:searchString',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  async (req, res) => {
    try {
      const searchString = req.params.searchString;
      const pageNumber = req.body.page;
      const result = await UserService.search(searchString, pageNumber);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search User' });
    }
  }
);

export default userRouter;
