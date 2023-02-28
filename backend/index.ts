// Import Express
import express, { Request, Response, NextFunction } from 'express';
import UserRoutes from './routes/UserRoutes';

// Initialize the express app
const app: express.Application = express();

// Run on port 3000; change this to .ENV file later on.
const port: number = 3000;

app.use('/api/user', UserRoutes)




// Server startup
app.listen(port, () => {
    console.log(
        `TypeScript with Express http://localhost:${port}/`
        );
});

