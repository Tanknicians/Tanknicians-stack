import express, { Request, Response } from "express";

const ServiceCallRouter = express.Router();

ServiceCallRouter.post("/find", async (req: Request, res: Response) => {
    console.log("ServiceCall.find invoked.");
  });

export default ServiceCallRouter