import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { loginRouter } from "./LoginService/LoginRoutes";

import { createContext, router } from "./trpc";

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
app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
});

const appRouter = router({
  login: loginRouter,
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);
app.listen(4000);

type AppRouter = typeof appRouter;
export type { AppRouter };
