import express, {Request, Response} from "express";
import {queryLogin} from "../../prisma/db/Login";
import { loginUser } from "../controllers/UserController";
const userRouter = express.Router()

userRouter.post('/auth/login', async (req: Request, res: Response) => {
    try {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        let dbUser = await queryLogin(user.email);

        if (dbUser != null) {
            res.status(200).json({
                email: dbUser.email
            })
        } else {
            return res.status(400).send("Cannot find user.");
        }

    } catch (error) {
        return res.status(400).send("Cannot find user.");
    }
})