import {PrismaClient, Parameters} from "@prisma/client";
const prisma = new PrismaClient()

// possible CRUD structure: https://www.prisma.io/docs/concepts/components/prisma-client/crud

// CREATE
export async function createParameters(parameters: Parameters) {
    await prisma.parameters.create({
        data: parameters
    })
}

// READ
export async function findParameters(parameters: Parameters) {
    return await prisma.parameters.findUnique({
        where: {
            id: parameters.id
        }
    })
}

export async function getAllParameterss() {
    return await prisma.parameters.findMany()
}

// UPDATE
export async function updateParameters(parameters: Parameters) {
    await prisma.parameters.update({
        where: {
            id: parameters.id
        }, data: parameters
    })
}

// DELETE
export async function deleteParameters(parameters: Parameters) {
    await prisma.parameters.delete({
        where: {
            id: parameters.id
        }
    })
}