import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { authenticateJWT } from "./TokenGenerator";

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  try {
    const jwtPayload = authenticateJWT(token);
    res.locals.jwtPayload = jwtPayload;
    return { jwtPayload };
  } catch (e) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid JWT",
      cause: e,
    });
  }
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

const isAdmin = middleware(async ({ ctx: { jwtPayload }, next }) => {
  if (!jwtPayload) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No JWT payload found",
    });
  }

  if (jwtPayload.role !== "admin") {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not an admin" });
  }

  return next({
    ctx: {
      // had to hardcode the role admin in here, if you find another way then go ahead and fix it
      jwtPayload: { ...jwtPayload, role: "admin" },
    },
  });
});

export const adminProcedure = publicProcedure.use(isAdmin);
