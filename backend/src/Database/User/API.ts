import * as Prisma from '@prisma/client';
import { userDB } from '../../../prisma/db/User';

export async function create(user: Omit<Prisma.User, 'id'>) {
  try {
    await userDB.create(user);
    return { message: 'User created successfully' };
  } catch (e) {
    throw new Error('An error occurred during create.');
  }
}

export async function read(id: number) {
  try {
    const user = await userDB.read(id);
    if (!user) {
      throw new Error(`User with id: ${id} not found.`);
    }
    return user;
  } catch (e) {
    throw new Error('An error occurred during read.');
  }
}

export async function readAll(includeTanks?: boolean) {
  try {
    const users = await userDB.getAllUsersAndTanks(!!includeTanks);
    return users;
  } catch (e) {
    throw new Error('An error occurred during readAll.');
  }
}

export async function update(user: Prisma.User) {
  try {
    await userDB.update(user);
    return { message: 'User updated successfully' };
  } catch (e) {
    throw new Error('An error occurred during update.');
  }
}

export async function deleteOne(id: number) {
  try {
    await userDB.deleteUser(id);
    return { message: 'User deleted successfully' };
  } catch (e) {
    throw new Error('An error occurred during delete.');
  }
}

// This looks to be an expensive search, might be worth
// monitoring for slowdown once db grows.
export async function search(search: string, page: number) {
  try {
    const searchData = userDB.searchByString(search, page);
    if (!searchData) {
      throw new Error('No User from search found.');
    }
    return searchData;
  } catch (e) {
    throw new Error('An error occurred during search.');
  }
}
