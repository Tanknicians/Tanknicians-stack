import express from "express";
import { validateRequestBody, emailSchema, EmailRequest } from "../zodTypes";
import { resetPassword } from "./API";

const emailRouter = express.Router();

emailRouter.post(
  "/reset-password",
  validateRequestBody(emailSchema),
  async (req: EmailRequest, res) => {
    try {
      const { email } = req.body;
      const result = await resetPassword(email);
      res.json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred during resetPassword." });
    }
  },
);

export default emailRouter;
