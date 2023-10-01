import { PrismaClient } from "@prisma/client";
import { CreateUser, UpdateUser } from "../../src/zodTypes";
const prisma = new PrismaClient();

// CREATE
export async function create(user: CreateUser) {
  const createdUser = await prisma.user.create({
    data: {
      ...user,
    },
  });
  return createdUser.id;
}

// READ
export async function read(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

export async function readLoginByUserId(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      login: true,
    },
  });
}

export async function readEmployeeServiceCallsByUserId(id: number) {
  return await prisma.user.findMany({
    where: {
      id: id,
    },
    select: {
      EmployeeServiceCalls: true,
    },
  });
}

export async function readTankMetadataByUserId(id: number) {
  return await prisma.user.findMany({
    where: {
      id: id,
    },
    select: {
      OwnedTanks: true,
    },
  });
}

// UPDATE
export async function update(user: UpdateUser) {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteUser(id: number) {
  await prisma.user.delete({
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
  searchBool?: boolean
) {
  return await prisma.user.findMany({
    skip: (page - 1) * size,
    take: size,
    where: {
      OR: [
        { firstName: { contains: String(searchString) } },
        { middleName: { contains: String(searchString) } },
        { lastName: { contains: String(searchString) } },
        { address: { contains: String(searchString) } },
        { phone: { contains: String(searchString) } },
        { isEmployee: searchBool },
      ],
    },
  });
}

// ALL + OwnedTanks
export async function getAll(includeTanks: boolean, isEmployee?: boolean) {
  return await prisma.user.findMany({
    where: {
      isEmployee: isEmployee,
    },
    include: {
      OwnedTanks: includeTanks,
    },
  });
}

export * as userDB from "./User";
