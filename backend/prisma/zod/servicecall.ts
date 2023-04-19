import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteTankMetadata, RelatedTankMetadataModel } from "./index"

export const ServiceCallModel = z.object({
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
  tankId: z.number().int(),
})

export interface CompleteServiceCall extends z.infer<typeof ServiceCallModel> {
  Employee: CompleteUser
  TankMetadata: CompleteTankMetadata
}

/**
 * RelatedServiceCallModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedServiceCallModel: z.ZodSchema<CompleteServiceCall> = z.lazy(() => ServiceCallModel.extend({
  Employee: RelatedUserModel,
  TankMetadata: RelatedTankMetadataModel,
}))
