import { z } from "zod";
import { router, publicProcedure } from "../trpc";
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
    return await AuthService.login(input);
  });

const registerMutation = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
      role: z.string(),
      userId: z.number(),
    }),
  )
  .query(async ({ input }) => {
    return await AuthService.register(input as Omit<Prisma.Login, "id">);
  });

export const authRouter = router({
  login: loginMutation,
  register: registerMutation,
});
