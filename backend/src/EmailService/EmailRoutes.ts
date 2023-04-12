import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { sendEmail } from "./EmailService";

export const emailRouter = router({
  resetPassword: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      return sendEmail(input.email);
    }),
});
