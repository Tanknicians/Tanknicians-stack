import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import authRouter from "./Authentication/AuthRoutes";
import { emailRouter } from "./EmailService/EmailRoutes";
import { createContext, router } from "./trpc";
import { logger, httpLogger } from "./LoggingService/pino";
import { databaseRouter } from "./DatabaseService/DatabaseRoutes";

// Initialize the express app
const app = express();

// Set up cors options
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Allow for web-browser usage
app.use(cors(corsOptions));
// pino http logger
app.use(httpLogger);

// Server startup


// Express version
app.use("/api/auth", authRouter);



app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
  logger.info(`Server up and listening on port ${process.env.PORT}`);
});


