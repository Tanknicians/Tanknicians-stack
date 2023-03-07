import {PrismaClient, Tank} from "@prisma/client";
const prisma = new PrismaClient()

// possible CRUD structure: https://www.prisma.io/docs/concepts/components/prisma-client/crud

// CREATE
export async function createTank(tank: Tank) {
    await prisma.tank.create({
        data: tank
    })
}

// READ
export async function findTank(tank: Tank) {
    return await prisma.tank.findUnique({
        where: {
            id: tank.id
        }
    })
}

export async function getAllTanks() {
    return await prisma.tank.findMany()
}

// UPDATE
export async function updateTank(tank: Tank) {
    await prisma.tank.update({
        where: {
            id: tank.id
        }, data: tank
    })
}

// DELETE
export async function deleteTank(tank: Tank) {
    await prisma.tank.delete({
        where: {
            id: tank.id
        }
    })
}