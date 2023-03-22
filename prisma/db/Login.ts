import { Login, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function create(login: Login) {
  await prisma.login.create({
    // note: originally was set to {data: login} but throws an insane error if not created explicitly this way
    data: {
      email: login.email,
      password: login.password,
      role: login.role,
    },
  });
}

// READ
export async function find(login: Login) {
  if (login.email === null) return;
  try {
    return await prisma.login.findUnique({
      where: {
        email: login.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAll() {
  return await prisma.login.findMany();
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
export async function deleteItem(login: Login) {
  await prisma.login.delete({
    where: {
      id: login.id,
    },
  });
}

export * as loginDB from "./Login";
