import express from 'express';
import * as ServiceCallService from './API';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import {
  ServiceCallCreateRequest,
  ServiceCallUpdateRequest,
  createServiceCall,
  searchSchema,
  updateServiceCall,
  validateRequestBody,
} from '../../zodTypes';
import { z } from 'zod';

const serviceCallRouter = express.Router();
serviceCallRouter.use(express.json());

// Create ServiceCall
serviceCallRouter.post(
  '/',
  authenticateRoleMiddleWare(['EMPLOYEE', 'ADMIN']),
  validateRequestBody(createServiceCall),
  async (req: ServiceCallCreateRequest, res) => {
    try {
      const data = createServiceCall.parse(req.body);
      const result = await ServiceCallService.create(data);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to create Service Call';
      res.status(500).json({ error: errorMessage });
    }
  },
);

// Read All
serviceCallRouter.get(
  '/',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    const result = z
      .object({
        isApproved: z.boolean().optional(),
      })
      .safeParse({ ...req.query });

    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }
    const { isApproved } = result.data;
    try {
      const result = await ServiceCallService.readAll(isApproved);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read all Service Calls';
      res.status(500).json({ error: errorMessage });
    }
  },
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read Service Call';
      res.status(500).json({ error: errorMessage });
    }
  },
);

// get all Service Calls from a tank ID and a start and end date
serviceCallRouter.get(
  '/range/:tankId',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    const result = z
      .object({
        tankId: z.coerce.number(),
        start: z.coerce.date().optional(),
        end: z.coerce.date().optional(),
      })
      .safeParse({ ...req.query, ...req.params });
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }
    // if dates are undefined, start and end dates are max range
    const { tankId, start, end } = result.data;
    try {
      const result = await ServiceCallService.readAllByDate(tankId, start, end);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read Service Call(s) from tankId and date range.';
      res.status(500).json({ error: errorMessage });
    }
  },
);

// get all Service Calls from a tank ID and isApproved boolean
serviceCallRouter.get(
  '/fromTank/:tankId',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    const result = z
      .object({
        tankId: z.coerce.number(),
        isApproved: z.boolean().optional(),
      })
      .safeParse({ ...req.query, ...req.params });
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }
    const { tankId, isApproved = false } = result.data;
    try {
      const result = await ServiceCallService.readAllByTankId(
        tankId,
        isApproved,
      );
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read Service Calls by tankID and given date range.';
      res.status(500).json({ error: errorMessage });
    }
  },
);

// Update ServiceCall
serviceCallRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(updateServiceCall),
  async (req: ServiceCallUpdateRequest, res) => {
    try {
      const id = Number(req.params.id);
      const data = updateServiceCall.parse(req.body);
      const result = await ServiceCallService.update(id, data);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to update Service Call';
      res.status(500).json({ error: errorMessage });
    }
  },
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to delete Service Call';
      res.status(500).json({ error: errorMessage });
    }
  },
);

// Search ServiceCall
serviceCallRouter.get(
  '/search',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const searchQuery = searchSchema.safeParse(req.query);
      if (!searchQuery.success) {
        return res.status(400).json({ error: searchQuery.error.errors });
      } else {
        const result = await ServiceCallService.search(searchQuery.data);
        res.json(result);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to search Service Call';
      res.status(500).json({ error: errorMessage });
    }
  },
);

export default serviceCallRouter;
