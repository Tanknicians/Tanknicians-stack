import express, { Request, Response } from "express";

const ServiceCallRouter = express.Router();

ServiceCallRouter.post("/", async (req: Request, res: Response) => {
  console.log("ServiceCall.create invoked.");
});

ServiceCallRouter.get("/", async (req: Request, res: Response) => {
  console.log("ServiceCall.read invoked.");
});

ServiceCallRouter.put("/", async (req: Request, res: Response) => {
  console.log("ServiceCall.update invoked.");
});

ServiceCallRouter.delete("/", async (req: Request, res: Response) => {
  console.log("ServiceCall.delete invoked.");
});

export default ServiceCallRouter;
