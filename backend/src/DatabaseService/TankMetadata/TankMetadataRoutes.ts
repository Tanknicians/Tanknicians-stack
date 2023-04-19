import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../../trpc";
import * as TankMetadata from './TankMetadataService';
import * as Prisma from '@prisma/client';

const TankMetadataObject = z.object({
  id: z.number().int(),
  description: z.string().nullable(),
  volume: z.number().positive(),
  type: z.nativeEnum(Prisma.TankType),
  tanknicianSourcedOnly: z.boolean(),
  lastDateServiced: z.date(),
  customerId: z.number().int(),
})

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    TankMetadataObject.omit({id: true}),
  )
  .mutation(async ({ input }) => {
    return await TankMetadata.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    TankMetadataObject.pick({id: true}),
  )
  .query(async ({ input }) => {
    return await TankMetadata.read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    TankMetadataObject,
  )
  .mutation(async ({ input }) => {
    return await TankMetadata.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(
    TankMetadataObject.pick({id: true}),
  )
  .mutation(async ({ input }) => {
    return await TankMetadata.deleteOne(input.id)
  });

export const tankMetaDataRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
