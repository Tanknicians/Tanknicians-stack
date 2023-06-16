import * as AuthService from "./AuthService";
import express from "express";

const authRouter = express.Router();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
authRouter.use(express.json());

// Login route
authRouter.post('/login', async (req, res) => {
  try {
    await AuthService.login(req, res);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Register route
authRouter.post('/register', async (req, res) => {
  try {
    await AuthService.register(req, res);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Refresh route
// Refresh route
authRouter.post('/refresh', async (req, res) => {
  try {
    await AuthService.refresh(req, res);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


export default authRouter;