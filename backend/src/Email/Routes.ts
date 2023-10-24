import express from 'express';
import { validateRequestBody, emailSchema, EmailRequest } from '../zodTypes';
import { emailResetPassword } from './API';

const emailRouter = express.Router();

emailRouter.post(
  '/reset-password',
  validateRequestBody(emailSchema),
  async (req: EmailRequest, res) => {
    try {
      const { email } = req.body;
      const result = await emailResetPassword(email);
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
