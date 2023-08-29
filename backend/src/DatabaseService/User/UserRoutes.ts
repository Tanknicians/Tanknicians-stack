import express from "express";
import * as UserService from "./UserService";
import { authenticateRoleMiddleWare } from "../../Authentication/AuthService";
import { User } from "@prisma/client";

const userRouter = express.Router();
userRouter.use(express.json());

// Create User
userRouter.post(
  "/",
  authenticateRoleMiddleWare(["ADMIN"]),
  async (req, res) => {
    try {
      const input = req.body;
      const result = await UserService.create(input);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create User" });
    }
  },
);

// Read User
userRouter.get(
  "/:id",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await UserService.read(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to read User" });
    }
  },
);

userRouter.get(
  "/getAllUsersAndTanks",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (_req, res) => {
    try {
      // userservice that gets ALL users and ALL their tanks
      
    } catch (error) {
      res.status(500).json({error: "Failed to get Users and Tanks"});
    }
  },
)

// Update User
userRouter.put(
  "/:id",
  authenticateRoleMiddleWare(["ADMIN"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const input = req.body;
      const userData: User = {
        id,
        ...input,
      };
      const result = await UserService.update(userData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to update User" });
    }
  },
);

// Delete User
userRouter.delete(
  "/:id",
  authenticateRoleMiddleWare(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await UserService.deleteOne(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete User" });
    }
  },
);

// Search User
userRouter.get(
  "/search/:searchString",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (req, res) => {
    try {
      const searchString = req.params.searchString;
      const result = await UserService.search(searchString);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to search User" });
    }
  },
);

export default userRouter;
