import {Form, Parameter, Prisma, PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

// possible CRUD structure: https://www.prisma.io/docs/concepts/components/prisma-client/crud

// CREATE
export async function createForm(form: Form, parameters: Parameter[]) {
    await prisma.form.create({
        data: {
            customerId: form.customerId,
            employeeId: form.employeeId,

            parameters: {
                connect: parameters
            }
        }
    })
}

// READ
export async function readForm(form: Form) {
    var foundForm = await prisma.form.findUnique({
        where: {
            id: form.id
        }
    })
}

// UPDATE


// DELETE