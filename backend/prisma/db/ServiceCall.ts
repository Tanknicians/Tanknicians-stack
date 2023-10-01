import { PrismaClient } from "@prisma/client";
import { CreateServiceCall, SearchSchema, UpdateServiceCall } from "../../src/zodTypes";
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
  search: SearchSchema
) {
  const where: any[] = [];

  // String search
  if (search.searchString !== undefined) {
    where.push({ customerRequest: { contains: search.searchString } });
    where.push({ employeeNotes: { contains: search.searchString } });
    where.push({ notApprovedNotes: { contains: search.searchString } });
  }

  // Boolean search
  if (search.searchBoolean !== undefined) {
    where.push({ isApproved: search.searchBoolean });
    where.push({ ATOOperational: search.searchBoolean });
    where.push({ ATOReservoirFilled: search.searchBoolean });
    where.push({ chemFilterAdjusted: search.searchBoolean });
    where.push({ doserAdjustementOrManualDosing: search.searchBoolean });
    where.push({ dosingReservoirsFull: search.searchBoolean });
    where.push({ floorsCheckedForSpillsOrDirt: search.searchBoolean });
    where.push({ glassCleanedInside: search.searchBoolean });
    where.push({ glassCleanedOutside: search.searchBoolean });
    where.push({ mechFilterChanged: search.searchBoolean });
    where.push({ pumpsClearedOfDebris: search.searchBoolean });
    where.push({ saltCreepCleaned: search.searchBoolean });
    where.push({ skimmerCleanedAndOperational: search.searchBoolean });
    where.push({ waterChanged: search.searchBoolean });
    where.push({ waterTestedRecordedDated: search.searchBoolean });
    where.push({ pestAPresent: search.searchBoolean });
    where.push({ pestBPresent: search.searchBoolean });
    where.push({ pestCPresent: search.searchBoolean });
    where.push({ pestDPresent: search.searchBoolean });
  }

  // Number search
  if (search.minNum !== undefined || search.maxNum !== undefined) {
    where.push({ alkalinity: { gte: search.minNum, lte: search.maxNum } });
    where.push({ calcium: { gte: search.minNum, lte: search.maxNum } });
    where.push({ nitrate: { gte: search.minNum, lte: search.maxNum } });
    where.push({ phosphate: { gte: search.minNum, lte: search.maxNum } });
  }

  // Date search
  if (search.minDate !== undefined || search.maxDate !== undefined) {
    where.push({ createdOn: { gte: search.minDate, lte: search.maxDate } });
    where.push({ notesUpdated: { gte: search.minDate, lte: search.maxDate } });
  }

  // Return all values
  return await prisma.serviceCall.findMany({
    skip: (search.page - 1) * search.size,
    take: search.size,
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
