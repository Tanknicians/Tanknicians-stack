import express from 'express';
import * as LoginService from './API';
import { Login } from '@prisma/client';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import { createLogin, loginSchema, validateRequestBody } from '../../zodTypes';

const loginRouter = express.Router();
loginRouter.use(express.json());

// Create Login
loginRouter.post(
  '/',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(createLogin),
  async (req, res) => {
    try {
      const input = req.body;
      const result = await LoginService.create(input);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Login' });
    }
  }
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
      res.status(500).json({ error: 'Failed to read Login' });
    }
  }
);

// Update Login
loginRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(loginSchema),
  async (req, res) => {
    try {
      const id = req.params.id;
      const input = req.body;
      const loginData: Login = {
        id,
        ...input
      };
      const result = await LoginService.update(loginData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update Login' });
    }
  }
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
      res.status(500).json({ error: 'Failed to delete Login' });
    }
  }
);

// Search Login
loginRouter.get(
  '/search/:searchString',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const searchString = req.params.searchString;
      const pageNumber = req.body.page;
      const result = await LoginService.search(searchString, pageNumber);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search Login' });
    }
  }
);

export default loginRouter;
