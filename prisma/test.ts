import {Customer, Employee, Login, PrismaClient} from '@prisma/client'
import test from "node:test";

const prisma = new PrismaClient()

async function queryAllCustomers() {
    const allUsers = await prisma.customer.findMany()
    console.log(allUsers)
}

async function createTestCustomer(customer: Customer) {
    await prisma.customer.create({
        data: {
            firstName: customer.firstName,
            middleName: customer.middleName,
            lastName: customer.lastName,
            address: customer.address,
            email: customer.email,
            phone: customer.phone
        }
    })
}

async function createTestLogin(login: Login, customer: Customer) {

        await prisma.login.create({
            data: {
                password: login.password,
                token: login.token,
                username: login.username,

                customer: {
                    connectOrCreate: {
                        where: {
                            id: customer.id
                        },
                        create: {
                            address: customer.address,
                            email: customer.email,
                            firstName: customer.firstName,
                            id: customer.id,
                            lastName: customer.lastName,
                            middleName: customer.middleName,
                            phone: customer.phone
                        }
                    }
                }
            }
        })
}

let testCustomer: Customer = {
    address: "this place is not real",
    email: null,
    firstName: "first",
    id: 0,
    lastName: "last",
    loginId: null,
    middleName: null,
    phone: 1234567890
}

let testLogin: Login = {
    id: 0,
    password: "butt",
    token: "it's a secret",
    username: "newbutt" // this has to be unique each time else it won't create a login or customer!
}

createTestLogin(testLogin, testCustomer)
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

queryAllCustomers()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

