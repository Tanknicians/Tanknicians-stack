import express from "express";
import cors from "cors";
import LoginRouter from "./LoginService/LoginRoutes";
import * as dotenv from 'dotenv'

// Read the .env file.
dotenv.config()

// Init app
const app: express.Application = express();

// Set up cors options
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Allow for web-browser usage
app.use(cors(corsOptions));

// Routes
app.use("/api/login", LoginRouter);

// Server startup
app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
});
