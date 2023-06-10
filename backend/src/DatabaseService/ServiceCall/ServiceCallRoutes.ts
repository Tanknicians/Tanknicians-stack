import { router, publicProcedure, isRoleCurryMiddleware } from "trpc";
import * as ServiceCallService from "./ServiceCallService";
import { ServiceCall } from "types";
import { z } from "zod";

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(ServiceCall.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await ServiceCallService.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(ServiceCall.pick({ id: true }))
  .query(async ({ input }) => {
    return await ServiceCallService.read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(ServiceCall)
  .mutation(async ({ input }) => {
    return await ServiceCallService.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(ServiceCall.pick({ id: true }))
  .mutation(async ({ input }) => {
    return await ServiceCallService.deleteOne(input.id);
  });

  const searchQuery = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(
    z.object({
      searchString: z.string()
    })
  )
  .query(async ({ input }) => {
    return await ServiceCallService.search(input.searchString);
  });

export const serviceCallRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
  search: searchQuery
});
