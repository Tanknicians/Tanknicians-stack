import { tankDB } from '../../../prisma/db/TankMetadata';
import { CreateTankMetaData, UpdateTankMetaData } from '../../zodTypes';

export async function create(tank: CreateTankMetaData) {
  try {
    const numberOfUserTanks = await tankDB.readNumberOfTanksByUserId(
      tank.customerId,
    );

    const createTank: CreateTankMetaData = {
      ...tank,
      qrSymbol: numberOfUserTanks + 1,
    };
    const createdId = await tankDB.create(createTank);
    return { message: 'TankMetadata created successfully', id: createdId };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during create: ${errorMessage}`);
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
