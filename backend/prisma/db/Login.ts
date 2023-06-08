import { Login, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export async function create(login: Omit<Login, 'id'>) {
  console.log(login);
  await prisma.login.create({
    data: {
      ...login
    }
  });
}

// READ
export async function read(email: string) {
  return await prisma.login.findUnique({
    where: {
      email: String(email)
    }
  });
}

export async function readUserByLoginId(id: number) {
  return await prisma.login.findUnique({
    where: {
      id: id
    },
    select: {
      User: true
    }
  })
}

// UPDATE
export async function update(login: Login) {
  await prisma.login.update({
    where: {
      id: login.id
    },
    data: login
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteLogin(id: number) {
  await prisma.login.delete({
    where: {
      id: id
    }
  });
}

// SEARCH
export async function search(search: String) {
  return await prisma.login.findMany({
    where: {
      OR: [
        { email: { contains: String(search) } }
        // we can add more parameters as-needed
      ]
    }
  });
}

// ALL
export async function getAll() {
  return await prisma.login.findMany();
}

export * as loginDB from './Login';
