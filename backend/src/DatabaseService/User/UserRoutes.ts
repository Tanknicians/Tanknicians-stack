import express from "express";
import * as UserService from "./UserService";

const userRouter = express.Router();

// Create User
userRouter.post("/", async (req, res) => {
  try {
    const input = req.body;
    const result = await UserService.create(input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create User" });
  }
});

// Read User
userRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await UserService.read(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to read User" });
  }
});

// Update User
userRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;
    const result = await UserService.update(input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
});

// Delete User
userRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await UserService.deleteOne(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete User" });
  }
});

// Search User
userRouter.get("/search/:searchString", async (req, res) => {
  try {
    const searchString = req.params.searchString;
    const result = await UserService.search(searchString);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to search User" });
  }
});

export default userRouter;
