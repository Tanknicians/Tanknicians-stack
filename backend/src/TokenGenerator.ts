import { Login } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { Request, Response, NextFunction } from "express";

// needed for the JWT secret
require("dotenv").config();

interface JwtPayload {
	id: string;
	email: string;
	role: string;
}

// simple function that creates a random Secret for JWT, not actively being used
export function generateSecret(): string {
	return randomBytes(64).toString("hex");
}

// signs a token with a given secret
export function generateJWT(login: Login): string {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is undefined");
	}
	return jwt.sign(
		{
			data: login,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "24h",
		},
	);
}

// middleware for JWT auth
export function authenticateJWT(role: String) {
	return function (req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).send({ message: "No token provided" });
		}

		const token = authHeader.split(" ")[1];
		let jwtPayload: JwtPayload;
		try {
			if (!process.env.JWT_SECRET) return res.status(401);
			jwtPayload = verifyJWT(token, process.env.JWT_SECRET);
			res.locals.jwtPayload = jwtPayload;
		} catch (error) {
			return res.status(401).send({ message: "Invalid token" });
		}

		if (jwtPayload.role !== role) {
			// Check if login has the correct role
			return res.status(401).send({ message: "Unauthorized access" });
		}
		next();
	};
}

function verifyJWT(token: string, secret: string): JwtPayload {
	try {
		return jwt.verify(token, secret) as JwtPayload;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
