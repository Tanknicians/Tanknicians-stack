import * as bcrypt from 'bcryptjs';
import { loginDB } from '../../../prisma/db/Login';
import { CreateLogin, UpdateLogin } from '../../zodTypes';

export async function create(login: CreateLogin) {
  try {
    await loginDB.create(login);
    return { message: 'Login created successfully' };
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

export async function search(search: string, page: number) {
  try {
    const searchData = loginDB.searchByString(search, page);
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
