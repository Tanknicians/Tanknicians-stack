import { PrismaClient } from "@prisma/client";
import { CreateServiceCall, UpdateServiceCall } from "../../src/zodTypes";
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

// read ALL service calls for a tank
export async function readAllByTankId(tankId: number, isApproved?: boolean) {
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
  startDate?: Date,
  endDate?: Date
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
export async function search(
  page: number,
  size: number,
  searchString?: string,
  searchBool?: boolean,
  minNum?: number,
  maxNum?: number,
  minDate?: Date,
  maxDate?: Date
) {
  const where: any[] = [];

  // String search
  if (searchString !== undefined) {
    where.push({ customerRequest: { contains: searchString } });
    where.push({ employeeNotes: { contains: searchString } });
    where.push({ notApprovedNotes: { contains: searchString } });
  }

  // Boolean search
  if (searchBool !== undefined) {
    where.push({ isApproved: searchBool });
    where.push({ ATOOperational: searchBool });
    where.push({ ATOReservoirFilled: searchBool });
    where.push({ chemFilterAdjusted: searchBool });
    where.push({ doserAdjustementOrManualDosing: searchBool });
    where.push({ dosingReservoirsFull: searchBool });
    where.push({ floorsCheckedForSpillsOrDirt: searchBool });
    where.push({ glassCleanedInside: searchBool });
    where.push({ glassCleanedOutside: searchBool });
    where.push({ mechFilterChanged: searchBool });
    where.push({ pumpsClearedOfDebris: searchBool });
    where.push({ saltCreepCleaned: searchBool });
    where.push({ skimmerCleanedAndOperational: searchBool });
    where.push({ waterChanged: searchBool });
    where.push({ waterTestedRecordedDated: searchBool });
    where.push({ pestAPresent: searchBool });
    where.push({ pestBPresent: searchBool });
    where.push({ pestCPresent: searchBool });
    where.push({ pestDPresent: searchBool });
  }

  // Number search
  if (minNum !== undefined || maxNum !== undefined) {
    where.push({ alkalinity: { gte: minNum, lte: maxNum } });
    where.push({ calcium: { gte: minNum, lte: maxNum } });
    where.push({ nitrate: { gte: minNum, lte: maxNum } });
    where.push({ phosphate: { gte: minNum, lte: maxNum } });
  }

  // Date search
  if (minDate !== undefined || maxDate !== undefined) {
    where.push({ createdOn: { gte: minDate, lte: maxDate } });
    where.push({ notesUpdated: { gte: minDate, lte: maxDate } });
  }

  // Return all values
  return await prisma.serviceCall.findMany({
    skip: (page - 1) * size,
    take: size,
    where: {
      OR: where,
    },
  });
}

// ALL
export async function getAll(isApproved?: boolean) {
  return await prisma.serviceCall.findMany({
    where: {
      isApproved: isApproved,
    },
  });
}

// SEARCH (needs to be implemented)

export * as serviceCallDB from "./ServiceCall";
