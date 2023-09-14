import express from 'express';
import * as ServiceCallService from './API';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import {
  ServiceCallRequest,
  UpdateServiceCall,
  createServiceCall,
  serviceCallSchema,
  validateRequestBody
} from '../../zodTypes';
import { z } from 'zod';

const serviceCallRouter = express.Router();
serviceCallRouter.use(express.json());

// Create ServiceCall
serviceCallRouter.post(
  '/',
  authenticateRoleMiddleWare(['EMPLOYEE']),
  validateRequestBody(createServiceCall),
  async (req: ServiceCallRequest, res) => {
    try {
      const input = createServiceCall.parse(req.body);
      const result = await ServiceCallService.create(input);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Service Call' });
    }
  }
);

// Read All
serviceCallRouter.get(
  '/',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    const result = z
      .object({
        isApproved: z.coerce.boolean()
      })
      .safeParse({ ...req.query });
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }
    const { isApproved = false } = result.data;
    try {
      const result = await ServiceCallService.readAll(isApproved);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to read all Service Calls by isApproved boolean.'
      });
    }
  }
);

// Read ServiceCall
serviceCallRouter.get(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await ServiceCallService.read(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read Service Call' });
    }
  }
);

// get all Service Calls from a tank ID and a start and end date
serviceCallRouter.get(
  '/range/:tankId',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    const result = z
      .object({
        tankId: z.coerce.number(),
        start: z.coerce.date(),
        end: z.coerce.date()
      })
      .safeParse({ ...req.query, ...req.params });
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }
    const { tankId, start, end } = result.data;

    try {
      const result = await ServiceCallService.readAllByDate(tankId, start, end);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to read Service Calls by tankID and given date range.'
      });
    }
  }
);

// Update ServiceCall
serviceCallRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(serviceCallSchema),
  async (req: ServiceCallRequest, res) => {
    try {
      const id = Number(req.params.id);
      const input = req.body;
      const serviceCallData: UpdateServiceCall = {
        id,
        ...input
      };
      const result = await ServiceCallService.update(serviceCallData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update Service Call' });
    }
  }
);

// Delete ServiceCall
serviceCallRouter.delete(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await ServiceCallService.deleteOne(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete Service Call' });
    }
  }
);

// Search ServiceCall
serviceCallRouter.get(
  '/search/:searchString',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const searchString = req.params.searchString;
      const pageNumber = req.body.page;
      const result = await ServiceCallService.search(searchString, pageNumber);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search Service Call' });
    }
  }
);

export default serviceCallRouter;
