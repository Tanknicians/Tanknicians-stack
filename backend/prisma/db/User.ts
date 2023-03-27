import { User, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function create(user: User) {
  await prisma.user.create({
    data: {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      address: user.address,
      phone: user.phone,
    },
  });
}

// READ
export async function read(user: User) {
  return await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
}

export async function login(user: User) {
  return await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      login: true,
    },
  });
}

export async function serviceCalls(user: User) {
  return await prisma.user.findMany({
    where: {
      id: user.id,
    },
    select: {
      EmployeeServiceCalls: true,
    },
  });
}

export async function tankMetadata(user: User) {
  return await prisma.user.findMany({
    where: {
      id: user.id,
    },
    select: {
      OwnedTanks: true,
    },
  });
}

// UPDATE
export async function update(user: User) {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteUser(user: User) {
  await prisma.user.delete({
    where: {
      id: user.id,
    },
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
        { phone: { contains: String(search) } },
      ],
    },
  });
}

// ALL
export async function getAll() {
  return await prisma.user.findMany();
}

export * as userDB from "./User";
