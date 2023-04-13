import { z } from 'zod';
import { router, publicProcedure, isRoleCurryMiddleware } from '../../trpc';
import * as UserService from './UserService';
import * as Prisma from '@prisma/client';

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(
    z.object({
      // data values
    })
  )
  .mutation(async ({ input }) => {
    // service function
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(
    z.object({
      // data values
    })
  )
  .query(async ({ input }) => {
    // service function
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(
    z.object({
      // data values
    })
  )
  .mutation(async ({ input }) => {
    // service function
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(
    z.object({
      // data values
    })
  )
  .mutation(async ({ input }) => {
    // service function
  });

export const userRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation
});
