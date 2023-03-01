import {Customer, PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export async function queryAllCustomers() {
    const allUsers = await prisma.customer.findMany()
    console.log(allUsers)
}

export async function createCustomer(customer: Customer) {
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



export async function updateCustomer(customer: Customer) {
    await prisma.customer.update({
        where: {
            id: customer.id
        },
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

export * as customerDB from "./Customer";