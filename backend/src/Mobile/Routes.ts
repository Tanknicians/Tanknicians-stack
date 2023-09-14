import express from 'express';
import { uploadServiceCall } from './API';
import { authenticateRoleMiddleWare } from '../Authentication/API';
import {
  createServiceCall,
  ServiceCallRequest,
  validateRequestBody,
} from '../zodTypes';

const mobileRouter = express.Router();
mobileRouter.use(express.json());

// Upload form for mobile.
mobileRouter.post(
  '/uploadForm',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  validateRequestBody(createServiceCall),
  async (req: ServiceCallRequest, res) => {
    try {
      const input = createServiceCall.parse(req.body);
      const message = await uploadServiceCall(input);
      res.status(200).json({ success: `Form uploaded. Form ${message}.` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload form.' });
    }
  },
);

export default mobileRouter;
