import express from "express";
import { uploadServiceCall } from "./MobileService";
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
  async (req, res) => {
    try {
      // function to return an array of users
    } catch (error) {
      res.status(500).json({ error: "Failed to sync users." });
    }
  }
)

// Sync list of Tanks (Custom TankMetaData model)
mobileRouter.get(
  "/allTanks",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (req, res) => {
    try {
      // function to return an array of all tanks
    } catch (error) {
      res.status(500).json({ error: "Failed to sync tanks." });
    }
  }
)

// Search DB for Customer (Custom User model)
mobileRouter.get(
  "/searchUser/:search",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (req, res) => {
    try {
      const searchString = req.params.search;
      // function to search for users, return array
    } catch (error) {
      res.status(500).json({ error: "Failed to search for users."})
    }
  }
)

// Get list of tanks (Custom TankMetaData model)
mobileRouter.get(
  "/tanks/:id",
  authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]),
  async (req, res) => {
    try {
      const userId = req.params.id;
      // function to return all of the user's tanks as an array
    } catch (error) {

    }
  }
)

export default mobileRouter;
