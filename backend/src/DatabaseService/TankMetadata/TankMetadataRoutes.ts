import { z } from "zod";
import { router, publicProcedure, isRoleCurryMiddleware } from "../../trpc";
import { TankMetadataModel } from "../../../prisma/zod";
import { create, deleteOne, read, update } from "./TankMetadataService";
//import * as TankMetadata from './TankMetadataService';

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(TankMetadataModel.omit({ id: true }))
  .mutation(async ({ input }) => {
    let { description, ...rest } = input;
    if (description === undefined) description = null;
    create({ description, ...rest });
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(TankMetadataModel.pick({ id: true }))
  .query(async ({ input }) => {
    read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(TankMetadataModel)
  .mutation(async ({ input }) => {
    let { description, ...rest } = input;
    if (description === undefined) description = null;
    update({ description, ...rest });
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN"]))
  .input(TankMetadataModel.pick({ id: true }))
  .mutation(async ({ input }) => {
    deleteOne(input.id);
  });

export const tankMetaDataRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation,
});
