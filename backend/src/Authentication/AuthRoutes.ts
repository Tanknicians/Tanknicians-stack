import { z } from "zod";
import { router, publicProcedure } from "trpc";
import * as AuthService from "./AuthService";
import * as Prisma from "@prisma/client";
import { Login } from "types";

const loginQuery = publicProcedure
  .input(
    Login.pick({ email: true , password: true }),
  )
  .query(async ({ input }) => {
    return await AuthService.login(input);
  });

const registerMutation = publicProcedure
  .input(
    Login.omit({id: true})
  )
  .mutation(async ({ input }) => {
    return await AuthService.register(input as Omit<Prisma.Login, "id">);
  });

const refreshMutation = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      refreshToken: z.string(),
    }),
  )
  .query(async ({ input }) => {
    return await AuthService.refresh(input.email, input.refreshToken);
  });

export const authRouter = router({
  login: loginQuery,
  register: registerMutation,
  refresh: refreshMutation,
});
