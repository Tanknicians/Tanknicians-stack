import * as bcrypt from 'bcryptjs';
import { loginDB } from '../../../prisma/db/Login';
import { CreateLogin, SearchSchema, UpdateLogin } from '../../zodTypes';
import { Role } from '@prisma/client';

export async function create(login: CreateLogin) {
  try {
    const createdId = await loginDB.create(login);
    return { message: 'Login created successfully', id: createdId };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during create: ${errorMessage}`);
  }
}

export async function read(email: string) {
  try {
    const login = await loginDB.read(email);
    if (!login) {
      throw new Error(`Login with email: ${email} not found.`);
    }
    return login;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during read: ${errorMessage}`);
  }
}

export async function update(login: UpdateLogin) {
  try {
    login.password = await bcrypt.hash(login.password, 10);
    await loginDB.update(login);
    return { message: 'Login updated successfully' };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during update: ${errorMessage}`);
  }
}

export async function deleteOne(id: number) {
  try {
    await loginDB.deleteLogin(id);
    return { message: 'Login deleted successfully' };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during delete: ${errorMessage}`);
  }
}

export async function search(
  searchBody: SearchSchema
) {
  try {
    const searchData = loginDB.search(searchBody);
    if (!searchData) {
      throw new Error('No searchUser from search found.');
    }
    return searchData;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during search: ${errorMessage}`);
  }
}
