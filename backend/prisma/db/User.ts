import { User, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export async function create(user: User) {
  const { id, ...userData } = user;
  await prisma.user.create({
    data: {
      ...userData
    }
  });
}

// READ
export async function read(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  });
}

export async function login(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: id
    },
    select: {
      login: true
    }
  });
}

export async function serviceCalls(id: number) {
  return await prisma.user.findMany({
    where: {
      id: id
    },
    select: {
      EmployeeServiceCalls: true
    }
  });
}

export async function tankMetadata(id: number) {
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
export async function search(search: String) {
  return await prisma.user.findMany({
    where: {
      OR: [
        { firstName: { contains: String(search) } },
        { middleName: { contains: String(search) } },
        { lastName: { contains: String(search) } },
        { address: { contains: String(search) } },
        { phone: { contains: String(search) } }
      ]
    }
  });
}

// ALL
export async function getAll() {
  return await prisma.user.findMany();
}

export * as userDB from './User';
