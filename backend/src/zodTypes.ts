import { Schema, z } from "zod";
import { NextFunction, Response, Request } from "express";

export const userSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' }).email(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters'),
    role: z.enum(['ADMIN', 'EMPLOYEE', 'CUSTOMER'], {
      errorMap: () => ({
        message: 'Role must be ADMIN, EMPLOYEE, or CUSTOMER'
      })
    })
  })
  .strict();

export const validate =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body
      });
      next();
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  };
