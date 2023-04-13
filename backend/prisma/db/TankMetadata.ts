import { TankMetadata, PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export async function create(tank: TankMetadata) {
  const { id, customerId, ...tankData } = tank;
  await prisma.tankMetadata.create({
    data: {
      ...tankData,
      Customer: {
        connect: {
          id: customerId
        }
      }
    }
  });
}

// READ
export async function read(id: number) {
  return await prisma.tankMetadata.findUnique({
    where: {
      id: id
    }
  });
}

// UPDATE
export async function update(tank: TankMetadata) {
  await prisma.tankMetadata.update({
    where: {
      id: tank.id
    },
    data: tank
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteTankMetadata(id: number) {
  await prisma.tankMetadata.delete({
    where: {
      id: id
    }
  });
}

// ALL
export async function getAll() {
  return await prisma.tankMetadata.findMany();
}

export * as tankDB from './TankMetadata';
