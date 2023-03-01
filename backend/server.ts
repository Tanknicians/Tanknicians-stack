// Import Express
import express, { Request, Response, NextFunction } from 'express';
// import the microservices
import UserRouter from './UserMicroService/UserRouter';

// Initialize the express app
const app: express.Application = express();

// Run on port 3000; change this to .ENV file later on.
const port: number = 3000;

// use the microservice
app.use('/api/user', UserRouter)


// Server startup
app.listen(port, () => {
    console.log(
        `TypeScript with Express http://localhost:${port}/`
        );
});

