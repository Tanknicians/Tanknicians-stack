import express, { Request, Response } from "express";

const ServiceCallRouter = express.Router();

ServiceCallRouter.post("/create", async (req: Request, res: Response) => {
  console.log("ServiceCall.create invoked.");
});

ServiceCallRouter.post("/read", async (req: Request, res: Response) => {
  console.log("ServiceCall.read invoked.");
});

ServiceCallRouter.post("/update", async (req: Request, res: Response) => {
  console.log("ServiceCall.update invoked.");
});

ServiceCallRouter.post("/delete", async (req: Request, res: Response) => {
  console.log("ServiceCall.delete invoked.");
});

export default ServiceCallRouter;
