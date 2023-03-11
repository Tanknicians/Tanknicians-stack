import { Customer, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function createCustomer(customer: Customer) {
  await prisma.customer.create({
    data: {
      firstName: customer.firstName,
      middleName: customer.middleName,
      lastName: customer.lastName,
      address: customer.address,
      email: customer.email,
      phone: customer.phone,
    },
  });
}

// READ
export async function findCustomer(customer: Customer) {
  await prisma.customer.findUnique({
    where: {
      id: customer.id,
    },
  });
}

export async function getAllCustomers() {
  return await prisma.customer.findMany();
}

// UPDATE
export async function updateCustomer(customer: Customer) {
  await prisma.customer.update({
    where: {
      id: customer.id,
    },
    data: {
      firstName: customer.firstName,
      middleName: customer.middleName,
      lastName: customer.lastName,
      address: customer.address,
      email: customer.email,
      phone: customer.phone,
    },
  });
}

// DELETE
// This may or may not need to include the separation of database values somehow.

export * as customerDB from "./Customer";
