// required imports: Express and Prisma Database
import express, { Request, Response } from "express";
import { authenticateJWT } from "../JWTService";
import * as loginService from "./LoginService";

const LoginRouter = express.Router();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
LoginRouter.use(express.json());

// returns Login's token on success
LoginRouter.post("/", async (req: Request, res: Response) => {
  console.log("Login.Login invoked.");
  await loginService.login(req, res);
});

LoginRouter.post("/find", async (req: Request, res: Response) => {
  console.log("Login.Find invoked.");
  await loginService.find(req, res);
});

LoginRouter.post("/admin", authenticateJWT("admin"), async(req: Request, res: Response) => {
  res.send("success!")
});

// export the routes
export = LoginRouter;
