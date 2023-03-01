import { User } from "@prisma/client"
import * as jwt from "jsonwebtoken"


function generateKey(): string {
    return require('crypto').randomBytes(64).toString('hex')
}

function generateToken(user: User, key: jwt.Secret): string {
    const json: string = JSON.stringify(user)
    return jwt.sign({
        data: json
    }, key)
}


    

