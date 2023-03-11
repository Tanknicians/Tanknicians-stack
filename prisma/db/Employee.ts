import { PrismaClient, Employee } from "@prisma/client";
const prisma = new PrismaClient();

// possible CRUD structure: https://www.prisma.io/docs/concepts/components/prisma-client/crud

// CREATE
export async function createEmployee(employee: Employee) {
  await prisma.employee.create({
    data: employee,
  });
}

// READ
export async function findEmployee(employee: Employee) {
  return await prisma.employee.findUnique({
    where: {
      id: employee.id,
    },
  });
}

export async function getAllEmployees() {
  return await prisma.employee.findMany();
}

// UPDATE
export async function updateEmployee(employee: Employee) {
  await prisma.employee.update({
    where: {
      id: employee.id,
    },
    data: employee,
  });
}

// DELETE
export async function deleteForm(employee: Employee) {
  await prisma.employee.delete({
    where: {
      id: employee.id,
    },
  });
}
