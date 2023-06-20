import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';

import authRouter from './Authentication/AuthRoutes';
import databaseRouter from './DatabaseService/DatabaseRoutes';
import emailRouter from './EmailService/EmailRoutes';
import mobileFormRouter from './MobileFormService/MobileFormRoutes';

import { logger, httpLogger } from './LoggingService/pino';

// Initialize the express app
const app = express();

// Set up cors options
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
// Allow for web-browser usage
app.use(cors(corsOptions)).use(httpLogger).use(cookieParser());

// Service endpoints
app
  .use('/api/auth', authRouter)
  .use('/api/database', databaseRouter)
  .use('/api/email', emailRouter)
  .use('/api/mobile', mobileFormRouter);

app.listen(process.env.PORT, () => {
  console.log(`TypeScript with Express http://localhost:${process.env.PORT}/`);
  logger.info(`Server up and listening on port ${process.env.PORT}`);
});
