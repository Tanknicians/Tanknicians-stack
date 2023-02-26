import {Customer, Employee, Login, PrismaClient} from '@prisma/client'
import {customerDB} from './db/Customer'
import {loginDB} from './db/Login'

const prisma = new PrismaClient()


let testCustomer: Customer = {
    address: "this place might be real",
    email: "newemail@gmail.com",
    firstName: "something",
    id: 0,
    lastName: "cool",
    loginId: null,
    middleName: "very",
    phone: 1234567890
}

let testLogin: Login = {
    id: 0,
    password: "butt",
    token: "it's a secret",
    username: "anynewusername" // this has to be unique each time else it won't create a login or customer!
}

loginDB.createCustomerLogin(testLogin, testCustomer)
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })


customerDB.queryAllCustomers()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

