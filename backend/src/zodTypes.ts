import { Schema, z } from 'zod';
import { NextFunction, Response, Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export type ValidatedRequest<T> = Request<ParamsDictionary, unknown, T>;

export const validateRequestBody =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (e) {
      return res.status(400).json({
        message:
          'Request body does not fit expected Zod Schema. Check error for specifics.',
        error: e
      });
    }
  };

// USER

const userNameRefine = [
  ({
    firstName,
    middleName,
    lastName
  }: { firstName?: string; middleName?: string; lastName?: string }) =>
    firstName || middleName || lastName,
  { message: 'You need to have firstName, middleName, or lastName' }
] as const;

export const userSchemaBase = z.object({
  id: z.number().int(),
  firstName: z.string().optional().default(''),
  middleName: z.string().optional().default(''),
  lastName: z.string().optional().default(''),
  address: z.string().optional().default(''),
  phone: z.string().optional().default(''),

  isEmployee: z.boolean()
});

export const createUser = userSchemaBase
  .omit({ id: true })
  .refine(...userNameRefine);

export const updateUser = userSchemaBase
  .omit({ id: true })
  .refine(...userNameRefine);

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
export const updateLogin = loginSchema.omit({ id: true });
export type CreateLogin = z.infer<typeof createLogin>;
export type UpdateLogin = z.infer<typeof updateLogin>;
export type LoginCreateRequest = ValidatedRequest<CreateLogin>;
export type LoginUpdateRequest = ValidatedRequest<UpdateLogin>;

// TANKMETADATA

export const tankMetaDataSchema = z.object({
  id: z.number().int(),
  nickname: z.string().default('nickname'),
  volume: z.number().int().positive(),
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
export const updateTank = tankMetaDataSchema.omit({ id: true });
export type CreateTankMetaData = z.infer<typeof createTank>;
export type UpdateTankMetaData = z.infer<typeof updateTank>;
export type TankMetaDataCreateRequest = ValidatedRequest<CreateTankMetaData>;
export type TankMetaDataUpdateRequest = ValidatedRequest<UpdateTankMetaData>;

// SERVICECALL

export const serviceCallSchema = z.object({
  id: z.number().int(),
  isApproved: z.boolean(),
  createdOn: z.coerce.date(),

  customerRequest: z.string().optional().nullable().default(null),
  employeeNotes: z.string().optional().nullable().default(null),
  // server use only for not-approved notes
  notApprovedNotes: z.string().optional().nullable().default(null),
  notesUpdated: z.coerce.date().optional().nullable().default(null),

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
export const updateServiceCall = serviceCallSchema.omit({ id: true });
export const mobileServiceCall = serviceCallSchema.omit({
  id: true,
  isApproved: true,
  notApprovedNotes: true
});

export type CreateServiceCall = z.infer<typeof createServiceCall>;
export type UpdateServiceCall = z.infer<typeof updateServiceCall>;
export type MobileServiceCall = z.infer<typeof mobileServiceCall>;

export type ServiceCallCreateRequest = ValidatedRequest<CreateServiceCall>;
export type ServiceCallUpdateRequest = ValidatedRequest<UpdateServiceCall>;
export type ServiceCallMobileRequest = ValidatedRequest<MobileServiceCall>;

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

// Implemented so that searching is consistent and works universally for all Database types.
export const searchSchema = z
  .object({
    // most of these values are optional, but will only return the first 25 values if page/size is not given

    // pages go from 1-inf;
    page: z.number().positive().optional().default(1),
    // size of payload, defaults to 25
    size: z.number().positive().optional().default(25),

    // all optional, but should have at least one filled
    searchString: z.string().optional(),
    searchBoolean: z.boolean().optional(),
    searchNum: z.number().optional(),

    // for any min/max number search
    minNum: z.number().optional(),
    maxNum: z.number().optional(),

    // for any min/max date search
    minDate: z.date().optional(),
    maxDate: z.date().optional(),

    // defined enums, most searches may opt to not use
    searchRole: z.enum(['ADMIN', 'EMPLOYEE', 'CUSTOMER']).optional(),
    searchType: z.enum(['FRESH', 'SALT', 'BRACKISH']).optional()
  })
  .refine(
    ({ searchString, searchBoolean, searchNum }) =>
      (searchString ?? searchBoolean ?? searchNum) !== undefined,
    {
      message:
        'You need at least one of: searchString, searchBoolean, searchNum'
    }
  );

export type SearchSchema = z.infer<typeof searchSchema>;
