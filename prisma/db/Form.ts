import {Customer, Employee, Form, Parameters, PrismaClient, Tank} from "@prisma/client";
const prisma = new PrismaClient()

// possible CRUD structure: https://www.prisma.io/docs/concepts/components/prisma-client/crud

// CREATE
export async function createForm(
    form: Form, 
    customer: Customer, 
    employee: Employee, 
    parameters: Parameters, 
    tank: Tank) {
        
    await prisma.form.create({
        data: {

            approved: form.approved,
            created: form.created,
            request: form.request,

            Customer: {
                connect: customer
                
            },

            Employee: {
                connect: {id: employee.id}
            },

            Parameters: {
                connectOrCreate: {
                    where: {
                        id: parameters.id
                    },
                    create: {
                        recorded: parameters.recorded,
                        nitrates: parameters.nitrates,
                        nitrites: parameters.nitrites,
                        oxygen: parameters.oxygen,
                        salt: parameters.salt,
                        employeeId: parameters.employeeId,
                        tankId: parameters.tankId
                    }
                }
            },

            Tank: {
                connect: tank
            }
        }
    })
}

// READ
export async function findForm(form: Form) {
    return await prisma.form.findUnique({
        where: {
            id: form.id
        }
    })
}

export async function getAllForms() {
    return await prisma.form.findMany()
}

// UPDATE
export async function updateForm(form: Form) {
    await prisma.form.update({
        where: {
            id: form.id
        }, data: form
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