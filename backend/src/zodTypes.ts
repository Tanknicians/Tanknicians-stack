import { Schema, z } from 'zod';
import { NextFunction, Response, Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export type ValidatedRequest<T> = Request<ParamsDictionary, unknown, T>;

export const validateRequestBody =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  };

export const loginSchema = z
  .object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum(['ADMIN', 'EMPLOYEE', 'CUSTOMER'], {
      errorMap: () => ({
        message: 'Role must be ADMIN, EMPLOYEE, or CUSTOMER'
      })
    })
  })
  .strict();

export type Login = z.infer<typeof loginSchema>;
export type LoginRequest = ValidatedRequest<Login>;

export const authLogin = loginSchema.omit({ role: true });
export type AuthLogin = z.infer<typeof authLogin>;
export type AuthLoginRequest = ValidatedRequest<AuthLogin>;

export const serviceCallSchema = z.object({
  id: z.number(),
  isApproved: z.boolean().optional(),
  createdOn: z.date().optional(),

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
  pumpsClearedOfDebris: z.boolean(),
  saltCreepCleaned: z.boolean(),
  skimmerCleanedAndOperational: z.boolean(),
  waterChanged: z.boolean(),

  pestAPresent: z.boolean(),
  pestBPresent: z.boolean(),
  pestCPresent: z.boolean(),
  pestDPresent: z.boolean(),
  employeeId: z.number().int(),
  tankId: z.number().int()
});

export type ServiceCall = z.infer<typeof serviceCallSchema>;
export type ServiceCallRequest = ValidatedRequest<ServiceCall>;

export const serviceCallCreateSchema = serviceCallSchema.omit({ id: true });

export type ServiceCallCreate = z.infer<typeof serviceCallCreateSchema>;
export type ServiceCallCreateRequest = ValidatedRequest<ServiceCallCreate>;

export const emailSchema = z.object({ email: z.string().email() });
export type Email = z.infer<typeof emailSchema>;
export type EmailRequest = ValidatedRequest<Email>;
