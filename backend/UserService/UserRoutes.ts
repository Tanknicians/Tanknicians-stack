// required imports: Express and Prisma Database
import express, { Request, Response } from "express";
import { authenticateJWT } from "../JWTService";
import { findUserService, loginUserService } from "./UserService";

const userRouter = express.Router();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
userRouter.use(express.json());

// returns user's token on successful login
userRouter.post("/login", async (req: Request, res: Response) => {
  console.log("User.Login invoked.");
  await loginUserService(req, res);
});

userRouter.post("/find", async (req: Request, res: Response) => {
  console.log("User.Find invoked.");
  await findUserService(req, res);
});

userRouter.post("/admin", authenticateJWT("admin"), async(req: Request, res: Response) => {
  res.send("success!")
});

// export the routes
export = userRouter;
