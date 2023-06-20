import express from 'express';
import { uploadServiceCall } from './MobileFormService';
import { authenticateRoleMiddleWare } from '../Authentication/AuthService';

const mobileFormRouter = express.Router();
mobileFormRouter.use(express.json());

// Upload form for mobile.
mobileFormRouter.post(
  '/uploadForm',
  authenticateRoleMiddleWare(['ADMIN', 'EMPLOYEE']),
  async (req, res) => {
    try {
      const input = req.body; // should probably add a types.ts object here
      const message = await uploadServiceCall(input); // returns a simple "approved/not approved."
      res.status(200).json({ success: `Form uploaded. Form ${message}.` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload form.' });
    }
  }
);

export default mobileFormRouter;
