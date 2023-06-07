import { router, publicProcedure, isRoleCurryMiddleware } from "trpc";
import * as TankMetadataService from "./TankMetadataService";
import { TankMetadata } from "types";

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(TankMetadata.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await TankMetadataService.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(TankMetadata.pick({ id: true }))
  .query(async ({ input }) => {
    return await TankMetadataService.read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(TankMetadata)
  .mutation(async ({ input }) => {
    return await TankMetadataService.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(TankMetadata.pick({ id: true }))
  .mutation(async ({ input }) => {
    return await TankMetadataService.deleteOne(input.id);
  });

export const tankMetaDataRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
