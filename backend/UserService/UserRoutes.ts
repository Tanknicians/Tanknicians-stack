// required imports: Express and Prisma Database
import express, {Request, Response} from "express";
import { findUserService, loginUserService } from "./UserService";

const userRouter = express.Router()

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
userRouter.use(express.json());

// returns user's token on successful login
userRouter.post('/login', async (req: Request, res: Response) => {
    
        console.log("userRouter.login invoked")
        await loginUserService(req, res);
    
})


userRouter.post('/find', async (req: Request, res: Response) => {
    let auth = true;
    if (auth) {
        console.log("userRouter.find invoked")
        await findUserService(req, res);
    } else {
        res.send({
            "error": "invalid auth"
        })
    }
})


// export the routes
 export = userRouter;