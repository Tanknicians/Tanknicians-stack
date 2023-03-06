// Import Express
import express from 'express';
// import the microservices
import UserRouter from './UserService/UserRoutes';
import DataRouter from './DataService/DataRoutes';

// Initialize the express app
const app: express.Application = express();


// use the microservices
app.use('/api/user', UserRouter)
app.use('/api', DataRouter)

// Server startup
app.listen(process.env.PORT, () => {
    console.log(
        `TypeScript with Express http://localhost:${process.env.PORT}/`
        );
});
