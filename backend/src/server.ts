import LoginRouter from "./LoginService/LoginRoutes";
import DatabaseRouter from "./DatabaseService/DatabaseRoutes";
import "./config";
import cors from "cors";
import express from "express";


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
app.use("/api/db", DatabaseRouter);

// Server startup
app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
});
