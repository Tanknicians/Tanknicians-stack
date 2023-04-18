import { number, z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../../trpc";
import * as Login from './LoginService';
import * as Prisma from "@prisma/client";


const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
      role: z.nativeEnum(Prisma.Role),
      userId: z.number().positive().int()
    }),
  )
  .mutation(async ({ input }) => {
    return await Login.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    z.object({
      email: z.string().email()
    }),
  )
  .query(async ({ input }) => {
    return await Login.read(input.email);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    z.object({
      id: z.number().positive().int(),
      email: z.string().email(),
      password: z.string(),
      role: z.nativeEnum(Prisma.Role),
      userId: z.number().positive().int()
    }),
  )
  .mutation(async ({ input }) => {
    return await Login.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    z.object({
      id: z.number().positive().int()
    }),
  )
  .mutation(async ({ input }) => {
    return await Login.deleteOne(input.id);
  });

export const loginRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
