import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../../trpc";
import * as UserService from "./UserService";

const UserServiceObject = z.object({
  id: z.number().int(),
  firstName: z.string().nullable(),
  middleName: z.string().nullable(),
  lastName: z.string().nullable(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
});

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(UserServiceObject.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await UserService.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(UserServiceObject.pick({ id: true }))
  .query(async ({ input }) => {
    return await UserService.read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(UserServiceObject)
  .mutation(async ({ input }) => {
    return await UserService.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(UserServiceObject.pick({ id: true }))
  .mutation(async ({ input }) => {
    return await UserService.deleteOne(input.id);
  });

export const userRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
