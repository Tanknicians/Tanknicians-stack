import { TankMetadata, PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function create(tank: TankMetadata) {
  const {id, customerId, ...tankData} = tank;
  await prisma.tankMetadata.create({
    data: {
      ...tankData,
      Customer: {
        connect: {
          id: customerId
        },
      },
    },
  });
}

// READ
export async function read(tank: TankMetadata) {
  return await prisma.tankMetadata.findUnique({
    where: {
      id: tank.id,
    },
  });
}

// UPDATE
export async function update(tank: TankMetadata) {
  await prisma.tankMetadata.update({
    where: {
      id: tank.id,
    },
    data: tank,
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteTankMetadata(tank: TankMetadata) {
  await prisma.tankMetadata.delete({
    where: {
      id: tank.id,
    },
  });
}

// ALL
export async function getAll() {
  return await prisma.tankMetadata.findMany();
}

export * as tankDB from "./TankMetadata";
