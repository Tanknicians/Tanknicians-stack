import { router, publicProcedure, isRoleCurryMiddleware } from "trpc";
import { ServiceCall } from "types";
import { uploadServiceCall } from "./MobileFormService";

const uploadFormMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN", "EMPLOYEE"]))
  .input(ServiceCall.omit({ id: true }))
  .mutation(async ({ input }) => {
    return await uploadServiceCall(input);
  });

export const mobileFormRouter = router({
  uploadForm: uploadFormMutation,
});
