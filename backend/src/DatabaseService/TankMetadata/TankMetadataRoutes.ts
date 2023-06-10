import { router, publicProcedure, isRoleCurryMiddleware } from 'trpc';
import * as TankMetadataService from './TankMetadataService';
import { TankMetadata } from 'types';
import { z } from 'zod';

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(TankMetadata.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await TankMetadataService.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(TankMetadata.pick({ id: true }))
  .query(async ({ input }) => {
    return await TankMetadataService.read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(TankMetadata)
  .mutation(async ({ input }) => {
    return await TankMetadataService.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(TankMetadata.pick({ id: true }))
  .mutation(async ({ input }) => {
    return await TankMetadataService.deleteOne(input.id);
  });

const searchQuery = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(
    z.object({
      searchString: z.string()
    })
  )
  .query(async ({ input }) => {
    return await TankMetadataService.search(input.searchString);
  });

export const tankMetaDataRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
  search: searchQuery
});
