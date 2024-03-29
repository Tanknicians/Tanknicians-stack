import { TankMetadata } from '@prisma/client';
import { tankDB } from '../../../prisma/db/TankMetadata';
import {
  CreateTankMetaData,
  SearchSchema,
  UpdateTankMetaData
} from '../../zodTypes';
import { userDB } from '../../../prisma/db/User';

// brand new tank has epoch of 2010
const tankEpoch = new Date('2010-01-01');

/*
qrSymbol is a discrete integer value that represents the User's local tank. 
It must be unique per-User.
We want a collection of these values to look as: [1, 2, 3]

In the event a tank is removed, we want an elegant solution in the event we have a strange array: [1, 3]. 
We want to avoid incrementing as such: [1, 3, 4]. 
As well, we want to avoid a solution that may cause duplicates such as [1, 3, 3].

Though it takes O(n) instead of O(1) to process, being able to fill in the collection to [1, 2, 3] is more important. 
The purpose is to avoid hitting a soft limit on the front-end, whom has a limited amount of values (up to 20).
*/
export async function create(data: CreateTankMetaData) {
  const customer = await userDB.read(data.customerId);
  if (!customer) {
    throw new Error(`Customer with id: ${data.customerId} not found.`);
  }
  if (customer.isEmployee) {
    throw new Error(`Customer with id: ${data.customerId} is an employee.`);
  }

  try {
    const userTanks = await tankDB.readTanksByUserId(data.customerId);
    // map the pre-existing qrSymbols
    const qrSymbolsArray: number[] = userTanks.map(
      (tankMetadata) => tankMetadata.qrSymbol
    );
    // Convert from Zod to Prisma
    const createTank: Omit<TankMetadata, 'id'> = {
      ...data,
      qrSymbol: findNextInteger(qrSymbolsArray),
      lastDateServiced: tankEpoch
    };
    const createdId = await tankDB.create(createTank);
    return { message: 'TankMetadata created successfully', id: createdId };
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

export async function readAll() {
  try {
    const tanks = await tankDB.readAll();
    return tanks;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during read: ${errorMessage}`);
  }
}

export async function read(id: number) {
  try {
    const tank = await tankDB.read(id);
    if (!tank) {
      throw new Error(`TankMetadata with id: ${id} not found.`);
    }
    return tank;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during read: ${errorMessage}`);
  }
}

export async function update(id: number, data: UpdateTankMetaData) {
  // Convert from Zod to Prisma
  const updateTank: TankMetadata = {
    id,
    ...data
  };
  try {
    await tankDB.update(updateTank);
    return { message: 'TankMetadata updated successfully' };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during update: ${errorMessage}`);
  }
}

export async function deleteOne(id: number) {
  try {
    await tankDB.deleteTankMetadata(id);
    return { message: 'TankMetadata deleted successfully' };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during delete: ${errorMessage}`);
  }
}

export async function search(searchBody: SearchSchema) {
  try {
    const searchData = tankDB.search(searchBody);
    if (!searchData) {
      throw new Error('No TankMetadata from search found.');
    }
    return searchData;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during search: ${errorMessage}`);
  }
}
