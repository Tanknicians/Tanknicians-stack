import {Login, PrismaClient} from '@prisma/client'
import {customerDB} from './db/Customer'
import {loginDB} from './db/Login'

const prisma = new PrismaClient()


let testLogin: Login = {
    id: 0,
    password: "butt",
    token: "it's a secret",
    email: "email@mail.com" // this has to be unique each time else it won't create a login!
}

/*
loginDB.createLogin(testLogin)
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
*/

loginDB.findUser("email@mail.com")
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })