import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const LoginModel = z.object({
  id: z.number().int(),
  role: z.nativeEnum(Role),
  email: z.string(),
  password: z.string(),
  userId: z.number().int(),
})

export interface CompleteLogin extends z.infer<typeof LoginModel> {
  User: CompleteUser
}

/**
 * RelatedLoginModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLoginModel: z.ZodSchema<CompleteLogin> = z.lazy(() => LoginModel.extend({
  User: RelatedUserModel,
}))
