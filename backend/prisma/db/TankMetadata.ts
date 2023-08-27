import { TankMetadata, PrismaClient, TankType } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function create(tank: Omit<TankMetadata, "id">) {
  const { customerId, ...tankData } = tank;
  await prisma.tankMetadata.create({
    data: {
      ...tankData,
      Customer: {
        connect: {
          id: customerId,
        },
      },
    },
  });
}

// READ
export async function read(id: number) {
  return await prisma.tankMetadata.findUnique({
    where: {
      id: id,
    },
  });
}

export async function readTanksByUserId(customerId: number) {
  return await prisma.tankMetadata.findMany({
    where: {
      customerId: customerId,
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
export async function deleteTankMetadata(id: number) {
  await prisma.tankMetadata.delete({
    where: {
      id: id,
    },
  });
}

// SEARCH
export async function searchByString(search: string) {
  return await prisma.tankMetadata.findMany({
    where: {
      OR: [
        { description: { contains: search } },
        { type: { equals: search.toUpperCase() as TankType } },
      ],
    },
  });
}

// SEARCH by date range
export async function searchByDateTime(startDate: Date, endDate: Date) {
  return await prisma.tankMetadata.findMany({
    where: {
      lastDateServiced: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
}

// ALL
export async function getAll() {
  return await prisma.tankMetadata.findMany();
}

export * as tankDB from "./TankMetadata";
