import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { loginRouter } from "./LoginService/LoginRoutes";

import { createContext, router } from "./trpc";
import { register } from "./LoginService/LoginService";

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
  login: loginRouter,
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
});

type AppRouter = typeof appRouter;
export type { AppRouter };
