import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../trpc";
import * as AuthService from "./AuthService";
import * as Prisma from "@prisma/client";

const loginMutation = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    return await AuthService
  .login(input);
  });

const readQuery = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
    }),
  )
  .mutation(async ({ input }) => {
    return await AuthService
  .read(input);
  });

const registerMutation = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
      role: z.string(),
    }),
  )
  .query(async ({ input }) => {
    return await AuthService
  .register(input as Omit<Prisma.Login, "id">);
  });

const adminMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .mutation(async () => {
    return "success!";
  });

export const authRouter = router({
  login: loginMutation,
  read: readQuery,
  register: registerMutation,
  admin: adminMutation,
});
