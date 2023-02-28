import { json } from "body-parser";
import {findUser} from "../../prisma/db/Login";

import express, {Request, Response} from "express";

const userRouter = express.Router()

// REQUIRED TO INTERPRET BODY
userRouter.use(express.json());

userRouter.post('/login', async (req: Request, res: Response) => {
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
            throw console.error("No user found.");
        }
    } catch (error) {
        res.send(error)
    }
})


// export the routes
 export = userRouter;