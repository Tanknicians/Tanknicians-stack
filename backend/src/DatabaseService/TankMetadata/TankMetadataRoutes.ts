import express, { Request, Response } from "express";

const TankMetadataRouter = express.Router();

TankMetadataRouter.post("/find", async (req: Request, res: Response) => {
    console.log("TankMetadata.find invoked.");
  });

export default TankMetadataRouter