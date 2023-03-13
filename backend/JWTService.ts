import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

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
export function generateToken(user: User, secret: jwt.Secret): string {
  // TODO: use or remove json
  // const json: string = JSON.stringify(user);
  return jwt.sign(
    {
      data: user,
    },
    secret
  );
}
