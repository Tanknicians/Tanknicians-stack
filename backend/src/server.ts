import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { authRouter } from "./Authentication/AuthRoutes";
import { createContext, router } from "./trpc";
import { logger } from './LoggingService/pino'

// Initialize the express app
const app = express();

// Set up cors options
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Allow for web-browser usage
app.use(cors(corsOptions));

// Server startup
const appRouter = router({
  auth: authRouter,
});

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
  logger.info(`Server up and listening on port ${process.env.PORT}`);
});



type AppRouter = typeof appRouter;
export type { AppRouter };
