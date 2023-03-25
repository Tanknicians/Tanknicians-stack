import { TankMetadata, PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function create(tank: TankMetadata, customer: User) {
  await prisma.tankMetadata.create({
    data: {
      description: tank.description,
      volume: tank.volume,
      type: tank.type,
      tanknicianSourcedOnly: tank.tanknicianSourcedOnly,
      lastDateServiced: tank.lastDateServiced,

      Customer: {
        connect: customer,
      },
    },
  });
}

// READ
export async function find(tank: TankMetadata) {
  return await prisma.tankMetadata.findUnique({
    where: {
      id: tank.id,
    },
  });
}

export async function getAll() {
  return await prisma.tankMetadata.findMany();
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

export * as tankDB from "./TankMetadata";
