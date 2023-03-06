import {Form, Parameter, PrismaClient} from "@prisma/client";
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
export async function findForm(form: Form) {
    var foundForm = await prisma.form.findUnique({
        where: {
            id: form.id
        }
    })
    return foundForm
}

export async function getAllForms() {
    return await prisma.form.findMany()
}

// UPDATE
export async function updateForm(form: Form) {
    await prisma.form.update({
        where: {
            id: form.id
        },
        data: {
            
        }
    })
}

// DELETE
export async function deleteForm(form: Form) {
    await prisma.form.delete({
        where: {
            id: form.id
        }
    })
}