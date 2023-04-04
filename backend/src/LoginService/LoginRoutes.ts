import { z } from "zod";
// required imports: Express and Prisma Database
import {
  router,
  publicProcedure,
  adminProcedure,
  isRoleCurryMiddleware,
} from "../trpc";
import * as LoginService from "./LoginService";

export const loginRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .query(async ({ input }) => {
      return await LoginService.login(input);
    }),
  read: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      return await LoginService.read(input);
    }),
  admin: publicProcedure
    .use(isRoleCurryMiddleware(["ADMIN"]))
    .mutation(async () => {
      return "success!";
    }),
});
