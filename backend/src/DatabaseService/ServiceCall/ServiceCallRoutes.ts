import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../../trpc";
import { ServiceCallModel } from "../../../prisma/zod";
import { create, deleteOne, read, update } from "./ServiceCallService";

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(ServiceCallModel.omit({ id: true }))
  .mutation(async ({ input }) => {
    create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(ServiceCallModel.pick({ id: true }))
  .query(async ({ input }) => {
    read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(ServiceCallModel)
  .mutation(async ({ input }) => {
    update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(ServiceCallModel.pick({ id: true }))
  .mutation(async ({ input }) => {
    deleteOne(input.id);
  });

export const serviceCallRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
