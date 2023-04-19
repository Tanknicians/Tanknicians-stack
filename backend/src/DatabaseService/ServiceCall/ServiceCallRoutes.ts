import { z } from 'zod';
import { router, publicProcedure, isRoleCurryMiddleware } from '../../trpc';
import * as ServiceCall from './ServiceCallService';

const ServiceCallModel = z.object({
  id: z.number().int(),
  isApproved: z.boolean(),
  createdOn: z.date(),
  billed: z.boolean(),
  customerRequest: z.string(),
  alkalinity: z.number(),
  calcium: z.number(),
  nitrate: z.number(),
  phosphate: z.number(),
  ATOOperational: z.boolean(),
  ATOResevoirFilled: z.boolean(),
  chemFilterAdjusted: z.boolean(),
  doserAdjustementOrManualDosing: z.boolean(),
  dosingReservoirsFull: z.boolean(),
  floorsCheckedForSpillsOrDirt: z.boolean(),
  glassCleanedInside: z.boolean(),
  glassCleanedOutside: z.boolean(),
  mechFilterChanged: z.boolean(),
  notesUpdated: z.boolean(),
  pumpsClearedOfDebris: z.boolean(),
  saltCreepCleaned: z.boolean(),
  skimmerCleanedAndOperational: z.boolean(),
  waterChanged: z.boolean(),
  pestAPresent: z.boolean(),
  pestBPresent: z.boolean(),
  pestCPresent: z.boolean(),
  pestDPresent: z.boolean(),
  employeeId: z.number().int(),
  tankId: z.number().int()
});

const createMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(ServiceCallModel.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await ServiceCall.create(input);
  });

const readQuery = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(ServiceCallModel.pick({ id: true }))
  .query(async ({ input }) => {
    return await ServiceCall.read(input.id);
  });

const updateMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(ServiceCallModel)
  .mutation(async ({ input }) => {
    return await ServiceCall.update(input);
  });

const deleteMutation = publicProcedure
  .use(isRoleCurryMiddleware(['ADMIN']))
  .input(ServiceCallModel.pick({ id: true }))
  .mutation(async ({ input }) => {
    return await ServiceCall.deleteOne(input.id);
  });

export const serviceCallRouter = router({
  create: createMutation,
  read: readQuery,
  update: updateMutation,
  delete: deleteMutation
});
