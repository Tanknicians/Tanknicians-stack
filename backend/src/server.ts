import cors from "cors";
import express from "express";
import authRouter from "./Authentication/AuthRoutes";
import  databaseRouter  from "./DatabaseService/DatabaseRoutes";
import emailRouter from "./EmailService/EmailRoutes";
import { logger, httpLogger } from "./LoggingService/pino";


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

// Authentication Service endpoint
app.use("/api/auth", authRouter);

// Database service endpoint
app.use("/api/database", databaseRouter);

// Email service endpoint
app.use("/api/email", emailRouter);

app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
  logger.info(`Server up and listening on port ${process.env.PORT}`);
});


