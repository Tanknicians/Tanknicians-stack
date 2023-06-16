import * as Prisma from "@prisma/client";
import { Request, Response, NextFunction } from "express";

// Generic input validation middleware, not currently working? (not implemented either)
export function validateInput<T extends {}>(type: new () => T) {
  console.log("Validating input...")
  return (req: Request, res: Response, next: NextFunction) => {
    const input = new type();
    const inputKeys = Object.keys(input);
    for (const key of inputKeys) {
      if (!(key in req.body)) {
        return res.status(400).json({ message: `${key} is required.` });
      }
    }
    console.log("Input validated.")
    next();
  };
}

export class LoginInput implements Pick<Prisma.Login, 'email' | 'password'> {
  email!: string;
  password!: string;
}

export class RegisterInput implements Omit<Prisma.Login, 'id'> {
  email!: string;
  password!: string;
  role!: Prisma.Role;
  userId!: number;
}

export class RefreshInput {
  email!: string;
  refreshToken!: string;
}
