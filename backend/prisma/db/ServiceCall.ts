import { ServiceCall, PrismaClient, TankMetadata, User } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function create(
  form: ServiceCall,
) {
  const {id, employeeId, tankId, ...formData} = form;
  await prisma.serviceCall.create({
    data: {
      ...formData,
      Employee: {
        connect: { id: employeeId },
      },
      TankMetadata: {
        connect: { id: tankId },
      },
    },
  });
}

// READ
export async function read(serviceCall: ServiceCall) {
  return await prisma.serviceCall.findUnique({
    where: {
      id: serviceCall.id,
    },
  });
}

// UPDATE
export async function update(serviceCall: ServiceCall) {
  await prisma.serviceCall.update({
    where: {
      id: serviceCall.id,
    },
    data: serviceCall,
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteServiceCall(serviceCall: ServiceCall) {
  await prisma.serviceCall.delete({
    where: {
      id: serviceCall.id,
    },
  });
}

// ALL
export async function getAll() {
  return await prisma.serviceCall.findMany();
}

export * as serviceCallDB from "./ServiceCall";
