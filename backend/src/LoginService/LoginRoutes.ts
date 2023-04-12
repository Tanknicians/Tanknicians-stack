import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../trpc";
import * as LoginService from "./LoginService";


const loginMutation = publicProcedure
  .input(z.object({ email: z.string().email(), password: z.string() }))
  .mutation(async ({ input }) => {
    return await LoginService.login(input);
  });

const readQuery = publicProcedure
  .input(z.object({ email: z.string().email() }))
  .query(async ({ input }) => {
    return await LoginService.read(input);
  });

const adminMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .mutation(async () => {
    return "success!";
  });

export const loginRouter = router({
  "": loginMutation,
  read: readQuery,
  admin: adminMutation,
});