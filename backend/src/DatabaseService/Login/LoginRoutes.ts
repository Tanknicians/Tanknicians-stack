import { router, publicProcedure, isRoleCurryMiddleware } from "trpc";
import * as LoginService from "./LoginService";
import { Login } from "types";

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(Login.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await LoginService.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(Login.pick({ email: true }))
  .query(async ({ input }) => {
    return await LoginService.read(input.email);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(Login)
  .mutation(async ({ input }) => {
    return await LoginService.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(Login.pick({ id: true }))
  .mutation(async ({ input }) => {
    return await LoginService.deleteOne(input.id);
  });

export const loginRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
