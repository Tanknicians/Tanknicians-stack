import {Login, PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

// create a new login for the database
export async function createLogin(login: Login) {
    await prisma.login.create({
        data: {
            email: login.email,
            password: login.password,
            token: login.token
        }
    })
}

// find user object based on email
export async function queryLogin(email: string) {
    return prisma.login.findUnique({
        where: {
            email: email
        }
    });
}


// currently unused functions
/* 
export async function createCustomerLogin(login: Login, customer: Customer) {
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

export async function createEmployeeLogin(login: Login, employee: Employee) {
    await prisma.login.create({
        data: {
            password: login.password,
            token: login.token,
            username: login.username,

            employee: {
                connectOrCreate: {
                    where: {
                        id: employee.id
                    },
                    create: {
                        email: employee.email,
                        firstName: employee.firstName,
                        id: employee.id,
                        lastName: employee.lastName,
                        middleName: employee.middleName,
                        phone: employee.phone
                    }
                }
            }
        }
    })
}
*/

export * as loginDB from './Login'