import { Login, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function create(login: Login) {
  const {id, ...loginData} = login;
  await prisma.login.create({
    data: {
      ...loginData
    },
  });
}

// READ
export async function read(login: Login) {
  return await prisma.login.findUnique({
    where: {
      email: String(login.email),
    },
  });
}

// UPDATE
export async function update(login: Login) {
  await prisma.login.update({
    where: {
      id: login.id,
    },
    data: login,
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteLogin(login: Login) {
  await prisma.login.delete({
    where: {
      id: login.id,
    },
  });
}

// ALL
export async function getAll() {
  return await prisma.login.findMany();
}

export * as loginDB from "./Login";
