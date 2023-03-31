// required imports: Express and Prisma Database
import express, { Request, Response } from "express";
import ServiceCallRouter from "./ServiceCall/ServiceCallRoutes";
import TankMetadataRouter from "./TankMetadata/TankMetadataRoutes";
import UserRouter from "./User/UserRoutes";

const DatabaseRouter = express.Router();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
DatabaseRouter.use(express.json());

DatabaseRouter.use("/usr", UserRouter);

DatabaseRouter.use("/sc", ServiceCallRouter);

DatabaseRouter.use("/td", TankMetadataRouter);

export default DatabaseRouter;
