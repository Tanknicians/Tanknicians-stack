// in here we may or may not use axios
import * as Prisma from "@prisma/client";
import { Request, Response } from "express";
import * as LoginDB from "../../prisma/db/Login";
import * as bcrypt from "bcrypt";
import * as TokenGenerator from "../TokenGenerator";
import { TRPCError } from "@trpc/server";

export async function login(email: string, password: string) {
	// Construct user login model for Prisma
	const userLogin = {
		id: 0,
		email: email,
		password: password,
		role: null,
		userId: null,
	};

	// Retrieve user saved credentials based on username/email
	const savedCredentials = await LoginDB.find(userLogin);

	// Confirm user credentials existed in full in DB
	if (!savedCredentials) {
		console.error(`Login with email: ${userLogin.email} not found.`);
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "No record found for given credentials",
		});
	}
	if (!(savedCredentials.email && savedCredentials.password)) {
		console.error("record email or pw is nullish");
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "User record incomplete",
		});
	}

	console.log(`login found for ${userLogin.email}`);

	bcrypt.compare(
		userLogin.password,
		savedCredentials.password,
		function (err, result) {
			if (err) {
				console.error(err);
				throw new TRPCError({ code: "UNAUTHORIZED", cause: err });
			}
			if (!result) {
				// response is OutgoingMessage object that server response http request
				throw new TRPCError({
					code: "CONFLICT",
					message: "passwords do not match",
				});
			}
		},
	);

	console.log("Generating token.");

	// UPDATE: sends the login data as a generated token instead of a simple JSON
	const token = TokenGenerator.generateJWT(savedCredentials);
	if (!token) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Could not generate token",
		});
	}
	return {
		token: token,
	};
}

export async function find(req: Request, res: Response) {
	const { email } = req.body;
	const err: string = `login with email: ${email} not found.`;

	const login = await LoginDB.find(email);
	if (!login) {
		console.error(err);
		res.json({ success: false, message: err });
	}

	res.send(login);
}

// this should be a private function that cannot be used by a front-end until future expansion
export async function register(req: Request, res: Response) {
	let parsedLogin: Prisma.Login = {
		id: 0,
		email: req.body.email,
		password: req.body.password,
		role: req.body.role,
		userId: req.body.personId,
	};

	// though a role is required, having a string helps more than "null"
	if (parsedLogin.role == null) {
		res.send("Role cannot be empty.");
		return;
	}

	// not allowed to register an empty password
	if (parsedLogin.password) {
		parsedLogin.password = await bcrypt.hash(parsedLogin.password, 10);
	} else {
		res.send("Password cannot be empty.");
		return;
	}

	try {
		LoginDB.create(parsedLogin);
	} catch (error) {
		res.send(error);
	}
}
