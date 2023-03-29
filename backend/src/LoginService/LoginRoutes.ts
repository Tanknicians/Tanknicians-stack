// required imports: Express and Prisma Database
import express, { Request, Response } from "express";
import * as TokenGenerator from "../TokenGenerator";
import * as LoginService from "./LoginService";

const LoginRouter = express.Router();
const jwt_secret = process.env.JWT_SECRET;

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
LoginRouter.use(express.json());

// returns Login's token on success
LoginRouter.post("/", async (req: Request, res: Response) => {
  console.log("Login invoked.");
  await LoginService.login(req, res);
});

LoginRouter.post("/read", async (req: Request, res: Response) => {
  console.log("Login.read invoked.");
  await LoginService.read(req, res);
});

LoginRouter.post(
  "/admin",
  TokenGenerator.authenticateJWT("admin", jwt_secret),
  async (req: Request, res: Response) => {
    res.send("success!");
  },
);

// export the routes
export default LoginRouter;
