import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../../trpc";
import * as Prisma from "@prisma/client";
import { UserModel } from "../../../prisma/zod";
import { create, deleteOne, read, update } from "./UserService";

function undefinedToNull<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (value === undefined) {
        return [key, null];
      } else {
        return [key, value];
      }
    }),
  ) as Required<T>;
}

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(UserModel.omit({ id: true }))
  .mutation(async ({ input }) => {
    const value = undefinedToNull(input);
    create(value);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(UserModel.pick({ id: true }).required())
  .query(async ({ input }) => {
    read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(UserModel)
  .mutation(async ({ input }) => {
    update(undefinedToNull(input));
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(UserModel.pick({ id: true }).required())
  .mutation(async ({ input }) => {
    deleteOne(input.id);
  });

export const userRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
