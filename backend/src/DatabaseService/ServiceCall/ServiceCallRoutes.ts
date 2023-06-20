import express from "express";
import * as ServiceCallService from "./ServiceCallService";
import { ServiceCall } from "@prisma/client";
import { authenticateRoleMiddleWare } from "../../Authentication/AuthService";

const serviceCallRouter = express.Router();
serviceCallRouter.use(express.json());

// Create ServiceCall
serviceCallRouter.post(
  "/",
  authenticateRoleMiddleWare(["EMPLOYEE"]),
  async (req, res) => {
    try {
      const input = req.body;
      const result = await ServiceCallService.create(input);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create Service Call" });
    }
  },
);

// Read ServiceCall
serviceCallRouter.get(
  "/:id",
  authenticateRoleMiddleWare(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await ServiceCallService.read(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to read Service Call" });
    }
  },
);

// Update ServiceCall
serviceCallRouter.put(
  "/:id",
  authenticateRoleMiddleWare(["ADMIN"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const input = req.body;
      const serviceCallData: ServiceCall = {
        id,
        ...input,
      };
      const result = await ServiceCallService.update(serviceCallData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to update Service Call" });
    }
  },
);

// Delete ServiceCall
serviceCallRouter.delete(
  "/:id",
  authenticateRoleMiddleWare(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await ServiceCallService.deleteOne(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete Service Call" });
    }
  },
);

// Search ServiceCall
serviceCallRouter.get(
  "/search/:searchString",
  authenticateRoleMiddleWare(["ADMIN"]),
  async (req, res) => {
    try {
      const searchString = req.params.searchString;
      const result = await ServiceCallService.search(searchString);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to search Service Call" });
    }
  },
);

export default serviceCallRouter;
