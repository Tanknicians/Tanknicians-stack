import {User, PrismaClient} from '@prisma/client'
import {customerDB} from './db/Customer'
import {loginDB} from './db/User'

const prisma = new PrismaClient()


let testUser: User = {
    id: 0,
    email: "email@mail.com", // this has to be unique each time else it won't create a login!
    password: "butt",
    token: "it's a secret"
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

loginDB.findUser(testUser)
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })