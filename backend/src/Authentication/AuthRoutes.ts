import * as AuthService from "./AuthService";
import express from "express";

const authRouter = express.Router();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
authRouter.use(express.json());

// Login route
authRouter.post('/login', async (req, res) => {
  try {
    const result = await AuthService.login(req, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Register route
authRouter.post('/register', async (req, res) => {
  try {
    const result = await AuthService.register(req, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Refresh route
authRouter.post('/refresh', async (req, res) => {
  const { email, refreshToken } = req.body;
  try {
    const result = await AuthService.refresh(email, refreshToken);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default authRouter;