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

// USER

export const userSchemaBase = z.object({
  id: z.number().int(),
  firstName: z.string().optional().default(''),
  middleName: z.string().optional().default(''),
  lastName: z.string().optional().default(''),
  address: z.string().optional().default(''),
  phone: z.string().optional().default(''),

  isEmployee: z.boolean()
});

const user = userSchemaBase;

export const createUser = userSchemaBase.omit({ id: true }).refine(
  ({
    firstName,
    middleName,
    lastName
  }: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
  }) => firstName || middleName || lastName,
  {
    message: 'You need to have firstName, middleName, or lastName',
    path: ['firstName']
  }
);

export const updateUser = userSchemaBase.omit({ id: true }).refine(
  ({
    firstName,
    middleName,
    lastName
  }: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
  }) => firstName || middleName || lastName,
  {
    message: 'You need to have firstName, middleName, or lastName',
    path: ['firstName']
  }
);

export type User = z.infer<typeof user>;
export type CreateUser = z.infer<typeof createUser>;
export type UpdateUser = z.infer<typeof updateUser>;
export type UserCreateRequest = ValidatedRequest<CreateUser>;
export type UserUpdateRequest = ValidatedRequest<UpdateUser>;

// LOGIN

export const loginSchema = z
  .object({
    id: z.number().int(),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum(['ADMIN', 'EMPLOYEE', 'CUSTOMER'], {
      errorMap: () => ({
        message: 'Role must be ADMIN, EMPLOYEE, or CUSTOMER'
      })
    }),
    userId: z
      .number({ required_error: 'Must be a positive integer.' })
      .positive()
  })
  .strict();

export const createLogin = loginSchema.omit({ id: true });
export type CreateLogin = z.infer<typeof createLogin>;
export type UpdateLogin = z.infer<typeof loginSchema>;
export type LoginRequest = ValidatedRequest<CreateLogin>;

// AUTH

export const RefreshTokenData = z.object({
  token: z.string(),
  savedCredentials: loginSchema.pick({
    id: true,
    email: true,
    role: true,
    userId: true
  })
});

export type RefreshTokenData = z.infer<typeof RefreshTokenData>;

// TANKMETADATA

export const tankMetaDataSchema = z.object({
  id: z.number().int(),
  description: z.string().optional(),
  volume: z.coerce.number().int().positive(),
  type: z.enum(['FRESH', 'SALT', 'BRACKISH']),

  qrSymbol: z.number().int().positive(),

  tanknicianSourcedOnly: z.boolean(),
  lastDateServiced: z.coerce.date(),

  customerId: z.number().int()
});

export const createTank = tankMetaDataSchema.omit({
  id: true,
  qrSymbol: true,
  lastDateServiced: true
});
export type Tank = z.infer<typeof tankMetaDataSchema>;
export type CreateTankMetaData = z.infer<typeof createTank>;
export type UpdateTankMetaData = z.infer<typeof tankMetaDataSchema>;
export type TankMetaDataRequest = ValidatedRequest<CreateTankMetaData>;

// SERVICECALL

export const serviceCallSchema = z.object({
  id: z.number().int(),
  isApproved: z.boolean().optional(),
  createdOn: z.coerce.date(),

  customerRequest: z.string().optional(),
  employeeNotes: z.string().optional(),
  // server use only for not-approved notes
  notApprovedNotes: z.string().optional(),
  notesUpdated: z.coerce.date().optional(),

  alkalinity: z.coerce.number(),
  calcium: z.coerce.number(),
  nitrate: z.coerce.number(),
  phosphate: z.coerce.number(),

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
  waterTestedRecordedDated: z.boolean(),

  pestAPresent: z.boolean(),
  pestBPresent: z.boolean(),
  pestCPresent: z.boolean(),
  pestDPresent: z.boolean(),
  employeeId: z.number().int(),
  tankId: z.number().int()
});

export type ServiceCall = z.infer<typeof serviceCallSchema>;
export const createServiceCall = serviceCallSchema.omit({ id: true });
export type CreateServiceCall = z.infer<typeof createServiceCall>;
export const updateServiceCall = serviceCallSchema;
export type UpdateServiceCall = z.infer<typeof serviceCallSchema>;
export type ServiceCallRequest = ValidatedRequest<CreateServiceCall>;

// AUTH

export const authLogin = loginSchema.omit({
  id: true,
  role: true,
  userId: true
});
export type AuthLogin = z.infer<typeof authLogin>;
export type AuthLoginRequest = ValidatedRequest<AuthLogin>;

// this will be used to register new Logins
export const authRegister = loginSchema.omit({ id: true, password: true });
export type AuthRegister = z.infer<typeof authRegister>;
export type AuthRegisterRequest = ValidatedRequest<AuthRegister>;

// EMAIL

export const emailSchema = z.object({ email: z.string().email() });
export type Email = z.infer<typeof emailSchema>;
export type EmailRequest = ValidatedRequest<Email>;

// TOKEN

const tokenData = loginSchema.extend({ id: z.number(), userId: z.number() });

export const tokenSchema = z.object({
  data: tokenData,
  isRefreshToken: z.literal(false)
});

export type Token = z.infer<typeof tokenSchema>;

export const refreshTokenSchema = z.object({
  data: tokenData,
  isRefreshToken: z.literal(true)
});
export type RefreshToken = z.infer<typeof refreshTokenSchema>;
