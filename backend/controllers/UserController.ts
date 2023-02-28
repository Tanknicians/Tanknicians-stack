import { Request, Response} from "express";

import * as userService from '../services/UserService';

export let loginUser = async (req: Request, res: Response) => {
    try {
        let foundUser = await userService.login(req.body);
        res.send("user found")
    } catch (error) {
        return res.status(500).send(error);
    }
}

