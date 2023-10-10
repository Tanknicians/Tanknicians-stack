import { z } from "zod";

// USER

export const userSchema = z.object({
  id: z.number().int(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),

  isEmployee: z.boolean(),
});

// AUTH

export const loginSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  password: z.string(),
  role: z.enum(["ADMIN", "EMPLOYEE", "CUSTOMER"]),
  userId: z.number(),
});

export const authLogin = loginSchema.omit({
  id: true,
  role: true,
  userId: true,
});

export const RefreshTokenData = z.object({
  token: z.string(),
  savedCredentials: loginSchema.omit({
    password: true,
  }),
});

export type AuthLogin = z.infer<typeof authLogin>;
export type RefreshTokenData = z.infer<typeof RefreshTokenData>;

// ERROR RESPONSE

export const errorSchema = z.object({
  status: z.coerce.number().optional(),
  data: z.object({ message: z.string().default("") }),
});
