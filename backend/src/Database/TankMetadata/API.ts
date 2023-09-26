import { tankDB } from '../../../prisma/db/TankMetadata';
import { CreateTankMetaData, UpdateTankMetaData } from '../../zodTypes';

/*
The purpose of this function while creating a new Tank in the database is to relieve stress on the front-end's current tank limitation per-user. 

qrSymbol is a discrete integer value that represents the User's local tank. 
We want a collection of these values to look as: [1, 2, 3...]

In the event a tank is removed, we want an elegant solution in the event we have a strange array: [1, 3, _, 4]. 
We want to avoid incrementing as such: [1, _, 3, 4, 5]. 

Though it takes more time to process, being able to fill in the collection to [1, 2, 3, 4...] benefits the front-end and business. 
By using all slots available, we avoid continued discrete increments as tanks are removed and added.

Ultimately, this is not hard-locked to any value and will continue to increment if there are no slots available. 
At that time, it will be up to the front-end to implement a solution. 
*/
export async function create(tank: CreateTankMetaData) {
  try {
    const userTanks = await tankDB.readTanksByUserId(tank.customerId);
    // map the pre-existing qrSymbols
    const qrSymbolsArray: number[] = userTanks.map(
      (tankMetadata) => tankMetadata.qrSymbol,
    );
    const createTank: CreateTankMetaData = {
      ...tank,
      qrSymbol: findNextInteger(qrSymbolsArray),
    };
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
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during read: ${errorMessage}`);
  }
}

export async function update(tank: UpdateTankMetaData) {
  try {
    await tankDB.update(tank);
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

export async function search(search: string, page: number) {
  try {
    const searchData = tankDB.searchByString(search, page);
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
