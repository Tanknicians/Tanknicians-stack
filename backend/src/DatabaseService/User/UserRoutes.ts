import express, { Request, Response } from "express";

const UserRouter = express.Router();

UserRouter.post("/create", async (req: Request, res: Response) => {
  console.log("User.create invoked.");
});

UserRouter.post("/find", async (req: Request, res: Response) => {
  console.log("User.find invoked.");
});

UserRouter.post("/update", async (req: Request, res: Response) => {
  console.log("User.update invoked.");
});

UserRouter.post("/delete", async (req: Request, res: Response) => {
  console.log("User.delete invoked.");
});

UserRouter.post("/search", async (req: Request, res: Response) => {
  console.log("User.search invoked.");
});

export default UserRouter;
