import express from 'express';
import * as TankMetadataService from './API';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import {
  TankMetaDataCreateRequest,
  TankMetaDataUpdateRequest,
  createTank,
  searchSchema,
  updateTank,
  validateRequestBody
} from '../../zodTypes';

/**
 * This router is for providing modification access to individual tank
 * records in the database.
 */

const tankMetaDataRouter = express.Router();
tankMetaDataRouter.use(express.json());

// Create TankMetadata
tankMetaDataRouter.post(
  '/',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(createTank),
  async (req: TankMetaDataCreateRequest, res) => {
    try {
      const data = req.body;
      const result = await TankMetadataService.create(data);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to create Tank Metadata';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Read TankMetadata
tankMetaDataRouter.get(
  '/',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  async (_, res) => {
    try {
      const result = await TankMetadataService.readAll();
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read Tank Metadata';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Read TankMetadata
tankMetaDataRouter.get(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await TankMetadataService.read(id);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read Tank Metadata';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Update TankMetadata
tankMetaDataRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(updateTank),
  async (req: TankMetaDataUpdateRequest, res) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const result = await TankMetadataService.update(id, data);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to update Tank Metadata';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Delete TankMetadata
tankMetaDataRouter.delete(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await TankMetadataService.deleteOne(id);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to delete Tank Metadata';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Search TankMetadata
tankMetaDataRouter.get(
  '/search',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const searchQuery = searchSchema.safeParse(req.query);
      if (!searchQuery.success) {
        return res.status(400).json({ error: searchQuery.error.errors });
      } else {
        const result = await TankMetadataService.search(searchQuery.data);
        res.json(result);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to search Tank Metadata';
      res.status(500).json({ error: errorMessage });
    }
  }
);

export default tankMetaDataRouter;
