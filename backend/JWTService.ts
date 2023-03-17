import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { Request, Response, NextFunction } from 'express';



/*
 * made some changes to this file.
 * not to sure what was going on with it.
 * kinda just seemed like copy and pasted code.
 * hopefully this is cleaner.
 */

// simple function that creates a random Secret for JWT
export function generateSecret(): string {
  return randomBytes(64).toString("hex");
}

// signs a token with a given secret
export function generateToken(user: User, secret: string): string {
  // TODO: use or remove json
  // const json: string = JSON.stringify(user);
  return jwt.sign(
    {
      data: user,
    },
    secret
  );
}

function verifyToken(token: string, secret: string) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw err;
  }
}


// Middleware for authenticating JWT
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, body) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.body = body;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};