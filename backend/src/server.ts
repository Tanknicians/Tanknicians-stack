import express from "express";
import cors from "cors";

import LoginRouter from "./LoginService/LoginRoutes";

// read the required .env file
require("dotenv").config();

// Initialize the express app
const app: express.Application = express();

// Set up cors options
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// allow for web-browser usage
app.use(cors(corsOptions));

// use the services and route them out
app.use("/api/login", LoginRouter);

// Server startup
app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
});
