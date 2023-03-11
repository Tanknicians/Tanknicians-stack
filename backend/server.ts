import express from 'express';
import cors from 'cors';

import UserRouter from './UserService/UserRoutes';
import DataRouter from './DataService/DataRoutes';

// Initialize the express app
const app: express.Application = express();

// allow for web-browser usage
app.use(cors)

// use the microservices
app.use("/api/user", UserRouter);
app.use("/api", DataRouter);


// Server startup
app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
});
