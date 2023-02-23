import {Customer, PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function queryAllCustomers() {
    const allUsers = await prisma.customer.findMany()
    console.log(allUsers)
}

async function createTestCustomer(customer: Customer) {
    await prisma.customer.create({
        data: {
            first_name: customer.first_name,
            middle_name: customer.middle_name,
            last_name: customer.last_name,
            address: customer.address,
            email: customer.email,
        }
    })
}

let testCustomer: Customer = {
    address: "this place is not real",
    email: null,
    first_name: "person name",
    id: 0,
    last_name: "last name",
    middle_name: null,
    login_id: null
}

createTestCustomer(testCustomer)
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

