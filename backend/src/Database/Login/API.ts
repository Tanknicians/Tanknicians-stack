import * as bcrypt from 'bcryptjs';
import { loginDB } from '../../../prisma/db/Login';
import { CreateLogin, SearchSchema, UpdateLogin } from '../../zodTypes';
import { Login } from '@prisma/client';

export async function create(login: CreateLogin) {
  // Convert from Zod to Prisma
  const createLogin: Omit<Login, 'id'> = {
    ...login,
  };

  try {
    const createdId = await loginDB.create(createLogin);
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

export async function update(id: number, data: UpdateLogin) {
  // Convert from Zod to Prisma
  const updateLogin: Login = {
    id,
    ...data,
  };

  try {
    updateLogin.password = await bcrypt.hash(updateLogin.password, 10);
    await loginDB.update(updateLogin);
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

export async function search(searchBody: SearchSchema) {
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
