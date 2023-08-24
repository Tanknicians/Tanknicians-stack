import express from "express";
import { validateRequestBody, ValidatedRequest } from "../zodTypes";
import { z } from "zod";
import { resetPassword } from "./EmailService";

const emailRouter = express.Router();

const schema = z.object({ email: z.string().email() });

emailRouter.post(
  "/reset-password",
  validateRequestBody(schema),
  async (req: ValidatedRequest<z.infer<typeof schema>>, res) => {
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
