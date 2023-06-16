import express from 'express';
import loginRouter from './Login/LoginRoutes';
import serviceCallRouter from './ServiceCall/ServiceCallRoutes';
import tankMetaDataRouter from './TankMetadata/TankMetadataRoutes';
import userRouter from './User/UserRoutes';

const databaseRouter = express();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
databaseRouter.use(express.json());

databaseRouter.use('/login', loginRouter);
databaseRouter.use('/servicecall', serviceCallRouter);
databaseRouter.use('/tank', tankMetaDataRouter);
databaseRouter.use('/user', userRouter);

export default databaseRouter;
