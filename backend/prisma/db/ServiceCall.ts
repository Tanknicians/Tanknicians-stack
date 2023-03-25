import { ServiceCall, PrismaClient, TankMetadata, User } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function create(
  form: ServiceCall,
  employee: User,
  tank: TankMetadata
) {
  await prisma.serviceCall.create({
    data: {
      isApproved: form.isApproved,
      createdOn: form.createdOn,

      billed: form.billed,
      customerRequest: form.customerRequest,

      alkalinity: form.alkalinity,
      calcium: form.calcium,
      nitrate: form.nitrate,
      phosphate: form.phosphate,

      ATOOperational: form.ATOOperational,
      ATOResevoirFilled: form.ATOResevoirFilled,
      chemFilterAdjusted: form.chemFilterAdjusted,
      doserAdjustementOrManualDosing: form.doserAdjustementOrManualDosing,
      dosingReservoirsFull: form.dosingReservoirsFull,
      floorsCheckedForSpillsOrDirt: form.floorsCheckedForSpillsOrDirt,
      glassCleanedInside: form.glassCleanedInside,
      glassCleanedOutside: form.glassCleanedOutside,
      mechFilterChanged: form.mechFilterChanged,
      notesUpdated: form.notesUpdated,
      pumpsClearedOfDebris: form.pumpsClearedOfDebris,
      saltCreepCleaned: form.saltCreepCleaned,
      skimmerCleanedAndOperational: form.skimmerCleanedAndOperational,
      waterChanged: form.waterChanged,

      pestAPresent: form.pestAPresent,
      pestBPresent: form.pestBPresent,
      pestCPresent: form.pestCPresent,
      pestDPresent: form.pestDPresent,

      Employee: {
        connect: employee,
      },

      TankMetadata: {
        connect: tank,
      },
    },
  });
}

// READ
export async function findOne(serviceCall: ServiceCall) {
  return await prisma.serviceCall.findUnique({
    where: {
      id: serviceCall.id,
    },
  });
}

export async function getAll() {
  return await prisma.serviceCall.findMany();
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

export * as serviceCallDB from "./ServiceCall";
