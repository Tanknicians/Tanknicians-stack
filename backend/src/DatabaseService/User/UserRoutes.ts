import express, { Request, Response } from "express";

const UserRouter = express.Router();

UserRouter.post("/find", async (req: Request, res: Response) => {
    console.log("User.find invoked.");
  });

export default UserRouter