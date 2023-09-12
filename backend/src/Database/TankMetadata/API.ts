import * as Prisma from '@prisma/client';
import { tankDB } from '../../../prisma/db/TankMetadata';
import { CreateTankMetaData, PrismaTankMetadata } from '../../zodTypes';

export async function create(tank: CreateTankMetaData) {

  try {
    const userTanks = await tankDB.readTanksByUserId(tank.customerId);
    // map the pre-existing qrSymbols
    const qrSymbolsArray: number[] = userTanks.map((tankMetadata) => tankMetadata.qrSymbol);
    const createTank: PrismaTankMetadata = {
      ...tank,
      qrSymbol: findNextInteger(qrSymbolsArray)
    }
    await tankDB.create(createTank);
    return { message: 'TankMetadata created successfully' };
  } catch (e) {
    throw new Error('An error occurred during create.');
  }
}

function findNextInteger(array: number[]): number {
  // Sort the array in ascending order
  array.sort((a, b) => a - b);
  // Start at 1
  let nextInteger = 1;
  // Iterate over each integer of the array
  for (const value of array) {
    if (value === nextInteger) {
      nextInteger++;
    } else if (value > nextInteger) {
      return nextInteger;
    }
  }
  return nextInteger;
}


export async function read(id: number) {
  try {
    const tank = await tankDB.read(id);
    if (!tank) {
      throw new Error(`TankMetadata with id: ${id} not found.`);
    }
    return tank;
  } catch (e) {
    throw new Error('An error occurred during read.');
  }
}

export async function update(tank: Prisma.TankMetadata) {
  try {
    await tankDB.update(tank);
    return { message: 'TankMetadata updated successfully' };
  } catch (e) {
    throw new Error('An error occurred during update.');
  }
}

export async function deleteOne(id: number) {
  try {
    await tankDB.deleteTankMetadata(id);
    return { message: 'TankMetadata deleted successfully' };
  } catch (e) {
    throw new Error('An error occurred during delete.');
  }
}

export async function search(search: string, page: number) {
  try {
    const searchData = tankDB.searchByString(search, page);
    if (!searchData) {
      throw new Error('No TankMetadata from search found.');
    }
    return searchData;
  } catch (e) {
    throw new Error('An error occurred during search.');
  }
}
