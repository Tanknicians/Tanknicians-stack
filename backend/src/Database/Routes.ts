import express from "express";
import loginRouter from "./Login/Routes";
import serviceCallRouter from "./ServiceCall/Routes";
import tankMetaDataRouter from "./TankMetadata/Routes";
import userRouter from "./User/Routes";

const databaseRouter = express();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
databaseRouter.use(express.json());

databaseRouter.use("/login", loginRouter);
databaseRouter.use("/servicecall", serviceCallRouter);
databaseRouter.use("/tank", tankMetaDataRouter);
databaseRouter.use("/user", userRouter);

export default databaseRouter;
