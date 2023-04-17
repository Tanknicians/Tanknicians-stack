import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../../trpc";
//import * as Login from './LoginService';
import * as Prisma from "@prisma/client";

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    z.object({
      // data values
    }),
  )
  .mutation(async ({ input }) => {
    // service function
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    z.object({
      // data values
    }),
  )
  .query(async ({ input }) => {
    // service function
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    z.object({
      // data values
    }),
  )
  .mutation(async ({ input }) => {
    // service function
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    z.object({
      // data values
    }),
  )
  .mutation(async ({ input }) => {
    // service function
  });

export const loginRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
