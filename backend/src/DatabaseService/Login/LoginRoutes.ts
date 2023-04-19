import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../../trpc";
import * as Login from "./LoginService";
import * as Prisma from "@prisma/client";
import { LoginModel } from "../../../prisma/zod/login";

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(LoginModel.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await Login.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(LoginModel.pick({ email: true }))
  .query(async ({ input }) => {
    return await Login.read(input.email);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(LoginModel)
  .mutation(async ({ input }) => {
    return await Login.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(LoginModel.pick({ id: true }))
  .mutation(async ({ input }) => {
    return await Login.deleteOne(input.id);
  });

export const loginRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
