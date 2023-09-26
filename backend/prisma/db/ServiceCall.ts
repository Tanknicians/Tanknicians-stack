import { PrismaClient } from '@prisma/client';
import { CreateServiceCall, UpdateServiceCall } from '../../src/zodTypes';
const prisma = new PrismaClient();

// CREATE
export async function create(form: CreateServiceCall) {
  const { employeeId, tankId, ...formData } = form;
  const createdServiceCall = await prisma.serviceCall.create({
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
  return createdServiceCall.id;
}

// READ
export async function read(id: number) {
  return await prisma.serviceCall.findUnique({
    where: {
      id: id,
    },
  });
}

// should return the first few latest service calls from a specified tank
export async function readLatestByTankId(tankId: number) {
  return await prisma.serviceCall.findMany({
    where: {
      tankId: tankId,
    },
    orderBy: {
      id: 'desc',
    },
    take: 5, // change this for n-service calls to return, currently set >1 to get averages on data
  });
}

// read ALL service calls for a tank
export async function readAllByTankId(tankId: number, isApproved: boolean) {
  return await prisma.serviceCall.findMany({
    where: {
      tankId: tankId,
      isApproved: isApproved,
    },
  });
}

// READ range of service calls for a single tank
export async function readByDateTime(
  tankId: number,
  startDate: Date,
  endDate: Date,
) {
  return await prisma.serviceCall.findMany({
    where: {
      tankId: tankId,
      createdOn: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      createdOn: true,
      alkalinity: true,
      calcium: true,
      nitrate: true,
      phosphate: true,
    },
  });
}

// UPDATE
export async function update(serviceCall: UpdateServiceCall) {
  await prisma.serviceCall.update({
    where: {
      id: serviceCall.id,
    },
    data: serviceCall,
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteServiceCall(id: number) {
  await prisma.serviceCall.delete({
    where: {
      id: id,
    },
  });
}

// SEARCH
export async function searchByString(search: string, page: number) {
  return await prisma.serviceCall.findMany({
    skip: (page - 1) * 25,
    take: 25,
    where: {
      OR: [
        { customerRequest: { contains: String(search) } },
        { employeeNotes: { contains: String(search) } },
      ],
    },
  });
}

// ALL
export async function getAll(isApproved: boolean | undefined) {
  const where = {
    ...(isApproved !== undefined && { isApproved: isApproved }),
  };

  return await prisma.serviceCall.findMany({
    where: where,
  });
}

// SEARCH (needs to be implemented)

export * as serviceCallDB from './ServiceCall';
