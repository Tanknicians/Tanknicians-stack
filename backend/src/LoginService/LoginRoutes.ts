import * as TokenGenerator from "../TokenGenerator";
import { z } from "zod";
// required imports: Express and Prisma Database
import { router, publicProcedure } from "../trpc";
import * as LoginService from "./LoginService";
import express, { Request, Response } from "express";

const LoginRouter = express.Router();
const jwt_secret = process.env.JWT_SECRET;

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
LoginRouter.use(express.json());

// returns Login's token on success
LoginRouter.post("/", async (req: Request, res: Response) => {
  console.log("Login invoked.");
  await LoginService.login(req.body.email, req.body.password);
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

export const loginRouter = router({
  
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ input }) => {
      return await LoginService.login(input.email, input.password);
    }),
    
});
