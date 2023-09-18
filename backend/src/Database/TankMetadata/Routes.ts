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

// brand new tank has epoch of 2010
const tankEpoch = new Date('2010-01-01');

// Create TankMetadata
tankMetaDataRouter.post(
  '/',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(
    createTank.omit({ qrSymbol: true, lastDateServiced: true }),
  ),
  async (req: TankMetaDataRequest, res) => {
    try {
      const input = req.body;
      const newTank: CreateTankMetaData = {
        ...input,
        qrSymbol: 0,
        lastDateServiced: tankEpoch,
      };
      const result = await TankMetadataService.create(newTank);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to create Tank Metadata';
      res.status(500).json({ error: errorMessage });
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to read Tank Metadata';
      res.status(500).json({ error: errorMessage });
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to update Tank Metadata';
      res.status(500).json({ error: errorMessage });
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to delete Tank Metadata';
      res.status(500).json({ error: errorMessage });
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to search Tank Metadata';
      res.status(500).json({ error: errorMessage });
    }
  },
);

export default tankMetaDataRouter;
