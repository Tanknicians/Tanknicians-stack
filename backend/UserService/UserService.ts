// in here we may or may not use axios 
import { User } from "@prisma/client";
import { Request, Response } from "express";
import * as userDB from "../../prisma/db/User";

export async function loginUserService(req: Request, res: Response) {
    console.log("Login invoked.");

    let parsedUser: User = {
        id: 0,
        email: req.body.email,
        password: req.body.password,
        token: null
    };

    try {
        // using PRISMA db function
        let user = await userDB.findUser(parsedUser);
        if (user != null) {
            console.log(`User found: ${user.email}`);
            // this is really unsafe btw this MUST be changed later to use BCRYPT
            if (user.password == parsedUser.password) {
                console.log("Sending token.");
                res.send(user.token);
            } else {
                res.send("invalid login");
            }
        } else {
            throw console.error(`User with email: ${parsedUser.email} not found.`);
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export async function findUserService(req: Request, res: Response) {
    let { email } = req.body;
    try {
        // using PRISMA db function
        let user = await userDB.findUser(email);
        if (user != null) {
            res.send(user);
        } else {
            throw console.error(`User with email: ${email} not found.`);
        }
    } catch (error) {
        res.send(error);
    }
}