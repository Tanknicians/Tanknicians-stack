import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../../trpc";
//import * as Login from './LoginService';
import * as Prisma from "@prisma/client";
import { create, deleteOne, read, update } from "./LoginService";
import { LoginModel } from "../../../prisma/zod";

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(LoginModel.omit({ id: true }))
  .mutation(async ({ input }) => {
    let { userId } = input;
    if (userId === undefined) {
      userId = null;
    }
    create({ ...input, userId });
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(LoginModel.pick({ email: true }))
  .query(async ({ input }) => {
    read(input.email);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(LoginModel)
  .mutation(async ({ input }) => {
    let { userId } = input;
    if (userId === undefined) {
      userId = null;
    }
    update({ ...input, userId });
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(LoginModel.pick({ id: true }))
  .mutation(async ({ input }) => {
    deleteOne(input.id);
  });

export const loginRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
