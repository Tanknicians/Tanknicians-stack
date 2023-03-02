import { User } from "@prisma/client"
import * as jwt from "jsonwebtoken"

// simple function that creates a random Secret for JWT
function generateSecret(): string {
    return require('crypto').randomBytes(64).toString('hex')
}

// signs a token with a given Secret
function generateToken(user: User, secret: jwt.Secret): string {
    const json: string = JSON.stringify(user)
    return jwt.sign({
        data: user
    }, secret)
}

let testUser: User = {
    id: 0,
    email: "email@mail.com", // this has to be unique each time else it won't create a login!
    password: "butt",
    token: "it's a secret"
}

//NOTE: To test on JWT.IO, copy/paste the "Secret" on the right-hand space under 'Verifiy Signature'

const generatedSecret: string = generateSecret()
console.log("Secret: " + generatedSecret)
console.log("\n")
console.log("Token: " + generateToken(testUser, generatedSecret))

    

