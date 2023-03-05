import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { userDB } from "../../prisma/db/User";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

let testUser: User = {
    id: 0,
    email: "encrypted@gmail.com", // this has to be unique each time else it won't create a login!
    password: "hunter2",
    token: "hereisthetoken"
}

export async function registerUserService(testUser: User) {

    let parsedUser: User = {
        id: 0,
        email: testUser.email,
        password: testUser.password,
        token: testUser.token
    };

    if (parsedUser.token == null) {
        parsedUser.token = String(await hash(parsedUser.email, 10))
    }

    // not allowed to register an empty password
    if (parsedUser.password != null && parsedUser.password != "") {
        parsedUser.password = await hash(parsedUser.password, 10);
    } else {
        console.log("Password cannot be empty.")
        return
    }

    try {
        userDB.createUser(parsedUser)
    } catch (error) {
        console.log(error)
        return;
    }

}

registerUserService(testUser);


