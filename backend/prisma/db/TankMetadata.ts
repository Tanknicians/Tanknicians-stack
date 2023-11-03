import { PrismaClient, TankMetadata } from '@prisma/client';
import { SearchSchema } from '../../src/zodTypes';
const prisma = new PrismaClient();

// CREATE
export async function create(tank: Omit<TankMetadata, 'id'>) {
  const { customerId, ...tankData } = tank;
  const createdTank = await prisma.tankMetadata.create({
    data: {
      ...tankData,
      Customer: {
        connect: {
          id: customerId
        }
      }
    }
  });
  return createdTank.id;
}

// READ
export async function read(id: number) {
  return await prisma.tankMetadata.findUnique({
    where: {
      id: id
    }
  });
}

export async function readTanksByUserId(customerId: number) {
  return await prisma.tankMetadata.findMany({
    where: {
      customerId: customerId
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

// SEARCH
export async function search(search: SearchSchema) {
  return await prisma.tankMetadata.findMany({
    skip: (search.page - 1) * search.size,
    take: search.size,
    where: {
      OR: [
        { nickname: { contains: search.searchString } },
        { volume: { gte: search.minNum, lte: search.maxNum } },
        { type: search.searchType }
      ]
    }
  });
}

// SEARCH by date range
export async function searchByDateTime(startDate: Date, endDate: Date) {
  return await prisma.tankMetadata.findMany({
    where: {
      lastDateServiced: {
        gte: startDate,
        lte: endDate
      }
    }
  });
}

// ALL
export async function readAll() {
  return await prisma.tankMetadata.findMany();
}

export * as tankDB from './TankMetadata';
