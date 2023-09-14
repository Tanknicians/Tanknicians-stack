import express from 'express';
import * as TankMetadataService from './API';
import { authenticateRoleMiddleWare } from '../../Authentication/API';
import {
  CreateTankMetaData,
  TankMetaDataRequest,
  UpdateTankMetaData,
  createTank,
  tankMetaDataSchema,
  validateRequestBody,
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
  validateRequestBody(createTank.omit({qrSymbol: true})),
  async (req: TankMetaDataRequest, res) => {
    try {
      const input = req.body;
      const newTank: CreateTankMetaData = {
        ...input,
        qrSymbol: 0
      }
      const result = await TankMetadataService.create(newTank);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create TankMetadata' });
    }
  },
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
      res.status(500).json({ error: 'Failed to read TankMetadata' });
    }
  },
);

// Update TankMetadata
tankMetaDataRouter.put(
  '/:id',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(tankMetaDataSchema),
  async (req: TankMetaDataRequest, res) => {
    try {
      const id = Number(req.params.id);
      const input = req.body;
      const tankData: UpdateTankMetaData = {
        id,
        ...input,
      };
      const result = await TankMetadataService.update(tankData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update TankMetadata' });
    }
  },
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
      res.status(500).json({ error: 'Failed to delete TankMetadata' });
    }
  },
);

// Search TankMetadata
tankMetaDataRouter.get(
  '/search/:searchString',
  authenticateRoleMiddleWare(['ADMIN']),
  async (req, res) => {
    try {
      const searchString = req.params.searchString;
      const pageNumber = req.body.page;
      const result = await TankMetadataService.search(searchString, pageNumber);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search TankMetadata' });
    }
  },
);

export default tankMetaDataRouter;
