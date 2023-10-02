import { PrismaClient } from '@prisma/client';
import {
  CreateServiceCall,
  SearchSchema,
  UpdateServiceCall,
} from '../../src/zodTypes';
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
  endDate?: Date,
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
export async function search(search: SearchSchema) {
  const where = [
    // String search
    { customerRequest: { contains: search.searchString } },
    { employeeNotes: { contains: search.searchString } },
    { notApprovedNotes: { contains: search.searchString } },

    // Boolean search
    { isApproved: search.searchBoolean },
    { ATOOperational: search.searchBoolean },
    { ATOReservoirFilled: search.searchBoolean },
    { chemFilterAdjusted: search.searchBoolean },
    { doserAdjustementOrManualDosing: search.searchBoolean },
    { dosingReservoirsFull: search.searchBoolean },
    { floorsCheckedForSpillsOrDirt: search.searchBoolean },
    { glassCleanedInside: search.searchBoolean },
    { glassCleanedOutside: search.searchBoolean },
    { mechFilterChanged: search.searchBoolean },
    { pumpsClearedOfDebris: search.searchBoolean },
    { saltCreepCleaned: search.searchBoolean },
    { skimmerCleanedAndOperational: search.searchBoolean },
    { waterChanged: search.searchBoolean },
    { waterTestedRecordedDated: search.searchBoolean },
    { pestAPresent: search.searchBoolean },
    { pestBPresent: search.searchBoolean },
    { pestCPresent: search.searchBoolean },
    { pestDPresent: search.searchBoolean },

    // Number search
    { alkalinity: { gte: search.minNum, lte: search.maxNum } },
    { calcium: { gte: search.minNum, lte: search.maxNum } },
    { nitrate: { gte: search.minNum, lte: search.maxNum } },
    { phosphate: { gte: search.minNum, lte: search.maxNum } },

    // Date search
    { createdOn: { gte: search.minDate, lte: search.maxDate } },
    { notesUpdated: { gte: search.minDate, lte: search.maxDate } },
    // This removes any undefined values.
  ].filter(Boolean);
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

export * as serviceCallDB from './ServiceCall';
