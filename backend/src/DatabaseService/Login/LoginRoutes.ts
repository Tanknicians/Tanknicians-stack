import express from "express";
import * as LoginService from "./LoginService";
import { Login } from "@prisma/client";

const loginRouter = express.Router();

// Create Login
loginRouter.post("/", async (req, res) => {
  try {
    const input = req.body;
    const result = await LoginService.create(input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Login" });
  }
});

// Read Login
loginRouter.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await LoginService.read(email);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to read Login" });
  }
});

// Update Login
loginRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;
    const loginData: Login = {
      id,
      ...input,
    };
    const result = await LoginService.update(loginData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Login" });
  }
});

// Delete Login
loginRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await LoginService.deleteOne(id);
    res.json({ message: "Login deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Login" });
  }
});

// Search Login
loginRouter.get("/search/:searchString", async (req, res) => {
  try {
    const searchString = req.params.searchString;
    const result = await LoginService.search(searchString);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to search Login" });
  }
});

export default loginRouter;
