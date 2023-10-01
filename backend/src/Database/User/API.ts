import { userDB } from '../../../prisma/db/User';
import { CreateUser, UpdateUser } from '../../zodTypes';

export async function create(user: CreateUser) {
  try {
    const createdId = await userDB.create(user);
    return { message: 'User created successfully', id: createdId };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during create: ${errorMessage}`);
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
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during read: ${errorMessage}`);
  }
}

export async function readAll(includeTanks: boolean, isEmployee?: boolean) {
  try {
    const users = await userDB.getAll(includeTanks, isEmployee);
    return users;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during readAll: ${errorMessage}`);
  }
}

export async function update(user: UpdateUser) {
  try {
    await userDB.update(user);
    return { message: 'User updated successfully' };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during update: ${errorMessage}`);
  }
}

export async function deleteOne(id: number) {
  try {
    await userDB.deleteUser(id);
    return { message: 'User deleted successfully' };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during delete: ${errorMessage}`);
  }
}

export async function search(
  page: number,
  size: number,
  searchString?: string,
  searchBool?: boolean
) {
  try {
    const searchData = userDB.search(
      page,
      size,
      searchString,
      searchBool
    );
    if (!searchData) {
      throw new Error('No User from search found.');
    }
    return searchData;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during search: ${errorMessage}`);
  }
}
