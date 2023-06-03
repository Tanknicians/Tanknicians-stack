import { router, publicProcedure, isRoleCurryMiddleware } from 'trpc';
import { ServiceCall } from "types";

const uploadFormMutation = publicProcedure
  .use(isRoleCurryMiddleware(["ADMIN", "EMPLOYEE"]))
  .input(ServiceCall.omit({ id: true }))
  .mutation(async ({ input }) => {
    // function for doing checks on the service call
  });

