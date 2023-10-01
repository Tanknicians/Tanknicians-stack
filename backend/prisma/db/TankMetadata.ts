import { PrismaClient, TankType } from "@prisma/client";
import { CreateTankMetaData, UpdateTankMetaData } from "../../src/zodTypes";
const prisma = new PrismaClient();

// CREATE
export async function create(tank: CreateTankMetaData) {
  const { customerId, ...tankData } = tank;
  const createdTank = await prisma.tankMetadata.create({
    data: {
      ...tankData,
      Customer: {
        connect: {
          id: customerId,
        },
      },
    },
  });
  return createdTank.id;
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
export async function update(tank: UpdateTankMetaData) {
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
export async function search(
  page: number,
  size: number,
  searchString?: string,
  searchType?: TankType,
  minVolume?: number,
  maxVolume?: number
) {
  return await prisma.tankMetadata.findMany({
    skip: (page - 1) * size,
    take: size,
    where: {
      OR: [
        { description: { contains: searchString } },
        { volume: { gte: minVolume, lte: maxVolume } },
        { type: searchType },
      ].filter(Boolean),
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
