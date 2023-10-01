import { PrismaClient, Role } from "@prisma/client";
import { CreateLogin, UpdateLogin } from "src/zodTypes";
const prisma = new PrismaClient();

// CREATE
export async function create(login: CreateLogin) {
  console.log(login);
  const createdLogin = await prisma.login.create({
    data: {
      ...login,
    },
  });
  return createdLogin.id;
}

// READ
export async function read(email: string) {
  return await prisma.login.findUnique({
    where: {
      email: String(email),
    },
  });
}

export async function readUserByLoginId(id: number) {
  return await prisma.login.findUnique({
    where: {
      id: id,
    },
    select: {
      User: true,
    },
  });
}

// UPDATE
export async function update(login: UpdateLogin) {
  await prisma.login.update({
    where: {
      id: login.id,
    },
    data: login,
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteLogin(id: number) {
  await prisma.login.delete({
    where: {
      id: id,
    },
  });
}

// SEARCH
export async function search(
  page: number,
  size: number,
  searchString?: string,
  searchRole?: Role
) {
  return await prisma.login.findMany({
    skip: (page - 1) * size,
    take: size,
    where: {
      OR: [
        { email: { contains: searchString } },
        { role: { equals: searchRole } },
      ].filter(Boolean),
    },
  });
}

// ALL
export async function getAll(page: number) {
  return await prisma.login.findMany({
    skip: (page - 1) * 25,
    take: 25,
  });
}

export * as loginDB from "./Login";
