import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { verifyToken } from "./TokenGenerator";
import { Role } from "@prisma/client";

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  try {
    const jwtPayload = verifyToken(token as string);
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

export const isRoleCurryMiddleware = (roles: Role[]) =>
  middleware(async ({ ctx: { jwtPayload }, next }) => {
    if (!jwtPayload) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No JWT payload found",
      });
    }

    if (!roles.includes(jwtPayload.role)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `Role is not of type ${roles.join(", ")}`,
      });
    }

    return next({
      ctx: {
        // can't find a way to get role type to be inferred, not sure if it's possible. Might need generics; low priority
        jwtPayload,
      },
    });
  });

const isAdmin = isRoleCurryMiddleware(["ADMIN"]);

export const adminProcedure = publicProcedure.use(isAdmin);

// create privateProcedure for server-only operations