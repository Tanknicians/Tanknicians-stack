import express from "express";
import * as TankMetadataService from "./TankMetadataService";
import { TankMetadata } from "@prisma/client";

const tankMetaDataRouter = express.Router();

// Create TankMetadata
tankMetaDataRouter.post("/", async (req, res) => {
  try {
    const input = req.body;
    const result = await TankMetadataService.create(input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create TankMetadata" });
  }
});

// Read TankMetadata
tankMetaDataRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await TankMetadataService.read(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to read TankMetadata" });
  }
});

// Update TankMetadata
tankMetaDataRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;
    const tankData: TankMetadata = {
      id,
      ...input,
    };
    const result = await TankMetadataService.update(tankData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update TankMetadata" });
  }
});

// Delete TankMetadata
tankMetaDataRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await TankMetadataService.deleteOne(id);
    res.json({ message: "TankMetadata deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete TankMetadata" });
  }
});

// Search TankMetadata
tankMetaDataRouter.get("/search/:searchString", async (req, res) => {
  try {
    const searchString = req.params.searchString;
    const result = await TankMetadataService.search(searchString);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to search TankMetadata" });
  }
});

export default tankMetaDataRouter;
