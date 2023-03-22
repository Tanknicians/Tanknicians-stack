import express from "express";
import cors from "cors";

import LoginRouter from "./LoginService/LoginRoutes";
/*
import DataRouter from "./DataService/DataRoutes";
*/

// read the required .env file 
require('dotenv').config()

// Initialize the express app
const app: express.Application = express();

// allow for web-browser usage
// Set up cors options
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}
app.use(cors(corsOptions));

// use the services and route them out
app.use("/api/login", LoginRouter);
/*
app.use("/api", DataRouter);
*/

// Server startup
app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
});
