import { router, publicProcedure, isRoleCurryMiddleware } from "./../../trpc";
import * as UserService from "./UserService";
import { User } from "./../../types";

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(User.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await UserService.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(User.pick({ id: true }))
  .query(async ({ input }) => {
    return await UserService.read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(User)
  .mutation(async ({ input }) => {
    return await UserService.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(User.pick({ id: true }))
  .mutation(async ({ input }) => {
    return await UserService.deleteOne(input.id);
  });

export const userRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
