import { number, z } from 'zod';
import { router, publicProcedure, isRoleCurryMiddleware } from '../../trpc';
import * as Login from './LoginService';
import * as Prisma from '@prisma/client';

const LoginObject = z.object({
  id: z.number().int(),
  email: z.string().email(),
  password: z.string(),
  role: z.nativeEnum(Prisma.Role),
  userId: z.number().int()
});

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(LoginObject.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await Login.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(LoginObject.pick({ email: true }))
  .query(async ({ input }) => {
    return await Login.read(input.email);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(LoginObject)
  .mutation(async ({ input }) => {
    return await Login.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(LoginObject.pick({ id: true }))
  .mutation(async ({ input }) => {
    return await Login.deleteOne(input.id);
  });

export const loginRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation
});
