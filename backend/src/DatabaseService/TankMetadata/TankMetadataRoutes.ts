import express, { Request, Response } from "express";

const TankMetadataRouter = express.Router();

TankMetadataRouter.post("/create", async (req: Request, res: Response) => {
  console.log("TankMetadata.create invoked.");
});

TankMetadataRouter.post("/find", async (req: Request, res: Response) => {
  console.log("TankMetadata.find invoked.");
});

TankMetadataRouter.post("/update", async (req: Request, res: Response) => {
  console.log("TankMetadata.update invoked.");
});

TankMetadataRouter.post("/delete", async (req: Request, res: Response) => {
  console.log("TankMetadata.delete invoked.");
});

export default TankMetadataRouter;
