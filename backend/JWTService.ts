import { User } from "@prisma/client"
import * as jwt from "jsonwebtoken"

// simple function that creates a random Secret for JWT
export function generateSecret(): string {
    return require('crypto').randomBytes(64).toString('hex')
}

// signs a token with a given Secret
export function generateToken(user: User, secret: jwt.Secret): string {
    const json: string = JSON.stringify(user)
    return jwt.sign({
        data: user
    }, secret)
}

export * as jwtService from './JWTService'


    

