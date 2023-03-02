import { User } from '@prisma/client'
import * as jwtService from '../JWTService'

let testUser: User = {
    id: 0,
    email: "email@mail.com", // this has to be unique each time else it won't create a login!
    password: "butt",
    token: "it's a secret"
}

//NOTE: To test on JWT.IO, copy/paste the "Secret" on the right-hand space under 'Verifiy Signature'

const generatedSecret: string = jwtService.generateSecret()
console.log("Secret: " + generatedSecret)
console.log("\n")
console.log("Token: " + jwtService.generateToken(testUser, generatedSecret))