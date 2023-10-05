import express from 'express';
import { uploadServiceCall } from './API';
import { authenticateRoleMiddleWare } from '../Authentication/API';
import {
  createServiceCall,
  mobileServiceCall,
  ServiceCallMobileRequest,
  validateRequestBody,
} from '../zodTypes';

const mobileRouter = express.Router();
mobileRouter.use(express.json());

// Upload form for mobile.
mobileRouter.post(
  '/uploadForm',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  validateRequestBody(mobileServiceCall),
  async (req: ServiceCallMobileRequest, res) => {
    try {
      const data = req.body;
      const message = await uploadServiceCall(data);
      res.status(200).json({ success: `Form uploaded. Form ${message}.` });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to upload Service Call from mobile.';
      res.status(500).json({ error: errorMessage });
    }
  },
);

export default mobileRouter;
