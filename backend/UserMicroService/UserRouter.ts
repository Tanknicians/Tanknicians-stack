// required imports: Express and Prisma Database
import express, {Request, Response} from "express";
import {findUser} from "../../prisma/db/Login";

const userRouter = express.Router()

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
userRouter.use(express.json());

userRouter.post('/login', async (req: Request, res: Response) => {
    let {email, password} = req.body;

    res.send("Login!")
})


userRouter.post('/find', async (req: Request, res: Response) => {
    let {email} = req.body;
    try {
        // using PRISMA db function
        let user = await findUser(email)
        if (user != null) {
            res.send(user)
        } else {
            throw console.error(`User with email: ${email} not found.`);
        }
    } catch (error) {
        res.send(error)
    }
})


// export the routes
 export = userRouter;