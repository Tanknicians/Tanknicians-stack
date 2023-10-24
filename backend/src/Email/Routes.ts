import express from 'express';
import { validateRequestBody, emailSchema, EmailRequest } from '../zodTypes';
import { authenticateRoleMiddleWare } from '../Authentication/API';
import { resetPassword } from './API';

const emailRouter = express.Router();
emailRouter.use(express.json());

emailRouter.post(
  '/reset-password',
  authenticateRoleMiddleWare(['ADMIN']),
  validateRequestBody(emailSchema),
  async (req: EmailRequest, res) => {
    try {
      const { email } = req.body;
      const result = await resetPassword(email);
      res.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown Error: Failed to reset password';
      res.status(500).json({ error: errorMessage });
    }
  }
);

export default emailRouter;
