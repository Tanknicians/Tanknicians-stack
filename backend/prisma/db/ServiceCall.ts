import { ServiceCall, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export async function create(form: Omit<ServiceCall, 'id'>) {
  const { employeeId, tankId, ...formData } = form;
  await prisma.serviceCall.create({
    data: {
      ...formData,
      Employee: {
        connect: { id: employeeId }
      },
      TankMetadata: {
        connect: { id: tankId }
      }
    }
  });
}

// READ
export async function read(id: number) {
  return await prisma.serviceCall.findUnique({
    where: {
      id: id
    }
  });
}

// should return the first few latest service calls from a specified tank
export async function readLatestByTankId(tankId: number) {
  return await prisma.serviceCall.findMany({
    where: {
      tankId: tankId
    },
    orderBy: {
      id: 'desc'
    },
    take: 5 // change this for n-service calls to return, currently set >1 to get averages on data
  });
}

// read ALL service calls for a tank
export async function readAllByTankId(tankId: number){
  return await prisma.serviceCall.findMany({
    where: {
      tankId: tankId
    }
  });
}

// UPDATE
export async function update(serviceCall: ServiceCall) {
  await prisma.serviceCall.update({
    where: {
      id: serviceCall.id
    },
    data: serviceCall
  });
}

// DELETE
// single-word convention broken because of "delete" being a reserved word
export async function deleteServiceCall(id: number) {
  await prisma.serviceCall.delete({
    where: {
      id: id
    }
  });
}

// SEARCH
export async function searchByString(search: String) {
  return await prisma.serviceCall.findMany({
    where: {
      OR: [
        { customerRequest: { contains: String(search) } },
        { employeeNotes: { contains: String(search) } },
      ]
    }
  });
}

// SEARCH by date range
export async function searchByDateTime(startDate: Date, endDate: Date) {
  return await prisma.serviceCall.findMany({
    where: {
      createdOn: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
}

// ALL
export async function getAll() {
  return await prisma.serviceCall.findMany();
}

// SEARCH (needs to be implemented)

export * as serviceCallDB from './ServiceCall';
