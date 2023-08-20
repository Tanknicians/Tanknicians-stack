import express from "express";
import {
  getAllTanks,
  getAllUsers,
  getTanksByUserId,
  searchUsers,
  uploadServiceCall,
} from "./MobileService";
import { authenticateRoleMiddleWare } from "../Authentication/AuthService";

const mobileRouter = express.Router();
mobileRouter.use(express.json());

// Upload form for mobile.
mobileRouter.post(
  "/uploadForm",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (req, res) => {
    try {
      const input = req.body; // should probably add a types.ts object here

      // add if-else error checking of 'input' and throw specified errors

      const message = await uploadServiceCall(input); // returns a simple "approved/not approved."
      res.status(200).json({ success: `Form uploaded. Form ${message}.` });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload form." });
    }
  },
);

// Sync list of Customers (Custom User model)
mobileRouter.get(
  "/allUsers",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (_req, res) => {
    try {
      const allUsers = getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ error: "Failed to sync users." });
    }
  },
);

// Sync list of Tanks (Custom TankMetaData model)
mobileRouter.get(
  "/allTanks",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (_req, res) => {
    try {
      const allTanks = getAllTanks();
      res.status(200).json(allTanks);
    } catch (error) {
      res.status(500).json({ error: "Failed to sync tanks." });
    }
  },
);

// Search DB for Customer (Custom User model)
mobileRouter.get(
  "/searchUser",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (req, res) => {
    try {
      const searchString = req.body.search;

      // add if-else error checking of 'searchString' and throw specified errors

      const userSearch = searchUsers(searchString);
      res.status(200).json(userSearch);
    } catch (error) {
      res.status(500).json({ error: "Failed to search for users." });
    }
  },
);

// Get list of tanks (Custom TankMetaData model)
mobileRouter.get(
  "/tanks/:id",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (req, res) => {
    try {
      const userId = Number(req.params.id);
      const userTanks = getTanksByUserId(userId);
      res.status(200).json(userTanks);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user's tanks." });
    }
  },
);

export default mobileRouter;
