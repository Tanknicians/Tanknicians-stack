// required imports: Express and Prisma Database
import express, {Request, Response} from "express";
import { findUserService, loginUserService } from "./UserService";

const userRouter = express.Router()

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
userRouter.use(express.json());

// returns user's token on successful login
userRouter.post('/login', async (req: Request, res: Response) => {
    await loginUserService(req, res);
})


userRouter.post('/find', async (req: Request, res: Response) => {
    await findUserService(req, res);
})


// export the routes
 export = userRouter;