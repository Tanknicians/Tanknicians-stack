import * as Prisma from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

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


export const Login = z.object({
  id: z.number().int(),
  email: z.string().email(),
  password: z.string(),
  role: z.nativeEnum(Prisma.Role),
  userId: z.number().int(),
});

export const ServiceCall = z.object({
  id: z.number().int(),
  isApproved: z.boolean(),
  createdOn: z.date(),
  customerRequest: z.string(),
  employeeNotes: z.string(),
  alkalinity: z.number(),
  calcium: z.number(),
  nitrate: z.number(),
  phosphate: z.number(),
  ATOOperational: z.boolean(),
  ATOReservoirFilled: z.boolean(),
  chemFilterAdjusted: z.boolean(),
  doserAdjustementOrManualDosing: z.boolean(),
  dosingReservoirsFull: z.boolean(),
  floorsCheckedForSpillsOrDirt: z.boolean(),
  glassCleanedInside: z.boolean(),
  glassCleanedOutside: z.boolean(),
  mechFilterChanged: z.boolean(),
  notesUpdated: z.boolean(),
  pumpsClearedOfDebris: z.boolean(),
  saltCreepCleaned: z.boolean(),
  skimmerCleanedAndOperational: z.boolean(),
  waterChanged: z.boolean(),
  pestAPresent: z.boolean(),
  pestBPresent: z.boolean(),
  pestCPresent: z.boolean(),
  pestDPresent: z.boolean(),
  employeeId: z.number().int(),
  tankId: z.number().int(),
});

export const TankMetadata = z.object({
  id: z.number().int(),
  description: z.string().nullable(),
  volume: z.number().positive(),
  type: z.nativeEnum(Prisma.TankType),
  tanknicianSourcedOnly: z.boolean(),
  lastDateServiced: z.date(),
  customerId: z.number().int(),
});

export const User = z.object({
  id: z.number().int(),
  firstName: z.string().nullable(),
  middleName: z.string().nullable(),
  lastName: z.string().nullable(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
});
