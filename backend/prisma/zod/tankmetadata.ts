import * as z from "zod"
import { TankType } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteServiceCall, RelatedServiceCallModel } from "./index"

export const TankMetadataModel = z.object({
  id: z.number().int(),
  description: z.string().nullish(),
  volume: z.number().int(),
  type: z.nativeEnum(TankType),
  tanknicianSourcedOnly: z.boolean(),
  lastDateServiced: z.date(),
  customerId: z.number().int(),
})

export interface CompleteTankMetadata extends z.infer<typeof TankMetadataModel> {
  Customer: CompleteUser
  ServiceCalls: CompleteServiceCall[]
}

/**
 * RelatedTankMetadataModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTankMetadataModel: z.ZodSchema<CompleteTankMetadata> = z.lazy(() => TankMetadataModel.extend({
  Customer: RelatedUserModel,
  ServiceCalls: RelatedServiceCallModel.array(),
}))
