import { router, publicProcedure, isRoleCurryMiddleware } from "trpc";
import * as LoginService from "./LoginService";
import { Login } from "types";
import { z } from "zod";

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

  const searchQuery = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(
    z.object({
      searchString: z.string()
    })
  )
  .query(async ({ input }) => {
    return await LoginService.search(input.searchString);
  });

export const loginRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
  search: searchQuery
});
