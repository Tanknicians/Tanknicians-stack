import { PrismaClient, User } from '@prisma/client';
import { SearchSchema } from '../../src/zodTypes';
const prisma = new PrismaClient();

// CREATE
export async function create(user: Omit<User, 'id'>) {
  const createdUser = await prisma.user.create({
    data: {
      ...user
    }
  });
  return createdUser.id;
}

// READ
export async function read(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  });
}

export async function readLoginByUserId(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: id
    },
    select: {
      login: true
    }
  });
}

export async function readEmployeeServiceCallsByUserId(id: number) {
  return await prisma.user.findMany({
    where: {
      id: id
    },
    select: {
      EmployeeServiceCalls: true
    }
  });
}

export async function readTankMetadataByUserId(id: number) {
  return await prisma.user.findMany({
    where: {
      id: id
    },
    select: {
      OwnedTanks: true
    }
  });
}

// UPDATE
export async function update(user: User) {
  await prisma.user.update({
    where: {
      id: user.id
    },
    data: user
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: {
      id: id
    }
  });
}

// SEARCH
export async function search(search: SearchSchema) {
  return await prisma.user.findMany({
    skip: (search.page - 1) * search.size,
    take: search.size,
    where: {
      OR: [
        { firstName: { contains: String(search.searchString) } },
        { middleName: { contains: String(search.searchString) } },
        { lastName: { contains: String(search.searchString) } },
        { address: { contains: String(search.searchString) } },
        { phone: { contains: String(search.searchString) } },
        { isEmployee: search.searchBoolean }
      ]
    }
  });
}

// ALL + OwnedTanks
export async function getAll(includeTanks: boolean, isEmployee?: boolean) {
  return await prisma.user.findMany({
    where: {
      isEmployee: isEmployee
    },
    include: {
      OwnedTanks: includeTanks
    }
  });
}

export * as userDB from './User';
