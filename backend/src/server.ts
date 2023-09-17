import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import authRouter from "./Authentication/Routes";
import databaseRouter from "./Database/Routes";
import emailRouter from "./Email/Routes";
import mobileRouter from "./Mobile/Routes";

import { logger, httpLogger } from "./Logging/pino";

// Initialize the express app
const app = express();

const production = "https://tanknicians-web-q4jam.ondigitalocean.app";

// Set up cors options
const corsOptions = {
  origin: production,
  credentials: true,
};

// Allow for web-browser usage
app.use(cors(corsOptions));
app.use(httpLogger);
app.use(cookieParser());

// Service endpoints
app
  .use("/api/auth", authRouter)
  .use("/api/database", databaseRouter)
  .use("/api/email", emailRouter)
  .use("/api/mobile", mobileRouter);

app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
  logger.info(`Server up and listening on port ${process.env.PORT}`);
});
