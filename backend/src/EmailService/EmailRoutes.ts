import express from "express";
import { resetPassword } from "./EmailService";

const emailRouter = express.Router();

emailRouter.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await resetPassword(email);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred during resetPassword." });
  }
});

export default emailRouter;
