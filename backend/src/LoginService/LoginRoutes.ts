import * as TokenGenerator from "../TokenGenerator";
import { z } from "zod";
// required imports: Express and Prisma Database
import { router, publicProcedure } from "../trpc";
import * as LoginService from "./LoginService";
import express, { Request, Response } from "express";

const LoginRouter = express.Router();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
LoginRouter.use(express.json());

// returns Login's token on success

LoginRouter.post("/find", async (req: Request, res: Response) => {
	console.log("Login.find invoked.");
	await LoginService.find(req, res);
});

LoginRouter.post(
	"/admin",
	TokenGenerator.authenticateJWT("admin"),
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
