import * as z from "zod"
import { CompleteLogin, RelatedLoginModel, CompleteServiceCall, RelatedServiceCallModel, CompleteTankMetadata, RelatedTankMetadataModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  firstName: z.string().nullish(),
  middleName: z.string().nullish(),
  lastName: z.string().nullish(),
  address: z.string().nullish(),
  phone: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  login: CompleteLogin[]
  EmployeeServiceCalls: CompleteServiceCall[]
  OwnedTanks: CompleteTankMetadata[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  login: RelatedLoginModel.array(),
  EmployeeServiceCalls: RelatedServiceCallModel.array(),
  OwnedTanks: RelatedTankMetadataModel.array(),
}))
