// Import Express
import express, { Request, Response, NextFunction } from 'express';
// import the microservices
import UserRouter from './UserService/UserRouter';

// Initialize the express app
const app: express.Application = express();



// use the microservice
app.use('/api/user', UserRouter)


// Server startup
app.listen(process.env.PORT, () => {
    console.log(
        `TypeScript with Express http://localhost:${process.env.PORT}/`
        );
});
