import express from "express";
import * as ServiceCallService from "./ServiceCallService";
import { authenticateRoleMiddleWare } from "../../Authentication/AuthService";
import {
  ServiceCall,
  ServiceCallCreateRequest,
  serviceCallCreateSchema,
  ServiceCallRequest,
  serviceCallSchema,
  validateRequestBody,
} from "../../zodTypes";

const serviceCallRouter = express.Router();
serviceCallRouter.use(express.json());

// Create ServiceCall
serviceCallRouter.post(
  "/",
  authenticateRoleMiddleWare(["EMPLOYEE"]),
  validateRequestBody(serviceCallCreateSchema),
  async (req: ServiceCallCreateRequest, res) => {
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
  validateRequestBody(serviceCallSchema),
  async (req: ServiceCallRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = req.body;
      const serviceCallData: ServiceCall = {
        ...input,
        //we are just going to take the id from the url, but right now we also request it in the body. TODO: later
        id,
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
